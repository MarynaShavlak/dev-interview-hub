import type { User } from '@/entities/User';
import { SectionType } from '@/shared/types/sectionTypes';
import { LiveCodeCategory } from './liveCodeCategory';

// export type HRInterviewQASubcategory = {
//     key: string;
//     label: string;
// };
//
// export type HRInterviewQACategory = {
//     key: string;
//     label: string;
//     subcategories: HRInterviewQASubcategory[];
// };

export interface LiveCodeBlockBase {
    id: string;
    type: SectionType;
}

export interface CodeBlock extends LiveCodeBlockBase {
    type: SectionType.CODE;
    code: string;
    title?: string;
}

export interface TextBlock extends LiveCodeBlockBase {
    title?: string;
    paragraphs: string[];
    type: SectionType.TEXT;
}

type LiveCodeBlock = CodeBlock | TextBlock;

export interface LiveCode {
    id: string;
    user: User;
    title: string;
    createdAt: string;
    category: LiveCodeCategory;
    blocks: LiveCodeBlock[];
}
