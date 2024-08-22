import { scrollActions, scrollReducer } from './scrollSlice';
import { UIScrollSchema } from '../types/ScrollSchema';

describe('scrollSlice tests', () => {
    const initialState: UIScrollSchema = {
        scroll: {},
    };

    test('should return the initial state', () => {
        expect(scrollReducer(undefined, { type: '' })).toEqual(initialState);
    });

    test('should handle setScrollPosition action', () => {
        const path = 'mainPage';
        const position = 100;
        const expectedState: UIScrollSchema = {
            scroll: {
                [path]: position,
            },
        };

        expect(
            scrollReducer(
                initialState,
                scrollActions.setScrollPosition({ path, position }),
            ),
        ).toEqual(expectedState);
    });

    test('should update scroll position for multiple paths', () => {
        const initialStateWithScroll: UIScrollSchema = {
            scroll: {
                mainPage: 50,
                aboutPage: 150,
            },
        };

        const newPath = 'settingsPage';
        const newPosition = 200;
        const expectedState: UIScrollSchema = {
            scroll: {
                mainPage: 50,
                aboutPage: 150,
                [newPath]: newPosition,
            },
        };

        expect(
            scrollReducer(
                initialStateWithScroll,
                scrollActions.setScrollPosition({
                    path: newPath,
                    position: newPosition,
                }),
            ),
        ).toEqual(expectedState);
    });

    test('should update existing scroll position', () => {
        const initialStateWithScroll: UIScrollSchema = {
            scroll: {
                mainPage: 50,
            },
        };

        const updatedPosition = 75;
        const expectedState: UIScrollSchema = {
            scroll: {
                mainPage: updatedPosition,
            },
        };

        expect(
            scrollReducer(
                initialStateWithScroll,
                scrollActions.setScrollPosition({
                    path: 'mainPage',
                    position: updatedPosition,
                }),
            ),
        ).toEqual(expectedState);
    });

    test('should handle setScrollPosition with empty path', () => {
        const position = 100;
        const expectedState: UIScrollSchema = {
            scroll: {
                '': position,
            },
        };

        expect(
            scrollReducer(
                initialState,
                scrollActions.setScrollPosition({ path: '', position }),
            ),
        ).toEqual(expectedState);
    });

    test('should handle setScrollPosition with negative position', () => {
        const path = 'mainPage';
        const position = -50;
        const expectedState: UIScrollSchema = {
            scroll: {
                [path]: position,
            },
        };

        expect(
            scrollReducer(
                initialState,
                scrollActions.setScrollPosition({ path, position }),
            ),
        ).toEqual(expectedState);
    });
});
