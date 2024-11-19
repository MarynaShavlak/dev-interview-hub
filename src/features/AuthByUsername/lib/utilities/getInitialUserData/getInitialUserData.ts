import { User, UserRole } from '@/entities/User';
import { Theme } from '@/shared/const/theme';

export const getInitialUserData = (): Partial<User> => {
    return {
        city: '',
        roles: [UserRole.USER],
        features: {
            isArticleRatingEnabled: true,
            isAppRedesigned: true,
        },
        jsonSettings: {
            theme: Theme.LIGHT,
            isFirstVisit: true,
            settingsPageHasBeenOpen: false,
            isArticlesPageWasOpened: false,
        },
    };
};
