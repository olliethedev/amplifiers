import { isOdd } from "./index";

describe('isOdd', () => {
    test('it detects even numbers', () => {
        expect(isOdd(0)).toBe(false);
        expect(isOdd(2)).toBe(false);
    });

    test('it detects odd numbers', () => {
        expect(isOdd(1)).toBe(true);
        expect(isOdd(3)).toBe(true);
    });
});