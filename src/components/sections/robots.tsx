"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ChevronsRight } from "lucide-react";
import Image from "next/image";
import { ParallaxImage } from "@/components/parallax-image";

function RobotCarousel({ images }: { images: { src: string; alt: string }[] }) {
  const [index, setIndex] = useState(0);
  const count = images.length;

  const prev = () => setIndex((i) => (i - 1 + count) % count);
  const next = () => setIndex((i) => (i + 1) % count);

  return (
    <div className="relative h-full w-full overflow-hidden group">
      {/* Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image
            src={images[index].src}
            alt={images[index].alt}
            fill
            className="object-cover"
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        </motion.div>
      </AnimatePresence>

      {/* Prev/Next buttons */}
      <button
        type="button"
        onClick={prev}
        aria-label="Image précédente"
        className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#1B3D2C] flex items-center justify-center text-white hover:bg-[#00E85C] hover:text-[#1B3D2C] transition-colors cursor-pointer"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Image suivante"
        className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#1B3D2C] flex items-center justify-center text-white hover:bg-[#00E85C] hover:text-[#1B3D2C] transition-colors cursor-pointer"
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      {/* Dots indicator */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center">
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Image ${i + 1}`}
            className="w-11 h-11 flex items-center justify-center cursor-pointer group/dot"
          >
            <span
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-5 bg-[#1B3D2C]" : "w-1.5 bg-white/70 group-hover/dot:bg-white group-active/dot:bg-white"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

const sharedSpecs = [
  { label: "Navigation", value: "LiDAR + caméras RGBD + IA embarquée" },
  { label: "Compute", value: "NVIDIA Jetson Orin NX, 100 TOPS" },
  { label: "Connectivité", value: "5G + WiFi 6 + GPS/GNSS" },
  { label: "Protection", value: "IP67, certification CE" },
  { label: "Supervision", value: "24/7, 1 opérateur pour 70 robots" },
  { label: "Autonomie", value: "50 km par charge, recharge automatique" },
];

const robotConfigs = [
  {
    badge: "COMPACT",
    name: "Hive Compact",
    weight: "50 kg",
    dimensions: "100 × 60 × 90 cm",
    speed: "8 km/h",
    description: "Livraison urbaine, aéroports, zones piétonnes. Rapide, agile, conçu pour les trottoirs et espaces intérieurs.",
    clients: ["La Défense", "Aéroport Nice", "Carrefour", "Center Parcs", "Belambra"],
    images: [
      { src: "/robots/hive-compact.jpeg", alt: "Hive Compact - vue de face" },
      { src: "/robots/hive-side-compact.jpeg", alt: "Hive Compact - vue de profil" },
      { src: "/robots/hive-back-compact.jpeg", alt: "Hive Compact - vue arrière" },
    ],
  },
  {
    badge: "CARGO",
    name: "Hive Cargo",
    weight: "250 kg",
    dimensions: "120 × 65 × 90 cm",
    speed: "12 km/h",
    description: "Livraison de courses et logistique lourde. Transporte jusqu'à 6 cagettes standard sur un rayon de 7 km.",
    clients: [],
    images: [
      { src: "/robots/hive-max.jpeg", alt: "Hive Cargo - vue de face" },
      { src: "/robots/hive-back-side.jpeg", alt: "Hive Cargo - vue de profil" },
      { src: "/robots/hive-back-max.jpeg", alt: "Hive Cargo - vue arrière" },
    ],
  },
];

export function Robots() {
  return (
    <section className="hive-section bg-white">
      <div className="hive-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8"
        >
          <p className="hive-label">Nos robots</p>
          <h2 className="hive-heading text-[#0A0F1E] max-w-3xl">
            Une technologie,{" "}
            <span className="font-heading italic text-[1.05em] underline decoration-[#00E85C] decoration-4 underline-offset-8">plusieurs missions.</span>
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          className="hive-body max-w-2xl mb-20"
        >
          Nos robots partagent la même plateforme technologique éprouvée depuis 7 ans.
          Seule la configuration change selon le cas d&apos;usage.
        </motion.p>

        {/* Robot hero image (parallax) */}
        <ParallaxImage
          src="/images/robot_new_gen/hive-pizza-livreur.jpeg"
          alt="Robot Hive Robotics en livraison"
          sizes="(min-width: 1024px) 1100px, 100vw"
          className="w-full rounded-3xl h-[300px] lg:h-[450px] mb-20"
        />

        {/* Shared tech specs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-20"
        >
          <h3 className="text-xl font-semibold text-[#0A0F1E] mb-8">
            Plateforme technologique commune
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-6">
            {sharedSpecs.map((spec, index) => (
              <motion.div
                key={spec.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.05 }}
                className="py-4 border-b border-[#E8ECF4]"
              >
                <p className="text-xs text-[#718096] uppercase tracking-wider mb-1">{spec.label}</p>
                <p className="text-sm font-medium text-[#0A0F1E]">{spec.value}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Use cases - two configurations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8"
        >
          <h3 className="text-xl font-semibold text-[#0A0F1E] mb-8">
            Deux configurations selon le besoin
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-16">
          {robotConfigs.map((robot, index) => (
            <motion.div
              key={robot.badge}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
              className="flex flex-col overflow-hidden rounded-3xl border border-black/5 bg-white transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_28px_56px_-32px_rgba(0,0,0,0.35)]"
            >
              {/* Image area with carousel + badge overlay */}
              <div className="relative aspect-[4/3]">
                <RobotCarousel images={robot.images} />
                {/* Badge overlay */}
                <div className="absolute top-5 left-5 z-10 pointer-events-none">
                  <span className="inline-block bg-white text-[#1B3D2C] font-semibold text-xs px-3.5 py-1.5 rounded-full shadow-sm">
                    {robot.badge}
                  </span>
                </div>
              </div>

              {/* Text area below image */}
              <div className="flex flex-col gap-4 px-8 py-8 lg:px-10 lg:py-10">
                <h4 className="text-2xl lg:text-3xl font-bold text-[#0A0F1E] leading-tight">
                  {robot.name}
                </h4>

                <p className="text-base lg:text-lg text-[#4A5568] leading-relaxed">
                  {robot.description}
                </p>

                {/* Specs as bullet list */}
                <ul className="flex flex-col gap-3 mt-2">
                  <li className="flex items-start gap-3">
                    <ChevronsRight className="w-5 h-5 text-[#1B3D2C] flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <p className="text-[#0A0F1E]">
                      <span className="font-semibold">Charge max :</span>{" "}
                      <span className="text-[#718096]">{robot.weight}</span>
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <ChevronsRight className="w-5 h-5 text-[#1B3D2C] flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <p className="text-[#0A0F1E]">
                      <span className="font-semibold">Dimensions :</span>{" "}
                      <span className="text-[#718096]">{robot.dimensions}</span>
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <ChevronsRight className="w-5 h-5 text-[#1B3D2C] flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <p className="text-[#0A0F1E]">
                      <span className="font-semibold">Vitesse :</span>{" "}
                      <span className="text-[#718096]">{robot.speed}</span>
                    </p>
                  </li>
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center"
        >
          <a
            href="mailto:thomas.raynal@hiverobotics.fr?subject=Demande%20de%20d%C3%A9mo%20Hive%20Robotics"
            className="inline-flex items-center justify-center gap-2 bg-[#1B3D2C] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#00E85C] hover:text-[#1B3D2C] transition-colors cursor-pointer"
          >
            Demander une démo
          </a>
        </motion.div>
      </div>
    </section>
  );
}
