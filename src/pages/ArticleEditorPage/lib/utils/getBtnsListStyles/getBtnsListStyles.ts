import { CSSProperties } from 'react';

export const getBtnsListStyles = (topPosition: number): CSSProperties => {
    return topPosition > 0
        ? { position: 'static', marginTop: '-16px' }
        : { position: 'fixed', top: '0px', marginTop: '0' };
};
