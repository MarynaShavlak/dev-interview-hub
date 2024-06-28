type Gap = '4' | '8' | '16' | '32';
type Justify = 'start' | 'center' | 'end' | 'between';
type Align = 'start' | 'center' | 'end';

interface HStackProps {
    gap?: Gap;
    justify?: Justify;
    align?: Align;
}

export function getHStack({
    gap,
    justify = 'start',
    align = 'center',
}: HStackProps) {
    const classes = ['Flex'];

    if (gap) {
        classes.push(`gap_${gap}`);
    }

    if (justify) {
        classes.push(
            `justify${justify.charAt(0).toUpperCase()}${justify.slice(1)}`,
        );
    }
    if (align) {
        classes.push(`align${align.charAt(0).toUpperCase()}${align.slice(1)}`);
    }

    return classes;
}
