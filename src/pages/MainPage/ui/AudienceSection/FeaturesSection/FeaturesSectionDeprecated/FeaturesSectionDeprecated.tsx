import React from 'react';

import { useTranslation } from 'react-i18next';

import { VStack } from '@/shared/ui/common/Stack';
import { Text, TextAlign, TextSize } from '@/shared/ui/deprecated/Text';
import cls from '../FeaturesSection.module.scss';
import { Each } from '@/shared/lib/components/Each/Each';
import { Card } from '@/shared/ui/deprecated/Card';
import {
    featuresDataEng,
    featuresDataUkr,
} from '../../../../model/featuresDataEng';
import { List } from '@/shared/ui/common/List';

export const FeaturesSectionDeprecated = () => {
    const { t, i18n } = useTranslation('main');
    const lang = i18n.language;
    const audienceData =
        lang === 'uk' || lang === 'ua' ? featuresDataUkr : featuresDataEng;
    const sectionTitle = t('Що пропонує Dev Interview Hub?');
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
                    of={audienceData}
                    render={(item) => {
                        const { title, subtitle, items } = item;
                        return (
                            <Card
                                key={title}
                                className={cls.featureCard}
                                padding="16"
                            >
                                <Text
                                    title={title}
                                    size={TextSize.S}
                                    align={TextAlign.CENTER}
                                    className={cls.cardTitle}
                                />
                                <Text
                                    text={subtitle}
                                    size={TextSize.M}
                                    className={cls.cardText}
                                />
                                <VStack>
                                    <List
                                        items={items}
                                        variant="primary"
                                        type="unordered"
                                    />
                                </VStack>
                            </Card>
                        );
                    }}
                />
            </div>
        </VStack>
    );
};
