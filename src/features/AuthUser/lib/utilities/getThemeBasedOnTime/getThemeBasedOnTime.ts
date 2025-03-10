import { Theme } from '@/shared/const/theme';

export const getThemeBasedOnTime = (): Theme => {
    const currentHour = new Date().getHours();
    return currentHour >= 18 || currentHour < 6 ? Theme.DARK : Theme.LIGHT;
};
