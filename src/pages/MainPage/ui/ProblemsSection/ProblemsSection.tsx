import React from 'react';
import { Text } from '@/shared/ui/redesigned/Text';
import cls from './ProblemsSection.module.scss';
import { Card } from '@/shared/ui/redesigned/Card';

import { VStack } from '@/shared/ui/common/Stack';
import { Each } from '@/shared/lib/components/Each/Each';
import { problemsData } from '../../model/problemsData';
import { OrderCard } from '@/shared/ui/redesigned/OrderCard';

export const ProblemsSection = () => {
    return (
        <VStack gap="24" align="center">
            <Text
                title="What Problems Does Dev Interview Hub Solve?"
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
                                    text={`<span>Value:</span> ${value}`}
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
