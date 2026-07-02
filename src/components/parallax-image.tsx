"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

interface ParallaxImageProps {
  src: string;
  alt: string;
  /** classes for the outer frame (size, rounding, margins…) */
  className?: string;
  sizes?: string;
  /** vertical travel amount, e.g. "8%" */
  strength?: string;
}

/**
 * Image that drifts vertically as it scrolls through the viewport.
 * The inner layer is oversized so the parallax never reveals empty edges.
 */
export function ParallaxImage({
  src,
  alt,
  className = "",
  sizes = "100vw",
  strength = "8%",
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`-${strength}`, strength]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`relative overflow-hidden ${className}`}
    >
      <motion.div style={{ y }} className="absolute -inset-x-0 -top-[10%] h-[120%]">
        <Image src={src} alt={alt} fill className="object-cover" sizes={sizes} />
      </motion.div>
    </motion.div>
  );
}
