import { toggleFeatures } from '@/shared/lib/features';
import cls from '../../ui/StatisticsCharts/StatisticsCharts.module.scss';

export const chartsWrap = toggleFeatures({
    name: 'isAppRedesigned',
    off: () => cls.chartsWrapDeprecated,
    on: () => cls.chartsWrapRedesigned,
});
