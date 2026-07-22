"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { getSupabaseClient } from "@/lib/supabase";

type ImageItem = {
  id: string;
  url: string;
  alt?: string;
  prompt?: string;
};

interface ImageGridProps {
  images?: ImageItem[];
  userId?: string;
  supabaseBucket?: string;
  className?: string;
  limit?: number;
}

const STYLE_LABELS: Record<string, string> = {
  linkedin: "LinkedIn",
  "alt-goth": "Alt / Goth",
  anime: "Anime",
  fairycore: "Fairycore",
  cyberpunk: "Cyberpunk",
  cottagecore: "Cottagecore",
  "indie-sleaze": "Indie Sleaze",
  "dark-academia": "Dark Academia",
  vaporwave: "Vaporwave",
  maximalist: "Maximalist",
  minimalist: "Minimalist",
  grunge: "Grunge",
};

function Spinner() {
  return (
    <svg className="w-8 h-8 animate-spin text-white" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  );
}

export default function ImageGrid({
  images: initialImages = [],
  userId,
  supabaseBucket,
  className = "",
  limit = 50,
}: ImageGridProps) {
  const [images, setImages] = useState<ImageItem[]>(initialImages);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadFromGenerations() {
      if (!userId) return;
      setLoading(true);
      setError(null);
      try {
        const db = getSupabaseClient();
        const { data, error } = await (db.from("generations") as any)
          .select("id, style, image_url, gender, vibe, palette, created_at")
          .eq("user_id", userId)
          .order("created_at", { ascending: false })
          .limit(limit);

        if (error) throw error;
        if (cancelled) return;

        const imageList: ImageItem[] = (data || []).map((row: any) => ({
          id: row.id,
          url: row.image_url,
          alt: `${STYLE_LABELS[row.style] || row.style} style`,
          prompt: [STYLE_LABELS[row.style] || row.style, row.gender, row.vibe, row.palette]
            .filter(Boolean)
            .join(" • "),
        }));
        setImages(imageList);
      } catch (err: any) {
        console.error("Failed to load generations:", err);
        if (!cancelled) setError("Could not load your generations.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    async function loadFromBucket() {
      if (!supabaseBucket) {
        setImages(initialImages);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const supabase = getSupabaseClient();
        const { data, error } = await supabase.storage
          .from(supabaseBucket)
          .list("", { limit, sortBy: { column: "created_at", order: "desc" } });

        if (error) throw error;
        if (cancelled) return;

        const imageList: ImageItem[] = (data || []).map((file) => ({
          id: file.id || file.name,
          url: supabase.storage.from(supabaseBucket).getPublicUrl(file.name).data.publicUrl,
          alt: file.name,
        }));
        setImages(imageList);
      } catch (err) {
        console.error("Failed to load images:", err);
        if (!cancelled) setError(`Could not load images from bucket.`);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    if (userId) {
      loadFromGenerations();
    } else if (supabaseBucket) {
      loadFromBucket();
    } else {
      setImages(initialImages);
    }

    return () => { cancelled = true; };
  }, [userId, supabaseBucket, initialImages, limit]);

  const handleImageLoad = (id: string) => {
    setLoadedImages((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <>
      <div className={`columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4 ${className}`}>
        {loading ? (
          Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="aspect-[4/5] bg-zinc-900 rounded-2xl animate-pulse" />
          ))
        ) : images.length === 0 ? (
          <div className="col-span-full text-zinc-400 text-sm py-8 text-center">
            {userId ? "Your generations will appear here." : "No images to display yet."}
          </div>
        ) : (
          images.map((img) => (
            <div
              key={img.id}
              className="break-inside-avoid group relative cursor-pointer overflow-hidden rounded-3xl bg-zinc-900"
              onClick={() => setSelectedImage(img)}
            >
              <Image
                src={img.url}
                alt={img.alt || "AI Generated Image"}
                width={800}
                height={1000}
                className="w-full h-auto object-cover transition-all duration-500 group-hover:scale-105"
                onLoadingComplete={() => handleImageLoad(img.id)}
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                {img.prompt && <p className="text-white text-sm line-clamp-2">{img.prompt}</p>}
              </div>
              {!loadedImages[img.id] && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30"><Spinner /></div>
              )}
            </div>
          ))
        )}
      </div>

      {error && <p className="text-red-400 text-sm mt-3">{error}</p>}

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-6"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full">
            <Image
              src={selectedImage.url}
              alt={selectedImage.alt || "Preview"}
              width={1200}
              height={1500}
              className="w-full h-auto rounded-2xl"
              unoptimized
            />
            {selectedImage.prompt && (
              <p className="text-white text-center mt-4">{selectedImage.prompt}</p>
            )}
            <button
              onClick={(e) => { e.stopPropagation(); window.open(selectedImage.url, "_blank"); }}
              className="absolute top-4 right-4 bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg font-semibold text-sm"
            >
              Download
            </button>
          </div>
        </div>
      )}
    </>
  );
}
