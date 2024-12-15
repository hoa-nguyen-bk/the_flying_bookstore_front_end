import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/nav/Navbar";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../utils/theme";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from "@/components/footer/Footer";
import { SITE_NAME } from "@/utils/env";
import CommonAlert from "../components/common/CommonAlert";
import dayjs from "dayjs";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import Script from 'next/script';
import type { Viewport } from 'next'

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1
}
const main_font = Montserrat({ subsets: ["vietnamese"] });
const sub_font = Montserrat({ subsets: ["vietnamese"] }); // don't know when to use it
import localizedFormat from 'dayjs/plugin/localizedFormat';
dayjs.extend(localizedFormat);
//tiếng việt
require('dayjs/locale/vi');
dayjs.locale('vi'); // use locale globally
export const metadata: Metadata = {
  title: SITE_NAME,
  description: "Hệ thống cho thuê mua bán sách cũ giá rẻ",
  robots: {
    follow: true,
    index: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <body className={main_font.className}>
        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=G-3CSLHKB5HE`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-3CSLHKB5HE');
        `}
        </Script>
        <AppRouterCacheProvider options={{ key: "css" }}>
          <ThemeProvider theme={theme}>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow">{children}</main>
              <CommonAlert />
              <Footer />
            </div>
          </ThemeProvider>
        </AppRouterCacheProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
