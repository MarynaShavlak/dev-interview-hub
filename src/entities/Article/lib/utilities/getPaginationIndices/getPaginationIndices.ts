export const getPaginationIndices = ({
    page,
    limit,
}: {
    page: number;
    limit: number;
}) => {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    return { startIndex, endIndex };
};
