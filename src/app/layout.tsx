import "./globals.css";

import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata = {
  title: "Gabriel Almir - Full Stack Developer",
  description: "Full Stack Developer with over 10 years of experience, specializing in Node.js, TypeScript, React.js, Next.js & NestJS. Expertise in microservices, RESTful APIs, and Clean Architecture.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
