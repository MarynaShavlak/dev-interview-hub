import StarIcon from '@/shared/assets/icons/star.svg';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { TestProps } from '@/shared/types/tests';
import { Icon as IconDeprecated } from '../../../deprecated/Icon';
import { Icon } from '../../../redesigned/Icon';
import cls from '../StarRating.module.scss';

interface DisabledStarProps extends TestProps {
    starNumber: number;
    size: number;
}

export const DisabledStar = ({ size }: DisabledStarProps) => {
    const commonProps = {
        className: cls.starDisabledIcon,
        Svg: StarIcon,
        width: size,
        height: size,
    };

    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<Icon clickable={false} {...commonProps} width={size} />}
            off={<IconDeprecated {...commonProps} width={size} />}
        />
    );
};
