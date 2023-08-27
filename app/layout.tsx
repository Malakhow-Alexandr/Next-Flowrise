import type { Metadata, ResolvingMetadata } from "next";
import "./globals.css";
import clsx from "clsx";
import { Nunito, Nunito_Sans } from "next/font/google";
import { createClient } from "@/prismicio";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito-sans",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();

  const settings = await client.getSingle("settings");

  return {
    title: settings.data.site_title || "flowrise",
    description:
    settings.data.meta_description || "Flowrise is the relaxing app for you.",
    openGraph: {
      images: [settings.data.og_image.url || ""],
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={clsx(nunito.variable, nunitoSans.variable)}>
        <Header />

        {children}

        <Footer/>
      </body>
    </html>
  );
}
