import { NextRequest, NextResponse } from "next/server";

// Force Node.js runtime for fetch multipart support
export const runtime = "nodejs";
export const maxDuration = 60;

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * Image generation endpoint
 * Uses Hugging Face Serverless Inference API with instruct-pix2pix for img2img style transfer.
 * Free tier: hundreds of requests/hour, no credit card required initially.
 */
export async function POST(req: NextRequest) {
  try {
    const { image, style, gender, vibe, palette } = await req.json();

    if (!image || !style) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check for Hugging Face API key
    const apiKey = process.env.HUGGINGFACE_API_TOKEN;
    if (!apiKey) {
      return NextResponse.json(
        { error: "HUGGINGFACE_API_TOKEN not configured" },
        { status: 500 }
      );
    }

    // Build style-specific editing instruction prompt
    // instruct-pix2pix takes natural language instructions to transform the input image
    const styleInstructions: Record<string, string> = {
      "linkedin":
        "Transform this into a professional corporate LinkedIn headshot with clean neutral background, office attire, studio lighting, business portrait",
      "alt-goth":
        "Transform this into a dark gothic aesthetic portrait with dramatic makeup, dark moody atmospheric lighting, alternative style, deep shadows, edgy",
      "anime":
        "Transform this into an anime style portrait illustration with vibrant colors, cel-shaded, Japanese animation aesthetic, expressive eyes, clean linework",
      "fairycore":
        "Transform this into an ethereal fairycore portrait with flowers in hair, soft pastel colors, magical woodland lighting, dreamy bokeh, fantasy glow",
      "grunge":
        "Transform this into a 90s grunge aesthetic portrait with edgy raw energy, film grain texture, alternative fashion, moody shadows, vintage feel",
      "indie-sleaze":
        "Transform this into a 2008 indie sleaze aesthetic portrait with harsh flash photography, artsy retro cool, slightly messy, tumblr aesthetic",
      "cottagecore":
        "Transform this into a cottagecore portrait with soft natural golden lighting, floral setting, pastoral dreamy atmosphere, vintage pastoral style",
      "cyberpunk":
        "Transform this into a cyberpunk portrait with neon lights reflecting on face, futuristic, glowing neon accents, sci-fi aesthetic, dark background",
      "dark-academia":
        "Transform this into a dark academia portrait with moody warm lighting, scholarly aesthetic, vintage clothing, old library background, amber tones",
      "maximalist":
        "Transform this into a maximalist portrait with bold patterns, vibrant color mixing, artistic layered textures, colorful statement fashion",
      "minimalist":
        "Transform this into a minimalist clean portrait with simple pure background, elegant understated, modern aesthetic, soft even lighting",
      "vaporwave":
        "Transform this into a vaporwave aesthetic portrait with pink and purple neon glow, retro 80s vibe, dreamy nostalgic haze, synthwave",
    };

    const genderHints: Record<string, string> = {
      male: " (maintain male appearance)",
      female: " (maintain female appearance)",
      neutral: "",
    };

    const vibeHints: Record<string, string> = {
      dreamy: ", dreamy soft focus ethereal atmosphere",
      edgy: ", edgy dramatic high contrast",
      soft: ", soft gentle romantic mood",
      bold: ", bold striking commanding presence",
      mysterious: ", mysterious atmospheric cinematic mood",
      playful: ", playful lighthearted vibrant energy",
    };

    const paletteHints: Record<string, string> = {
      warm: ", warm golden hour tones",
      cool: ", cool blue tones",
      pastel: ", muted soft pastel colors",
      vibrant: ", highly saturated vivid colors",
      monochrome: ", black and white monochrome",
      neon: ", neon bright electric glowing colors",
    };

    const styleInstruction = styleInstructions[style] || styleInstructions["linkedin"];
    const genderHint = genderHints[gender] || "";
    const vibeHint = vibeHints[vibe] || "";
    const paletteHint = paletteHints[palette] || "";

    const fullPrompt = `${styleInstruction}${genderHint}${vibeHint}${paletteHint}`;

    // Decode base64 image to Buffer
    let imageBuffer: Buffer;
    if (image.startsWith("data:")) {
      const base64Data = image.split(",")[1];
      imageBuffer = Buffer.from(base64Data, "base64");
    } else {
      imageBuffer = Buffer.from(image, "base64");
    }

    // Use instruct-pix2pix: best model for img2img style transfer
    // It keeps the input image's composition while following the text instruction
    const HF_MODEL = "timbrooks/instruct-pix2pix";
    const HF_API_URL = `https://api-inference.huggingface.co/models/${HF_MODEL}`;

    // Build request body for image-to-image pipeline
    // HF API for img2img: base64-encoded image in `inputs.image`, prompt in `inputs.prompt`
    // Note: the newer image-to-image format accepts JSON with inputs containing both image and prompt
    const requestBody = {
      inputs: {
        image: `data:image/jpeg;base64,${imageBuffer.toString("base64")}`,
        prompt: fullPrompt,
      },
      parameters: {
        guidance_scale: 7.5,
        image_guidance_scale: 1.5,
        num_inference_steps: 30,
      },
    };

    // Retry logic with backoff for HF cold starts / rate limits
    const maxRetries = 2;
    let lastError: any = null;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        if (attempt > 0) {
          // Wait with backoff: 2s, 4s
          await sleep(attempt * 2000);
        }

        const response = await fetch(HF_API_URL, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });

        // If model is loading (503), wait and retry
        if (response.status === 503) {
          const data = await response.json().catch(() => ({}));
          const waitTime = (data as any).estimated_time || 30;
          console.warn(`Model loading, estimated ${waitTime}s (attempt ${attempt + 1})`);
          if (attempt < maxRetries) {
            await sleep(Math.min(waitTime * 1000, 25000));
            continue;
          }
          return NextResponse.json(
            { error: "AI model is warming up. Please try again in a moment." },
            { status: 503 }
          );
        }

        // Rate limited
        if (response.status === 429) {
          const retryAfter = parseInt(response.headers.get("retry-after") || "10", 10);
          console.warn(`Rate limited, waiting ${retryAfter}s`);
          if (attempt < maxRetries) {
            await sleep(Math.min(retryAfter * 1000, 25000));
            continue;
          }
          return NextResponse.json(
            { error: "Service is busy right now. Please wait a moment and try again." },
            { status: 503 }
          );
        }

        if (!response.ok) {
          const text = await response.text();
          throw new Error(`HF API ${response.status}: ${text.slice(0, 200)}`);
        }

        // Response is the image bytes (PNG)
        const imageBlob = await response.blob();
        if (!imageBlob || imageBlob.size < 100) {
          throw new Error("Empty image response from model");
        }

        // Convert to base64 data URL
        const arrayBuffer = await imageBlob.arrayBuffer();
        const base64 = Buffer.from(arrayBuffer).toString("base64");
        const contentType = imageBlob.type || "image/jpeg";
        const dataUrl = `data:${contentType};base64,${base64}`;

        return NextResponse.json({
          success: true,
          imageUrl: dataUrl,
        });
      } catch (err: any) {
        lastError = err;
        // If not a retryable error, bail out
        if (!err.message?.includes("503") && !err.message?.includes("429")) {
          break;
        }
      }
    }

    console.error("Hugging Face API error:", lastError);
    return NextResponse.json(
      { error: `Generation failed: ${lastError?.message || "unknown error"}` },
      { status: 500 }
    );
  } catch (error: any) {
    console.error("Generate API error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
