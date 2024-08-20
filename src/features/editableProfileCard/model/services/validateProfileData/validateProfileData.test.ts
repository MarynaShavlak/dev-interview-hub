import { ValidateProfileError } from '../../consts/consts';
import { testProfileData } from '@/entities/Profile/testing';
import { validateProfileData } from './validateProfileData';

describe('validateProfileData.test', () => {
    test('success', async () => {
        const result = validateProfileData(testProfileData);

        expect(result).toEqual([]);
    });

    test('without first and last name', async () => {
        const result = validateProfileData({
            ...testProfileData,
            firstname: '',
            lastname: '',
        });

        expect(result).toEqual([ValidateProfileError.INCORRECT_USER_DATA]);
    });

    test('without username', async () => {
        const result = validateProfileData({
            ...testProfileData,
            username: '',
        });

        expect(result).toEqual([ValidateProfileError.INCORRECT_USERNAME]);
    });

    test('incorrect age', async () => {
        const result = validateProfileData({
            ...testProfileData,
            age: undefined,
        });

        expect(result).toEqual([ValidateProfileError.INCORRECT_AGE]);
    });

    test('incorrect all', async () => {
        const result = validateProfileData({});

        expect(result).toEqual([
            ValidateProfileError.INCORRECT_USER_DATA,
            ValidateProfileError.INCORRECT_USERNAME,
            ValidateProfileError.INCORRECT_AGE,
        ]);
    });
});
