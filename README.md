
# HttpRequestCache

HttpRequestCache is a simple Node.js package for caching HTTP GET requests using the Node.js `node-cache` library. Requests are made with `axios`.

## Installation

You can install HttpRequestCache via npm:
`npm install http-request-cache`

## Usage 
```javascript 
const HttpRequestCache = require('http-request-cache'); // Create a new instance of HttpRequestCache with optional TTL (time-to-live) and checkperiod options 
const cache = new HttpRequestCache({ ttl: 60, checkperiod: 120 }); // Make HTTP GET requests and cache the responses 
const url = 'https://api.example.com/data'; 
const responseData = await cache.get(url); 
cache.clearCache(); // Clear the cache
```

## Options

-   `ttl`: The time-to-live (in seconds) for cached entries. Default is 60 seconds.
-   `checkperiod`: The frequency (in seconds) at which the cache will check for expired entries. Default is 120 seconds.

## Contributing

Contributions are welcome! If you find any bugs or have suggestions for improvements, please open an issue or submit a pull request.

## License
This project is licensed under the MIT License - see the LICENSE file for details.
