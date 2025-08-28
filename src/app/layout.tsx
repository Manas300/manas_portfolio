import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Manas Singh - Solutions Architect & Data Engineer",
  description: "Masters in Computer Science student at Stevens Institute of Technology specializing in cloud optimization, automation, and scalable infrastructure. 2+ years experience in DevOps, Data Engineering, and FinTech.",
  keywords: "Manas Singh, Solutions Architect, Data Engineer, MLOps, DevOps, Cloud Computing, AWS, Python, Machine Learning, Stevens Institute of Technology",
  authors: [{ name: "Manas Singh" }],
  creator: "Manas Singh",
  publisher: "Manas Singh",
  openGraph: {
    title: "Manas Singh - Solutions Architect & Data Engineer",
    description: "Masters in Computer Science student specializing in cloud optimization, automation, and scalable infrastructure.",
    url: "https://manas300.github.io/manas_portfolio",
    siteName: "Manas Singh Portfolio",
    images: [
      {
        url: "/profile.jpg",
        width: 1200,
        height: 630,
        alt: "Manas Singh - Solutions Architect & Data Engineer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Manas Singh - Solutions Architect & Data Engineer",
    description: "Masters in Computer Science student specializing in cloud optimization, automation, and scalable infrastructure.",
    images: ["/profile.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
