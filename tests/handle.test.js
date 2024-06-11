const axios = require('axios');
const HttpRequestCache = require('../index');

// Mock axios for testing
jest.mock('axios');

describe('HttpRequestCache', () => {
    let cache;

    beforeEach(() => {
        cache = new HttpRequestCache({ ttl: 1, useFileCache: false });
    });

    afterEach(() => {
        cache.clearCache();
    });

    test('should clear cache', async () => {
        const url = 'https://api.example.com/data';
        const responseData = { data: 'some data' };

        axios.get.mockResolvedValue({ data: responseData });

        await cache.get(url);
        cache.clearCache();
        await cache.get(url);

        expect(axios.get).toHaveBeenCalledTimes(2);
    });
})