import { memo } from 'react';
import { Each } from '@/shared/lib/components/Each/Each';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { toggleFeatures, ToggleFeaturesComponent } from '@/shared/lib/features';
import { ArticleView } from '@/entities/Article';
import { classNames } from '@/shared/lib/classNames/classNames';
import ListIconDeprecated from '@/shared/assets/icons/list-24-24.svg';
import TiledIconDeprecated from '@/shared/assets/icons/tiled-24-24.svg';
import ListIcon from '@/shared/assets/icons/burger.svg';
import TiledIcon from '@/shared/assets/icons/tile.svg';

import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon';
import {
    Button as ButtonDeprecated,
    ButtonTheme,
} from '@/shared/ui/deprecated/Button';
import cls from './ArticleViewSelector.module.scss';
import { Card } from '@/shared/ui/redesigned/Card';

interface ArticleViewSelectorProps {
    className?: string;
    view: ArticleView;
    onViewClick?: (view: ArticleView) => void;
}

const viewTypes = [
    {
        view: ArticleView.SMALL,
        icon: toggleFeatures({
            name: 'isAppRedesigned',
            on: () => TiledIcon,
            off: () => TiledIconDeprecated,
        }),
    },
    {
        view: ArticleView.BIG,
        icon: toggleFeatures({
            name: 'isAppRedesigned',
            on: () => ListIcon,
            off: () => ListIconDeprecated,
        }),
    },
];

export const ArticleViewSelector = memo((props: ArticleViewSelectorProps) => {
    const { className, view, onViewClick } = props;

    const onClick = (newView: ArticleView) => () => {
        onViewClick?.(newView);
    };

    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={
                <Card
                    className={classNames(
                        cls.ArticleViewSelectorRedesigned,
                        {},
                        [className],
                    )}
                    border="round"
                >
                    <HStack gap="8">
                        <Each
                            of={viewTypes}
                            render={(viewType) => {
                                return (
                                    <Icon
                                        clickable
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
            }
            off={
                <div
                    className={classNames(cls.ArticleViewSelector, {}, [
                        className,
                    ])}
                >
                    <Each
                        of={viewTypes}
                        render={(viewType) => {
                            return (
                                <ButtonDeprecated
                                    key={viewType.view}
                                    theme={ButtonTheme.CLEAR}
                                    onClick={onClick(viewType.view)}
                                >
                                    <IconDeprecated
                                        width={24}
                                        height={24}
                                        Svg={viewType.icon}
                                        className={classNames('', {
                                            [cls.notSelected]:
                                                viewType.view !== view,
                                        })}
                                    />
                                </ButtonDeprecated>
                            );
                        }}
                    />
                </div>
            }
        />
    );
});
