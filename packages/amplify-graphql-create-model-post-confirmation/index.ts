import { isEven } from '@amplifiers/amplify-graphql-amplifiers-core';

export function isOdd(i: number): boolean {
    return isEven(i) === false;
}