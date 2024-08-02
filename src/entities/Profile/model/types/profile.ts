import { Currency } from '@/entities/Currency';
import { Country } from '@/entities/Country';

/**
 * Interface representing a user profile.
 *
 * @property {string} [id] - Unique identifier for the user profile. Optional.
 * @property {string} [firstname] - First name of the user. Optional.
 * @property {string} [lastname] - Last name of the user. Optional.
 * @property {number} [age] - Age of the user. Optional.
 * @property {Currency} [currency] - The user's preferred currency. Optional.
 * @property {Country} [country] - The user's country of residence. Optional.
 * @property {string} [city] - The user's city of residence. Optional.
 * @property {string} [username] - The user's username. Optional.
 * @property {string} [avatar] - URL of the user's avatar image. Optional.
 */

export interface Profile {
    id?: string;
    firstname?: string;
    lastname?: string;
    age?: number;
    currency?: Currency;
    country?: Country;
    city?: string;
    username?: string;
    avatar?: string;
}
