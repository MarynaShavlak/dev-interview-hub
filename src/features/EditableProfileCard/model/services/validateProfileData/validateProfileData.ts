import { ValidateProfileError } from '../../consts/consts';
import { User } from '@/entities/User';

export const validateProfileData = (profile?: Partial<User>) => {
    if (!profile) {
        return [ValidateProfileError.NO_DATA];
    }

    const { firstname, lastname, age, username } = profile;
    const errors: ValidateProfileError[] = [];

    if (!firstname || !lastname) {
        errors.push(ValidateProfileError.INCORRECT_USER_DATA);
    }
    if (!username) {
        errors.push(ValidateProfileError.INCORRECT_USERNAME);
    }

    if (age !== undefined && !Number.isInteger(Number(age))) {
        errors.push(ValidateProfileError.INCORRECT_AGE);
    }

    return errors;
};
