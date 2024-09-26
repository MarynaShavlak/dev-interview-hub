import { trimText } from './trimText';

describe('shared/lib/trimText', () => {
    test('should trim leading and trailing whitespace from a string', () => {
        const result = trimText('   Hello, World!   ');
        expect(result).toBe('Hello, World!');
    });
    test('should trim leading whitespace from a string', () => {
        const result = trimText('   Hello, World!');
        expect(result).toBe('Hello, World!');
    });

    test('should trim trailing whitespace from a string', () => {
        const result = trimText('Hello, World!   ');
        expect(result).toBe('Hello, World!');
    });

    test('should return an empty string if the input is undefined', () => {
        const result = trimText(undefined);
        expect(result).toBe('');
    });
    // Since TypeScript does not directly allow null for string,
    // casting it to string (null as unknown as string) is used to match the function's type signature in the test.
    test('should return an empty string if the input is null', () => {
        const result = trimText(null as unknown as string);
        expect(result).toBe('');
    });

    test('should return an empty string if the input is an empty string', () => {
        const result = trimText('');
        expect(result).toBe('');
    });
    test('should handle a string that only contains whitespace', () => {
        const result = trimText('     ');
        expect(result).toBe('');
    });

    test('should handle a string that is already trimmed', () => {
        const result = trimText('Trimmed');
        expect(result).toBe('Trimmed');
    });

    test('should handle a string with multiple spaces between words', () => {
        const result = trimText('Hello,    World!');
        expect(result).toBe('Hello,    World!');
    });
});
