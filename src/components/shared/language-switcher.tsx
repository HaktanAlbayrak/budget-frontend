"use client";

import { Link, usePathname } from "@/i18n/routing";
import { IconWorld as Globe } from "@tabler/icons-react";
import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";

export function LanguageSwitcher() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const locale = useLocale();
  const t = useTranslations("common.languageSwitcher");

  const nextLocale = locale === "tr" ? "en" : "tr";
  const query = Object.fromEntries(searchParams.entries());
  const label = locale === "tr" ? t("toEnglish") : t("toTurkish");

  return (
    <Link
      href={{ pathname, query }}
      locale={nextLocale}
      aria-label={label}
      title={label}
      className="flex items-center gap-2 px-4 py-2 rounded-full bg-glass border border-glass-border text-foreground/80 hover:text-foreground hover:bg-glass/80 transition-all active:scale-95 shadow-sm font-semibold text-sm cursor-pointer"
    >
      <Globe size={16} />
      <span>{locale === "tr" ? "EN" : "TR"}</span>
    </Link>
  );
}
