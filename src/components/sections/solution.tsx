"use client";

import { motion } from "framer-motion";
import { Cpu, ShieldCheck, Globe } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  statValue: string;
  statLabel: string;
}

const features: Feature[] = [
  {
    icon: Cpu,
    title: "Autonome & scalable",
    description: "1 opérateur supervise jusqu'à 70 robots via IA. Scalabilité sans friction.",
    statValue: "1:70",
    statLabel: "ratio opérateur/robots",
  },
  {
    icon: ShieldCheck,
    title: "Propre & sécurisé",
    description: "0 émission, compartiments verrouillés, certification IP67. 24/7, pluie ou soleil.",
    statValue: "0",
    statLabel: "émission CO₂",
  },
  {
    icon: Globe,
    title: "Prêt pour l'Europe",
    description: "Conformité CE et Règlement Machines UE 2023/1230. Conçu pour les trottoirs et réglementations européennes.",
    statValue: "CE",
    statLabel: "conformité européenne",
  },
];

interface BarData {
  label: string;
  value: number;
  maxValue: number;
  color: string;
  highlight?: boolean;
}

function BarChart({ title, subtitle, bars }: { title: string; subtitle: string; bars: BarData[] }) {
  return (
    <div className="bg-white rounded-2xl border border-[#E8ECF4] p-8">
      <h4 className="font-semibold text-[#0A0F1E] text-lg mb-1">{title}</h4>
      <p className="text-sm text-[#718096] mb-8">{subtitle}</p>
      <div className="space-y-6">
        {bars.map((bar) => (
          <div key={bar.label}>
            <div className="flex items-baseline justify-between mb-2">
              <span className="text-sm text-[#4A5568]">{bar.label}</span>
              <span className={`font-mono text-lg font-bold ${bar.highlight ? "text-[#1B3D2C]" : "text-[#0A0F1E]"}`}>
                {bar.value.toFixed(1)} €/h
              </span>
            </div>
            <div className="w-full h-8 rounded-lg bg-[#F7F9FC] overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${(bar.value / bar.maxValue) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                className={`h-full rounded-lg ${bar.highlight ? "bg-[#1B3D2C]" : "bg-[#E8ECF4]"}`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Solution() {
  return (
    <section className="hive-section bg-[#F7F9FC]">
      <div className="hive-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-20"
        >
          <p className="hive-label">Notre solution</p>
          <h2 className="hive-heading text-[#0A0F1E] max-w-3xl">
            Des robots qui livrent
            <br />
            <span className="font-heading italic text-[1.05em] underline decoration-[#00E85C] decoration-4 underline-offset-8">7 jours sur 7.</span>
          </h2>
        </motion.div>

        {/* Robot in action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="mb-20"
        >
          <div className="w-full rounded-3xl overflow-hidden h-[350px] lg:h-[500px] relative">
            <Image
              src="/images/robot_new_gen/HelloWork.jpeg"
              alt="Robot Hive Robotics avec publicité HelloWork à La Défense"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 1100px, 100vw"
            />
          </div>
          <p className="text-xs text-[#6B7280] italic text-center mt-3">
            Image générée par IA à des fins d'illustration de la publicité sur nos robots
          </p>
        </motion.div>

        {/* 3 features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
              className="bg-white rounded-2xl border border-[#E8ECF4] p-8 flex flex-col h-full"
            >
              <div className="w-12 h-12 rounded-xl bg-[#E8F5EC] flex items-center justify-center mb-6">
                <feature.icon className="w-6 h-6 text-[#1B3D2C]" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-semibold text-[#0A0F1E] mb-2">
                {feature.title}
              </h3>
              <p className="text-[#4A5568] mb-6 leading-relaxed">
                {feature.description}
              </p>
              <div className="mt-auto pt-4 border-t border-[#E8ECF4]">
                <p className="font-mono text-2xl font-bold text-[#1B3D2C]">{feature.statValue}</p>
                <p className="text-xs text-[#718096] mt-0.5">{feature.statLabel}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Cost comparison - 2 bar charts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12"
        >
          <h3 className="text-2xl font-semibold text-[#0A0F1E] mb-4">
            Un coût de livraison <span className="text-[#1B3D2C]">divisé par 10</span>
          </h3>
          <p className="text-[#4A5568] max-w-2xl mb-12">
            Le robot élimine les commissions plateformes, les charges sociales et les coûts carburant.
            Le restaurateur double sa marge, le client paie moins cher.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <BarChart
              title="Livraison de repas"
              subtitle="Coût horaire moyen pour le restaurateur"
              bars={[
                { label: "Uber Eats / Deliveroo (commission 25-35%)", value: 25.0, maxValue: 27, color: "#E8ECF4" },
                { label: "Livreur indépendant (scooter)", value: 15.0, maxValue: 27, color: "#E8ECF4" },
                { label: "Robot Hive Robotics", value: 2.5, maxValue: 27, color: "#1B3D2C", highlight: true },
              ]}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          >
            <BarChart
              title="Livraison de courses"
              subtitle="Coût horaire moyen pour le distributeur"
              bars={[
                { label: "Livraison humaine (camionnette)", value: 35.0, maxValue: 37, color: "#E8ECF4" },
                { label: "Livraison vélo-cargo", value: 20.0, maxValue: 37, color: "#E8ECF4" },
                { label: "Robot Hive Robotics", value: 2.5, maxValue: 37, color: "#1B3D2C", highlight: true },
              ]}
            />
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-xs text-[#718096] text-center mt-6"
        >
          Estimations basées sur les coûts opérationnels moyens observés en France (2024-2025). Le coût robot inclut amortissement, maintenance et supervision.
        </motion.p>
      </div>
    </section>
  );
}
