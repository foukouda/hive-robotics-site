"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqGroups = [
  {
    category: "Les robots",
    questions: [
      {
        q: "Quelle charge et quelle autonomie ?",
        a: "Le Hive Compact transporte jusqu'à 50 kg et le Hive Cargo jusqu'à 250 kg. Les deux disposent d'environ 50 km d'autonomie par charge, avec recharge automatique.",
      },
      {
        q: "Où sont déployés les robots ?",
        a: "Nos robots opèrent notamment à l'Aéroport de Nice, à Center Parcs, chez Belambra et à La Défense, ainsi que sur notre exploitation de proximité à La Défense.",
      },
      {
        q: "Quelle est la durée de vie d'un robot ?",
        a: "Nos robots sont conçus pour une durée de vie opérationnelle d'au moins 10 ans, avec un programme de maintenance régulier inclus.",
      },
      {
        q: "Pourquoi les robots visibles sur certains visuels diffèrent de celui de la vidéo Center Parcs ?",
        a: "La vidéo Center Parcs montre l'ancienne génération de nos robots (MK5), issue de nos premiers déploiements terrain. Les nouveaux modèles MK6-COMPACT et MK6-CARGO sont le fruit direct des retours d'expérience de ces déploiements : durée de vie augmentée, performance opérationnelle améliorée et sécurité générale renforcée.",
      },
      {
        q: "Pourquoi les robots sont-ils fabriqués en Chine ?",
        a: "Nous travaillons avec une usine spécialisée qui produit déjà les robots de nos concurrents internationaux. Ce partenariat nous donne accès à une expertise industrielle éprouvée et nous permet d'aller beaucoup plus vite. La conception, le logiciel et la validation restent 100 % français.",
      },
    ],
  },
  {
    category: "Sécurité & déploiement",
    questions: [
      {
        q: "Les robots sont-ils sûrs pour les piétons ?",
        a: "Oui. Nos robots naviguent grâce à un LiDAR, des caméras RGBD et une IA embarquée qui détectent en temps réel obstacles et piétons. Ils sont supervisés 24/7, avec un opérateur pour 70 robots.",
      },
      {
        q: "Comment déployer un robot sur mon site ?",
        a: "Contactez-nous pour évaluer votre besoin. Hive installe, met en service, maintient et supervise le robot : vous n'avez rien à gérer. Écrivez-nous à thomas.raynal@hiverobotics.fr.",
      },
      {
        q: "Mes données sont-elles sécurisées ?",
        a: "Oui. Vos données personnelles sont traitées conformément au RGPD et hébergées au sein de l'Union européenne.",
      },
    ],
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-[#E8ECF4] last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full py-5 text-left group cursor-pointer"
      >
        <span className="text-base font-semibold text-[#0A0F1E] pr-4 group-hover:text-[#1B3D2C] transition-colors">
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
            <p className="pb-5 text-[#4A5568] leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Faq() {
  return (
    <section className="hive-section bg-[#F7F9FC]">
      <div className="hive-container">
        {/* Header - left-aligned */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16"
        >
          <p className="hive-label">FAQ</p>
          <h2 className="hive-heading text-[#0A0F1E]">
            Questions <span className="font-heading italic text-[1.05em] underline decoration-[#00E85C] decoration-4 underline-offset-8">fréquentes</span>
          </h2>
        </motion.div>

        {/* FAQ groups */}
        <div className="max-w-3xl space-y-10">
          {faqGroups.map((group) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="font-semibold text-[#1B3D2C] text-lg mb-4">
                {group.category}
              </h3>
              <div className="bg-[#F7F9FC] rounded-2xl p-6">
                {group.questions.map((item) => (
                  <FAQItem
                    key={item.q}
                    question={item.q}
                    answer={item.a}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
