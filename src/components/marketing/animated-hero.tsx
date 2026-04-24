"use client";

import { motion, Variants } from "framer-motion";
import { useTranslations } from "next-intl";

export function AnimatedHero() {
  const t = useTranslations("marketing.hero");
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <motion.div
      className="max-w-4xl w-full"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div
        className="bg-glass/80 backdrop-blur-xl border border-glass-border rounded-3xl px-6 md:px-10 py-12 md:py-16 shadow-2xl text-center"
        variants={itemVariants}
      >
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold tracking-wider text-foreground leading-[1.1] mb-6 "
          variants={itemVariants}
        >
          {t("title")}
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto mb-10 leading-relaxed font-sans"
          variants={itemVariants}
        >
          {t("subtitle")}
        </motion.p>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-4"
          variants={itemVariants}
        >
          <button className="px-8 py-3 bg-foreground text-background font-semibold rounded-xl text-sm transition hover:opacity-90 active:scale-95 shadow-lg cursor-pointer">
            {t("getStarted")}
          </button>
          <button className="px-8 py-3 bg-glass border border-glass-border rounded-xl text-sm text-foreground transition hover:bg-glass/90 active:scale-95 cursor-pointer">
            {t("login")}
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
