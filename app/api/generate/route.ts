import { NextRequest, NextResponse } from "next/server";

// Force Node.js runtime — Replicate SDK doesn't work in Edge
export const runtime = "nodejs";
export const maxDuration = 120;

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function POST(req: NextRequest) {
  try {
    const { image, style, gender, vibe, palette } = await req.json();

    if (!image || !style) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check for Replicate API key
    const apiKey = process.env.REPLICATE_API_TOKEN;
    if (!apiKey) {
      return NextResponse.json(
        { error: "REPLICATE_API_TOKEN not configured" },
        { status: 500 }
      );
    }

    // Build the prompt based on selections
    const stylePrompts: Record<string, string> = {
      "linkedin": "professional corporate LinkedIn headshot, business attire, clean neutral background, studio lighting, high-end portrait photography",
      "alt-goth": "dark gothic aesthetic portrait, dramatic makeup, dark clothing, moody atmospheric lighting, alternative style, deep shadows",
      "anime": "anime style portrait illustration, vibrant colors, cel-shaded, Japanese animation aesthetic, clean linework, expressive eyes",
      "fairycore": "fairycore aesthetic portrait, ethereal glow, flowers in hair, soft pastel colors, magical woodland lighting, dreamy bokeh",
      "grunge": "90s grunge aesthetic portrait, edgy raw energy, film grain texture, alternative fashion, moody shadows, Kurt Cobain era",
      "indie-sleaze": "indie sleaze aesthetic portrait, 2008 tumblr aesthetic, harsh flash photography, artsy retro cool, slightly messy",
      "cottagecore": "cottagecore aesthetic portrait, soft natural golden lighting, floral, pastoral setting, vintage dress, dreamy atmosphere, meadow",
      "cyberpunk": "cyberpunk portrait, neon lights reflecting on face, futuristic, glowing accents, sci-fi aesthetic, dark rainy background, blade runner",
      "dark-academia": "dark academia portrait, scholarly aesthetic, moody warm lighting, vintage clothing, old library background, warm amber tones, tweed",
      "maximalist": "maximalist portrait, bold patterns, vibrant color mixing, artistic, layered textures, colorful statement fashion, eclectic",
      "minimalist": "minimalist clean portrait, simple pure background, elegant understated, modern aesthetic, soft even lighting, contemporary",
      "vaporwave": "vaporwave aesthetic portrait, pink and purple neon glow, retro 80s glitch, palm tree silhouettes, dreamy nostalgic haze, grid",
    };

    const genderPrompts: Record<string, string> = {
      "male": "young male subject",
      "female": "young female subject",
      "neutral": "young person",
    };

    const vibePrompts: Record<string, string> = {
      "dreamy": ", dreamy soft focus ethereal atmosphere",
      "edgy": ", edgy dramatic high contrast",
      "soft": ", soft gentle tones romantic mood",
      "bold": ", bold striking commanding presence",
      "mysterious": ", mysterious atmospheric cinematic mood",
      "playful": ", playful lighthearted vibrant energy",
    };

    const palettePrompts: Record<string, string> = {
      "warm": ", warm color palette golden hour tones",
      "cool": ", cool color palette blue tones icy",
      "pastel": ", pastel color palette muted soft candy colors",
      "vibrant": ", vibrant highly saturated colors",
      "monochrome": ", monochrome black and white tones",
      "neon": ", neon bright electric colors glowing",
    };

    const stylePrompt = stylePrompts[style] || style;
    const genderSubject = genderPrompts[gender] || "young person";
    const vibePrompt = vibePrompts[vibe] || "";
    const palettePrompt = palettePrompts[palette] || "";

    const fullPrompt = `${genderSubject}, ${stylePrompt}${vibePrompt}${palettePrompt}, high quality, detailed, professional photography, sharp focus, 85mm lens`;
    const negativePrompt = "ugly, blurry, low quality, distorted, deformed, disfigured, bad anatomy, extra limbs, watermark, text, bad face, cross-eyed, worst quality, jpeg artifacts";

    // Build data URI if not already
    const imageInput = image.startsWith("data:") ? image : `data:image/jpeg;base64,${image}`;

    try {
      const Replicate = (await import("replicate")).default;
      const replicate = new Replicate({ auth: apiKey });

      // Retry logic with backoff for rate limits
      let lastError: any = null;
      const maxRetries = 3;

      for (let attempt = 0; attempt < maxRetries; attempt++) {
        try {
          if (attempt > 0) {
            // Wait with exponential backoff: 3s, 6s
            await sleep(attempt * 3000);
          }

          // Use SDXL img2img — accepts an input image + prompt
          const output = await replicate.run(
            "stability-ai/sdxl:7762fd07cf82c948538e41f63f77d685e02b063e37e496e96c929f9bdc" as any,
            {
              input: {
                image: imageInput,
                prompt: fullPrompt,
                negative_prompt: negativePrompt,
                guidance_scale: 7.5,
                num_inference_steps: 30,
                prompt_strength: 0.65, // 0 = keep original, 1 = full transform
                width: 768,
                height: 768,
              },
            }
          );

          // Output is URL or array of URLs
          const imageUrl = Array.isArray(output) ? output[0] : output;
          const urlStr = typeof imageUrl === "string" ? imageUrl : null;

          if (!urlStr) {
            throw new Error("No image URL returned from model");
          }

          return NextResponse.json({
            success: true,
            imageUrl: urlStr,
          });
        } catch (err: any) {
          lastError = err;

          // If it's a rate limit (429), retry
          if (err.message?.includes("429") || err.status === 429 || err.message?.includes("throttled")) {
            console.warn(`Rate limited (attempt ${attempt + 1}/${maxRetries}), retrying...`);
            continue;
          }

          // Other errors: don't retry
          throw err;
        }
      }

      // All retries exhausted
      const isRateLimit = lastError?.message?.includes("429") || lastError?.message?.includes("throttled");
      return NextResponse.json(
        {
          error: isRateLimit
            ? "Service is busy right now — please wait 10 seconds and try again. (Free tier rate limit)"
            : `Generation failed: ${lastError?.message || "unknown error"}`,
        },
        { status: isRateLimit ? 503 : 500 }
      );

    } catch (replicateError: any) {
      console.error("Replicate error:", replicateError);

      const isRateLimit = replicateError.message?.includes("429") || replicateError.message?.includes("throttled");

      return NextResponse.json(
        {
          error: isRateLimit
            ? "Service is busy right now — please wait 10 seconds and try again. (Free tier rate limit)"
            : `Generation failed: ${replicateError.message || "unknown error"}`,
        },
        { status: isRateLimit ? 503 : 500 }
      );
    }
  } catch (error: any) {
    console.error("Generate API error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
