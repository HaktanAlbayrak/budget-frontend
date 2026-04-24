"use client";

import {
  IconBellRinging as BellRing,
  IconFileSpreadsheet as FileSpreadsheet,
  IconShieldCheck as ShieldCheck,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export function FeaturesSection() {
  const t = useTranslations("marketing.features");

  const icons = [
    <BellRing key="bell" className="w-8 h-8 text-blue-500 mb-4" />,
    <ShieldCheck key="shield" className="w-8 h-8 text-emerald-500 mb-4" />,
    <FileSpreadsheet key="file" className="w-8 h-8 text-purple-500 mb-4" />,
  ];

  const items = t.raw("items") as {
    title: string;
    desc: string;
  }[];

  return (
    <section className="w-full py-24">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }} // Ekrana girince sadece 1 kere çalışsın
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-5xl font-bold text-center mb-16 text-foreground tracking-tight"
        >
          {t("title")}
        </motion.h2>

        {/* Bento Grid Yapısı: Mobilde 1, Tablette 2, Masaüstünde 3 sütun */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.2 }} // Kartlar sırayla gelsin
              className="bg-glass/50 backdrop-blur-lg border border-glass-border p-8 rounded-3xl hover:bg-glass/80 transition-all duration-300 shadow-lg hover:shadow-xl group"
            >
              {/* İkonun etrafına hafif bir parlama efekti veriyoruz */}
              <div className="p-3 bg-background/50 rounded-2xl inline-block border border-glass-border group-hover:scale-110 transition-transform duration-300">
                {icons[index]}
              </div>
              <h3 className="text-xl font-bold mt-6 mb-3 text-foreground">
                {item.title}
              </h3>
              <p className="text-foreground/70 leading-relaxed font-sans">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
