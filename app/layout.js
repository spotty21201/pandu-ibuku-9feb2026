import { Cormorant_Garamond, Montserrat, Fira_Code } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/Sidebar";
import { DOMAINS } from "@/lib/domains";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-serif",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
});

const firaCode = Fira_Code({
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
    { name: "About", href: "/about" },
  ];

  return (
    <html lang="id" className="scroll-smooth">
      <body
        className={`${cormorant.variable} ${montserrat.variable} ${firaCode.variable} font-sans antialiased min-h-screen flex flex-col md:flex-row bg-cream-bg text-black selection:bg-accent-red/10 selection:text-accent-red`}
      >
        <Sidebar navItems={navItems} />

        <main className="flex-1 flex flex-col min-w-0 md:pl-0 pt-16 md:pt-0">
          <div className="flex-1">
            {children}
          </div>

          <footer className="border-t border-border-subtle mt-auto bg-cream-bg/50 backdrop-blur-sm">
            <div className="px-6 py-4 md:py-6 text-center">
              <p className="text-sm font-medium mb-1 tracking-widest text-black/80">PANDU IBUKU &copy; {new Date().getFullYear()}</p>
              <p className="text-[10px] md:text-xs text-black/40 uppercase tracking-widest">Kompilasi pemikiran dan ide Mohamad Sriyanto</p>
              <div className="mt-4">
                <a href="/admin" className="text-[10px] uppercase tracking-[0.3em] opacity-20 hover:opacity-100 transition-all hover:text-accent-red">Admin</a>
              </div>
            </div>
          </footer>
        </main>
      </body>
    </html>
  );
}
