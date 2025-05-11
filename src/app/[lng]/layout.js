// import { appWithTranslation } from 'next-i18next'
import localFont from "next/font/local";
import "./globals.css";
import App from "@/components/App";
import { Toaster } from "react-hot-toast";
import { dir } from "i18next";
import I18nClientProvider from "../i18n/client";
import Loader from "@/components/Loader";
import { Suspense } from "react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Expenses",
  description: "Track your expenses",
};

const languages = ['en', 'es']

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }))
}

export default async function RootLayout({ children, params: { lng } }) {
  return <html lang={lng} dir={dir(lng)}>
    <body className={`${geistSans.variable} ${geistMono.variable}`}>
      <I18nClientProvider lng={lng}>
        <Suspense fallback={<Loader isLoading={true} />}>
          <App>
            <Toaster position="top-right" />
            {children}
          </App>
        </Suspense>
      </I18nClientProvider>
    </body>
  </html >
}
