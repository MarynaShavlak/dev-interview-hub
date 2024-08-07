/**
 * Type representing a schema for scroll positions.
 * This type maps string keys to numerical scroll positions.
 */

export type ScrollSchema = Record<string, number>;

/**
 * Interface representing the UI scroll schema.
 * @property {ScrollSchema} scroll - An object where keys are string identifiers and values are numerical scroll positions.
 */

export interface UIScrollSchema {
    scroll: ScrollSchema;
}
