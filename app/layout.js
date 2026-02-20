import { Playfair_Display, Inter, Open_Sans } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/Sidebar";
import { DOMAINS } from "@/lib/domains";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata = {
  title: "Pandu Ibuku",
  description: "Arsip pemikiran intelektual: civitas, moral, sains, dan spekulasi.",
};

export default function RootLayout({ children }) {
  const navItems = [
    ...DOMAINS.map((d) => ({ name: d.label, href: d.slug ? `/${d.slug}` : "/" })),
    { name: "Projects", href: "/projects" },
    { name: "About", href: "/about" },
  ];

  return (
    <html lang="id">
      <body
        className={`${playfair.variable} ${inter.variable} ${openSans.variable} font-sans antialiased min-h-screen flex flex-col md:flex-row bg-cream-bg text-black`}
      >
        <Sidebar navItems={navItems} />

        <main className="flex-1 flex flex-col min-w-0">
          <div className="flex-1">
            {children}
          </div>

          <footer className="border-t border-border-subtle mt-auto">
            <div className="px-6 py-10 md:px-12 text-center">
              <p className="text-sm font-medium mb-1">Pandu Ibuku &copy; {new Date().getFullYear()}</p>
              <p className="text-sm text-black/60">Arsip Pemikiran Permanen</p>
              <div className="mt-4">
                <a href="/admin" className="text-[10px] uppercase tracking-[0.2em] opacity-20 hover:opacity-100 transition-opacity">Admin</a>
              </div>
            </div>
          </footer>
        </main>
      </body>
    </html>
  );
}
