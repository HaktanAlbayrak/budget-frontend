import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  // Gelen isteğin dilini al
  let locale = await requestLocale;

  if (!locale || !(routing.locales as readonly string[]).includes(locale)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    // JSON dosyalarımızı okuyup next-intl'e veriyoruz
    messages: (await import(`../../dictionaries/${locale}.json`)).default,
  };
});
