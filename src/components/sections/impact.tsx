"use client";

import { motion } from "framer-motion";
import { Zap, CloudOff, Route, Leaf } from "lucide-react";
import { CountUp } from "@/components/count-up";

type Stat = {
  icon: React.ComponentType<{ className?: string }>;
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  note?: string;
};

const stats: Stat[] = [
  { icon: Zap, value: 100, suffix: " %", label: "Électrique" },
  { icon: CloudOff, value: 0, label: "Émission directe à l'usage" },
  { icon: Route, value: 15000, suffix: "+", label: "km parcourus décarbonés" },
  { icon: Leaf, value: 12, prefix: "≈ ", suffix: " t", label: "CO₂ évité par an", note: "estimation" },
];

export function Impact() {
  return (
    <section className="hive-section bg-[#F4FAF6]">
      <div className="hive-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <p className="hive-label">Impact</p>
          <h2 className="hive-heading text-[#0A0F1E]">
            Des livraisons{" "}
            <span className="font-heading italic text-[1.05em] underline decoration-[#00E85C] decoration-[6px] underline-offset-[0.12em]">
              zéro émission.
            </span>
          </h2>
          <p className="hive-body mt-8">
            Nos robots sont 100 % électriques. Ils remplacent les trajets
            thermiques du dernier mètre et décarbonent la logistique de vos
            sites, sans bruit ni pollution locale.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-black/[0.06] bg-black/[0.06] sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.08 }}
                className="bg-white p-8 lg:p-10"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8F5EC]">
                  <Icon className="h-5 w-5 text-[#1B3D2C]" />
                </div>
                <p className="mt-6 text-4xl font-semibold tracking-tight text-[#0A0F1E] lg:text-5xl">
                  <CountUp end={stat.value} duration={2} prefix={stat.prefix} suffix={stat.suffix} />
                </p>
                <p className="mt-2 text-sm text-[#4A5568]">
                  {stat.label}
                  {stat.note && (
                    <span className="ml-1 text-xs text-[#94A3B8]">({stat.note})</span>
                  )}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
