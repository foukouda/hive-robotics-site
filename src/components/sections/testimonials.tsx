"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Quote } from "lucide-react";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  logo?: string;
  initials: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "Le robot évite à nos équipes techniques de nombreux aller-retours dans la journée. On gagne de précieuses minutes à chaque intervention, ce qui nous permet d'optimiser nos journées et de traiter plus de demandes au lieu de sillonner le domaine.",
    author: "Équipe technique",
    role: "Maintenance et exploitation",
    company: "Center Parcs",
    logo: "/images/logo_partners/Center parcs - full.png",
    initials: "CP",
  },
  {
    quote:
      "Les robots Hive nous permettent de proposer un service de livraison à nos clients sans abandonner une marge énorme aux plateformes. C'est un vrai levier de rentabilité pour nos restaurants.",
    author: "Pierre-Yves Le Bouder",
    role: "Fondateur & Directeur",
    company: "Mongoo - chaîne de bars à salade Paris",
    logo: "/images/logo_partners/mongoo_logo.png",
    initials: "PY",
  },
];

export function Testimonials() {
  return (
    <section className="hive-section bg-white">
      <div className="hive-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16"
        >
          <p className="hive-label">Ils en parlent</p>
          <h2 className="hive-heading text-[#0A0F1E] max-w-3xl">
            Ce que nos clients{" "}
            <span className="font-heading italic text-[1.05em] underline decoration-[#00E85C] decoration-4 underline-offset-8">
              gagnent au quotidien.
            </span>
          </h2>
        </motion.div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {testimonials.map((t, i) => (
            <motion.article
              key={t.company}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.1 }}
              className="bg-[#F7F9FC] rounded-3xl border border-[#E8ECF4] p-8 lg:p-10 flex flex-col"
            >
              {/* Quote icon */}
              <Quote
                className="w-10 h-10 text-[#00E85C] mb-6"
                strokeWidth={1.5}
              />

              {/* Quote */}
              <blockquote className="text-lg lg:text-xl text-[#0A0F1E] leading-relaxed font-medium mb-8 flex-1">
                {t.quote}
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4 pt-6 border-t border-[#E8ECF4]">
                <div className="w-14 h-14 rounded-full bg-white border border-[#E8ECF4] flex items-center justify-center overflow-hidden flex-shrink-0">
                  {t.logo ? (
                    <div className="relative w-full h-full p-2">
                      <Image
                        src={t.logo}
                        alt={t.company}
                        fill
                        className="object-contain"
                        sizes="56px"
                      />
                    </div>
                  ) : (
                    <span className="font-mono text-lg font-bold text-[#1B3D2C]">
                      {t.initials}
                    </span>
                  )}
                </div>
                <div>
                  <p className="font-semibold text-[#0A0F1E]">{t.author}</p>
                  <p className="text-sm text-[#4A5568]">
                    {t.role} - {t.company}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
