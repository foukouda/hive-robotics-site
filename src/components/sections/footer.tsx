import Image from "next/image";

export function Footer() {
  return (
    <footer className="py-12 bg-surface-container-low">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <Image src="/logo.png" alt="Hive Robotics" width={24} height={24} className="w-6 h-6" />
            <div>
              <p className="text-xl font-semibold">Hive Robotics</p>
              <p className="text-sm text-muted-foreground mt-1">
                La livraison autonome, souveraine et française.
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <a href="/robots" className="hover:text-foreground transition-colors">
              Robots
            </a>
            <a href="/publicite" className="hover:text-foreground transition-colors">
              Publicité
            </a>
            <a href="/a-propos" className="hover:text-foreground transition-colors">
              À propos
            </a>
            <a href="/faq" className="hover:text-foreground transition-colors">
              FAQ
            </a>
            <a href="/partenaires" className="hover:text-foreground transition-colors">
              Travailler avec nous
            </a>
            <a href="/contact" className="hover:text-foreground transition-colors">
              Contact
            </a>
          </nav>

          {/* Social */}
          <div className="flex items-center gap-4">
            <a
              href="https://www.linkedin.com/company/hiverobotic"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-surface-container-high transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Legal + copyright */}
        <div className="mt-8 pt-8 border-t border-border flex flex-col items-center gap-3 md:flex-row md:justify-between">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Hive Robotics SAS. Tous droits réservés.
          </p>
          <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-xs text-muted-foreground">
            <a href="/mentions-legales" className="hover:text-foreground transition-colors">
              Mentions légales
            </a>
            <a href="/dis" className="hover:text-foreground transition-colors">
              DIS
            </a>
            <a href="/cgv" className="hover:text-foreground transition-colors">
              CGV
            </a>
            <a href="/confidentialite" className="hover:text-foreground transition-colors">
              Confidentialité
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
