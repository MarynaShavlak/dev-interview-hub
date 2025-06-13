import { useUserAuthData } from '@/entities/User';
import ArticleIconDeprecated from '@/shared/assets/icons/article-20-20.svg';
import ArticleIcon from '@/shared/assets/icons/article.svg';
import ProfileIcon from '@/shared/assets/icons/avatar.svg';
import MainIcon from '@/shared/assets/icons/home.svg';
import LibIcon from '@/shared/assets/icons/lib.svg';
import LibIconDeprecated from '@/shared/assets/icons/edit.svg';
import MainIconDeprecated from '@/shared/assets/icons/main-20-20.svg';
import ProfileIconDeprecated from '@/shared/assets/icons/profile-20-20.svg';
import QuizIcon from '@/shared/assets/icons/quiz.svg';
import LinkIcon from '@/shared/assets/icons/link.svg';
import InterviewIcon from '@/shared/assets/icons/interview.svg';
import EnglishIcon from '@/shared/assets/icons/english.svg';
import {
    getRouteArticles,
    getRouteEnglish,
    getRouteHRInterview,
    getRouteMain,
    getRouteMyArticles,
    getRouteProfile,
    getRouteUsefulLinks,
} from '@/shared/const/router/router';
import { toggleFeatures } from '@/shared/lib/features';
import { SidebarItemType } from '../../../model/types/sidebar';

/**
 * Custom hook for managing sidebar items based on user authentication and feature toggles.
 * This hook generates a list of sidebar items with appropriate icons and paths, including
 * conditional items for authenticated users.
 *
 * @returns {{
 *    sidebarItemsList: SidebarItemType[];
 *  }} An array of sidebar item objects with the following properties:
 *  * `path`: string - The route path for the sidebar item.
 *  * `Icon`: React.ComponentType - The icon component associated with the sidebar item.
 *  * `text`: string - The display text for the sidebar item.
 *  * `authOnly`: boolean - (Optional) Indicates whether the sidebar item should only be visible to authenticated users.
 *
 */

export const useSidebarItems = () => {
    const userData = useUserAuthData();

    const sidebarItemsList: SidebarItemType[] = [
        {
            path: getRouteMain(),
            Icon: toggleFeatures({
                name: 'isAppRedesigned',
                off: () => MainIconDeprecated,
                on: () => MainIcon,
            }),
            text: 'Головна',
        },
    ];

    if (userData) {
        sidebarItemsList.push(
            {
                path: getRouteProfile(userData.id),
                Icon: toggleFeatures({
                    name: 'isAppRedesigned',
                    off: () => ProfileIconDeprecated,
                    on: () => ProfileIcon,
                }),
                text: 'Профіль',
                authOnly: true,
            },
            {
                path: getRouteArticles(),
                Icon: toggleFeatures({
                    name: 'isAppRedesigned',
                    off: () => ArticleIconDeprecated,
                    on: () => ArticleIcon,
                }),
                text: 'Статті',
                authOnly: true,
            },
            {
                path: getRouteMyArticles(),
                Icon: toggleFeatures({
                    name: 'isAppRedesigned',
                    off: () => LibIconDeprecated,
                    on: () => LibIcon,
                }),
                text: 'Мої статті',
                authOnly: true,
            },
            {
                path: getRouteHRInterview(),
                Icon: toggleFeatures({
                    name: 'isAppRedesigned',
                    off: () => InterviewIcon,
                    on: () => InterviewIcon,
                }),
                text: 'HR Співбесіда',
                authOnly: true,
            },
            {
                path: getRouteUsefulLinks(),
                Icon: toggleFeatures({
                    name: 'isAppRedesigned',
                    off: () => LinkIcon,
                    on: () => LinkIcon,
                }),
                text: 'Посилання',
                authOnly: true,
            },
            {
                path: getRouteEnglish(),
                Icon: toggleFeatures({
                    name: 'isAppRedesigned',
                    off: () => EnglishIcon,
                    on: () => EnglishIcon,
                }),
                text: 'Англійська',
                authOnly: true,
            },
            {
                path: 'https://marynashavlak.github.io/jt-types-conversations-quiz/',
                Icon: toggleFeatures({
                    name: 'isAppRedesigned',
                    off: () => QuizIcon,
                    on: () => QuizIcon,
                }),
                text: 'JS Quiz',
                target: '_blank',
            },
        );
    }

    return sidebarItemsList;
};
