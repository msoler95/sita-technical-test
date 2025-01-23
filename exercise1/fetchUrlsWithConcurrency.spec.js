const fetchUrlsWithConcurrency = require('./fetchUrlsWithConcurrency');

describe('fetchUrlsWithConcurrency', () => {

    // Later I'll check maxActiveRequests is never more than maxConcurrency
    let activeRequests = 0;
    let maxActiveRequests = 0;
    // Store the results
    let results;

    // Inputs
    const urls = [
        'https://test.com',
        'https://test.com',
        'https://test.com',
        'https://test.com',
        'https://test.com'
    ];
    // For example a max concurrency of 2
    const maxConcurrency = 2;

    // Outputs
    const fakeResultForEachCall = 'a-fake-test-result'



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
                    const body = JSON.stringify({ url, data: fakeResultForEachCall });
                    resolve(new Response(body, {
                        status: 200,
                        headers: { 'Content-Type': 'application/json' },
                    }));
                }, 1); //Timout total time doesn't matter.
            });
        });
        results = await fetchUrlsWithConcurrency(urls, maxConcurrency);


    });

    // First test: Check that maximum active requests is less than the maximum concurrency defined.
    it('The maximum of active requests at the same time, should not exceed the given maxConcurrency', async () => {
        expect(maxActiveRequests).toBeLessThanOrEqual(maxConcurrency);
    });

    // Second test: Check each request returns the correct response (in this case fakeResultForEachCall)
    it('should return the correct results for each URL', async () => {
        expect(results.length).toBe(urls.length);

        results.forEach((item, index) => {
            expect(item.url).toBe(urls[index]);
            expect(item.data).toBe(fakeResultForEachCall);
        });
    });
});
