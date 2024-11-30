/**
 * Interface representing the rating and feedback for a given item.
 *
 * @property {number} rate - The numeric rating given to the item. This value is required.
 * @property {string} [feedback] - Optional feedback or comment related to the rating.
 */
import { User } from '@/entities/User';

export interface RatingData {
    rate: number;
    feedback: string | null;
    user: User;
}
