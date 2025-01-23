async function fetchUrlsWithConcurrency(urls, maxConcurrency) {
    const threads = []; // I'll store n (n === maxConcurrency) promises here in order to wait for all to finish with Promise.all
    const results = []; // Here I'll store the results of all the promises

    let currentArrayOfUrlsIndex = 0; // In order to travel the calls array, from 0 to urls.length-1

    // While there are still requests that have not been called, the thread should call them.
    async function thread() {
        while (currentArrayOfUrlsIndex < urls.length) {
            const currentIndex = currentArrayOfUrlsIndex;
            ++currentArrayOfUrlsIndex;
            const fetchResponse =  await fetch(urls[currentIndex])
            const jsonResponse = await fetchResponse.json()
            results.push(jsonResponse)
        }
    }

    // I create as many threads as the maxConcurrency lets me
    async function createThreads() {
        const concurrency = Math.min(maxConcurrency, urls.length)
        for (let i = 0; i < concurrency; ++i) {
            threads.push(thread())
        }
    }

     await createThreads()
     await Promise.all(threads) // I way all threads to finish
     return results
}


async function main() {
    const urls = [
        "https://api.github.com/users/msoler95/repos",
        "https://api.github.com/users/msoler95/repos",
        "https://api.github.com/users/msoler95/repos",
        "https://api.github.com/users/msoler95/repos",
        "https://api.github.com/users/msoler95/repos",
        "https://api.github.com/users/msoler95/repos",
    ]
    console.log(await fetchUrlsWithConcurrency(urls, 2))
}
main()

module.exports = fetchUrlsWithConcurrency;