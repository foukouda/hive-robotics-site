"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

interface Step {
  number: string;
  title: string;
  description: string;
  imagePlaceholder: string;
  image?: { src: string; alt: string };
}

const steps: Step[] = [
  {
    number: "01",
    title: "Déployé sur votre site",
    description:
      "Hive installe et met en service le robot sur votre site : aéroport, campus, entrepôt ou résidence.",
    imagePlaceholder: "IMAGE - Robot en déploiement terrain",
    image: { src: "/images/robot_new_gen/Hive-sortie_camion.jpeg", alt: "Robot Hive déployé sur site" },
  },
  {
    number: "02",
    title: "Il livre en autonomie",
    description:
      "Grâce au LiDAR et à l’IA embarquée, le robot circule en sécurité parmi les piétons et livre sans intervention humaine.",
    imagePlaceholder: "IMAGE - Robot en livraison autonome",
    image: { src: "/images/robot_new_gen/hive-pizza-livreur.jpeg", alt: "Robot Hive en livraison autonome" },
  },
  {
    number: "03",
    title: "Supervisé & rechargé 24/7",
    description:
      "Hive assure la supervision, la maintenance et la recharge automatique. Vous n’avez rien à gérer.",
    imagePlaceholder: "IMAGE - Supervision des robots 24/7",
    image: { src: "/images/Hive-interface.jpeg", alt: "Supervision des robots Hive 24/7" },
  },
];

export function HowItWorks() {
  return (
    <section className="hive-section bg-white">
      <div className="hive-container">
        {/* Header - centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-20"
        >
          <p className="hive-label">Comment ça marche</p>
          <h2 className="hive-heading text-[#0A0F1E] max-w-3xl">
            Trois étapes.
            <br />
            <span className="font-heading italic text-[1.05em] underline decoration-[#00E85C] decoration-4 underline-offset-8">Zéro contrainte.</span>
          </h2>
        </motion.div>

        {/* 3 cards with connecting arrows */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={step.number} className="relative flex items-stretch">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
                className="bg-white rounded-2xl border border-[#E8ECF4] shadow-sm p-8 flex flex-col w-full"
              >
                {/* Step number */}
                <div className="w-12 h-12 rounded-full bg-[#1B3D2C] text-white flex items-center justify-center font-mono font-bold text-lg mb-6">
                  {step.number}
                </div>

                {/* Image ou placeholder */}
                <div className="relative h-[160px] rounded-xl bg-[#F7F9FC] border border-[#E8ECF4] overflow-hidden flex items-center justify-center mb-6">
                  {step.image ? (
                    <Image
                      src={step.image.src}
                      alt={step.image.alt}
                      fill
                      className="object-cover"
                      sizes="(min-width: 768px) 33vw, 100vw"
                    />
                  ) : (
                    <span className="text-[#C0C8D8] font-mono text-xs tracking-wider text-center px-4">
                      {step.imagePlaceholder}
                    </span>
                  )}
                </div>

                {/* Title and description */}
                <h3 className="text-xl font-semibold text-[#0A0F1E] mb-3">
                  {step.title}
                </h3>
                <p className="text-[#4A5568] leading-relaxed">
                  {step.description}
                </p>
              </motion.div>

              {/* Connecting arrow - desktop only, not on last card */}
              {index < steps.length - 1 && (
                <div className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 translate-x-0">
                  <div className="w-8 h-8 rounded-full bg-white border border-[#E8ECF4] shadow-sm flex items-center justify-center">
                    <ChevronRight className="w-4 h-4 text-[#1B3D2C]" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
