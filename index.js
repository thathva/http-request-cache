const axios = require('axios');
const NodeCache = require('node-cache');

class HttpRequestCache {
    constructor(options = {}) {
        this.cache = new NodeCache({ stdTTL: options.ttl || 60, checkperiod: options.checkperiod || 120 });
    }

    async get(url, options = {}) {
        const cacheKey = this._generateCacheKey(url, options.params);

        // Check in-memory cache
        let cachedData = this.cache.get(cacheKey);
        if (cachedData) {
            return cachedData;
        }

        // Make HTTP request
        const response = await axios.get(url, options);
        const data = response.data;

        // Cache the response
        this.cache.set(cacheKey, data);

        return data;
    }

    clearCache() {
        this.cache.flushAll();
    }

    _generateCacheKey(url, params = {}) {
        const paramString = Object.keys(params).sort().map(key => `${key}=${params[key]}`).join('&');
        return `${url}?${paramString}`;
    }
}

module.exports = HttpRequestCache;
