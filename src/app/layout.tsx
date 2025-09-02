import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/provider/ThemeProvider";
import React from "react";
import Header from "@/layouts/Common/Header";
import localFont from "next/font/local";
import Body from "@/layouts/Common/Body";

const pretendard = localFont({
  src: [
    {
      path: "../../public/fonts/pretendard/Pretendard-Regular.woff2",
      weight: "400",
    },
    {
      path: "../../public/fonts/pretendard/Pretendard-Medium.woff2",
      weight: "500",
    },
    {
      path: "../../public/fonts/pretendard/Pretendard-SemiBold.woff2",
      weight: "600",
    },
    {
      path: "../../public/fonts/pretendard/Pretendard-Bold.woff2",
      weight: "700",
    },
    {
      path: "../../public/fonts/pretendard/Pretendard-ExtraBold.woff2",
      weight: "800",
    },
  ],
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body className={`${pretendard.className} font-pretendard antialiased`}>
        <ThemeProvider>
          <Header></Header>
          <Body>{children}</Body>
        </ThemeProvider>
      </body>
    </html>
  );
}
