/**
 * Interface representing the state of the add comment form.
 *
 * @property {string} [text] - The text content of the comment. Optional.
 * @property {string} [error] - An error message related to the form. Optional.
 */

export interface AddCommentFormSchema {
    text?: string;
    error?: string;
}
