export type Gap = '4' | '8' | '16' | '32';
export type Justify = 'start' | 'center' | 'end' | 'between';
export type Align = 'start' | 'center' | 'end';

export interface StackProps {
    gap?: Gap;
    justify?: Justify;
    align?: Align;
}
