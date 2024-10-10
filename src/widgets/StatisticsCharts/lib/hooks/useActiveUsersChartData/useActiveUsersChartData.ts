import { ActiveUsersList } from '../../../model/types/stats';
import { calculatePercentage } from '@/shared/lib/mathCalculations/calculatePercentage';

export const useActiveUsersChartData = (
    activeUsersList: ActiveUsersList,
    totalUsers: number,
): [number, number, number] => {
    const calculateActivePercentage = (activeSet: Set<string>) =>
        calculatePercentage(activeSet?.size ?? 0, totalUsers);

    const activeUsersData: [number, number, number] = [
        calculateActivePercentage(activeUsersList.inArticles),
        calculateActivePercentage(activeUsersList.inComments),
        calculateActivePercentage(activeUsersList.inRatings),
    ];
    return activeUsersData;
};
