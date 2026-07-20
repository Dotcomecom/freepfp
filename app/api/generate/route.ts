import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 120;

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * Image generation with IDENTITY PRESERVATION
 * Uses InstantID (zsxkib/instant-id) which preserves the input person's face
 * while applying the requested style/aesthetic.
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

    // Build style prompts — InstantID prompts work best when they describe
    // the portrait setup / aesthetic clearly
    const stylePrompts: Record<string, string> = {
      "linkedin":
        "professional corporate LinkedIn headshot, wearing office attire, clean neutral light grey background, soft studio lighting, sharp focus, high-end business portrait, photorealistic",
      "alt-goth":
        "dark gothic portrait, dramatic moody lighting, deep shadows, edgy alternative style, dark background, atmospheric, dramatic shadows, photorealistic",
      "anime":
        "anime style portrait illustration, vibrant colors, cel-shaded, Japanese animation style, expressive large eyes, clean linework, high quality anime art, Studio Ghibli quality",
      "fairycore":
        "ethereal fairycore portrait, flowers in hair, soft pastel colors, magical woodland lighting, dreamy bokeh, fantasy glow, whimsical enchanting",
      "grunge":
        "90s grunge portrait, edgy raw energy, film grain texture, alternative fashion, moody shadows, vintage film feel, photorealistic",
      "indie-sleaze":
        "2008 indie sleaze portrait, harsh flash photography, artsy retro, slightly messy cool, Tumblr aesthetic, photorealistic",
      "cottagecore":
        "cottagecore portrait, soft golden hour natural lighting, floral meadow setting, pastoral dreamy, vintage soft tones, warm",
      "cyberpunk":
        "cyberpunk portrait, neon lights reflecting on face, futuristic, glowing neon blue and pink accents, sci-fi, dark background, photorealistic",
      "dark-academia":
        "dark academia portrait, moody warm lighting, scholarly aesthetic, vintage clothing, old library background, amber cinematic tones",
      "maximalist":
        "maximalist portrait, bold patterns, vibrant colors, artistic editorial photography, colorful statement fashion, layered textures",
      "minimalist":
        "minimalist clean portrait, pure white background, elegant understated, soft even lighting, modern professional photography",
      "vaporwave":
        "vaporwave portrait, pink and purple neon glow, retro 80s, dreamy nostalgic haze, synthwave aesthetic, artistic",
    };

    const genderHints: Record<string, string> = {
      male: "man, masculine features, ",
      female: "woman, feminine features, ",
      neutral: "",
    };

    const vibeHints: Record<string, string> = {
      dreamy: "dreamy, soft-focus, ethereal",
      edgy: "edgy, high-contrast, dramatic",
      soft: "soft, gentle, warm",
      bold: "bold, striking, commanding presence",
      mysterious: "mysterious, atmospheric, cinematic",
      playful: "playful, lighthearted, vibrant",
    };

    const paletteHints: Record<string, string> = {
      warm: "warm golden hour tones",
      cool: "cool blue undertones",
      pastel: "muted soft pastel colors",
      vibrant: "highly saturated vivid colors",
      monochrome: "black and white monochrome",
      neon: "bright neon electric glowing colors",
    };

    const basePrompt = stylePrompts[style] || stylePrompts["linkedin"];
    const genderPart = genderHints[gender] || "";
    const vibePart = vibeHints[vibe] || "";
    const palettePart = paletteHints[palette] || "";

    // InstantID prompt: describes the person + desired aesthetic
    const fullPrompt = [
      "a portrait of a person,",
      genderPart,
      basePrompt,
      vibePart,
      palettePart,
    ]
      .filter(Boolean)
      .join(" ");

    const negativePrompt =
      "blurry, low quality, distorted, deformed, disfigured, bad anatomy, extra limbs, mutation, ugly, text, watermark, cartoon, illustration (unless anime style)";

    // Decode base64 image — strip data URI prefix if present
    let imageData: string;
    if (image.startsWith("data:")) {
      imageData = image;
    } else {
      imageData = `data:image/jpeg;base64,${image}`;
    }

    console.log(
      `[InstantID] Style: ${style}, prompt length: ${fullPrompt.length}, image size: ${(imageData.length / 1024).toFixed(0)}KB`
    );

    const replicate = new Replicate({ auth: apiKey });

    // Retry logic for rate limits
    const maxRetries = 3;
    let lastError: any = null;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        if (attempt > 0) {
          const waitTime = attempt * 12000;
          console.log(`[InstantID] Retry ${attempt}, waiting ${waitTime}ms`);
          await sleep(waitTime);
        }

        console.log(`[InstantID] Attempt ${attempt + 1}/${maxRetries + 1}`);

        // Use InstantID — identity-preserving generation
        const output = await replicate.run(
          "zsxkib/instant-id",
          {
            input: {
              image: imageData,
              prompt: fullPrompt,
              negative_prompt: negativePrompt,
              num_inference_steps: 30,
              guidance_scale: 5,
              width: 768,
              height: 768,
              apply_style: true,
              positive_conditioning_scale: 1.0,
            },
          }
        );

        console.log(`[InstantID] Output type: ${typeof output}, isArray: ${Array.isArray(output)}`);

        // Output is an array of URLs (same as SDXL)
        if (Array.isArray(output) && output.length > 0) {
          const imageUrl = output[0];
          console.log(`[InstantID] Success! Image URL: ${imageUrl?.slice(0, 80)}...`);

          return NextResponse.json({
            success: true,
            imageUrl: imageUrl,
          });
        } else if (typeof output === "string") {
          console.log(`[InstantID] Success (string output)! URL: ${output.slice(0, 80)}...`);
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
        console.error(`[InstantID] Attempt ${attempt + 1} failed:`, msg.slice(0, 300));

        // Rate limit — retry
        if (msg.includes("429") || msg.includes("throttl") || msg.includes("rate limit")) {
          console.log(`[InstantID] Rate limited, will retry...`);
          continue;
        }

        // Model loading / cold start
        if (msg.includes("503") || msg.includes("loading")) {
          console.log(`[InstantID] Model loading, will retry...`);
          await sleep(20000);
          continue;
        }

        // Non-retryable — break
        break;
      }
    }

    throw lastError || new Error("All retry attempts exhausted");
  } catch (err: any) {
    const msg = err?.message || String(err);
    console.error("[InstantID] Final error:", msg.slice(0, 500));

    if (msg.includes("429") || msg.includes("throttl")) {
      return NextResponse.json(
        { error: "Service is busy right now. Please wait 30 seconds and try again." },
        { status: 429 }
      );
    }
    if (msg.includes("402")) {
      return NextResponse.json(
        { error: "Service credits exhausted. Please contact support." },
        { status: 402 }
      );
    }
    return NextResponse.json(
      { error: `Generation failed: ${msg.slice(0, 400)}` },
      { status: 500 }
    );
  }
}
