import { memo } from 'react';
import { Card } from '@/shared/ui/redesigned/Card';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { HStack } from '@/shared/ui/common/Stack';
import { ArticleViewSelectorProps } from '../ArticleViewSelector';
import { redesignedViewTypes } from '../../../model/consts/viewsTypes';
import { ArticleView } from '@/entities/Article';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { Each } from '@/shared/lib/components/Each/Each';

import cls from '../ArticleViewSelector.module.scss';

export const ArticleViewSelectorRedesigned = memo(
    (props: ArticleViewSelectorProps) => {
        const { className, view, onViewClick } = props;
        const onClick = (newView: ArticleView) => () => {
            onViewClick?.(newView);
        };

        return (
            <Card
                className={classNames(cls.ArticleViewSelectorRedesigned, {}, [
                    className,
                ])}
                border="round"
            >
                <HStack gap="8">
                    <Each
                        of={redesignedViewTypes}
                        render={(viewType) => {
                            return (
                                <Icon
                                    width={32}
                                    height={32}
                                    clickable
                                    key={viewType.view}
                                    onClick={onClick(viewType.view)}
                                    Svg={viewType.icon}
                                    className={classNames('', {
                                        [cls.notSelected]:
                                            viewType.view !== view,
                                    })}
                                />
                            );
                        }}
                    />
                </HStack>
            </Card>
        );
    },
);
