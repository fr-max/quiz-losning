import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Løsningsberegner — Inact",
  description: "Find ud af hvilken Inact-løsning der passer bedst til jer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="da" className={poppins.variable}>
      <body className="font-[family-name:var(--font-poppins)] bg-white text-[#304642] antialiased">
        {children}
      </body>
    </html>
  );
}
