import { getUniqueStringOptions } from '@/features/Table';
import { HRInterviewQA } from '@/entities/HRInterviewQA';

export const generateHeaderOptionsMapping = (data: HRInterviewQA[]) => {
    if (data.length === 0) return {};

    return Object.fromEntries(
        Object.keys(data[0]).map((field) => [
            field,
            getUniqueStringOptions(data, field as keyof HRInterviewQA).filter(
                (option): option is string => option !== undefined,
            ),
        ]),
    );
};
