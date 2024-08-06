import { User } from '@/entities/User';

/**
 * Interface representing a comment made by a user.
 *
 * @property {string} id - The unique identifier for the comment. This value is required.
 * @property {User} user - The user who made the comment. This value is required.
 * @property {string} text - The content of the comment. This value is required.
 */

export interface Comment {
    id: string;
    user: User;
    text: string;
}
