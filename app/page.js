export default function Home() {
  return (
    <div className="px-6 py-12 md:px-10 md:py-16 lg:px-16 max-w-4xl">
      <header className="mb-6 md:mb-8 overflow-hidden">
        <h2 className="font-serif font-normal text-4xl md:text-5xl lg:text-6xl leading-[0.9] tracking-tighter text-black uppercase animate-reveal">
          <span className="block">ARSIP</span>
          <span className="block">PEMIKIRAN</span>
        </h2>
      </header>

      <div className="animate-reveal-delayed">
        <section className="bg-card-bg/40 backdrop-blur-sm p-6 md:p-10 border-l-[8px] border-accent-red mb-12 shadow-sm">
          <p className="text-lg md:text-xl leading-relaxed font-light text-black/80">
            Pandu Ibuku merupakan <span className="font-medium text-black">perpustakaan digital</span> yang menyimpan dan
            mengelola catatan pemikiran secara terstruktur.
          </p>

          <p className="mt-5 text-lg md:text-xl leading-relaxed font-light text-black/80">
            Bukan blog, bukan media sosial, and bukan kanal promosi.
            Laman ini dibangun sebagai <span className="font-medium text-black">sistem arsip</span> yang memungkinkan gagasan
            bertahan, berkembang, and ditelusuri kembali.
          </p>
        </section>

        <div className="p-10 md:p-16 border border-border-subtle bg-white/10 text-center italic text-xl md:text-2xl font-serif text-black/70 relative group">
          <span className="relative z-10">
            "Arsip bukan sekadar penyimpanan. Ia adalah kesinambungan."
          </span>
          <div className="absolute inset-0 bg-accent-red/5 scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 origin-left" />
        </div>
      </div>
    </div>
  );
}
