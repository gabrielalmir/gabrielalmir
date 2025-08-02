import "./globals.css";

import { Fira_Code, Space_Mono } from "next/font/google";

const spaceMono = Space_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space",
  weight: ["400", "700"],
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fira",
  weight: ["300", "400", "500", "600", "700"],
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
    <html lang="pt-br" className={`${spaceMono.variable} ${firaCode.variable}`}>
      <body
        className='antialiased bg-zinc-950'
      >
        {children}
      </body>
    </html>
  );
}
