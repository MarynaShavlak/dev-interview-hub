import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { Icon } from '../Icon';
import { Icon as IconDeprecated } from '../../deprecated/Icon';
import cls from './StarRating.module.scss';
import StarIcon from '@/shared/assets/icons/star.svg';

interface RenderStarInteractiveProps {
    starNumber: number;
    currentStarsCount: number;
    isSelected: boolean;
    onHover: (starNumber: number) => () => void;
    onLeave: () => void;
    onClick: (starNumber: number) => () => void;
    size: number;
}

export const renderStarInteractive = ({
    starNumber,
    currentStarsCount,
    isSelected,
    onHover,
    onLeave,
    onClick,
    size,
}: RenderStarInteractiveProps) => {
    const commonProps = {
        className: classNames(cls.starIcon, { [cls.selected]: isSelected }, [
            currentStarsCount >= starNumber ? cls.hovered : cls.normal,
        ]),
        Svg: StarIcon,
        key: starNumber,
        width: size,
        height: size,
        onMouseLeave: onLeave,
        onMouseEnter: onHover(starNumber),
        onClick: onClick(starNumber),
        'data-testid': `StarRating.${starNumber}`,
        'data-selected': currentStarsCount >= starNumber,
    };

    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<Icon clickable={!isSelected} {...commonProps} />}
            off={<IconDeprecated {...commonProps} />}
        />
    );
};
