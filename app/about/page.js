export default function AboutPage() {
    return (
        <article className="px-6 py-10 md:px-12 md:py-16 lg:px-20 max-w-4xl">
            <header className="mb-12">
                <h1 className="text-4xl md:text-6xl font-serif font-bold mb-8 leading-tight tracking-tight uppercase">
                    About
                </h1>
                <div className="h-1 w-20 bg-accent-red mb-12"></div>
            </header>

            <div className="prose prose-zinc prose-lg max-w-none prose-headings:font-serif prose-p:leading-relaxed prose-p:mb-8 text-black/90 font-sans">
                <p>
                    Mohamad Sriyanto was born in a small arts city called Solo 83 years ago and graduated from the well-known Bandung Institute of Technology, Department of Petroleum Engineering. He worked for an American oil company, Vico Indonesia, and retired in 1997.
                </p>
                <p>
                    Since then, he has lived at home with his wife, while his three children reside in different places far away from him.
                </p>
                <p>
                    In 2007, by chance, he began seriously working on and thinking about prime numbers—wondering why these numbers are so mysterious.
                </p>
                <p>
                    He understood the specific properties of the numbers 1, 2, 3, and 5, but about the others he knew very little. He started listing small prime numbers in a numerical series, then rearranged them repeatedly in various ways until he arrived at what he considered the best arrangement:
                </p>
                <div className="bg-card-bg p-6 font-mono text-sm mb-8 border-l-4 border-accent-red">
                    (5,7), (11,13), (17,19), (23,25), (29,31), (35,37), (41,47), … and so on.
                </div>
                <p>
                    He was delighted when he finally reached a preliminary conclusion: the horizontal difference between the numbers (numbers in brackets) is 2, while the vertical difference is 6. He then quickly prepared an Excel table and derived a relationship among prime numbers:
                </p>
                <div className="bg-card-bg p-6 font-mono text-xl mb-8 border-l-4 border-accent-red italic text-center">
                    P = 6 × n ± 1
                </div>
                <p>
                    where P stands for Prime, 6 represents the vertical difference, and n is the counter.
                </p>
                <p>
                    After identifying this relationship, he continued with deeper studies. The results of his work were later written into two books.
                </p>
            </div>
        </article>
    );
}
