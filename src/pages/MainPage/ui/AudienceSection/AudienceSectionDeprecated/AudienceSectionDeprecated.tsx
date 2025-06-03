import React from 'react';
import { useTranslation } from 'react-i18next';
import {
    Text,
    TextAlign,
    TextSize,
    TextTheme,
} from '@/shared/ui/deprecated/Text';
import cls from '../AudienceSection.module.scss';
import { Card } from '@/shared/ui/deprecated/Card';
import { Icon } from '@/shared/ui/deprecated/Icon';

import { VStack } from '@/shared/ui/common/Stack';
import { Each } from '@/shared/lib/components/Each/Each';
import {
    audienceDataEng,
    audienceDataUkr,
} from '../../../model/audienceDataEng';

export const AudienceSectionDeprecated = () => {
    const { t, i18n } = useTranslation('main');
    const lang = i18n.language;
    const audienceData =
        lang === 'uk' || lang === 'ua' ? audienceDataUkr : audienceDataEng;
    const sectionTitle = t('Для кого Dev Interview Hub?');
    return (
        <VStack gap="24" align="center">
            <Text
                title={sectionTitle}
                align={TextAlign.CENTER}
                size={TextSize.M}
                className={cls.title}
                theme={TextTheme.PRIMARY}
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
                                    <Text
                                        title={title}
                                        size={TextSize.S}
                                        align={TextAlign.CENTER}
                                    />
                                    <Text
                                        text={description}
                                        size={TextSize.S}
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
