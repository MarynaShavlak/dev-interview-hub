import { Box } from '@/shared/ui/common/Box';
import { HStack } from '@/shared/ui/common/Stack/HStack/HStack';
import cls from '../OptionCell/OptionCell.module.scss';

export interface ColorOption {
    id: string;
    name: string;
    color: string;
}

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
        <HStack gap="8" onClick={onClick} className={className}>
            <ColorIcon color={option.color} />
            {option.name}
        </HStack>
    );
};
