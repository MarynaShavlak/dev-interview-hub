/**
 * Interface representing feature flags for a user.
 *
 * @property {boolean} [isArticleRatingEnabled] - Indicates whether the article rating feature is enabled for the user. Optional.
 * @property {boolean} [isAppRedesigned] - Indicates whether the application is in a redesigned state. Optional.
 */

export interface FeatureFlags {
    isArticleRatingEnabled?: boolean;
    isAppRedesigned?: boolean;
}
