import {
  IconBrandGithub as Github,
  IconBrandLinkedin as Linkedin,
  IconBrandTwitter as Twitter,
} from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

export function Footer() {
  const t = useTranslations();
  const currentYear = new Date().getFullYear();

  const footerColumns = [
    {
      title: t("marketing.footer.columns.product.title"),
      links: t.raw("marketing.footer.columns.product.links") as string[],
    },
    {
      title: t("marketing.footer.columns.company.title"),
      links: t.raw("marketing.footer.columns.company.links") as string[],
    },
    {
      title: t("marketing.footer.columns.legal.title"),
      links: t.raw("marketing.footer.columns.legal.links") as string[],
    },
  ];

  return (
    <footer className="w-full border-t border-glass-border bg-glass/30 backdrop-blur-md pt-16 pb-8 mt-24">
      <div className="container mx-auto px-6">
        {/* Üst Kısım: CTA (Harekete Geçirici Mesaj) */}
        <div className="flex flex-col items-center justify-center text-center mb-20">
          <h2 className="text-3xl font-bold text-foreground mb-4 tracking-tight">
            {t("marketing.footer.cta.title")}
          </h2>
          <p className="text-foreground/70 mb-8 max-w-lg font-sans">
            {t("marketing.footer.cta.subtitle")}
          </p>
          <button className="px-8 py-3 bg-foreground text-background font-semibold rounded-xl text-sm transition hover:opacity-90 active:scale-95 shadow-lg">
            {t("marketing.footer.cta.button")}
          </button>
        </div>

        {/* Orta Kısım: Link Izgarası (Grid) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 border-b border-glass-border pb-12">
          {/* Logo ve Açıklama Kolonu */}
          <div className="col-span-2 md:col-span-1">
            <div className="text-xl font-bold tracking-tight text-foreground mb-4">
              {t("brandName")}
            </div>
            <p className="text-sm text-foreground/60 leading-relaxed pr-4 font-sans">
              {t("marketing.footer.description")}
            </p>
          </div>

          {/* Dinamik Kolonları Dönüyoruz */}
          {footerColumns.map((column, idx) => (
            <div key={idx}>
              <h3 className="font-semibold text-foreground mb-4 tracking-wide">
                {column.title}
              </h3>
              <ul className="space-y-3">
                {column.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <Link
                      href="#"
                      className="text-sm text-foreground/60 hover:text-foreground transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Alt Kısım: Telif Hakkı ve Sosyal Medya İkonları */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-foreground/50 font-sans">
            {t("marketing.footer.copyright", { year: currentYear })}
          </p>
          <div className="flex items-center gap-4 text-foreground/50">
            <Link href="#" className="hover:text-foreground transition-colors">
              <Twitter size={20} />
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              <Github size={20} />
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              <Linkedin size={20} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
