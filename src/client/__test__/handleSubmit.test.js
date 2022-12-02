import { handleSubmit } from '../js/formHandler'

describe('Get Sentiment Analysis function', () => {
    test('Check that the handleSubmit function is not undefined', () => {
        expect(handleSubmit).toBeDefined();
    });
});
