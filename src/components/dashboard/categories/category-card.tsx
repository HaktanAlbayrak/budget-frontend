"use client";

import type { components } from "@/lib/api-types";
import { useLocale, useTranslations } from "next-intl";

type Category = components["schemas"]["CategoryResponseDto"];

type CategoryCardProps = {
  category: Category;
};

function toRgba(hexColor: string, alpha: number) {
  const normalized = hexColor.replace("#", "");
  const hex =
    normalized.length === 3
      ? normalized
          .split("")
          .map((char) => `${char}${char}`)
          .join("")
      : normalized;

  const red = Number.parseInt(hex.slice(0, 2), 16);
  const green = Number.parseInt(hex.slice(2, 4), 16);
  const blue = Number.parseInt(hex.slice(4, 6), 16);

  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

export function CategoryCard({ category }: CategoryCardProps) {
  const t = useTranslations("categories");
  const locale = useLocale();
  const isIncome = category.type === "INCOME";
  const progressValue = category.monthlyLimit ? 62 : 0;
  const formattedLimit = category.monthlyLimit
    ? new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "TRY",
        maximumFractionDigits: 0,
      }).format(category.monthlyLimit)
    : null;

  return (
    <article className="rounded-2xl border border-glass-border bg-glass/50 p-5 shadow-sm backdrop-blur-md transition-all hover:shadow-lg">
      <div className="flex items-center justify-between gap-3">
        <span
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-lg"
          style={{
            backgroundColor: toRgba(category.color, 0.18),
            color: category.color,
          }}
        >
          {category.icon}
        </span>

        <span
          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
            isIncome
              ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-300"
              : "bg-rose-500/15 text-rose-600 dark:text-rose-300"
          }`}
        >
          {t(`types.${category.type}`)}
        </span>
      </div>

      <h3 className="mt-4 text-lg font-bold tracking-tight text-foreground">
        {category.name}
      </h3>

      {category.monthlyLimit ? (
        <div className="mt-4 space-y-2">
          <p className="text-sm text-foreground/70">
            {t("monthlyLimit")} {formattedLimit}
          </p>
          <div className="h-2 overflow-hidden rounded-full bg-foreground/10">
            <div
              className="h-full rounded-full"
              style={{
                width: `${progressValue}%`,
                backgroundColor: category.color,
              }}
            />
          </div>
        </div>
      ) : null}
    </article>
  );
}
