"use client";

import dynamic from "next/dynamic";
import { MapPin } from "lucide-react";
import { TOTAL_SITES } from "@/lib/deployment-data";
import { ErrorBoundary } from "@/components/error-boundary";

const Globe = dynamic(
  () =>
    import("./deployment-map-globe").then((mod) => mod.DeploymentMapGlobe),
  {
    ssr: false,
    loading: () => (
      <div
        className="w-full rounded-3xl bg-[#0A0F1E] border border-[#1B3D2C]/20 flex items-center justify-center"
        style={{ height: "clamp(400px, 50vw, 600px)" }}
      >
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#00E85C] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-mono text-[#718096]">
            Chargement du globe...
          </span>
        </div>
      </div>
    ),
  }
);

// Mapbox needs a public token; without it the map would throw and crash the page.
const hasMapToken = Boolean(process.env.NEXT_PUBLIC_MAPBOX_TOKEN);

function MapFallback() {
  return (
    <div
      className="w-full rounded-3xl bg-gradient-to-b from-[#0A0F1E] to-[#1B3D2C] border border-[#1B3D2C]/30 flex items-center justify-center"
      style={{ height: "clamp(400px, 50vw, 600px)" }}
    >
      <div className="flex flex-col items-center gap-3 px-6 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#00E85C]/15">
          <MapPin className="h-6 w-6 text-[#00E85C]" />
        </span>
        <p className="font-semibold text-white">Réseau de déploiements</p>
        <p className="max-w-xs text-sm text-white/60">
          Nos robots opèrent sur {TOTAL_SITES} sites en France.
        </p>
      </div>
    </div>
  );
}

export function DeploymentMap() {
  return (
    <div className="relative">
      {hasMapToken ? (
        <ErrorBoundary fallback={<MapFallback />}>
          <Globe />
        </ErrorBoundary>
      ) : (
        <MapFallback />
      )}

      <div className="absolute bottom-4 left-4 backdrop-blur-md rounded-xl px-4 py-3 shadow-lg z-20 bg-[#1B3D2C]/90 border border-white/10">
        <p className="font-mono text-2xl font-bold text-[#00E85C]">
          +40 robots
        </p>
        <p className="text-xs text-white/80">
          déployés en 2026 sur {TOTAL_SITES} sites
        </p>
      </div>
    </div>
  );
}
