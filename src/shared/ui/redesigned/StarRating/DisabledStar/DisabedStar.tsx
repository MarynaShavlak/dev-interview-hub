import StarIcon from '@/shared/assets/icons/star.svg';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { TestProps } from '@/shared/types/tests';
import { Icon as IconDeprecated } from '../../../deprecated/Icon';
import { Icon } from '../../Icon';
import cls from '../StarRating.module.scss';

interface DisabledStarProps extends TestProps {
    starNumber: number;
    size: number;
}

export const DisabledStar = ({ starNumber, size }: DisabledStarProps) => {
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
