import { Footer } from "@/components/marketing/footer";
import { LanguageSwitcher } from "@/components/shared/language-switcher";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { routing } from "@/i18n/routing";
import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return routing.locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;

  if (!hasLocale(routing.locales, lang)) {
    return {};
  }

  const t = await getTranslations({ locale: lang, namespace: "meta" });
  const title = t("title");
  const description = t("description");
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const localizedPath = lang === routing.defaultLocale ? "/" : `/${lang}`;
  const canonicalUrl = new URL(localizedPath, siteUrl).toString();
  const ogLocale = lang === "tr" ? "tr_TR" : "en_US";

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        tr: "/",
        en: "/en",
      },
    },
    openGraph: {
      title,
      description,
      type: "website",
      locale: ogLocale,
      url: canonicalUrl,
      siteName: t("siteName"),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function MarketingLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!hasLocale(routing.locales, lang)) {
    notFound();
  }

  setRequestLocale(lang);

  const messages = await getMessages();
  const t = await getTranslations();

  return (
    <NextIntlClientProvider locale={lang} messages={messages}>
      <div className="flex flex-col min-h-screen relative">
        {/* Şeffaf Glassmorphism Navbar */}
        <header className="fixed top-0 left-0 w-full z-50 bg-glass/60 backdrop-blur-md border-b border-glass-border">
          <nav className="container mx-auto px-6 py-4 flex items-center justify-between text-foreground">
            <div className="text-xl font-bold tracking-tight">
              {t("brandName")}
            </div>
            <div className="flex items-center gap-3">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
          </nav>
        </header>

        <div className="flex-1 pt-24 pb-16">{children}</div>

        <Footer />
      </div>
    </NextIntlClientProvider>
  );
}
