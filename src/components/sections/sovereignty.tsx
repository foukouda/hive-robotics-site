"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

interface Competitor {
  name: string;
  code: string;
  country: string;
  zone: string;
  approach: string;
  image: string;
  imageCredit?: string;
  isHive?: boolean;
}

const competitors: Competitor[] = [
  {
    name: "Hive Robotics",
    code: "FR",
    country: "France",
    zone: "La Défense, Nice, Center Parcs",
    approach: "Location longue durée B2B, seul acteur français",
    image: "/images/robot_new_gen/hive-ville.jpeg",
    isHive: true,
  },
  {
    name: "Starship Technologies",
    code: "EE",
    country: "Estonie / US",
    zone: "US, Royaume-Uni, Allemagne",
    approach: "Campus et résidentiel, 8 000+ robots déployés",
    image: "/images/competitors/starship_robot.jpg",
    imageCredit: "Wikimedia Commons",
  },
  {
    name: "Serve Robotics",
    code: "US",
    country: "États-Unis",
    zone: "Los Angeles, Dallas",
    approach: "Partenaire Uber Eats, coté Nasdaq",
    image: "/images/competitors/serve_robot.png",
    imageCredit: "Wikimedia Commons / CC BY 2.0",
  },
  {
    name: "Coco Robotics",
    code: "US",
    country: "États-Unis",
    zone: "Los Angeles, Miami, Austin",
    approach: "Restaurants, modèle B2B",
    image: "/images/competitors/coco_robot.jpg",
    imageCredit: "Wikimedia Commons",
  },
  {
    name: "Neolix",
    code: "CN",
    country: "Chine",
    zone: "Chine, expansion Asie",
    approach: "Véhicules autonomes dernier kilomètre",
    image: "/images/competitors/neolix_robot.png",
    imageCredit: "neolix.ai",
  },
];

function CountryBadge({ code }: { code: string }) {
  const isCN = code === "CN";
  return (
    <span
      className={`absolute top-2 left-2 inline-flex items-center justify-center min-w-[2rem] h-7 px-2 rounded-full text-[11px] font-mono font-bold tracking-wider shadow-md ${
        isCN
          ? "bg-black text-white"
          : "bg-white text-[#0A0F1E] ring-1 ring-black/5"
      }`}
    >
      {code}
    </span>
  );
}

function MobileCompetitorRow({ c }: { c: Competitor }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-[#E8ECF4] bg-white overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="flex items-center gap-4 p-3 w-full text-left active:bg-[#F7F9FC] transition-colors"
      >
        <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-[#F7F9FC] flex-shrink-0">
          <Image
            src={c.image}
            alt={`Robot ${c.name}`}
            fill
            className="object-cover"
            sizes="80px"
          />
          <CountryBadge code={c.code} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-base text-[#0A0F1E] leading-snug">
            {c.name}
          </h3>
          <p className="text-[11px] font-mono uppercase tracking-wider text-[#718096] mt-0.5">
            {c.country}
          </p>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-[#1B3D2C] flex-shrink-0 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-1 space-y-3">
              <div>
                <p className="text-[10px] uppercase tracking-[0.15em] text-[#718096] font-mono mb-1">
                  Zone
                </p>
                <p className="text-sm text-[#4A5568] leading-snug">{c.zone}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.15em] text-[#718096] font-mono mb-1">
                  Positionnement
                </p>
                <p className="text-sm text-[#4A5568] leading-snug">
                  {c.approach}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Sovereignty() {
  return (
    <section className="hive-section bg-[#F7F9FC]">
      <div className="hive-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12"
        >
          <p className="hive-label">Souveraineté</p>
          <h2 className="hive-heading text-[#0A0F1E] max-w-4xl">
            Chinois, américain,{" "}
            <span className="font-heading italic text-[1.05em] underline decoration-[#00E85C] decoration-4 underline-offset-8">
              ou français ?
            </span>
          </h2>
        </motion.div>

        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="max-w-3xl mb-16 space-y-4"
        >
          <p className="hive-body">
            Les robots autonomes de livraison se déploient par milliers aux États-Unis
            et en Chine. La question n&apos;est plus{" "}
            <span className="font-semibold text-[#0A0F1E]">
              si vous serez livré par un robot demain
            </span>
            , mais{" "}
            <span className="font-semibold text-[#0A0F1E]">
              qui l&apos;exploitera.
            </span>
          </p>
          <p className="hive-body">
            Un acteur chinois qui rapatrie ses données et ses revenus ? Un géant
            américain coté au Nasdaq ? Ou une entreprise française qui crée des
            emplois, des infrastructures et de la valeur sur notre territoire ?
          </p>
        </motion.div>

        {/* Mobile - compact accordion for competitors, full card for Hive */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="md:hidden flex flex-col gap-3 mb-12"
        >
          {competitors
            .filter((c) => !c.isHive)
            .map((c) => (
              <MobileCompetitorRow key={c.name} c={c} />
            ))}
          {competitors
            .filter((c) => c.isHive)
            .map((c) => (
              <article
                key={c.name}
                className="rounded-2xl border bg-[#E8F5EC] border-[#00E85C] ring-2 ring-[#00E85C]/30 overflow-hidden flex flex-col"
              >
                <div className="relative w-full aspect-[4/3] bg-[#F7F9FC]">
                  <Image
                    src={c.image}
                    alt={`Robot ${c.name}`}
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                  <CountryBadge code={c.code} />
                </div>
                <div className="p-5 flex flex-col gap-4">
                  <div>
                    <h3 className="font-semibold text-base leading-snug mb-1 text-[#1B3D2C]">
                      {c.name}
                    </h3>
                    <p className="text-[11px] font-mono uppercase tracking-wider text-[#718096]">
                      {c.country}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.15em] text-[#718096] font-mono mb-1">
                      Zone
                    </p>
                    <p className="text-sm text-[#4A5568] leading-snug">
                      {c.zone}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.15em] text-[#718096] font-mono mb-1">
                      Positionnement
                    </p>
                    <p className="text-sm text-[#1B3D2C] font-medium leading-snug">
                      {c.approach}
                    </p>
                  </div>
                </div>
              </article>
            ))}
        </motion.div>

        {/* Desktop - comparison grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="hidden md:grid md:grid-cols-2 lg:grid-cols-5 gap-5 mb-12"
        >
          {competitors.map((c) => (
            <article
              key={c.name}
              className={`rounded-2xl border overflow-hidden flex flex-col ${
                c.isHive
                  ? "bg-[#E8F5EC] border-[#00E85C] ring-2 ring-[#00E85C]/30 shadow-xl shadow-[#00E85C]/10"
                  : "bg-white border-[#E8ECF4]"
              }`}
            >
              {/* Photo zone - cover to fill square */}
              <div className="relative w-full aspect-square bg-[#F7F9FC]">
                <Image
                  src={c.image}
                  alt={`Robot ${c.name}`}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 20vw, (min-width: 768px) 50vw, 100vw"
                />
                <CountryBadge code={c.code} />
                {c.imageCredit && !c.isHive && (
                  <span className="absolute bottom-2 right-2 text-[9px] text-white/90 bg-black/40 backdrop-blur-sm rounded px-1.5 py-0.5">
                    © {c.imageCredit}
                  </span>
                )}
              </div>

              {/* Content - aligned rows across all cards */}
              <div className="p-5 flex flex-col gap-4 flex-1">
                {/* Title block - min height for alignment */}
                <div className="min-h-[3.75rem]">
                  <h3
                    className={`font-semibold text-base leading-snug mb-1 ${
                      c.isHive ? "text-[#1B3D2C]" : "text-[#0A0F1E]"
                    }`}
                  >
                    {c.name}
                  </h3>
                  <p className="text-[11px] font-mono uppercase tracking-wider text-[#718096]">
                    {c.country}
                  </p>
                </div>

                {/* Zone block - fixed min height */}
                <div className="min-h-[4.5rem]">
                  <p className="text-[10px] uppercase tracking-[0.15em] text-[#718096] font-mono mb-1">
                    Zone
                  </p>
                  <p className="text-sm text-[#4A5568] leading-snug">
                    {c.zone}
                  </p>
                </div>

                {/* Positionnement block - fills remaining */}
                <div className="flex-1">
                  <p className="text-[10px] uppercase tracking-[0.15em] text-[#718096] font-mono mb-1">
                    Positionnement
                  </p>
                  <p
                    className={`text-sm leading-snug ${
                      c.isHive
                        ? "text-[#1B3D2C] font-medium"
                        : "text-[#4A5568]"
                    }`}
                  >
                    {c.approach}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </motion.div>

        {/* Closing statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          className="max-w-3xl"
        >
          <p className="text-2xl font-medium text-[#0A0F1E] leading-snug">
            Hive Robotics est aujourd&apos;hui la{" "}
            <span className="text-[#00E85C] font-bold">
              seule alternative française
            </span>{" "}
            face à la déferlante américaine et chinoise.
          </p>
          <p className="text-base text-[#4A5568] mt-4">
            Choisir Hive, c&apos;est ancrer la souveraineté technologique
            en France : données, emplois, maintenance et production ne quittent pas
            le territoire. Les Américains arrivent en Europe dans les mois qui
            viennent. Notre priorité est d&apos;être prêts avant eux.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
