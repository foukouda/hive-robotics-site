"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { deployments, type Deployment } from "@/lib/deployment-data";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

function createMarkerEl(dep: Deployment) {
  const el = document.createElement("div");
  el.innerHTML = `
    <div style="position:relative;cursor:pointer">
      <span class="hive-ping"></span>
      <div class="hive-pin">
        <span class="hive-pin-text" style="font-weight:700;font-family:monospace;color:#0A0F1E">${dep.robots}</span>
      </div>
    </div>`;
  return el;
}

function createPopup(dep: Deployment) {
  return new mapboxgl.Popup({
    offset: 18,
    closeButton: false,
    closeOnClick: false,
    className: "hive-popup",
  })
    .setLngLat([dep.lng, dep.lat])
    .setHTML(`
      <div style="padding:12px;min-width:160px">
        <p style="font-weight:600;font-size:13px;color:#fff;margin:0 0 6px">${dep.name}</p>
        <p style="font-size:12px;color:#fff;margin:0"><strong style="font:700 12px monospace;color:#00E85C">${dep.robots}</strong> robots</p>
        <p style="font-size:11px;color:#fff;margin:2px 0 0">${dep.type} · ${dep.date}</p>
      </div>`);
}

export function DeploymentMapGlobe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: "mapbox://styles/mapbox/standard",
      center: [3.5, 46.5],
      zoom: 2.6,
      minZoom: 0.5,
      maxZoom: 12,
      attributionControl: false,
      pitchWithRotate: false,
      projection: "globe",
    });

    mapRef.current = map;

    map.on("style.load", () => {
      map.setConfigProperty("basemap", "showPedestrianRoads", false);
      map.setConfigProperty("basemap", "showTransitLabels", false);
      map.setConfigProperty("basemap", "showPointOfInterestLabels", false);
      map.setConfigProperty("basemap", "showRoadLabels", false);


      map.setFog({
        color: "rgba(12, 128, 60, 0.4)",
        "high-color": "rgba(51, 76, 39, 0.15)",
        "horizon-blend": 0.04,
        "space-color": "rgb(10, 16, 44)",
        "star-intensity": 0.55,
      });
    });

    map.on("load", () => {
      for (const dep of deployments) {
        const el = createMarkerEl(dep);
        const popup = createPopup(dep);

        new mapboxgl.Marker({ element: el, anchor: "center" })
          .setLngLat([dep.lng, dep.lat])
          .addTo(map);

        el.addEventListener("mouseenter", () => {
          el.querySelector<HTMLElement>(".hive-pin")?.classList.add("hive-pin--active");
          popup.addTo(map);
        });
        el.addEventListener("mouseleave", () => {
          el.querySelector<HTMLElement>(".hive-pin")?.classList.remove("hive-pin--active");
          popup.remove();
        });
      }

    });

    map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), "top-right");

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <>
      <style jsx global>{`
        .hive-ping {
          position: absolute; inset: -2px;
          width: calc(28px * var(--marker-scale, 1));
          height: calc(28px * var(--marker-scale, 1));
          border-radius: 50%; background: #00E85C; opacity: 0.25;
          animation: hive-ping 1.5s cubic-bezier(0,0,0.2,1) infinite;
          transition: width 0.2s, height 0.2s;
        }
        .hive-pin {
          position: relative;
          width: calc(24px * var(--marker-scale, 1));
          height: calc(24px * var(--marker-scale, 1));
          border-radius: 50%;
          background: #00E85C; display: flex; align-items: center; justify-content: center;
          transition: width 0.2s, height 0.2s, box-shadow 0.3s;
          box-shadow: 0 2px 8px rgba(0,232,92,0.4);
        }
        .hive-pin-text {
          font-size: calc(10px * var(--marker-scale, 1));
          line-height: 1;
        }
        .hive-pin--active {
          transform: scale(1.3);
          box-shadow: 0 4px 16px rgba(0,232,92,0.6);
        }
        @keyframes hive-ping {
          75%, 100% { transform: scale(2.5); opacity: 0; }
        }
        .hive-popup .mapboxgl-popup-content {
          background: rgba(27, 61, 44, 0.92); backdrop-filter: blur(12px);
          border-radius: 12px; padding: 0;
          box-shadow: 0 8px 24px rgba(0,0,0,0.3); border: 1px solid rgba(0,232,92,0.15);
        }
        .hive-popup.mapboxgl-popup-anchor-bottom .mapboxgl-popup-tip {
          border-top-color: rgba(27, 61, 44, 0.92);
        }
        .hive-popup.mapboxgl-popup-anchor-top .mapboxgl-popup-tip {
          border-bottom-color: rgba(27, 61, 44, 0.92);
        }
        .hive-popup.mapboxgl-popup-anchor-left .mapboxgl-popup-tip {
          border-right-color: rgba(27, 61, 44, 0.92);
        }
        .hive-popup.mapboxgl-popup-anchor-right .mapboxgl-popup-tip {
          border-left-color: rgba(27, 61, 44, 0.92);
        }
        .mapboxgl-ctrl-group {
          background: rgba(255,255,255,0.1) !important;
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.1) !important;
          border-radius: 8px !important;
        }
        .mapboxgl-ctrl-group button { border: none !important; }
        .mapboxgl-ctrl-group button + button { border-top: 1px solid rgba(255,255,255,0.1) !important; }
        .mapboxgl-ctrl-group button span { filter: invert(1); }
        .mapboxgl-canvas { background: #0A102C !important; }
        .mapboxgl-map { background: #0A102C !important; }
        .mapboxgl-ctrl-logo, .mapboxgl-ctrl-attrib { display: none !important; }
      `}</style>
      <div
        className="relative w-full rounded-3xl overflow-hidden border border-white/5 bg-[#0A102C]"
        style={{ height: "clamp(400px, 50vw, 600px)" }}
      >
        <div ref={containerRef} className="w-full h-full" />
      </div>
    </>
  );
}
