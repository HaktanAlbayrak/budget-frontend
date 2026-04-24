import { Providers } from "@/components/shared/providers";
import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

// Premium FinTech Fontu (Okunabilirliği ve modernliği muazzamdır)
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

// Kodlar ve Kredi Kartı numaraları için jilet gibi bir Mono font
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Finans Asistanı | Premium Yönetim",
  description: "Modern, akıllı ve güvenli kişisel bütçe yönetimi.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html
      lang={locale}
      className={`${jakarta.variable} ${jetbrainsMono.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased min-h-screen flex flex-col bg-background text-foreground">
        <Providers>
          <main className="flex-1 flex flex-col">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
