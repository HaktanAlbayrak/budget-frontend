import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["tr", "en"],
  defaultLocale: "tr",
  // localePrefix: 'always' yerine 'as-needed' kullanarak
  // URL'lerin gereksiz yere şişmesini önleyebiliriz.
  localePrefix: "as-needed",
});

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
