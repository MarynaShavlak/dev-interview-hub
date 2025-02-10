import { User, UserRole } from '@/entities/User';
import { getThemeBasedOnTime } from '../getThemeBasedOnTime/getThemeBasedOnTime';

export const getInitialUserData = (): Partial<User> => {
    return {
        roles: [UserRole.USER],
        features: {
            isArticleRatingEnabled: Math.random() < 0.5,
            isAppRedesigned: Math.random() < 0.5,
        },
        jsonSettings: {
            theme: getThemeBasedOnTime(),
            isFirstVisit: true,
            settingsPageHasBeenOpen: false,
            isArticlesPageWasOpened: false,
        },
    };
};
