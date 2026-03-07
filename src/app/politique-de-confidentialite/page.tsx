import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Politique de Confidentialité - Codes de Parrainages',
    description: 'Politique de confidentialité et de protection des données personnelles du site Codes de Parrainages.',
    alternates: {
        canonical: "/politique-de-confidentialite",
    },
};

export default function PolitiqueConfidentialitePage() {
    return (
        <main className="min-h-screen px-4 py-8 sm:px-6 sm:py-16 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">
                Politique de Confidentialité
            </h1>

            <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400">
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">1. Responsable du traitement</h2>
                    <p>
                        Le site <strong>codes-de-parrainages.com</strong> est édité à titre personnel. Le responsable du traitement des données personnelles est l&apos;éditeur du site.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">2. Données collectées</h2>
                    <p>
                        Ce site ne collecte <strong>aucune donnée personnelle directement</strong>. Aucun formulaire d&apos;inscription, de contact ou de newsletter n&apos;est présent sur le site. Aucun cookie publicitaire ou de tracking tiers n&apos;est déposé sur votre navigateur.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">3. Analytics</h2>
                    <p>
                        Ce site utilise <strong>Vercel Analytics</strong>, un outil d&apos;analyse de fréquentation qui ne dépose aucun cookie et ne collecte aucune donnée personnelle identifiable. Les statistiques sont anonymes et agrégées (nombre de visites, pages vues, pays d&apos;origine). Aucune information ne permet d&apos;identifier un visiteur individuel.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">4. Liens d&apos;affiliation</h2>
                    <p>
                        Lorsque vous cliquez sur un lien de parrainage ou d&apos;affiliation présent sur ce site, vous êtes redirigé vers le site du partenaire concerné. Ce partenaire peut alors collecter des données selon sa propre politique de confidentialité. Nous vous invitons à consulter les politiques de confidentialité de chaque service avant de vous inscrire.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">5. Hébergement</h2>
                    <p>
                        Le site est hébergé par <strong>Vercel Inc.</strong> (440 N Barranca Ave #4133, Covina, CA 91723, États-Unis). Vercel peut collecter des données techniques (adresse IP, logs serveur) dans le cadre de l&apos;hébergement. Pour plus d&apos;informations, consultez la <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">politique de confidentialité de Vercel</a>.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">6. Vos droits (RGPD)</h2>
                    <p>
                        Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d&apos;un droit d&apos;accès, de rectification, de suppression et de portabilité de vos données personnelles, ainsi que d&apos;un droit d&apos;opposition et de limitation du traitement. Étant donné que ce site ne collecte aucune donnée personnelle identifiable, ces droits ne trouvent pas d&apos;application directe. Si vous avez néanmoins des questions, vous pouvez contacter l&apos;éditeur du site.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">7. Modifications</h2>
                    <p>
                        Cette politique de confidentialité peut être mise à jour à tout moment pour refléter les évolutions du site ou les changements réglementaires. La date de dernière mise à jour est indiquée ci-dessous.
                    </p>
                    <p className="text-sm text-slate-500 mt-4">
                        Dernière mise à jour : 5 mars 2026
                    </p>
                </section>
            </div>
        </main>
    );
}
