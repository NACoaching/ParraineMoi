import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Mentions Légales — Codes de Parrainages',
    description: 'Mentions légales du site codes-de-parrainages.com : éditeur, hébergement, affiliation et politique de transparence sur les liens de parrainage.',
    alternates: {
        canonical: "/mentions-legales",
    },
};

export default function MentionsLegalesPage() {
    return (
        <main className="min-h-screen px-4 py-8 sm:px-6 sm:py-16 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">
                Mentions Légales
            </h1>

            <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400">
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">1. Éditeur du site</h2>
                    <p>
                        Ce site est édité à titre personnel. Les contenus présents (avis, descriptions) reflètent uniquement l&apos;opinion de l&apos;auteur.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">2. Hébergement</h2>
                    <p>
                        Ce site est hébergé par <strong>Vercel Inc.</strong><br />
                        440 N Barranca Ave #4133<br />
                        Covina, CA 91723<br />
                        États-Unis
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">3. L&apos;affiliation & Parrainage</h2>
                    <p>
                        Les liens et codes présents sur ce site sont des liens de parrainage. En utilisant ces codes lors de votre inscription sur les plateformes concernées, vous bénéficiez du bonus de bienvenue indiqué et l&apos;éditeur du site peut recevoir une prime ou un avantage de la part de la plateforme. Cela ne change rien pour vous, et permet de soutenir le maintien de ce site gratuit.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">4. Propriété intellectuelle</h2>
                    <p>
                        Les marques, logos et noms de services cités sur ce site sont la propriété de leurs détenteurs respectifs. Ils ne sont utilisés qu&apos;à des fins d&apos;identification pour les offres de parrainage.
                    </p>
                </section>
            </div>
        </main>
    );
}
