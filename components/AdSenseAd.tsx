"use client";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

const PUBLISHER_ID = "ca-pub-2378599294878032";

type AdProps = {
  slot?: string;
  format?: "auto" | "horizontal" | "rectangle" | "vertical" | "fluid" | "autorelaxed";
  className?: string;
  style?: React.CSSProperties;
  responsive?: boolean;
};

const AdSenseAd = ({
  slot = "",
  format = "auto",
  className = "my-6",
  style = { display: "block" },
  responsive = true,
}: AdProps) => {
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    try {
      pushed.current = true;
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense error", e);
    }
  }, []);

  return (
    <div className="flex justify-center w-full" aria-live="polite">
      <ins
        className={`adsbygoogle ${className}`}
        style={style}
        data-ad-client={PUBLISHER_ID}
        {...(slot ? { "data-ad-slot": slot } : {})}
        data-ad-format={format}
        data-full-width-responsive={responsive ? "true" : "false"}
      />
    </div>
  );
};

export { PUBLISHER_ID };
export default AdSenseAd;
