"use client";
import { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

type AdProps = {
  slot: string;
  format?: string;
  className?: string;
};

const AdSenseAd = ({ slot, format = "auto", className = "" }: AdProps) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense error", e);
    }
  }, []);

  const publisherId = process.env.NEXT_PUBLIC_ADSENSE_ID || "ca-pub-XXXXXXXXXXXXXXXX";

  return (
    <ins
      className={`adsbygoogle ${className}`}
      style={{ display: "block" }}
      data-ad-client={publisherId}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive="true"
    />
  );
};

export default AdSenseAd;
