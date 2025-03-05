import { TextSize } from '@/shared/ui/deprecated/Text';

export const getTextSizeByIndex = (index: number): 'xs' | 's' | 'm' => {
    const { length } = String(index);

    if (length > 5) {
        return 'xs';
    }

    if (length > 3) {
        return 's';
    }

    return 'm';
};

export const getDeprecatedTextSizeByIndex = (index: number): TextSize => {
    const { length } = String(index);

    if (length > 5) {
        return TextSize.XS;
    }

    if (length > 3) {
        return TextSize.S;
    }

    return TextSize.M;
};
