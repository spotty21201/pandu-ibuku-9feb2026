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
        <p className="text-lg md:text-xl font-sans leading-relaxed text-black/90">
          Selamat datang di Pandu Ibuku. Ini bukan sebuah blog, bukan media, dan bukan sarana promosi.
          Tempat ini adalah sebuah perpustakaan digital, sebuah buku catatan, dan arsip pemikiran yang terukur.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-24">
        <div>
          <h3 className="uppercase text-base font-medium tracking-wide mb-4">Navigasi Utama</h3>
          <p className="text-base leading-relaxed text-black/80">
            Gunakan menu di samping untuk menjelajahi enam domain utama pemikiran kami,
            mulai dari panduan bangsa hingga eksplorasi matematika bilangan prima.
          </p>
        </div>
        <div>
          <h3 className="uppercase text-base font-medium tracking-wide mb-4">Proyek & Instrumen</h3>
          <p className="text-base leading-relaxed text-black/80">
            Halaman Proyek menampilkan manifestasi terapan dari ide-ide yang ada di dalam arsip ini,
            termasuk visualisasi dan alat bantu penalaran.
          </p>
        </div>
      </div>

      <div className="mt-20 p-12 bg-card-bg/50 border border-border-subtle italic font-serif text-2xl text-center">
        "Ide datang pertama. Instrumen mengikuti. Arsip tetap abadi."
      </div>
    </div>
  );
}
