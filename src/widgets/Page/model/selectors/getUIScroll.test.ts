import { getUIScroll, getUIScrollByPath } from './getUIScroll'; // Adjust the import path
import { StateSchema } from '@/app/providers/StoreProvider';

describe('Selectors', () => {
    test('getUIScroll should return the complete scroll state', () => {
        const state: DeepPartial<StateSchema> = {
            scroll: {
                scroll: {
                    x: 100,
                    y: 200,
                },
            },
        };

        expect(getUIScroll(state as StateSchema)).toEqual(state.scroll?.scroll);
    });

    test('getUIScroll should return undefined when scroll is not defined', () => {
        const state: DeepPartial<StateSchema> = {
            scroll: {},
        };

        expect(getUIScroll(state as StateSchema)).toEqual(undefined);
    });

    test('getUIScrollByPath should return the correct scroll value for the given path', () => {
        const state: DeepPartial<StateSchema> = {
            scroll: {
                scroll: {
                    x: 100,
                    y: 200,
                },
            },
        };

        expect(getUIScrollByPath(state as StateSchema, 'x')).toEqual(100);
        expect(getUIScrollByPath(state as StateSchema, 'y')).toEqual(200);
    });

    test('getUIScrollByPath should return 0 for an unknown path', () => {
        const state: DeepPartial<StateSchema> = {
            scroll: {
                scroll: {
                    x: 100,
                    y: 200,
                },
            },
        };

        expect(getUIScrollByPath(state as StateSchema, 'z')).toEqual(0);
    });

    test('getUIScrollByPath should return 0 when the scroll state is defined but the path is missing', () => {
        const state: DeepPartial<StateSchema> = {
            scroll: {
                scroll: {
                    y: 200,
                },
            },
        };

        expect(getUIScrollByPath(state as StateSchema, 'x')).toEqual(0);
    });
});
