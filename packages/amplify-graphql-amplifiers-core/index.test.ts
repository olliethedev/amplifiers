import * as Transformer from './index'
describe('amplify-graphql-amplifiers-core-transformer', () => {
    test('it exists', () => {
        expect(Transformer).toBeDefined();
    });
    test('it executes', () => {
        expect(()=>Transformer.placeholder()).not.toThrow();
    });
});