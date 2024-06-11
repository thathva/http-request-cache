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
    
        // First request should fetch data from the server
        const data1 = await cache.get(url);
        // Wait for cache to expire
        await new Promise(resolve => setTimeout(resolve, 1100));
        // Second request should fetch data from the server due to cache expiration
        const data2 = await cache.get(url);
    
        expect(axios.get).toHaveBeenCalledTimes(2);
        expect(data1).toEqual(responseData);
        expect(data2).toEqual(responseData);
    });
})    