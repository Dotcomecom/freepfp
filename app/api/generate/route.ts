import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 120;

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * Image generation endpoint
 * Uses Replicate SDXL with img2img mode for style transfer.
 * Retries on 429 (rate limit) with exponential backoff.
 */
export async function POST(req: NextRequest) {
  let Replicate: any;
  try {
    const mod = await import("replicate");
    Replicate = mod.default;
  } catch (e) {
    console.error("Failed to import replicate:", e);
    return NextResponse.json(
      { error: "Server configuration error — Replicate SDK missing" },
      { status: 500 }
    );
  }

  try {
    const { image, style, gender, vibe, palette } = await req.json();

    if (!image || !style) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const apiKey = process.env.REPLICATE_API_TOKEN;
    if (!apiKey) {
      return NextResponse.json(
        { error: "REPLICATE_API_TOKEN not configured" },
        { status: 500 }
      );
    }

    // Build style-specific prompt
    const stylePrompts: Record<string, string> = {
      "linkedin":
        "professional corporate LinkedIn headshot portrait, clean neutral background, office attire, studio lighting, high-end business portrait, sharp focus, photorealistic",
      "alt-goth":
        "dark gothic aesthetic portrait, dramatic makeup, dark moody atmospheric lighting, alternative style, deep shadows, edgy, photorealistic",
      "anime":
        "anime style portrait illustration, vibrant colors, cel-shaded, Japanese animation aesthetic, expressive eyes, clean linework, high quality anime art",
      "fairycore":
        "ethereal fairycore portrait, flowers in hair, soft pastel colors, magical woodland lighting, dreamy bokeh, fantasy glow, whimsical",
      "grunge":
        "90s grunge aesthetic portrait, edgy raw energy, film grain texture, alternative fashion, moody shadows, vintage feel, photorealistic",
      "indie-sleaze":
        "2008 indie sleaze aesthetic portrait, harsh flash photography, artsy retro cool, slightly messy, tumblr aesthetic, photorealistic",
      "cottagecore":
        "cottagecore portrait, soft natural golden lighting, floral setting, pastoral dreamy atmosphere, vintage pastoral style, warm tones",
      "cyberpunk":
        "cyberpunk portrait, neon lights reflecting on face, futuristic, glowing neon accents, sci-fi aesthetic, dark background, photorealistic",
      "dark-academia":
        "dark academia portrait, moody warm lighting, scholarly aesthetic, vintage clothing, old library background, amber tones, cinematic",
      "maximalist":
        "maximalist portrait, bold patterns, vibrant color mixing, artistic layered textures, colorful statement fashion, editorial photography",
      "minimalist":
        "minimalist clean portrait, simple pure background, elegant understated, modern aesthetic, soft even lighting, professional photography",
      "vaporwave":
        "vaporwave aesthetic portrait, pink and purple neon glow, retro 80s vibe, dreamy nostalgic haze, synthwave, artistic",
    };

    const genderHints: Record<string, string> = {
      male: "male person, masculine",
      female: "female person, feminine",
      neutral: "",
    };

    const vibeHints: Record<string, string> = {
      dreamy: "dreamy soft focus ethereal",
      edgy: "edgy dramatic high contrast",
      soft: "soft gentle romantic",
      bold: "bold striking commanding",
      mysterious: "mysterious atmospheric cinematic",
      playful: "playful lighthearted vibrant",
    };

    const paletteHints: Record<string, string> = {
      warm: "warm golden hour tones",
      cool: "cool blue undertones",
      pastel: "muted soft pastel colors",
      vibrant: "highly saturated vivid colors",
      monochrome: "black and white monochrome",
      neon: "neon bright electric glowing",
    };

    const basePrompt = stylePrompts[style] || stylePrompts["linkedin"];
    const genderPart = genderHints[gender] || "";
    const vibePart = vibeHints[vibe] || "";
    const palettePart = paletteHints[palette] || "";

    const fullPrompt = [basePrompt, genderPart, vibePart, palettePart]
      .filter(Boolean)
      .join(", ");

    const negativePrompt =
      "blurry, low quality, distorted, deformed, disfigured, bad anatomy, extra limbs, mutation, ugly, text, watermark";

    // Decode base64 image — strip data URI prefix if present
    let imageData: string;
    if (image.startsWith("data:")) {
      imageData = image; // Replicate accepts data URIs directly
    } else {
      imageData = `data:image/jpeg;base64,${image}`;
    }

    console.log(
      `[Replicate] Style: ${style}, prompt length: ${fullPrompt.length}, image size: ${(imageData.length / 1024).toFixed(0)}KB`
    );

    const replicate = new Replicate({ auth: apiKey });

    // Retry logic for rate limits
    const maxRetries = 3;
    let lastError: any = null;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        if (attempt > 0) {
          const waitTime = attempt * 12000; // 12s, 24s, 36s
          console.log(`[Replicate] Retry ${attempt}, waiting ${waitTime}ms`);
          await sleep(waitTime);
        }

        console.log(`[Replicate] Attempt ${attempt + 1}/${maxRetries + 1}`);

        // Run SDXL img2img via predictions.create
        const output = await replicate.run(
          "stability-ai/sdxl:7762fd07cf82c948538e41f63f77d685e02b063e37e496e96eefd46c929f9bdc",
          {
            input: {
              image: imageData,
              prompt: fullPrompt,
              negative_prompt: negativePrompt,
              prompt_strength: 0.75,
              width: 768,
              height: 768,
              num_outputs: 1,
              guidance_scale: 7.5,
              num_inference_steps: 30,
            },
          }
        );

        console.log(`[Replicate] Output type: ${typeof output}, isArray: ${Array.isArray(output)}`);

        // Output is an array of URLs
        if (Array.isArray(output) && output.length > 0) {
          const imageUrl = output[0];
          console.log(`[Replicate] Success! Image URL: ${imageUrl?.slice(0, 80)}...`);

          return NextResponse.json({
            success: true,
            imageUrl: imageUrl,
          });
        } else if (typeof output === "string") {
          console.log(`[Replicate] Success (string output)! URL: ${output.slice(0, 80)}...`);
          return NextResponse.json({
            success: true,
            imageUrl: output,
          });
        } else {
          throw new Error(`Unexpected output format: ${JSON.stringify(output).slice(0, 200)}`);
        }
      } catch (err: any) {
        lastError = err;
        const msg = err?.message || String(err);
        console.error(`[Replicate] Attempt ${attempt + 1} failed:`, msg.slice(0, 300));

        // Check if it's a rate limit (429) — retry
        if (msg.includes("429") || msg.includes("throttl") || msg.includes("rate limit")) {
          console.log(`[Replicate] Rate limited, will retry...`);
          continue;
        }

        // Check for model loading / cold start (503)
        if (msg.includes("503") || msg.includes("loading")) {
          console.log(`[Replicate] Model loading, will retry...`);
          await sleep(20000);
          continue;
        }

        // Non-retryable error — break
        break;
      }
    }

    throw lastError || new Error("All retry attempts exhausted");
  } catch (err: any) {
    const msg = err?.message || String(err);
    console.error("[Replicate] Final error:", msg.slice(0, 500));

    // User-friendly error messages
    if (msg.includes("429") || msg.includes("throttl")) {
      return NextResponse.json(
        { error: "Service is busy right now. Please wait 30 seconds and try again." },
        { status: 429 }
      );
    }
    if (msg.includes("503")) {
      return NextResponse.json(
        { error: "AI model is warming up. Please wait a moment and try again." },
        { status: 503 }
      );
    }
    if (msg.includes("REPLICATE_API_TOKEN")) {
      return NextResponse.json(
        { error: "Server configuration error. Please contact support." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Generation failed. Please try again." },
      { status: 500 }
    );
  }
}
