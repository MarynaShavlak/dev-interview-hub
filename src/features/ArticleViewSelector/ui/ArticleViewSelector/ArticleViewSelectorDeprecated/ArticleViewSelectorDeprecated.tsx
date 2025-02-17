import { memo } from 'react';
import { ArticleViewSelectorProps } from '../ArticleViewSelector';
import { deprecatedViewTypes } from '../../../model/consts/viewsTypes';
import { ArticleView } from '@/entities/Article';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { Each } from '@/shared/lib/components/Each/Each';
import {
    Button as ButtonDeprecated,
    ButtonTheme,
} from '@/shared/ui/deprecated/Button';

import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon';
import cls from '../ArticleViewSelector.module.scss';

export const ArticleViewSelectorDeprecated = memo(
    (props: ArticleViewSelectorProps) => {
        const { className, view, onViewClick } = props;

        const onClick = (newView: ArticleView) => () => {
            onViewClick?.(newView);
        };

        return (
            <div
                className={classNames(cls.ArticleViewSelector, {}, [className])}
            >
                <Each
                    of={deprecatedViewTypes}
                    render={(viewType) => {
                        return (
                            <ButtonDeprecated
                                key={viewType.view}
                                theme={ButtonTheme.CLEAR}
                                onClick={onClick(viewType.view)}
                            >
                                <IconDeprecated
                                    width={32}
                                    height={32}
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
        );
    },
);
