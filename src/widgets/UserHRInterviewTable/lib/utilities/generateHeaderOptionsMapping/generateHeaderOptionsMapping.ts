// import { getUniqueStringOptions } from '@/features/Table';
// import { HRInterviewQA } from '@/entities/HRInterviewQA';
//
// export const generateHeaderOptionsMapping = (data: HRInterviewQA[]) => {
//     if (data.length === 0) return {};
//     console.log('data', data);
//     console.log(
//         getUniqueStringOptions(data, 'category' as keyof HRInterviewQA).filter(
//             (option): option is string => option !== undefined,
//         ),
//     );
//     return Object.fromEntries(
//         Object.keys(data[0]).map((field) => [
//             field,
//             getUniqueStringOptions(data, field as keyof HRInterviewQA).filter(
//                 (option): option is string => option !== undefined,
//             ),
//         ]),
//     );
// };

import { getUniqueStringOptions } from '@/features/Table';
import { HRInterviewQA } from '@/entities/HRInterviewQA';
import { TabItem } from '@/shared/ui/redesigned/Tabs';

export const generateHeaderOptionsMapping = (
    data: HRInterviewQA[],
    tabs: TabItem[],
) => {
    if (data.length === 0) return {};

    const categoryOptions = getUniqueStringOptions(
        data,
        'category' as keyof HRInterviewQA,
    ).filter((option): option is string => option !== undefined);

    return Object.fromEntries(
        Object.keys(data[0]).map((field) => {
            if (field === 'category') {
                const labeledOptions = categoryOptions.map((option) => {
                    const label =
                        tabs.find((tab) => tab.value === option)?.label ??
                        option;
                    return label;
                });

                return ['category', labeledOptions];
            }
            return [
                field,
                getUniqueStringOptions(
                    data,
                    field as keyof HRInterviewQA,
                ).filter((option): option is string => option !== undefined),
            ];
        }),
    );
};
