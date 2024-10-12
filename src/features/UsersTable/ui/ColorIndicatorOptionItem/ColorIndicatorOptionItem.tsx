import { Box } from '@/shared/ui/common/Box';
import cls from '../OptionCell/OptionCell.module.scss';
import { Role } from '../../model/types/types';

export interface ColorIndicatorOptionItemProps {
    option: Role;
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
}: ColorIndicatorOptionItemProps) => {
    return (
        <>
            <ColorIcon color={option.color} />
            {option.name}
        </>
    );
};
