import "./globals.css";

import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata = {
  title: "Gabriel Almir - Backend Developer",
  description: "Backend Developer focused on building scalable, high-performance solutions using Node.js and Java. Expertise in creating clean, maintainable, and efficient systems, leveraging modern development practices such as Clean Architecture, SOLID principles, and Design Patterns.",
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
