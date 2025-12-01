"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";

interface ImageWithFallbackProps extends Omit<ImageProps, "onError"> {
  fallbackSrc?: string;
}

export default function ImageWithFallback({
  src,
  alt,
  fallbackSrc = "/images/membres/fallback.svg",
  className = "",
  ...props
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);

  // Ensure images for members default to 500x500 when width/height not provided
  const resolvedWidth = (props.width as number) ?? 500;
  const resolvedHeight = (props.height as number) ?? 500;

  return (
    <div
      className={`relative ${className}`}
      style={{ width: resolvedWidth, height: resolvedHeight }}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <Image
        {...props}
        src={imgSrc}
        alt={alt}
        width={resolvedWidth}
        height={resolvedHeight}
        className={`transition-opacity duration-300 ${
          isLoading ? "opacity-0" : "opacity-100"
        } ${className}`}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setImgSrc(fallbackSrc);
          setIsLoading(false);
        }}
      />
    </div>
  );
}
