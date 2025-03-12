import { Box } from '@/shared/ui/common/Box';
import { HStack } from '@/shared/ui/common/Stack/HStack/HStack';
import { ColorOption } from '../../model/types/tableTypes';
import cls from './ColorIndicatorOptionItem.module.scss';
import { capitalizeFirstLetter } from '@/shared/lib/text/capitalizeFirstLetter/capitalizeFirstLetter';

export interface ColorIndicatorOptionItemProps {
    option: ColorOption;
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
    className?: string;
}

interface ColorIconProps {
    color: string;
}

export const ColorIcon = ({ color }: ColorIconProps) => (
    <Box
        width="12px"
        height="12px"
        backgroundColor={color}
        className={cls.colorIcon}
    />
);

export const ColorIndicatorOptionItem = ({
    option,
    onClick,
    className,
}: ColorIndicatorOptionItemProps) => {
    return (
        <HStack gap="8" onClick={onClick} className={className} max>
            <ColorIcon color={option.color} />
            {capitalizeFirstLetter(option?.name?.toLowerCase())}
        </HStack>
    );
};
