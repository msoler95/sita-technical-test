async function fetchURLsWithConcurrency(urls, maxConcurrency) {
    const calls = []; // I'll store all promises here in order to wait for all to finish with Promise.all
    let currentConcurrency = 0; // I'll count how many fetch requests there are in parallel in order to block more fetch requests form executing
    let maxIndexToRun = Math.min(urls.length, maxConcurrency);  // Fetch urls in order
    async function createCall(i, url) {

        while(i > maxIndexToRun && currentConcurrency <= maxConcurrency) {
            //Here I'll wait until some priority fetch request have finish
        }
        ++currentConcurrency;
        const fetchResponse =  await fetch(url)
        const jsonResponse = await fetchResponse.json()
        --currentConcurrency;
        ++maxIndexToRun;
        return jsonResponse

    }
    for (let i = 0; i < urls.length; ++i) {
        // I'll call of the promises, but some of them will
        // take some time to finish because of the concurrency
        calls.push(createCall(i, urls[i]))
    }

    return await Promise.all(calls)
}

async function run() {
    const urls = [
        "https://api.github.com/users/msoler95/repos",
        "https://api.github.com/users/msoler95/repos",
        "https://api.github.com/users/msoler95/repos",
        "https://api.github.com/users/msoler95/repos",
        "https://api.github.com/users/msoler95/repos",
        "https://api.github.com/users/msoler95/repos",
    ]
    const results = await fetchURLsWithConcurrency(urls, 2);
    console.log('results', results)
}
run()