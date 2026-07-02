"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, ArrowRight } from "lucide-react";

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const EMAIL = "thomas.raynal@hiverobotics.fr";

type ContactProps = {
  eyebrow?: string;
  titleLead?: string;
  titleAccent?: string;
  intro?: string;
  subjectPrefix?: string;
};

export function Contact({
  eyebrow = "Contact",
  titleLead = "Parlons de votre ",
  titleAccent = "projet.",
  intro = "Un site à équiper — aéroport, campus, entrepôt, résidence ? Décrivez votre besoin, nous revenons vers vous rapidement.",
  subjectPrefix = "Demande de démo",
}: ContactProps = {}) {
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });

  const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`${subjectPrefix} — ${form.company || form.name || "Hive Robotics"}`);
    const body = encodeURIComponent(
      `Nom : ${form.name}\nSociété : ${form.company}\nEmail : ${form.email}\n\n${form.message}`
    );
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };

  const inputClass =
    "w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-[#0A0F1E] outline-none transition-colors placeholder:text-[#94A3B8] focus:border-[#1B3D2C]";

  return (
    <section className="hive-section bg-white">
      <div className="hive-container">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left - intro + coordinates */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <p className="hive-label">{eyebrow}</p>
            <h1 className="hive-heading text-[#0A0F1E]">
              {titleLead}
              <span className="font-heading italic text-[1.05em] underline decoration-[#00E85C] decoration-[6px] underline-offset-[0.12em]">
                {titleAccent}
              </span>
            </h1>
            <p className="hive-body mt-8 max-w-md">{intro}</p>

            <div className="mt-10 space-y-4">
              <a
                href={`mailto:${EMAIL}`}
                className="flex items-center gap-3 text-[#0A0F1E] transition-colors hover:text-[#1B3D2C]"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8F5EC]">
                  <Mail className="h-5 w-5 text-[#1B3D2C]" />
                </span>
                {EMAIL}
              </a>
              <a
                href="https://www.linkedin.com/company/hiverobotic"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-[#0A0F1E] transition-colors hover:text-[#1B3D2C]"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8F5EC]">
                  <LinkedinIcon className="h-5 w-5 text-[#1B3D2C]" />
                </span>
                Hive Robotics
              </a>
              <div className="flex items-center gap-3 text-[#4A5568]">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8F5EC]">
                  <MapPin className="h-5 w-5 text-[#1B3D2C]" />
                </span>
                Conçu et fabriqué en France
              </div>
            </div>
          </motion.div>

          {/* Right - form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="hive-card flex flex-col gap-4"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                type="text"
                required
                placeholder="Nom"
                value={form.name}
                onChange={update("name")}
                className={inputClass}
                aria-label="Nom"
              />
              <input
                type="text"
                placeholder="Société"
                value={form.company}
                onChange={update("company")}
                className={inputClass}
                aria-label="Société"
              />
            </div>
            <input
              type="email"
              required
              placeholder="Email"
              value={form.email}
              onChange={update("email")}
              className={inputClass}
              aria-label="Email"
            />
            <textarea
              required
              rows={5}
              placeholder="Votre besoin…"
              value={form.message}
              onChange={update("message")}
              className={`${inputClass} resize-none`}
              aria-label="Message"
            />
            <button
              type="submit"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#1B3D2C] px-8 py-4 font-semibold text-white transition-colors hover:bg-[#00C853] hover:text-[#1B3D2C]"
            >
              Envoyer la demande
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <p className="text-xs text-[#94A3B8]">
              L&apos;envoi ouvre votre messagerie avec un message pré-rempli.
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
