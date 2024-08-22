import { StateSchema } from '@/app/providers/StoreProvider';
import { getJsonSettings } from './getJsonSettings';

describe('getJsonSettings ', () => {
    test('should return jsonSettings from authData', () => {
        const jsonSettings = {
            isFirstVisit: true,
            isArticlesPageWasOpened: false,
        };
        const state: DeepPartial<StateSchema> = {
            user: {
                authData: {
                    jsonSettings,
                },
            },
        };
        expect(getJsonSettings(state as StateSchema)).toEqual(jsonSettings);
    });

    test('should return default settings with empty authData', () => {
        const state: DeepPartial<StateSchema> = {
            user: {},
        };
        expect(getJsonSettings(state as StateSchema)).toEqual({});
    });

    test('should return default settings with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getJsonSettings(state as StateSchema)).toEqual({});
    });
});
