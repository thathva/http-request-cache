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

    test('should cache HTTP GET requests', async () => {
        const url = 'https://api.example.com/data';
        const responseData = { data: 'some data' };

        axios.get.mockResolvedValue({ data: responseData });

        const data1 = await cache.get(url);
        const data2 = await cache.get(url);

        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(data1).toEqual(responseData);
        expect(data2).toEqual(responseData);
    });
});
