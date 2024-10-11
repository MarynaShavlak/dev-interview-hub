export interface ActiveUsersList {
    inArticles: Set<string>;
    inComments: Set<string>;
    inRatings: Set<string>;
}

export interface UsersActivityChartProps {
    totalUsers: number;
    activeUsersList: ActiveUsersList;
}
