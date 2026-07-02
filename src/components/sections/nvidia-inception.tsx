"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export function NvidiaInception() {
  return (
    <section className="bg-[#0A0F1E] relative overflow-hidden py-14 lg:py-16">
      {/* Subtle green glow */}
      <div
        className="absolute top-1/2 left-1/4 w-[400px] h-[400px] rounded-full blur-[120px] opacity-15 pointer-events-none -translate-y-1/2"
        style={{ background: "#76B900" }}
        aria-hidden="true"
      />

      <div className="hive-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col md:flex-row items-center gap-8 md:gap-10"
        >
          {/* Logo block */}
          <div className="bg-white rounded-xl p-5 flex-shrink-0">
            <div className="relative w-[180px] h-[110px]">
              <Image
                src="/images/press/nvidia_inception_logo.webp"
                alt="NVIDIA Inception Program"
                fill
                className="object-contain"
                sizes="180px"
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 text-center md:text-left">
            <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#76B900] mb-2">
              Programme sélectif
            </p>
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-3 leading-tight">
              Sélectionnés par{" "}
              <span className="font-heading italic text-[#76B900]">NVIDIA.</span>
            </h3>
            <p className="text-sm lg:text-base text-white/70 leading-relaxed max-w-2xl">
              Hive Robotics est membre du{" "}
              <span className="text-white font-semibold">
                NVIDIA Inception Program
              </span>
              , le programme mondial dédié aux startups deep tech, IA et
              robotique. Accès prioritaire au hardware NVIDIA, formations Deep
              Learning Institute et mise en relation avec l&apos;écosystème
              tech.
            </p>
          </div>

          {/* CTA */}
          <a
            href="https://www.nvidia.com/en-us/startups/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#76B900] text-sm font-semibold hover:gap-3 transition-all group flex-shrink-0"
          >
            En savoir plus
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
