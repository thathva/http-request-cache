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

    
    test('should handle cache expiration', async () => {
        const url = 'https://api.example.com/data';
        const responseData = { data: 'some data' };

        axios.get.mockResolvedValue({ data: responseData });

        await cache.get(url);
        await new Promise(resolve => setTimeout(resolve, 1500)); // wait for cache to expire
        await cache.get(url);

        expect(axios.get).toHaveBeenCalledTimes(2);
    });

})
