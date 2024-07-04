import StarIcon from '@/shared/assets/icons/star.svg';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { Icon as IconDeprecated } from '../../deprecated/Icon';
import { Icon } from '../Icon';
import cls from './StarRating.module.scss';

export const renderDisabledStar = (starNumber: number, size: number) => {
    const commonProps = {
        className: cls.starDisabledIcon,
        Svg: StarIcon,
        key: starNumber,
        width: size,
        height: size,
        'data-testid': `StarRating.${starNumber}`,
    };

    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<Icon clickable={false} {...commonProps} />}
            off={<IconDeprecated {...commonProps} />}
        />
    );
};
