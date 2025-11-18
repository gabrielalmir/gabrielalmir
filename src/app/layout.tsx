import "./globals.css";

import { Space_Mono } from "next/font/google";
import localFont from "next/font/local";

const geist = localFont({
  src: [
    {
      path: "./fonts/GeistVF.woff",
      style: "normal",
      weight: "100 900",
    },
  ],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = localFont({
  src: [
    {
      path: "./fonts/GeistMonoVF.woff",
      style: "normal",
      weight: "100 900",
    },
  ],
  variable: "--font-geist-mono",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space",
  weight: ["400", "700"],
});

export const metadata = {
  title: "Gabriel Almir - Backend Developer",
  description: "Backend Developer focused on building scalable, high-performance solutions using Node.js. Expertise in creating clean, maintainable, and efficient systems, leveraging modern development practices such as Clean Architecture, SOLID principles, and Design Patterns.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-br"
      className={`${geist.variable} ${geistMono.variable} ${spaceMono.variable}`}
    >
      <body className='antialiased'>
        {children}
      </body>
    </html>
  );
}
