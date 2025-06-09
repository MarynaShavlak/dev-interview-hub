import type { User } from '@/entities/User';
import { SectionType } from '@/shared/types/sectionTypes';

export type HRInterviewQASubcategory = {
    key: string;
    label: string;
};

export type HRInterviewQACategory = {
    key: string;
    label: string;
    subcategories: HRInterviewQASubcategory[];
};

export interface HRInterviewQABlock {
    title?: string;
    paragraphs: string[];
    id: string;
    type: SectionType.TEXT;
}

export interface HRInterviewQA {
    id: string;
    user: User;
    title: string;
    createdAt: string;
    category: HRInterviewQACategory;
    blocks: HRInterviewQABlock[];
}
