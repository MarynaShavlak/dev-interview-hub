import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { TestProps } from '@/shared/types/tests';
import { Icon } from '../../Icon';
import { Icon as IconDeprecated } from '../../../deprecated/Icon';
import cls from '../StarRating.module.scss';
import StarIcon from '@/shared/assets/icons/star.svg';

interface InteractiveStarProps extends TestProps {
    starNumber: number;
    size: number;
    activeStarsCount: number;
    isSelected: boolean;
    onHover: (starNumber: number) => () => void;
    onLeave: () => void;
    onClick: (starNumber: number) => () => void;
}

export const InteractiveStar = (props: InteractiveStarProps) => {
    const {
        starNumber,
        activeStarsCount,
        isSelected,
        onHover,
        onLeave,
        onClick,
        size,
    } = props;

    const starClasses = classNames(
        cls.starIcon,
        { [cls.selected]: isSelected },
        [activeStarsCount >= starNumber ? cls.hovered : cls.normal],
    );
    const commonProps = {
        className: starClasses,
        Svg: StarIcon,
        key: starNumber,
        width: size,
        height: size,
        onMouseLeave: onLeave,
        onMouseEnter: onHover(starNumber),
        onClick: onClick(starNumber),
        'data-testid': `StarRating.${starNumber}`,
        'data-selected': activeStarsCount >= starNumber,
    };

    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<Icon clickable={!isSelected} {...commonProps} />}
            off={<IconDeprecated {...commonProps} />}
        />
    );
};
