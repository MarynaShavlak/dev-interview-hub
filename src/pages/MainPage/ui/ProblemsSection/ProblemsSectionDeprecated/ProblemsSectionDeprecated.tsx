import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TextAlign, TextSize } from '@/shared/ui/deprecated/Text';
import cls from '../ProblemsSection.module.scss';
import { Card } from '@/shared/ui/deprecated/Card';

import { VStack } from '@/shared/ui/common/Stack';
import { Each } from '@/shared/lib/components/Each/Each';

import { OrderCard } from '@/shared/ui/deprecated/OrderCard';

import { problemsDataEng, problemsDataUkr } from '../../../model/problemsData';

export const ProblemsSectionDeprecated = () => {
    const { t, i18n } = useTranslation('main');
    const lang = i18n.language;
    const problemsData =
        lang === 'uk' || lang === 'ua' ? problemsDataUkr : problemsDataEng;
    const sectionTitle = t('Які проблеми вирішує Dev Interview Hub?');

    return (
        <VStack gap="24" align="center">
            <Text
                title={sectionTitle}
                align={TextAlign.CENTER}
                size={TextSize.M}
                className={cls.title}
            />

            <div className={cls.gridContainer}>
                <Each
                    of={problemsData}
                    render={(item, index) => {
                        const { title, text, value } = item;
                        return (
                            <Card
                                key={title}
                                className={cls.problemCard}
                                padding="16"
                            >
                                <OrderCard
                                    index={index + 1}
                                    className={cls.problemOrder}
                                />
                                <Text
                                    title={title}
                                    size={TextSize.S}
                                    align={TextAlign.CENTER}
                                    className={cls.cardTitle}
                                />
                                <Text
                                    text={text}
                                    size={TextSize.S}
                                    className={cls.cardText}
                                />
                                <Text
                                    text={`<span>Value:</span> ${value}`}
                                    size={TextSize.M}
                                    className={cls.cardTextDeprecated}
                                />
                            </Card>
                        );
                    }}
                />
            </div>
        </VStack>
    );
};
