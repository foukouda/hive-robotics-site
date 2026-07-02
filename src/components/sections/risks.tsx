"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface RiskItem {
  question: string;
  answer: string;
}

const risks: RiskItem[] = [
  {
    question: "Risque de retard de production",
    answer:
      "Notre usine UNICCO/Yuhesen produit déjà des robots pour d\u2019autres clients. Le Batch 1 est confirmé et le design industriel est lancé.",
  },
  {
    question: "Risque technologique",
    answer:
      "Notre technologie est éprouvée avec +15 000 km en conditions réelles et +7 ans de R&D. Les choix techniques sont validés (NVIDIA Orin NX, LiDAR RoboSense, certification CE).",
  },
  {
    question: "Risque de marché",
    answer:
      "Le marché des robots de livraison croît de 32%/an (MarketsandMarkets). Le décret 2024-1063 autorise le transport automatisé en France. Nos clients ont déjà signé.",
  },
  {
    question: "Risque opérationnel",
    answer:
      "Supervision 24/7, maintenance préventive, assurance tout risque incluse. 1 opérateur peut superviser jusqu\u2019a 70 robots via IA.",
  },
  {
    question: "Risque financier",
    answer:
      "Hive s\u2019engage à racheter vos parts à 80% de leur valeur après 5 ans. Un rendement plancher est garanti pendant la durée de location active.",
  },
];

function RiskAccordionItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-[#E8ECF4] last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full py-6 text-left group cursor-pointer"
      >
        <span className="text-lg font-semibold text-[#0A0F1E] pr-4 group-hover:text-[#1B3D2C] transition-colors">
          {question}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-[#1B3D2C] flex-shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-[#4A5568] leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Risks() {
  return (
    <section className="hive-section bg-white">
      <div className="hive-container">
        {/* Header - left-aligned */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-4"
        >
          <p className="hive-label">Transparence</p>
          <h2 className="hive-heading text-[#0A0F1E]">
            Nous croyons en la
            <br />
            <span className="font-heading italic text-[1.05em] underline decoration-[#00E85C] decoration-4 underline-offset-8">transparence totale.</span>
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="hive-body max-w-2xl mb-12"
        >
          Comme tout investissement, il comporte des risques. Voici comment nous
          les gérons.
        </motion.p>

        {/* Accordion - flat, editorial, NO card wrapper */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="max-w-3xl"
        >
          {risks.map((risk) => (
            <RiskAccordionItem
              key={risk.question}
              question={risk.question}
              answer={risk.answer}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
