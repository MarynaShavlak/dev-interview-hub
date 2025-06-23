import { CSSProperties } from 'react';

export const getBtnsListStyles = (topPosition: number): CSSProperties => {
    return topPosition <= 0
        ? { position: 'fixed', top: '0px', marginTop: '0' }
        : { position: 'relative', marginTop: '-16px' }; // Use relative instead of static
};

export const getBtnsListDeprecatedStyles = (
    topPosition: number,
): CSSProperties => {
    return topPosition <= 0
        ? { position: 'fixed', top: '100px', marginTop: '0' }
        : { position: 'relative', marginTop: '-16px' };
};
