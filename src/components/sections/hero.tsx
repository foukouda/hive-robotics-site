"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const rotatingWords = ["repas", "colis", "courses", "médicaments"];

const stats = [
  { value: "250 kg", label: "Charge utile" },
  { value: "50 km", label: "Autonomie" },
  { value: "100 %", label: "Autonome" },
];

export function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [shouldReduceMotion]);

  return (
    <section className="relative w-full bg-white flex items-center min-h-dvh pt-28 pb-16 lg:pb-24 overflow-hidden">
      {/* ambient background */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-32 right-0 h-[34rem] w-[34rem] rounded-full bg-[#00E85C]/10 blur-3xl"
        animate={{ scale: [1, 1.12, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="hive-container w-full relative z-10">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Left - Content */}
          <div className="lg:col-span-7">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="hive-label"
            >
              Physical AI · Livraison autonome
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.05 }}
              className="hive-display text-[clamp(2.75rem,6.5vw,6.5rem)] text-[#0A0F1E] text-balance"
            >
              Des robots autonomes pour livrer vos{" "}
              <span
                className="relative inline-block align-baseline"
                style={{ minWidth: "5ch" }}
                aria-live="polite"
                aria-atomic="true"
              >
                <span className="invisible whitespace-nowrap">{rotatingWords[wordIndex]}.</span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={rotatingWords[wordIndex]}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="font-heading italic font-normal text-[#1B3D2C] underline decoration-[#00E85C] decoration-[6px] underline-offset-[0.12em] absolute left-0 top-0 whitespace-nowrap"
                  >
                    {rotatingWords[wordIndex]}.
                  </motion.span>
                </AnimatePresence>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
              className="mt-8 max-w-xl text-lg lg:text-xl leading-relaxed text-[#4A5568]"
            >
              Conçus et fabriqués en France. Des robots qui circulent en autonomie
              sur vos sites, du dernier kilomètre à la logistique lourde.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center"
            >
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#1B3D2C] px-8 py-4 font-semibold text-white transition-colors hover:bg-[#00C853] hover:text-[#1B3D2C]"
              >
                Demander une démo
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/robots" className="hive-link group px-2 py-2">
                Découvrir les robots
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>

            {/* Editorial stat row */}
            <motion.dl
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
              className="mt-14 grid max-w-xl grid-cols-3 gap-6 border-t border-black/10 pt-8"
            >
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="text-3xl font-semibold tracking-tight text-[#0A0F1E] lg:text-4xl">
                    {s.value}
                  </dt>
                  <dd className="hive-eyebrow mt-2">{s.label}</dd>
                </div>
              ))}
            </motion.dl>
          </div>

          {/* Right - Hero video */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.25 }}
            className="relative hidden h-[34rem] w-full overflow-hidden rounded-[2rem] ring-1 ring-black/5 lg:col-span-5 lg:block xl:h-[40rem]"
          >
            <video
              src="/videos/hero-publicitaire.mp4"
              poster="/videos/hero-publicitaire-poster.jpg"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="absolute inset-0 h-full w-full object-cover"
              aria-label="Robot Hive Robotics en livraison"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
