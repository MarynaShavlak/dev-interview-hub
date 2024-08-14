import { useEffect, useRef } from 'react';
import { VirtuosoGridHandle, VirtuosoHandle } from 'react-virtuoso';

export const useVirtuosoGrid = (scrollStopArticleIndex: number) => {
    const virtuosoGridRef = useRef<VirtuosoGridHandle>(null);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (virtuosoGridRef.current) {
                virtuosoGridRef.current.scrollToIndex({
                    index: scrollStopArticleIndex,
                    align: 'start',
                    behavior: 'smooth',
                });
            } else {
                console.warn(
                    'VirtuosoGridHandle ref is not available. Ensure the VirtuosoGrid component is mounted before attempting to scroll.',
                );
            }
        }, 100); // Delay slightly to ensure the component is fully rendered.

        return () => clearTimeout(timeoutId);
    }, [scrollStopArticleIndex]);

    return virtuosoGridRef;
};

export const useVirtuosoList = (scrollStopArticleIndex: number) => {
    const virtuosoListRef = useRef<VirtuosoHandle>(null);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (virtuosoListRef.current) {
                virtuosoListRef.current.scrollToIndex(scrollStopArticleIndex);
            } else {
                console.warn(
                    'VirtuosoHandle ref is not available. Ensure the Virtuoso component is mounted before attempting to scroll.',
                );
            }
        }, 100); // Delay slightly to ensure the component is fully rendered.

        return () => clearTimeout(timeoutId);
    }, [scrollStopArticleIndex]);

    return virtuosoListRef;
};

// import { useEffect, useRef } from 'react';
// import { VirtuosoGridHandle } from 'react-virtuoso';
// import { ArticleView } from '../../../../../entities/Article/model/consts/articleConsts';
//
// export const useVirtuosoGrid = (
//     view: ArticleView,
//     scrollStopArticleIndex: number,
// ) => {
//     const virtuosoGridRef = useRef<VirtuosoGridHandle>(null);
//
//     useEffect(() => {
//         let timeoutId: NodeJS.Timeout;
//         if (view === ArticleView.GRID) {
//             timeoutId = setTimeout(() => {
//                 if (virtuosoGridRef.current) {
//                     virtuosoGridRef.current.scrollToIndex(
//                         scrollStopArticleIndex,
//                     );
//                 } else {
//                     console.warn(
//                         'VirtuosoGridHandle ref is not available. Ensure the VirtuosoGrid component is mounted before attempting to scroll.',
//                     );
//                 }
//             }, 100);
//         }
//         return () => clearTimeout(timeoutId);
//     }, [scrollStopArticleIndex, view]);
//
//     return virtuosoGridRef;
// };

// import { useEffect, useRef } from 'react';
// import { VirtuosoGridHandle, VirtuosoHandle } from 'react-virtuoso';
// import { ArticleView } from '../../../../../entities/Article/model/consts/articleConsts';
//
// export const useVirtuosoGrid = (
//     view: ArticleView,
//     scrollStopArticleIndex: number,
// ) => {
//     const virtuosoGridRef = useRef<VirtuosoGridHandle>(null);
//     const virtuosoListRef = useRef<VirtuosoHandle>(null);
//
//     useEffect(() => {
//         const timeoutId = setTimeout(() => {
//             if (view === ArticleView.GRID && virtuosoGridRef.current) {
//                 virtuosoGridRef.current.scrollToIndex(scrollStopArticleIndex);
//             } else if (view === ArticleView.LIST && virtuosoListRef.current) {
//                 virtuosoListRef.current.scrollToIndex(scrollStopArticleIndex);
//             }
//         }, 100); // Delay slightly to ensure the component is fully rendered.
//
//         return () => clearTimeout(timeoutId);
//     }, [scrollStopArticleIndex, view]);
//
//     return { virtuosoGridRef, virtuosoListRef };
// };
