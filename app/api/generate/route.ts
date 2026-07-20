import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 120;

/**
 * Image generation with IDENTITY PRESERVATION
 * Uses PhotoMaker V2 - much better at preserving facial identity than InstantID
 * and significantly faster generation times
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

    const apiKey = process.env.REPLICATE_API_TOKEN;
    if (!apiKey) {
      return NextResponse.json(
        { error: "REPLICATE_API_TOKEN not configured" },
        { status: 500 }
      );
    }

    // PhotoMaker V2 style prompts optimized for face preservation
    // PhotoMaker needs the word "person" or "man"/"woman" in the prompt as a placeholder
    // that gets replaced with the input face
    const stylePrompts: Record<string, string> = {
      "linkedin": "professional corporate LinkedIn headshot portrait of a person, wearing office attire, clean neutral light grey background, soft studio lighting, sharp focus, high-end business portrait, photorealistic, 8k",
      "alt-goth": "dark gothic portrait of a person, dramatic moody lighting, deep shadows, edgy alternative style, dark background, atmospheric, photorealistic, 8k",
      "anime": "anime style portrait illustration of a person, vibrant colors, cel-shaded, Japanese animation style, expressive large eyes, clean linework, high quality anime art",
      "fairycore": "ethereal fairycore portrait of a person, flowers in hair, soft pastel colors, magical woodland lighting, dreamy bokeh, fantasy glow, whimsical",
      "grunge": "90s grunge portrait of a person, edgy raw energy, film grain texture, alternative fashion, moody shadows, vintage film, photorealistic",
      "indie-sleaze": "2008 indie sleaze portrait of a person, harsh flash photography, artsy retro, slightly messy cool, Tumblr aesthetic, photorealistic",
      "cottagecore": "cottagecore portrait of a person, soft golden hour natural lighting, floral meadow setting, pastoral dreamy, vintage soft tones, warm",
      "cyberpunk": "cyberpunk portrait of a person, neon lights reflecting on face, futuristic, glowing neon blue and pink accents, sci-fi, dark background, photorealistic",
      "dark-academia": "dark academia portrait of a person, moody warm lighting, scholarly aesthetic, vintage clothing, old library background, amber cinematic tones",
      "maximalist": "maximalist portrait of a person, bold patterns, vibrant colors, artistic editorial photography, colorful statement fashion, layered textures",
      "minimalist": "minimalist clean portrait of a person, pure white background, elegant understated, soft even lighting, modern professional photography",
      "vaporwave": "vaporwave portrait of a person, pink and purple neon glow, retro 80s, dreamy nostalgic haze, synthwave aesthetic, artistic",
    };

    const basePrompt = stylePrompts[style] || stylePrompts["linkedin"];

    // PhotoMaker uses "img" as placeholder for the input person's face
    const finalPrompt = basePrompt.replace(/\b(person|man|woman)\b/g, "img");

    console.log(`[PhotoMaker] Style: ${style}, prompt: ${finalPrompt.slice(0, 100)}...`);

    // PhotoMaker V2 version hash
    const VERSION = "ddfc2b08d209f9fa8c1eca692712918bd449f695dabb4a958da31802a9570fe4";

    // PhotoMaker expects multiple images as array for stronger identity
    const imageInput = image.startsWith("http") ? [image] : [image];

    // Step 1: Create prediction
    const createResponse = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        "Authorization": `Token ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        version: VERSION,
        input: {
          prompt: `photo of a ${finalPrompt}`,
          neg_prompt: "blurry, low quality, distorted, deformed, disfigured, bad anatomy, extra limbs, mutation, ugly, text, watermark",
          image: imageInput,
          style_name: "Photographic (Default)",
          num_steps: 30,
          style_strength_ratio: 20,
          num_outputs: 1,
          guidance_scale: 5,
        }
      }),
    });

    if (!createResponse.ok) {
      const errorText = await createResponse.text();
      console.error("[PhotoMaker] Create failed:", createResponse.status, errorText);
      return NextResponse.json(
        { error: `Generation failed: ${errorText}` },
        { status: 500 }
      );
    }

    const prediction = await createResponse.json();
    console.log(`[PhotoMaker] Prediction created: ${prediction.id}, status: ${prediction.status}`);

    // Step 2: Poll for completion
    const predictionId = prediction.id;
    let result = prediction;
    let attempts = 0;
    const maxAttempts = 60; // 60 * 2s = 120s max wait

    while (result.status !== "succeeded" && result.status !== "failed" && attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 2000));
      attempts++;

      const pollResponse = await fetch(`https://api.replicate.com/v1/predictions/${predictionId}`, {
        headers: {
          "Authorization": `Token ${apiKey}`,
        },
      });

      if (!pollResponse.ok) {
        const errorText = await pollResponse.text();
        console.error("[PhotoMaker] Poll failed:", pollResponse.status, errorText);
        return NextResponse.json(
          { error: `Polling failed: ${errorText}` },
          { status: 500 }
        );
      }

      result = await pollResponse.json();
      console.log(`[PhotoMaker] Poll ${attempts}: status=${result.status}`);
    }

    if (result.status === "failed") {
      return NextResponse.json(
        { error: `Generation failed: ${result.error || "Unknown error"}` },
        { status: 500 }
      );
    }

    if (!result.output) {
      return NextResponse.json(
        { error: "No output generated" },
        { status: 500 }
      );
    }

    // PhotoMaker outputs an array of image URLs
    const outputUrl = Array.isArray(result.output) ? result.output[0] : result.output;
    
    console.log(`[PhotoMaker] Success! Output URL: ${outputUrl}`);

    return NextResponse.json({
      success: true,
      imageUrl: outputUrl,
    });

  } catch (err: any) {
    const msg = err?.message || String(err);
    console.error("[PhotoMaker] Fatal error:", msg);
    
    return NextResponse.json(
      { error: `Generation failed: ${msg}` },
      { status: 500 }
    );
  }
}
