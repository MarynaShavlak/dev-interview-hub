export const createActiveArticlesList = (
    withRating: number,
    withFeedback: number,
    withComments: number,
) => ({
    withRating: new Set(
        Array.from({ length: withRating }, (_, i) => `id-${i}`),
    ),
    withFeedback: new Set(
        Array.from({ length: withFeedback }, (_, i) => `id-${i}`),
    ),
    withComments: new Set(
        Array.from({ length: withComments }, (_, i) => `id-${i}`),
    ),
});
