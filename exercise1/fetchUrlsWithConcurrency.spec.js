const fetchUrlsWithConcurrency = require('./fetchUrlsWithConcurrency');

describe('fetchUrlsWithConcurrency', () => {

    // For example a max concurrency of 2
    const maxConcurrency = 2;
    // Later I'll check maxActiveRequests is never more than maxConcurrency
    let activeRequests = 0;
    let maxActiveRequests = 0;

    const urls = [
        'https://test.com',
        'https://test.com',
        'https://test.com',
        'https://test.com',
        'https://test.com'
    ];



    beforeAll(async () => {
        // The only thing is faking the fetch and measuring the active requests.
        // So I can prove the function respects the concurrency.
        spyOn(global, 'fetch').and.callFake((url) => {
            activeRequests++;
            maxActiveRequests = Math.max(maxActiveRequests, activeRequests);


            return new Promise((resolve) => {
                setTimeout(() => {
                    activeRequests--;
                    // Return a JSON response that i will test later
                    const body = JSON.stringify({ url, data: 'test-data' });
                    resolve(new Response(body, {
                        status: 200,
                        headers: { 'Content-Type': 'application/json' },
                    }));
                }, 1); //Timout doesn't matter.
            });
        });


    });

    it('The maximum of active requests at the same time, should not exceed the given maxConcurrency', async () => {
        results = await fetchUrlsWithConcurrency(urls, maxConcurrency);
        expect(maxActiveRequests).toBeLessThanOrEqual(maxConcurrency);
    });
});
