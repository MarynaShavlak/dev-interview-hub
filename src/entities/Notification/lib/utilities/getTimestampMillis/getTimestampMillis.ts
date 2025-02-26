export const getTimestampMillis = (timestamp: any): number => {
    if (!timestamp) return 0;

    if (typeof timestamp.toMillis === 'function') {
        return timestamp.toMillis();
    }

    if (
        typeof timestamp === 'string' &&
        timestamp.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/)
    ) {
        return new Date(timestamp).getTime();
    }

    if (typeof timestamp === 'number') {
        return timestamp;
    }

    if (timestamp instanceof Date) {
        return timestamp.getTime();
    }

    return 0;
};
