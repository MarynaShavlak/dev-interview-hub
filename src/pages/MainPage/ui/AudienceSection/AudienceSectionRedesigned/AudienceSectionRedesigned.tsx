import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text } from '@/shared/ui/redesigned/Text';
import cls from '../AudienceSection.module.scss';
import { Card } from '@/shared/ui/redesigned/Card';
import { Icon } from '@/shared/ui/redesigned/Icon';

import { VStack } from '@/shared/ui/common/Stack';
import { Each } from '@/shared/lib/components/Each/Each';
import {
    audienceDataEng,
    audienceDataUkr,
} from '../../../model/audienceDataEng';

export const AudienceSectionRedesigned = () => {
    const { t, i18n } = useTranslation('main');
    const lang = i18n.language;
    const audienceData =
        lang === 'uk' || lang === 'ua' ? audienceDataUkr : audienceDataEng;
    const sectionTitle = t('Для кого Dev Interview Hub?');
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
                    of={audienceData}
                    render={(item) => {
                        const { title, description, icon } = item;
                        return (
                            <Card
                                key={title}
                                className={cls.audienceCard}
                                padding="16"
                            >
                                <Icon
                                    Svg={icon}
                                    width="100px"
                                    height="100px"
                                    className={cls.audienceIcon}
                                />
                                <VStack
                                    className={cls.infoWrap}
                                    gap="4"
                                    align="center"
                                >
                                    <Text title={title} size="s" bold />
                                    <Text
                                        text={description}
                                        size="s"
                                        className={cls.cardText}
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
