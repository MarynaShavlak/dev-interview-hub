import { memo } from 'react';
import { InteractiveStar } from './InteractiveStar/InteractiveStar';
import { DisabledStar } from './DisabledStar/DisabedStar';
import { useStarRating } from '@/shared/lib/hooks/useStarRating/useStarRating';
import { toggleFeatures } from '@/shared/lib/features';
import { Each } from '@/shared/lib/components/Each/Each';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './StarRating.module.scss';

interface StarRatingProps {
    className?: string;
    onSelect?: (starsCount: number) => void;
    size?: number;
    selectedStars?: number;
    disabled?: boolean;
}

const stars = [1, 2, 3, 4, 5];

export const StarRating = memo((props: StarRatingProps) => {
    const {
        className,
        size = 30,
        selectedStars = 0,
        onSelect,
        disabled,
    } = props;
    const { activeStarsCount, isSelected, onHover, onLeave, onClick } =
        useStarRating({ selectedStars, onSelect });

    const mainClass = toggleFeatures({
        name: 'isAppRedesigned',
        off: () => cls.StarRating,
        on: () => cls.StarRatingRedesigned,
    });

    const renderStars = disabled
        ? (starNumber: number) => (
              <DisabledStar starNumber={starNumber} size={size} />
          )
        : (starNumber: number) => (
              <InteractiveStar
                  starNumber={starNumber}
                  activeStarsCount={activeStarsCount}
                  isSelected={isSelected}
                  onHover={onHover}
                  onLeave={onLeave}
                  onClick={onClick}
                  size={size}
              />
          );

    return (
        <div className={classNames(mainClass, {}, [className])}>
            <Each of={stars} render={renderStars} />
        </div>
    );
});
