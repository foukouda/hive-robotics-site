"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useMotionValueEvent } from "framer-motion";
import { Info, Leaf, TrendingUp, Building2, Package, Megaphone, Database } from "lucide-react";

const revenueSources = [
  {
    icon: Building2,
    title: "Location longue durée",
    description: "Contrats 1 à 3 ans avec Center Parcs, Belambra.",
  },
  {
    icon: Package,
    title: "Commissions à la livraison",
    description: "Chaque course effectuée génère une commission (flotte propre).",
  },
  {
    icon: Megaphone,
    title: "Publicité sur les robots",
    description: "Flancs et écrans des robots : 15 à 25 k€/robot/an estimé.",
  },
  {
    icon: Database,
    title: "Partage de données urbaines",
    description: "Données revendues aux collectivités et acteurs publics.",
  },
];

type ScenarioKey = "pessimistic" | "average" | "optimistic";

const SCENARIOS: { key: ScenarioKey; label: string; rate: number; color: string; dash: string }[] = [
  { key: "pessimistic", label: "Pessimiste", rate: 0.069, color: "#718096", dash: "6 4" },
  { key: "average", label: "Moyen", rate: 0.12, color: "#1B3D2C", dash: "" },
  { key: "optimistic", label: "Optimiste", rate: 0.15, color: "#1B3D2C", dash: "" },
];

const LIVRET_A = { label: "Livret A (1,5%)", rate: 0.015, color: "#718096", dash: "6 4" };
const YEARS = [0, 1, 2, 3, 4, 5];

function formatCurrency(value: number): string {
  return value.toLocaleString("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

function roundToNice(val: number): number {
  if (val <= 500) return Math.ceil(val / 50) * 50;
  if (val <= 2000) return Math.ceil(val / 100) * 100;
  if (val <= 10000) return Math.ceil(val / 500) * 500;
  return Math.ceil(val / 1000) * 1000;
}

function floorToNice(val: number): number {
  if (val <= 500) return Math.floor(val / 50) * 50;
  if (val <= 2000) return Math.floor(val / 100) * 100;
  if (val <= 10000) return Math.floor(val / 500) * 500;
  return Math.floor(val / 1000) * 1000;
}

function computeCurve(investment: number, rate: number): number[] {
  return YEARS.map((y) => investment * Math.pow(1 + rate, y));
}

interface ChartProps {
  investment: number;
  committedInvestment: number;
  hoveredScenario: ScenarioKey | null;
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return isMobile;
}

function RevenueChart({ investment, committedInvestment, hoveredScenario }: ChartProps) {
  const isMobile = useIsMobile();
  // Hide curves while axes reposition (before commit fires)
  const isPending = investment !== committedInvestment;

  // Progress 0→1 drives curve morph from flat line (at investment) to final shape
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    setProgress(0);
    const start = performance.now();
    const duration = 700;
    let rafId = 0;
    const tick = () => {
      const elapsed = performance.now() - start;
      const t = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(eased);
      if (t < 1) rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [committedInvestment]);

  const curves = useMemo(() => {
    const finalScenarios = SCENARIOS.map((s) => ({
      ...s,
      points: computeCurve(committedInvestment, s.rate),
    }));
    const finalLivret = {
      ...LIVRET_A,
      key: "livretA" as const,
      points: computeCurve(committedInvestment, LIVRET_A.rate),
    };
    // Interpolate: at p=0, all points = committedInvestment (flat); at p=1, final curve
    const lerp = (final: number[]) =>
      final.map((v) => committedInvestment + (v - committedInvestment) * progress);
    return {
      scenarios: finalScenarios.map((s) => ({ ...s, points: lerp(s.points) })),
      livret: { ...finalLivret, points: lerp(finalLivret.points) },
    };
  }, [committedInvestment, progress]);

  const width = isMobile ? 440 : 780;
  const height = isMobile ? 320 : 360;
  const padLeft = isMobile ? 72 : 80;
  const padRight = isMobile ? 20 : 140;
  const padTop = 30;
  const padBottom = 50;
  const labelFont = isMobile ? 13 : 11;
  const chartW = width - padLeft - padRight;
  const chartH = height - padTop - padBottom;

  // Axes scale from live (animated) investment so axes track the slider smoothly
  const axesOptimisticMax = investment * Math.pow(1.15, 5);
  const niceMin = floorToNice(investment * 0.98);
  const niceMax = roundToNice(axesOptimisticMax * 1.05);

  const TICK_COUNT = 5;
  const tickStep = (niceMax - niceMin) / (TICK_COUNT - 1);
  const ticks: number[] = Array.from({ length: TICK_COUNT }, (_, i) => niceMin + i * tickStep);

  const yMin = niceMin;
  const yMax = niceMax;

  const toX = (year: number) => padLeft + (year / 5) * chartW;
  const toY = (val: number) => padTop + chartH - ((val - yMin) / (yMax - yMin)) * chartH;

  const toPath = (points: number[]) =>
    points.map((val, i) => `${i === 0 ? "M" : "L"} ${toX(i)} ${toY(val)}`).join(" ");

  // Determine opacity/width based on hover
  function getStrokeWidth(key: string, base: number): number {
    if (!hoveredScenario) return base;
    return key === hoveredScenario ? base + 2 : 1;
  }

  function getOpacity(key: string, base: number): number {
    if (!hoveredScenario) return base;
    return key === hoveredScenario ? 1 : 0.2;
  }

  const endLabels = [
    { key: "optimistic", label: "Optimiste", val: curves.scenarios[2].points[5], color: "#1B3D2C", bold: false, baseOpacity: 0.6 },
    { key: "average", label: "Moyen (12%)", val: curves.scenarios[1].points[5], color: "#1B3D2C", bold: true, baseOpacity: 1 },
    { key: "pessimistic", label: "Pessimiste", val: curves.scenarios[0].points[5], color: "#718096", bold: false, baseOpacity: 1 },
    { key: "livretA", label: "Livret A (1,5%)", val: curves.livret.points[5], color: "#718096", bold: false, baseOpacity: 0.7 },
  ];

  return (
    <div className="w-full">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto lg:max-h-[38vh]" preserveAspectRatio="xMidYMid meet">
        {/* Grid lines */}
        {ticks.map((val, i) => {
          const y = toY(val);
          return (
            <g key={i}>
              <line x1={padLeft} x2={padLeft + chartW} y1={y} y2={y} stroke="#E8ECF4" strokeWidth={1} />
              <text x={padLeft - 10} y={y + 4} textAnchor="end" className="fill-[#718096]" fontSize={labelFont} fontFamily="monospace">
                {formatCurrency(Math.round(val))}
              </text>
            </g>
          );
        })}

        {/* X-axis labels */}
        {YEARS.map((year) => (
          <text
            key={year}
            x={toX(year)}
            y={height - 12}
            textAnchor="middle"
            className="fill-[#718096]"
            fontSize={labelFont}
            fontFamily="monospace"
          >
            {year === 0 ? "Aujourd\u2019hui" : `An ${year}`}
          </text>
        ))}

        {/* Curves wrapper - fades during axes transition (isPending) */}
        <motion.g initial={false} animate={{ opacity: isPending ? 0 : 1 }} transition={{ duration: 0.15 }}>

        {/* Livret A curve */}
        <motion.path
          d={toPath(curves.livret.points)}
          fill="none"
          stroke={curves.livret.color}
          strokeWidth={2}
          strokeDasharray={curves.livret.dash}
          initial={false}
          animate={{ opacity: hoveredScenario ? 0.2 : 1 }}
          transition={{ opacity: { duration: 0.3 } }}
        />

        {/* Filled area between pessimistic and optimistic */}
        <motion.path
          d={`${toPath(curves.scenarios[2].points)} L ${toX(5)} ${toY(curves.scenarios[0].points[5])} ${curves.scenarios[0].points
            .slice()
            .reverse()
            .map((val, i) => `L ${toX(5 - i)} ${toY(val)}`)
            .join(" ")} Z`}
          fill="#1B3D2C"
          initial={false}
          animate={{ fillOpacity: hoveredScenario ? 0.02 : 0.06 }}
          transition={{ fillOpacity: { duration: 0.3 } }}
        />

        {/* Pessimistic curve (dashed) */}
        <motion.path
          d={toPath(curves.scenarios[0].points)}
          fill="none"
          stroke={curves.scenarios[0].color}
          strokeWidth={getStrokeWidth("pessimistic", 2)}
          strokeDasharray={hoveredScenario === "pessimistic" ? "" : curves.scenarios[0].dash}
          initial={false}
          animate={{ opacity: getOpacity("pessimistic", 1) }}
          transition={{ opacity: { duration: 0.3 } }}
        />

        {/* Average curve (bold) */}
        <motion.path
          d={toPath(curves.scenarios[1].points)}
          fill="none"
          stroke={curves.scenarios[1].color}
          strokeWidth={getStrokeWidth("average", 3)}
          initial={false}
          animate={{ opacity: getOpacity("average", 1) }}
          transition={{ opacity: { duration: 0.3 } }}
        />

        {/* Optimistic curve */}
        <motion.path
          d={toPath(curves.scenarios[2].points)}
          fill="none"
          stroke={curves.scenarios[2].color}
          strokeWidth={getStrokeWidth("optimistic", 2)}
          initial={false}
          animate={{ opacity: getOpacity("optimistic", 0.5) }}
          transition={{ opacity: { duration: 0.3 } }}
        />

        {/* End points + right-side labels (desktop only) */}
        {!isMobile && endLabels.map((item) => {
          const op = item.key === "livretA"
            ? (hoveredScenario ? 0.1 : item.baseOpacity)
            : getOpacity(item.key, item.baseOpacity);
          return (
            <motion.g key={item.label} initial={false} animate={{ opacity: op }} transition={{ opacity: { duration: 0.3 } }}>
              <circle cx={toX(5)} cy={toY(item.val)} r={4} fill={item.color} />
              <text
                x={toX(5) + 10}
                y={toY(item.val) - 6}
                fill={item.color}
                fontSize={10}
                fontFamily="monospace"
                fontWeight={item.bold ? 700 : 400}
              >
                {formatCurrency(Math.round(item.val))}
              </text>
              <text
                x={toX(5) + 10}
                y={toY(item.val) + 8}
                fill={item.color}
                fontSize={9}
                fontFamily="monospace"
                opacity={0.7}
              >
                {item.label}
              </text>
            </motion.g>
          );
        })}
        </motion.g>
      </svg>
    </div>
  );
}

export function Simulator() {
  const [investment, setInvestment] = useState(1000);
  const [animatedInvestment, setAnimatedInvestment] = useState(1000);
  const [committedInvestment, setCommittedInvestment] = useState(1000);
  const [hoveredScenario, setHoveredScenario] = useState<ScenarioKey | null>(null);
  const [showCo2Tooltip, setShowCo2Tooltip] = useState(false);

  const motionInvestment = useMotionValue(1000);
  const springInvestment = useSpring(motionInvestment, { stiffness: 120, damping: 20 });
  useMotionValueEvent(springInvestment, "change", (v) => setAnimatedInvestment(v));

  // Commit investment after user stops sliding (250ms pause) → triggers curve redraw
  useEffect(() => {
    const id = setTimeout(() => setCommittedInvestment(investment), 250);
    return () => clearTimeout(id);
  }, [investment]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setInvestment(val);
    motionInvestment.set(val);
  };

  const avgReturn = animatedInvestment * 0.12;
  const livretA5y = animatedInvestment * Math.pow(1.015, 5);
  const co2Saved = Math.round((animatedInvestment / 100) * 27);

  const scenarioCards: { key: ScenarioKey; label: string; rate: number; highlighted: boolean }[] = [
    { key: "pessimistic", label: "Pessimiste", rate: 1.069, highlighted: false },
    { key: "average", label: "Moyen", rate: 1.12, highlighted: true },
    { key: "optimistic", label: "Optimiste", rate: 1.15, highlighted: false },
  ];

  return (
    <section className="hive-section bg-[#F7F9FC] lg:min-h-dvh lg:flex lg:flex-col lg:justify-center lg:!py-10">
      <div className="hive-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-6"
        >
          <p className="hive-label">Simulateur</p>
          <h2 className="hive-heading text-[#0A0F1E] max-w-3xl">
            Estimez vos{" "}
            <span className="font-heading italic text-[1.05em] underline decoration-[#00E85C] decoration-4 underline-offset-8">revenus.</span>
          </h2>
          <p className="text-sm text-[#4A5568] mt-3 max-w-2xl">
            Vos revenus proviennent de quatre leviers complémentaires générés
            par chaque robot :
          </p>
        </motion.div>

        {/* Revenue sources - 4 pills */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6"
        >
          {revenueSources.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={s.title}
                className="bg-white rounded-xl border border-[#E8ECF4] p-3.5 flex items-start gap-3"
              >
                <div className="w-9 h-9 rounded-lg bg-[#E8F5EC] flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-[#1B3D2C]" strokeWidth={1.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-mono text-[#718096] mb-0.5">
                    0{i + 1}
                  </p>
                  <p className="text-sm font-semibold text-[#0A0F1E] leading-tight mb-0.5">
                    {s.title}
                  </p>
                  <p className="text-xs text-[#4A5568] leading-snug">
                    {s.description}
                  </p>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Simulator */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[4fr_1fr] gap-6 items-stretch">
            {/* Left column - Chart + Slider */}
            <div className="flex flex-col gap-4">
              {/* Chart */}
              <div className="bg-white rounded-2xl border border-[#E8ECF4] p-4 lg:p-6">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <h3 className="font-semibold text-[#0A0F1E]">Projection sur 5 ans</h3>
                  <div className="flex items-center gap-5 text-xs text-[#4A5568]">
                    <span className="flex items-center gap-2">
                      <span className="w-5 h-[3px] bg-[#1B3D2C] inline-block rounded" />
                      Moyen
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="w-5 h-[2px] inline-block rounded border-t-2 border-dashed border-[#718096]" />
                      Pessimiste
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="w-5 h-[2px] inline-block rounded border-t-2 border-dashed border-[#718096]" />
                      Livret A
                    </span>
                  </div>
                </div>
                <RevenueChart investment={investment} committedInvestment={committedInvestment} hoveredScenario={hoveredScenario} />
              </div>

              {/* Slider */}
              <div>
                <div className="flex items-baseline justify-between mb-2">
                  <label className="text-sm text-[#4A5568]">
                    Montant investi
                  </label>
                  <span className="font-mono text-3xl font-bold text-[#1B3D2C]">
                    {formatCurrency(Math.round(animatedInvestment))}
                  </span>
                </div>
                <div className="bg-white rounded-2xl border border-[#E8ECF4] px-6 pt-5 pb-4">
                  <input
                    type="range"
                    min={100}
                    max={5000}
                    step={100}
                    value={investment}
                    onChange={handleSliderChange}
                    className="w-full h-2 rounded-full appearance-none cursor-pointer bg-[#E8ECF4] accent-[#1B3D2C] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#1B3D2C] [&::-webkit-slider-thumb]:shadow-[0_0_12px_rgba(27,61,44,0.3)] [&::-webkit-slider-thumb]:cursor-pointer"
                  />
                  <div className="relative h-5 mt-2">
                    {[100, 1000, 2000, 3000, 4000, 5000].map((step) => {
                      const pct = ((step - 100) / (5000 - 100)) * 100;
                      return (
                        <div
                          key={step}
                          className="absolute flex flex-col items-center -translate-x-1/2"
                          style={{ left: `calc(12px + ${pct} * (100% - 24px) / 100)` }}
                        >
                          <div className={`w-1.5 h-1.5 rounded-full ${investment >= step ? "bg-[#1B3D2C]" : "bg-[#E8ECF4]"}`} />
                          <span className="font-mono text-[10px] text-[#718096] mt-1">
                            {step >= 1000 ? `${step / 1000}k` : step}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Right column - Metric + Livret A + Scenarios stacked */}
            <div className="flex flex-col gap-4">
              {/* Key metric */}
              <div className="bg-white rounded-2xl border border-[#E8ECF4] p-5">
                <p className="text-xs text-[#4A5568] mb-2">Revenu annuel estimé</p>
                <div className="flex items-center gap-2">
                  <p className="font-mono text-2xl font-bold text-[#0A0F1E] leading-tight">
                    {formatCurrency(Math.round(avgReturn))}
                    <span className="text-xs font-normal text-[#4A5568] ml-1">/ an</span>
                  </p>
                  <div className="w-8 h-8 rounded-full bg-[#E8F5EC] flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-4 h-4 text-[#1B3D2C]" />
                  </div>
                </div>
                <p className="text-xs text-[#718096] mt-2">~{formatCurrency(Math.round(avgReturn / 12))} / mois</p>
                <div
                  className="relative mt-2 w-fit"
                  onMouseEnter={() => setShowCo2Tooltip(true)}
                  onMouseLeave={() => setShowCo2Tooltip(false)}
                >
                  <button
                    type="button"
                    className="flex items-center gap-1.5 text-xs text-[#1B3D2C] bg-[#E8F5EC] px-2 py-1 rounded-full cursor-help hover:bg-[#D4EBDA] transition-colors"
                    aria-describedby="co2-tooltip"
                  >
                    <Leaf className="w-3 h-3" aria-hidden="true" />
                    <span className="font-medium">~{co2Saved} kg CO₂/an</span>
                    <Info className="w-3 h-3 opacity-60" aria-hidden="true" />
                  </button>
                  <AnimatePresence>
                    {showCo2Tooltip && (
                      <motion.div
                        id="co2-tooltip"
                        role="tooltip"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.15 }}
                        className="absolute bottom-full left-0 mb-2 w-[min(88vw,22rem)] bg-[#0A0F1E] text-white rounded-xl shadow-xl p-4 z-20"
                      >
                        <p className="text-[11px] font-mono uppercase tracking-wider text-[#00E85C] mb-2">
                          Détail du calcul
                        </p>
                        <p className="text-xs leading-relaxed mb-2">
                          Un robot Hive Compact évite environ{" "}
                          <span className="font-semibold text-white">3 300 kg de CO₂/an</span>{" "}
                          par rapport à un scooter thermique de livraison (≈ 15 000 km/an × 220 g CO₂/km).
                        </p>
                        <p className="text-xs leading-relaxed mb-2">
                          Réparti sur{" "}
                          <span className="font-semibold text-white">120 parts par robot</span>{" "}
                          (modèle Compact) : ≈ 27 kg CO₂ évités /an par part de 100 €.
                        </p>
                        <div className="border-t border-white/15 pt-2 mt-2">
                          <p className="text-[11px] text-white/70">
                            Votre investissement de{" "}
                            <span className="font-mono font-semibold text-white">
                              {formatCurrency(Math.round(animatedInvestment))}
                            </span>{" "}
                            ={" "}
                            <span className="font-mono font-semibold text-[#00E85C]">
                              ~{co2Saved} kg CO₂/an évités
                            </span>
                          </p>
                        </div>
                        <div className="absolute -bottom-1.5 left-6 w-3 h-3 bg-[#0A0F1E] rotate-45" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Livret A comparison */}
              <div className="p-4 rounded-2xl bg-white border border-[#E8ECF4]">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-full bg-[#E8F5EC] flex items-center justify-center flex-shrink-0">
                    <span className="font-mono text-[10px] font-bold text-[#1B3D2C]">vs</span>
                  </div>
                  <p className="text-xs font-semibold text-[#0A0F1E]">Livret A (1,5%)</p>
                </div>
                <p className="text-xs text-[#4A5568] leading-relaxed">
                  Après 5 ans : <span className="font-mono font-semibold text-[#0A0F1E]">{formatCurrency(Math.round(livretA5y))}</span>.
                </p>
              </div>

              {/* 3 scenarios stacked vertically - fills remaining vertical space */}
              <div className="flex flex-col gap-2 lg:flex-1">
                {scenarioCards.map((sc) => (
                  <div
                    key={sc.key}
                    className={`lg:flex-1 flex flex-col justify-center px-4 py-3 lg:px-3 lg:py-0 rounded-xl cursor-pointer transition-all duration-300 ${
                      sc.highlighted
                        ? "border-2 border-[#1B3D2C] bg-[#E8F5EC]"
                        : "border border-[#E8ECF4] bg-white"
                    } ${
                      hoveredScenario === sc.key
                        ? "ring-2 ring-[#1B3D2C] shadow-md"
                        : hoveredScenario && hoveredScenario !== sc.key
                          ? "opacity-40"
                          : ""
                    }`}
                    onMouseEnter={() => setHoveredScenario(sc.key)}
                    onMouseLeave={() => setHoveredScenario(null)}
                  >
                    <div className="flex items-baseline justify-between gap-2">
                      <p className={`font-mono text-xs lg:text-[10px] uppercase tracking-wider ${
                        sc.highlighted ? "text-[#1B3D2C]" : "text-[#718096]"
                      }`}>
                        {sc.label}
                      </p>
                      <p className={`font-mono text-lg lg:text-sm font-bold ${
                        sc.highlighted ? "text-[#1B3D2C]" : "text-[#0A0F1E]"
                      }`}>
                        {formatCurrency(Math.round(animatedInvestment * Math.pow(sc.rate, 5)))}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="flex items-start gap-3 mt-6">
            <Info className="w-4 h-4 text-[#718096] flex-shrink-0 mt-0.5" />
            <p className="text-xs text-[#718096] leading-relaxed">
              Les rendements présentés sont des estimations basées sur nos projections
              et ne constituent pas une garantie de performance future. Le capital investi
              peut être soumis à des risques. CO₂ : estimation basée sur 15 livraisons/jour
              remplaçant des trajets scooter de 5 km (~100g CO₂/km).
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
