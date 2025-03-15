import { ValidateProfileError } from '../../consts/consts';

import { validateProfileData } from './validateProfileData';
import { User } from '@/entities/User';
import { testUserData } from '@/entities/User/testing';

describe('validateProfileData test', () => {
    test('valid profile data', async () => {
        const result = validateProfileData(testUserData);

        expect(result).toEqual([]);
    });

    test('missing firstname and lastname', async () => {
        const result = validateProfileData({
            ...testUserData,
            firstname: '',
            lastname: '',
        });

        expect(result).toEqual([ValidateProfileError.INCORRECT_USER_DATA]);
    });

    test('missing username', async () => {
        const result = validateProfileData({
            ...testUserData,
            username: '',
        });

        expect(result).toEqual([ValidateProfileError.INCORRECT_USERNAME]);
    });

    test('missing age', async () => {
        const result = validateProfileData({
            ...testUserData,
            age: undefined,
        });

        expect(result).toEqual([ValidateProfileError.INCORRECT_AGE]);
    });

    test('age is not an integer', () => {
        const result = validateProfileData({
            ...testUserData,
            age: '25.5',
        });

        expect(result).toEqual([ValidateProfileError.INCORRECT_AGE]);
    });

    test('incorrect all', async () => {
        const result = validateProfileData({} as User);

        expect(result).toEqual([
            ValidateProfileError.INCORRECT_USER_DATA,
            ValidateProfileError.INCORRECT_USERNAME,
            ValidateProfileError.INCORRECT_AGE,
        ]);
    });

    test('profile with only correct username', () => {
        const result = validateProfileData({
            ...testUserData,
            firstname: '',
            lastname: '',
            age: undefined,
        });

        expect(result).toEqual([
            ValidateProfileError.INCORRECT_USER_DATA,
            ValidateProfileError.INCORRECT_AGE,
        ]);
    });

    test('profile with valid data but empty profile object', () => {
        const result = validateProfileData({
            firstname: '',
            lastname: '',
            username: '',
            age: '',
        });

        expect(result).toEqual([
            ValidateProfileError.INCORRECT_USER_DATA,
            ValidateProfileError.INCORRECT_USERNAME,
            ValidateProfileError.INCORRECT_AGE,
        ]);
    });

    test('profile with valid fields but missing profile object', () => {
        const result = validateProfileData(undefined);

        expect(result).toEqual([ValidateProfileError.NO_DATA]);
    });
});
