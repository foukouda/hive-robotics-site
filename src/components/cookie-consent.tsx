"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const STORAGE_KEY = "hive-cookie-consent";
type Consent = "accepted" | "refused";

export function CookieConsent() {
  // undefined = not yet read (SSR + first client render), null = undecided
  const [consent, setConsent] = useState<Consent | null | undefined>(undefined);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    setConsent(stored === "accepted" || stored === "refused" ? (stored as Consent) : null);
  }, []);

  const choose = (value: Consent) => {
    localStorage.setItem(STORAGE_KEY, value);
    setConsent(value);
  };

  return (
    <>
      {/* Analytics only after explicit consent */}
      {consent === "accepted" && (
        <>
          <Analytics />
          <SpeedInsights />
        </>
      )}

      {consent === null && (
        <div className="fixed inset-x-0 bottom-0 z-[110] flex justify-center p-4">
          <div className="w-full max-w-2xl rounded-2xl border border-black/10 bg-white p-5 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.35)] sm:flex sm:items-center sm:gap-6">
            <p className="text-sm leading-relaxed text-[#4A5568]">
              Nous utilisons des cookies de mesure d&apos;audience pour améliorer
              le site. Vous pouvez accepter ou refuser.{" "}
              <Link href="/confidentialite" className="font-medium text-[#1B3D2C] underline underline-offset-2">
                En savoir plus
              </Link>
              .
            </p>
            <div className="mt-4 flex flex-shrink-0 gap-2 sm:mt-0">
              <button
                type="button"
                onClick={() => choose("refused")}
                className="rounded-full border border-black/15 px-5 py-2.5 text-sm font-semibold text-[#0A0F1E] transition-colors hover:bg-black/5"
              >
                Refuser
              </button>
              <button
                type="button"
                onClick={() => choose("accepted")}
                className="rounded-full bg-[#1B3D2C] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#00C853] hover:text-[#1B3D2C]"
              >
                Accepter
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
