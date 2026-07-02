"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, Calendar } from "lucide-react";

interface PressArticle {
  media: string;
  mediaLogo: string;
  mediaHeight: number;
  accentColor: string;
  title: string;
  excerpt: string;
  date: string;
  url: string;
  screenshot?: string;
}

const articles: PressArticle[] = [
  {
    media: "Moove Lab - Via ID x Mobilians",
    mediaLogo: "/images/logo_partners/moove_lab_logo.jpeg",
    mediaHeight: 36,
    accentColor: "#00A859",
    title: "Hive Robotics présentée dans la série « Nos startups ont du talent »",
    excerpt:
      "Post officiel du Moove Lab présentant Hive Robotics parmi les pépites sélectionnées du Batch #15 à Station F - mentorat Via ID et Mobilians pendant 4 mois.",
    date: "Mars 2026",
    url: "https://www.linkedin.com/posts/nos-startups-ont-du-talent-et-si-vos-ugcPost-7452283838468263936-u3am",
    screenshot: undefined,
  },
  {
    media: "Réseau Entreprendre Val d'Oise",
    mediaLogo: "/images/logo_partners/reseau_entreprendre_95_logo.svg",
    mediaHeight: 44,
    accentColor: "#E50051",
    title: "Hive Robotics rejoint la promo START 2024",
    excerpt:
      "Lauréat du programme START de Réseau Entreprendre Val d'Oise : prêt d'honneur, accompagnement de chefs d'entreprise et accès au réseau national pour accélérer le développement commercial.",
    date: "Juin 2024",
    url: "https://www.reseau-entreprendre.org/val-d-oise/2024/06/01/nouveaux-laureats-start-promo-2024-hive-robotics/",
    screenshot: undefined,
  },
  {
    media: "BFM Business",
    mediaLogo: "/images/press/bfm_business_logo.svg",
    mediaHeight: 28,
    accentColor: "#D72729",
    title: "La Pépite : Hive Robotics, des prototypes à la réalité du terrain",
    excerpt:
      "Thomas Raynal et Teddy Leclercq présentent en direct la première levée de fonds et les déploiements terrain à La Défense. Retour sur le parcours depuis l'IFT jusqu'aux premières livraisons autonomes.",
    date: "Janvier 2024",
    url: "https://fr.linkedin.com/posts/thomas-raynal-hive-robotics_hive-robotics-sur-bfmtv-des-prototypes-activity-7155286646093934593-nGPv",
    screenshot: "/images/press/bfm_screenshot.png",
  },
  {
    media: "ESILV - Pôle Léonard de Vinci",
    mediaLogo: "/images/logo_partners/pole_leonard_de_vinci_logo.png",
    mediaHeight: 36,
    accentColor: "#E30613",
    title: "Hive Robotics sur BFMTV : des prototypes à l'IFT, à la réalité de la levée de fonds",
    excerpt:
      "L'ESILV revient sur le parcours de ses alumni Thomas Raynal et Teddy Leclercq, de l'incubateur IFT aux premiers déploiements commerciaux et à la couverture BFM Business.",
    date: "Janvier 2024",
    url: "https://www.esilv.fr/hive-robotics-sur-bfmtv-des-prototypes-a-lift-a-la-realite-de-la-levee-des-fonds/",
    screenshot: undefined,
  },
  {
    media: "Europe 1",
    mediaLogo: "/images/press/europe1_logo.svg",
    mediaHeight: 24,
    accentColor: "#FFCC00",
    title: "Hive Robotics : les livraisons de plats effectuées par des robots à La Défense",
    excerpt:
      "L'émission Initiatives en France reçoit Hive Robotics pour parler des premières livraisons de plats autonomes sur le parvis de La Défense avec le partenaire Mongoo.",
    date: "2024",
    url: "https://www.europe1.fr/emissions/initiatives-en-france2/hive-robotics-les-livraisons-de-plats-effectuees-par-des-robots-a-la-defense-4182287",
    screenshot: undefined,
  },
  {
    media: "Le Catalyseur - Pôle Léonard de Vinci",
    mediaLogo: "/images/logo_partners/pole_leonard_de_vinci_logo.png",
    mediaHeight: 36,
    accentColor: "#E30613",
    title: "Hive Robotics dans l'annuaire startups du Catalyseur",
    excerpt:
      "Présence au sein de l'écosystème startups du Pôle Léonard de Vinci (incubateur ESILV/EMLV/IIM) - référence pour les investisseurs et partenaires tech français.",
    date: "2024",
    url: "https://lecatalyseur.pold.fr/annuaire/hive-robotics",
    screenshot: undefined,
  },
  {
    media: "Descartes Développement & Innovation",
    mediaLogo: "/images/press/descartes_devinnov_logo.svg",
    mediaHeight: 36,
    accentColor: "#00539B",
    title: "Hive Robotics référencée au pôle Ville Durable",
    excerpt:
      "Intégration à l'annuaire French Tech Marne-la-Vallée de Descartes Développement & Innovation, pôle d'excellence dédié à la ville durable et aux nouvelles mobilités.",
    date: "2024",
    url: "https://www.descartes-devinnov.com/le-pole-dexcellence-ville-durable/annuaire/hive-robotics/",
    screenshot: undefined,
  },
  {
    media: "Les Pépites Tech",
    mediaLogo: "/images/press/pepites_tech_logo.svg",
    mediaHeight: 32,
    accentColor: "#FF6B00",
    title: "Hive Robotics dans la collection FrenchTech Robotique",
    excerpt:
      "Sélection parmi les pépites françaises de la robotique par Les Pépites Tech, média de référence de l'écosystème startups tech français.",
    date: "2024",
    url: "https://lespepitestech.com/startup-collection/robotique",
    screenshot: undefined,
  },
];

export function Press() {
  return (
    <section className="hive-section bg-[#F7F9FC]">
      <div className="hive-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-14"
        >
          <p className="hive-label">Presse & médias</p>
          <h2 className="hive-heading text-[#0A0F1E] max-w-3xl">
            Ils parlent{" "}
            <span className="font-heading italic text-[1.05em] underline decoration-[#00E85C] decoration-4 underline-offset-8">
              de nous.
            </span>
          </h2>
        </motion.div>

        {/* Articles grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, i) => (
            <motion.a
              key={article.title}
              href={article.url}
              target={article.url === "#" ? undefined : "_blank"}
              rel={article.url === "#" ? undefined : "noopener noreferrer"}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.07 }}
              className="group bg-white rounded-2xl border border-[#E8ECF4] overflow-hidden hover:border-[#1B3D2C]/30 hover:shadow-lg transition-all flex flex-col"
            >
              {/* Screenshot or branded placeholder */}
              <div
                className="relative aspect-[16/9] overflow-hidden"
                style={{
                  background: article.screenshot
                    ? undefined
                    : `linear-gradient(135deg, ${article.accentColor}15 0%, ${article.accentColor}05 100%)`,
                }}
              >
                {article.screenshot ? (
                  <>
                    <Image
                      src={article.screenshot}
                      alt={`${article.media} - ${article.title}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    />
                    {/* Media logo badge overlay */}
                    <div className="absolute top-3 left-3 bg-white rounded-lg shadow-md px-3 py-2 flex items-center">
                      <div
                        className="relative"
                        style={{ height: article.mediaHeight }}
                      >
                        <Image
                          src={article.mediaLogo}
                          alt={article.media}
                          width={article.mediaHeight * 4}
                          height={article.mediaHeight}
                          className="h-full w-auto object-contain"
                          style={{ height: article.mediaHeight, width: "auto" }}
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center p-10">
                    <div
                      className="relative w-full"
                      style={{ height: article.mediaHeight * 2 }}
                    >
                      <Image
                        src={article.mediaLogo}
                        alt={article.media}
                        fill
                        className="object-contain"
                        sizes="(min-width: 1024px) 280px, (min-width: 768px) 320px, 60vw"
                      />
                    </div>
                  </div>
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-[#0A0F1E]/0 group-hover:bg-[#0A0F1E]/10 transition-colors pointer-events-none" />

                {/* External link icon */}
                {article.url !== "#" && (
                  <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight className="w-4 h-4 text-[#0A0F1E]" />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#1B3D2C] font-semibold">
                    {article.media}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-[#C0C8D8]" />
                  <span className="text-xs text-[#718096] flex items-center gap-1">
                    <Calendar className="w-3 h-3" aria-hidden="true" />
                    {article.date}
                  </span>
                </div>

                <h3 className="font-semibold text-base text-[#0A0F1E] leading-snug mb-3 group-hover:text-[#1B3D2C] transition-colors">
                  {article.title}
                </h3>

                <p className="text-sm text-[#4A5568] leading-relaxed mb-5 flex-1">
                  {article.excerpt}
                </p>

                {article.url !== "#" ? (
                  <span className="text-sm font-semibold text-[#1B3D2C] flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                    Lire l&apos;article
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                ) : (
                  <span className="text-xs text-[#718096] italic">
                    Lien à venir
                  </span>
                )}
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
