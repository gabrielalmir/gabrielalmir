import "./globals.css";

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
    <html lang="pt-br">
      <body
        className='antialiased bg-zinc-950'
      >
        {children}
      </body>
    </html>
  );
}
