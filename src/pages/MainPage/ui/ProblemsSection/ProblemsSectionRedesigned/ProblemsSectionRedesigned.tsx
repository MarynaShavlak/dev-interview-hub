import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text } from '@/shared/ui/redesigned/Text';
import cls from '../ProblemsSection.module.scss';
import { Card } from '@/shared/ui/redesigned/Card';

import { VStack } from '@/shared/ui/common/Stack';
import { Each } from '@/shared/lib/components/Each/Each';

import { OrderCard } from '@/shared/ui/redesigned/OrderCard';
import { problemsDataEng, problemsDataUkr } from '../../../model/problemsData';

export const ProblemsSectionRedesigned = () => {
    const { t, i18n } = useTranslation('main');
    const lang = i18n.language;
    const problemsData =
        lang === 'uk' || lang === 'ua' ? problemsDataUkr : problemsDataEng;
    const sectionTitle = t('Які проблеми вирішує Dev Interview Hub?');
    const valueText = t('Результат');

    return (
        <VStack gap="24" align="center">
            <Text
                title={sectionTitle}
                align="center"
                size="m"
                className={cls.title}
                variant="accent"
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
                                    size="s"
                                    bold
                                    align="center"
                                    className={cls.cardTitle}
                                />
                                <Text
                                    text={text}
                                    size="s"
                                    className={cls.cardText}
                                />
                                <Text
                                    text={`<span>${valueText}:</span> ${value}`}
                                    size="m"
                                    className={cls.cardText}
                                />
                            </Card>
                        );
                    }}
                />
            </div>
        </VStack>
    );
};
