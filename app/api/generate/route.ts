import { NextRequest, NextResponse } from "next/server";

// Force Node.js runtime - Replicate SDK doesn't work in Edge
export const runtime = "nodejs";
export const maxDuration = 60;

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
      "linkedin": "professional corporate LinkedIn headshot, business attire, clean background, studio lighting",
      "alt-goth": "dark gothic aesthetic portrait, dramatic makeup, dark clothing, moody lighting, alternative style",
      "anime": "anime style portrait illustration, vibrant colors, cel-shaded, Japanese animation aesthetic",
      "fairycore": "fairycore aesthetic portrait, ethereal glow, flowers, soft pastel colors, magical woodland lighting",
      "grunge": "90s grunge aesthetic portrait, edgy, raw, film grain texture, alternative fashion",
      "indie-sleaze": "indie sleaze aesthetic portrait, 2008 tumblr aesthetic, flash photography, artsy, retro cool",
      "cottagecore": "cottagecore aesthetic portrait, soft natural lighting, floral, pastoral, vintage dress, dreamy atmosphere",
      "cyberpunk": "cyberpunk portrait, neon lights, futuristic, glowing accents, sci-fi aesthetic, dark background",
      "dark-academia": "dark academia portrait, scholarly aesthetic, moody lighting, vintage clothing, library background, warm tones",
      "maximalist": "maximalist portrait, bold patterns, vibrant mixing, artistic, layered textures, colorful statement",
      "minimalist": "minimalist clean portrait, simple background, elegant, understated, modern aesthetic",
      "vaporwave": "vaporwave aesthetic portrait, pink and purple neon, retro 80s glitch, palm trees, dreamy nostalgia",
    };

    const genderPrompts: Record<string, string> = {
      "male": "male subject",
      "female": "female subject",
      "neutral": "person",
    };

    const vibePrompts: Record<string, string> = {
      "dreamy": ", dreamy soft focus atmosphere",
      "edgy": ", edgy dramatic contrast",
      "soft": ", soft gentle tones",
      "bold": ", bold striking presence",
      "mysterious": ", mysterious atmospheric mood",
      "playful": ", playful lighthearted energy",
    };

    const palettePrompts: Record<string, string> = {
      "warm": "warm color palette, golden tones",
      "cool": "cool color palette, blue tones",
      "pastel": "pastel color palette, muted soft colors",
      "vibrant": "vibrant saturated colors",
      "monochrome": "monochrome color palette, black and white",
      "neon": "neon bright electric colors",
    };

    const stylePrompt = stylePrompts[style] || style;
    const genderSubject = genderPrompts[gender] || "person";
    const vibePrompt = vibePrompts[vibe] || "";
    const palettePrompt = palettePrompts[palette] || "";

    const fullPrompt = `${genderSubject}, ${stylePrompt}${vibePrompt}, ${palettePrompt}, high quality, detailed, professional photography`;
    const negativePrompt = "ugly, blurry, low quality, distorted, deformed, disfigured, bad anatomy, extra limbs, watermark, text, bad face";

    // SD3.5 accepts data URIs directly for image input (img2img mode)
    const imageInput = image.startsWith("data:") ? image : `data:image/jpeg;base64,${image}`;

    try {
      const Replicate = (await import("replicate")).default;
      const replicate = new Replicate({ auth: apiKey });

      // Use SD 3.5 in img2img mode — accepts an input image + prompt
      const output = await replicate.run(
        "stability-ai/sdxl:7762fd07cf82c948538e41f63f77d685e02b063e37e496e96eefd46c929f9bdc" as any,
        {
          input: {
            image: imageInput,
            prompt: fullPrompt,
            negative_prompt: negativePrompt,
            guidance_scale: 7.5,
            num_inference_steps: 25,
            strength: 0.65, // 0 = keep original, 1 = full transform
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
    } catch (replicateError: any) {
      console.error("Replicate error:", replicateError);
      return NextResponse.json(
        { error: `Generation failed: ${replicateError.message || "unknown error"}` },
        { status: 500 }
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
