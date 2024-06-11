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

    test('should handle cache hit and miss', async () => {
        const url1 = 'https://api.example.com/data';
        const url2 = 'https://api.example.com/otherdata';
        const responseData1 = { data: 'some data' };
        const responseData2 = { data: 'other data' };

        axios.get.mockResolvedValueOnce({ data: responseData1 });
        axios.get.mockResolvedValueOnce({ data: responseData2 });

        // First request to url1 should fetch data from the server
        const data1a = await cache.get(url1);
        // Second request to url1 should retrieve cached data
        const data1b = await cache.get(url1);
        // Request to url2 should fetch data from the server
        const data2 = await cache.get(url2);

        expect(axios.get).toHaveBeenCalledTimes(2);
        expect(data1a).toEqual(responseData1);
        expect(data1b).toEqual(responseData1);
        expect(data2).toEqual(responseData2);
    });
})