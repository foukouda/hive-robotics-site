"use client";

import { useState } from "react";
import { Menu, X, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { label: "Robots", href: "/robots" },
  { label: "Publicité", href: "/publicite" },
  { label: "À propos", href: "/a-propos" },
  { label: "FAQ", href: "/faq" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Announcement bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#1B3D2C] text-white h-10 flex items-center justify-center">
        <div className="flex items-center gap-3 text-sm">
          <MapPin className="w-3.5 h-3.5 text-[#00E85C]" />
          <span>
            Robots de livraison autonomes ·{" "}
            <span className="text-[#00E85C] font-medium">conçus et fabriqués en France</span>
          </span>
        </div>
      </div>

      {/* Main navbar */}
      <nav className="fixed top-10 left-0 right-0 z-50 bg-white border-b border-[#E8ECF4] shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-14 px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Hive Robotics"
              width={26}
              height={26}
              className="w-6.5 h-6.5"
            />
            <span className="text-base font-semibold tracking-tight text-[#1B3D2C]">
              Hive Robotics
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-3 py-1.5 rounded-lg text-sm text-[#4A5568] hover:text-[#1B3D2C] transition-colors after:content-[''] after:absolute after:left-3 after:right-3 after:bottom-0.5 after:h-[2px] after:bg-[#00E85C] after:rounded-full after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:ease-out"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-2">
            <Link
              href="/partenaires"
              className="inline-flex items-center gap-2 rounded-full border border-[#1B3D2C] px-5 py-2 text-sm font-semibold text-[#1B3D2C] transition-colors hover:bg-[#E8F5EC]"
            >
              Travailler avec nous
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-[#1B3D2C] px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#00E85C] hover:text-[#1B3D2C]"
            >
              Demander une démo
            </Link>
          </div>

          {/* Mobile burger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden w-11 h-11 flex items-center justify-center rounded-lg text-[#1B3D2C] hover:bg-[#E8F5EC] transition-colors cursor-pointer"
            aria-label="Menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 top-24 z-40 bg-white lg:hidden">
          <div className="flex flex-col gap-1 p-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="py-3 px-4 rounded-xl text-lg font-semibold text-[#0A0F1E] hover:bg-[#E8F5EC] transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/partenaires"
              onClick={() => setMobileOpen(false)}
              className="mt-4 flex items-center justify-center gap-2 px-6 py-4 rounded-full border border-[#1B3D2C] text-[#1B3D2C] font-bold text-lg hover:bg-[#E8F5EC] transition-colors cursor-pointer"
            >
              Travailler avec nous
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-[#1B3D2C] text-white font-bold text-lg hover:bg-[#00E85C] hover:text-[#1B3D2C] transition-colors cursor-pointer"
            >
              Demander une démo
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
