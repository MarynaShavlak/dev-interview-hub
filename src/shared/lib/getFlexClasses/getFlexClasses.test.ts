import { getFlexClasses } from './getFlexClasses';
import cls from '@/shared/styles/flexStyles.module.scss';
import { FlexGap } from '@/shared/types/flexTypes';

describe('shared/lib/getFlexClasses', () => {
    test('should return vertical stack class when vStack is true', () => {
        const result = getFlexClasses({ vStack: true });
        expect(result).toContain(cls.vStack);
    });

    test('should return horizontal stack class when hStack is true', () => {
        const result = getFlexClasses({ hStack: true });
        expect(result).toContain(cls.hStack);
    });

    test('should return gap class based on gap value', () => {
        const result = getFlexClasses({ gap: 8 as unknown as FlexGap });
        expect(result).toContain(cls.gap8);
    });
    test('should return classes correctly when gap is set to 0', () => {
        const result = getFlexClasses({ gap: 0 as unknown as FlexGap });
        expect(result).toContain(cls.gap0);
    });

    test('should return justify class based on justify value', () => {
        const result = getFlexClasses({ justify: 'center' });
        expect(result).toContain(cls.justifyCenter);
    });

    test('should return align class based on align value', () => {
        const result = getFlexClasses({ align: 'start' });
        expect(result).toContain(cls.alignStart);
    });

    test('should return multiple classes when multiple options are provided', () => {
        const result = getFlexClasses({
            vStack: true,
            gap: 16 as unknown as FlexGap,
            justify: 'between',
            align: 'end',
        });
        expect(result).toContain(cls.vStack);
        expect(result).toContain(cls.gap16);
        expect(result).toContain(cls.justifyBetween);
        expect(result).toContain(cls.alignEnd);
    });

    test('should return an empty array when no options are provided', () => {
        const result = getFlexClasses({});
        expect(result).toEqual([]);
    });

    test('should return classes correctly when using default values', () => {
        // Assuming default values should be applied when no specific class is provided
        const result = getFlexClasses({
            vStack: false,
            hStack: false,
            gap: undefined,
            justify: undefined,
            align: undefined,
        });
        expect(result).toEqual([]);
    });
});
