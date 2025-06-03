import React from 'react';
import { Text } from '@/shared/ui/redesigned/Text';
import cls from './AudienceSection.module.scss';
import { Card } from '@/shared/ui/redesigned/Card';
import { Icon } from '@/shared/ui/redesigned/Icon';

import { VStack } from '@/shared/ui/common/Stack';
import { Each } from '@/shared/lib/components/Each/Each';
import { audienceData } from '../../model/audienceData';

export const AudienceSection = () => {
    return (
        <VStack gap="24" align="center">
            <Text
                title="For whom is Dev Interview Hub?"
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
