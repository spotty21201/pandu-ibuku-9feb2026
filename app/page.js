export default function Home() {
  return (
    <div className="px-6 py-10 md:px-12 md:py-16 lg:px-20 max-w-5xl">
      <header className="mb-4">
        <h2 className="font-serif font-normal text-4xl md:text-6xl lg:text-7xl leading-[0.85] tracking-tight text-black uppercase">
          <span className="block">ARSIP</span>
          <span className="block">PEMIKIRAN</span>
        </h2>
      </header>

      <section className="bg-card-bg p-8 md:p-12 border-l-[8px] border-accent-red mb-16">
        <div className="bg-neutral-200 p-10">
          <p className="text-xl leading-relaxed">
            Pandu Ibuku merupakan perpustakaan digital yang menyimpan dan
            mengelola catatan pemikiran secara terstruktur.
          </p>

          <p className="mt-6 text-xl leading-relaxed">
            Bukan blog, bukan media sosial, dan bukan kanal promosi.
            Laman ini dibangun sebagai sistem arsip yang memungkinkan gagasan
            bertahan, berkembang, dan ditelusuri kembali.
          </p>

          <p className="mt-6 text-xl leading-relaxed">
            Struktur domain di sisi kiri adalah kerangka pengelompokan,
            bukan sekadar menu navigasi.
          </p>
        </div>
      </section>

      <div className="bg-neutral-100 p-12 text-center italic text-2xl font-serif">
        "Arsip bukan sekadar penyimpanan. Ia adalah kesinambungan."
      </div>
    </div>
  );
}
