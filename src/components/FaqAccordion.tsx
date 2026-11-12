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
        <section className="w-full max-w-3xl mx-auto my-14 px-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-8 text-center tracking-tight">
                {title}
            </h2>

            <div className="space-y-3.5">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className="border border-slate-200/90 rounded-2xl overflow-hidden bg-white shadow-xs hover:border-blue-300 transition-all"
                    >
                        <button
                            onClick={() => toggleFaq(index)}
                            className="w-full flex items-center justify-between p-5 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                            aria-expanded={openIndex === index}
                        >
                            <span className="font-semibold text-slate-900 text-base sm:text-lg pr-4">
                                {faq.question}
                            </span>
                            <ChevronDown
                                className={`h-5 w-5 text-slate-400 transition-transform duration-300 shrink-0 ${openIndex === index ? "transform rotate-180 text-blue-600" : ""
                                    }`}
                            />
                        </button>

                        <div
                            className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                                }`}
                        >
                            <div className="p-5 pt-0 text-slate-600 leading-relaxed text-sm sm:text-base border-t border-slate-100">
                                {faq.answer}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
