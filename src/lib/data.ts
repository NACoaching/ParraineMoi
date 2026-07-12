import referralsData from '@/data/referrals.json';
import guidesData from '@/data/guides.json';
import { replaceDatePlaceholders } from './utils';
import { Referral } from '@/components/ReferralCard';

export interface Guide {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    date: string;
    readingTime: string;
    referralSlugs: string[];
    category: string;
    seoTitle?: string;
    seoDescription?: string;
}

export const referrals: Referral[] = (referralsData as any[]).map(r => ({
    ...r,
    name: replaceDatePlaceholders(r.name),
    advantage: replaceDatePlaceholders(r.advantage),
    seoTitle: r.seoTitle ? replaceDatePlaceholders(r.seoTitle) : undefined,
    seoDescription: r.seoDescription ? replaceDatePlaceholders(r.seoDescription) : undefined,
    description: replaceDatePlaceholders(r.description),
    review: r.review ? {
        ...r.review,
        longReview: replaceDatePlaceholders(r.review.longReview),
        pros: r.review.pros ? r.review.pros.map((p: string) => replaceDatePlaceholders(p)) : [],
        cons: r.review.cons ? r.review.cons.map((c: string) => replaceDatePlaceholders(c)) : []
    } : undefined,
    steps: r.steps ? r.steps.map((s: any) => ({
        title: replaceDatePlaceholders(s.title),
        description: replaceDatePlaceholders(s.description)
    })) : undefined,
    faqs: r.faqs ? r.faqs.map((f: any) => ({
        question: replaceDatePlaceholders(f.question),
        answer: replaceDatePlaceholders(f.answer)
    })) : undefined
}));

export const guides: Guide[] = (guidesData as any[]).map(g => ({
    ...g,
    title: replaceDatePlaceholders(g.title),
    seoTitle: g.seoTitle ? replaceDatePlaceholders(g.seoTitle) : undefined,
    seoDescription: g.seoDescription ? replaceDatePlaceholders(g.seoDescription) : undefined,
    excerpt: replaceDatePlaceholders(g.excerpt),
    content: replaceDatePlaceholders(g.content)
}));
