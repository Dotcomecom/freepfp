import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 120;

/**
 * Image generation with IDENTITY PRESERVATION
 * Uses InstantID (zsxkib/instant-id) with direct REST API calls
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

    // Style prompts optimized for identity preservation
    const stylePrompts: Record<string, string> = {
      "linkedin": "professional corporate LinkedIn headshot, wearing office attire, clean neutral light grey background, soft studio lighting, sharp focus, high-end business portrait, photorealistic, 8k",
      "alt-goth": "dark gothic portrait, dramatic moody lighting, deep shadows, edgy alternative style, dark background, atmospheric, photorealistic, 8k",
      "anime": "anime style portrait illustration, vibrant colors, cel-shaded, Japanese animation style, expressive large eyes, clean linework, high quality anime art",
      "fairycore": "ethereal fairycore portrait, flowers in hair, soft pastel colors, magical woodland lighting, dreamy bokeh, fantasy glow, whimsical",
      "grunge": "90s grunge portrait, edgy raw energy, film grain texture, alternative fashion, moody shadows, vintage film, photorealistic",
      "indie-sleaze": "2008 indie sleaze portrait, harsh flash photography, artsy retro, slightly messy cool, Tumblr aesthetic, photorealistic",
      "cottagecore": "cottagecore portrait, soft golden hour natural lighting, floral meadow setting, pastoral dreamy, vintage soft tones, warm",
      "cyberpunk": "cyberpunk portrait, neon lights reflecting on face, futuristic, glowing neon blue and pink accents, sci-fi, dark background, photorealistic",
      "dark-academia": "dark academia portrait, moody warm lighting, scholarly aesthetic, vintage clothing, old library background, amber cinematic tones",
      "maximalist": "maximalist portrait, bold patterns, vibrant colors, artistic editorial photography, colorful statement fashion, layered textures",
      "minimalist": "minimalist clean portrait, pure white background, elegant understated, soft even lighting, modern professional photography",
      "vaporwave": "vaporwave portrait, pink and purple neon glow, retro 80s, dreamy nostalgic haze, synthwave aesthetic, artistic",
    };

    const genderHints: Record<string, string> = {
      male: "man, masculine features, ",
      female: "woman, feminine features, ",
      neutral: "",
    };

    const basePrompt = stylePrompts[style] || stylePrompts["linkedin"];
    const genderPart = genderHints[gender] || "";
    
    // InstantID needs a strong descriptive prompt
    const fullPrompt = [
      "a portrait of a person,",
      genderPart,
      basePrompt,
    ].filter(Boolean).join(" ");

    // Strip data URI prefix if present for Replicate
    let imageUrl: string = image;
    if (!image.startsWith("http")) {
      // Keep as data URI - Replicate accepts it
      imageUrl = image;
    }

    console.log(`[InstantID] Style: ${style}, prompt: ${fullPrompt.slice(0, 100)}...`);

    // Call Replicate API directly with version hash via REST
    const VERSION = "2e4785a4d80dadf580077b2244c8d7c05d8e3faac04a04c02d8e099dd2876789";
    
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
          image: imageUrl,
          prompt: fullPrompt,
          negative_prompt: "blurry, low quality, distorted, deformed, disfigured, bad anatomy, extra limbs, mutation, ugly, text, watermark",
          num_inference_steps: 30,
          guidance_scale: 5,
          width: 768,
          height: 768,
        }
      }),
    });

    if (!createResponse.ok) {
      const errorText = await createResponse.text();
      console.error("[InstantID] Create failed:", createResponse.status, errorText);
      return NextResponse.json(
        { error: `Generation failed: ${errorText}` },
        { status: 500 }
      );
    }

    const prediction = await createResponse.json();
    console.log(`[InstantID] Prediction created: ${prediction.id}, status: ${prediction.status}`);

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
        console.error("[InstantID] Poll failed:", pollResponse.status, errorText);
        return NextResponse.json(
          { error: `Polling failed: ${errorText}` },
          { status: 500 }
        );
      }

      result = await pollResponse.json();
      console.log(`[InstantID] Poll ${attempts}: status=${result.status}`);
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

    // Output is an array of image URLs
    const outputUrl = Array.isArray(result.output) ? result.output[0] : result.output;
    
    console.log(`[InstantID] Success! Output URL: ${outputUrl}`);

    return NextResponse.json({
      success: true,
      imageUrl: outputUrl,
    });

  } catch (err: any) {
    const msg = err?.message || String(err);
    console.error("[InstantID] Fatal error:", msg);
    
    return NextResponse.json(
      { error: `Generation failed: ${msg}` },
      { status: 500 }
    );
  }
}
