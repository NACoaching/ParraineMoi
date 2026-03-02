"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FaqItem {
    question: string;
    answer: string;
}

export function FaqAccordion({ faqs, title = "Questions Fréquentes" }: { faqs: FaqItem[], title?: string }) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFaq = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    if (!faqs || faqs.length === 0) return null;

    return (
        <section className="w-full max-w-3xl mx-auto my-16 px-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">
                {title}
            </h2>

            {/* SEO Schema Markup pour l'indexation de la FAQ */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": faqs.map((faq) => ({
                            "@type": "Question",
                            "name": faq.question,
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": faq.answer
                            }
                        }))
                    })
                }}
            />

            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 transition-colors"
                    >
                        <button
                            onClick={() => toggleFaq(index)}
                            className="w-full flex items-center justify-between p-5 text-left focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset"
                            aria-expanded={openIndex === index}
                        >
                            <span className="font-semibold text-slate-900 dark:text-white text-lg pr-4">
                                {faq.question}
                            </span>
                            <ChevronDown
                                className={`h-5 w-5 text-slate-500 transition-transform duration-300 shrink-0 ${openIndex === index ? "transform rotate-180 text-primary" : ""
                                    }`}
                            />
                        </button>

                        <div
                            className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                                }`}
                        >
                            <div className="p-5 pt-0 text-slate-600 dark:text-slate-400 leading-relaxed">
                                {faq.answer}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
