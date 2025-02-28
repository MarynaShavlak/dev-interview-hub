interface FirestoreSubscriptionParams<T> {
    subscriptionFn: (
        updateFn: (data: T) => void,
        dep: any,
    ) => (() => void) | undefined;
    updateFn: (data: T) => void;
    dependency: any;
    cacheDataLoaded: Promise<any>;
    cacheEntryRemoved: Promise<any>;
}

export const handleFirestoreSubscription = <T>({
    subscriptionFn,
    updateFn,
    dependency,
    cacheDataLoaded,
    cacheEntryRemoved,
}: FirestoreSubscriptionParams<T>) => {
    (async () => {
        await cacheDataLoaded;
        const unsubscribe = subscriptionFn(updateFn, dependency);
        await cacheEntryRemoved;
        if (unsubscribe) {
            unsubscribe(); // Ensures we only call unsubscribe if it is defined
        }
    })();
};
