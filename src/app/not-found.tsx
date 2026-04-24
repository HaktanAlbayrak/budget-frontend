"use client";

import { LanguageSwitcher } from "@/components/shared/language-switcher";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function LocalizedNotFoundPage() {
  const t = useTranslations("notFound");

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6 py-12 text-foreground">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(37,99,235,0.2),transparent_40%),radial-gradient(circle_at_80%_15%,rgba(168,85,247,0.2),transparent_35%),radial-gradient(circle_at_50%_80%,rgba(16,185,129,0.16),transparent_40%)]" />

      <section className="relative z-10 w-full max-w-3xl rounded-3xl border border-white/20 bg-glass/40 p-12 text-center shadow-2xl backdrop-blur-xl">
        <div className="mb-8 flex justify-end">
          <LanguageSwitcher />
        </div>

        <motion.p
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 4.2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="text-7xl font-black tracking-tight text-transparent sm:text-8xl md:text-9xl bg-linear-to-r from-blue-500 to-purple-500 bg-clip-text"
        >
          404
        </motion.p>

        <h1 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
          {t("title")}
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-foreground/70 sm:text-base">
          {t("description")}
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link href="/">
            <Button>{t("backHome")}</Button>
          </Link>
          <a href="mailto:support@finansasistani.com">
            <Button variant="glass">{t("contactSupport")}</Button>
          </a>
        </div>
      </section>
    </main>
  );
}
