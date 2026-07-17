'use client';

import { useState } from 'react';

export default function PhotoUploader() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  return (
    <div className="bg-purple-900/10 border border-purple-900/30 rounded-2xl p-6">
      <h2 className="text-2xl font-bold mb-4 text-white">1. Upload Photo</h2>
      
      {!preview ? (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all ${
            dragActive 
              ? 'border-purple-500 bg-purple-900/20' 
              : 'border-purple-700/50 hover:border-purple-600'
          }`}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="hidden"
            id="photo-upload"
          />
          <label htmlFor="photo-upload" className="cursor-pointer">
            <div className="text-5xl mb-4">📸</div>
            <p className="text-white font-medium mb-2">
              Drop your photo here or click to browse
            </p>
            <p className="text-gray-400 text-sm">
              PNG, JPG up to 10MB
            </p>
          </label>
        </div>
      ) : (
        <div className="relative">
          <div className="aspect-square rounded-xl overflow-hidden bg-gray-900">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          </div>
          <button
            onClick={() => { setSelectedImage(null); setPreview(null); }}
            className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white rounded-lg px-3 py-1.5 text-sm transition"
          >
            Remove
          </button>
        </div>
      )}

      <p className="text-gray-400 text-sm mt-4">
        💡 Clear face photos work best. No need to show a real LinkedIn profile — just upload any clear headshot.
      </p>
    </div>
  );
}
