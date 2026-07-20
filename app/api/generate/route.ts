import { NextRequest, NextResponse } from "next/server";

// Force Node.js runtime
export const runtime = "nodejs";
export const maxDuration = 60;

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * Image generation endpoint
 * Uses Hugging Face Serverless Inference API with instruct-pix2pix for img2img style transfer.
 *
 * HF Inference API for image-to-image accepts:
 * - Content-Type: application/json
 * - Body: { "inputs": <base64 image string>, "parameters": { "prompt": "..." } }
 * OR
 * - Content-Type: image/jpeg (or multipart)
 * - Body: raw image bytes, with parameters header
 *
 * Response: raw image bytes
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
    const styleInstructions: Record<string, string> = {
      "linkedin":
        "Transform this into a professional corporate LinkedIn headshot with clean neutral background, office attire, studio lighting, high-end business portrait",
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

    // Decode base64 image to raw bytes — strip data URI prefix if present
    let base64Image: string;
    let mimeType: string = "image/jpeg";
    if (image.startsWith("data:")) {
      const parts = image.split(";base64,");
      mimeType = parts[0].replace("data:", "") || "image/jpeg";
      base64Image = parts[1] || parts[0];
    } else {
      base64Image = image;
    }

    const imageBytes = Buffer.from(base64Image, "base64");

    // Use the HF Inference API for image-to-image
    const HF_MODEL = "timbrooks/instruct-pix2pix";
    const HF_API_URL = `https://api-inference.huggingface.co/models/${HF_MODEL}`;

    const maxRetries = 2;
    let lastError: any = null;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        if (attempt > 0) {
          await sleep(attempt * 3000);
        }

        console.log(`[HF] Attempt ${attempt + 1}, model: ${HF_MODEL}, prompt length: ${fullPrompt.length}, image size: ${imageBytes.length}`);

        // Try sending raw image bytes as body with prompt as x-use-prompt header
        // This matches how HF expects img2img: image in body, params in header
        const response = await fetch(HF_API_URL, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": mimeType,
          },
          body: imageBytes,
        });

        // Model loading (503) — common for first request (cold start)
        if (response.status === 503) {
          const data = await response.json().catch(() => ({}));
          const waitTime = (data as any).estimated_time || 30;
          console.warn(`[HF] Model loading, estimated ${waitTime}s (attempt ${attempt + 1})`);
          if (attempt < maxRetries) {
            await sleep(Math.min(waitTime * 1000, 30000));
            continue;
          }
          return NextResponse.json(
            { error: "AI model is warming up. Please wait 30 seconds and try again." },
            { status: 503 }
          );
        }

        // Rate limited
        if (response.status === 429) {
          const retryAfter = parseInt(response.headers.get("retry-after") || "10", 10);
          console.warn(`[HF] Rate limited, retry-after: ${retryAfter}s`);
          if (attempt < maxRetries) {
            await sleep(Math.min(retryAfter * 1000, 15000));
            continue;
          }
          return NextResponse.json(
            { error: "Service is busy right now. Please wait a moment and try again." },
            { status: 503 }
          );
        }

        if (!response.ok) {
          const text = await response.text();
          throw new Error(`HF API ${response.status}: ${text.slice(0, 500)}`);
        }

        // Response should be raw image bytes
        const contentType = response.headers.get("content-type") || "";
        const arrayBuffer = await response.arrayBuffer();

        console.log(`[HF] Response: content-type=${contentType}, size=${arrayBuffer.byteLength} bytes`);

        // Check we got a valid image back (not a JSON error)
        if (contentType.includes("application/json")) {
          const text = Buffer.from(arrayBuffer).toString("utf-8");
          throw new Error(`HF returned JSON instead of image: ${text.slice(0, 300)}`);
        }

        if (arrayBuffer.byteLength < 1000) {
          const text = Buffer.from(arrayBuffer).toString("utf-8");
          throw new Error(`Response too small (${arrayBuffer.byteLength} bytes): ${text.slice(0, 200)}`);
        }

        // Convert to base64 data URL for returning to client
        const base64 = Buffer.from(arrayBuffer).toString("base64");
        const responseMimeType = contentType.includes("image/") ? contentType : "image/png";
        const dataUrl = `data:${responseMimeType};base64,${base64}`;

        console.log(`[HF] Success! Image generated: ${arrayBuffer.byteLength} bytes`);

        return NextResponse.json({
          success: true,
          imageUrl: dataUrl,
        });
      } catch (err: any) {
        lastError = err;
        console.error(`[HF] Error on attempt ${attempt + 1}:`, err.message);
        if (!err.message?.includes("503") && !err.message?.includes("429")) {
          break;
        }
      }
    }

    console.error("[HF] All retries exhausted:", lastError);
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
