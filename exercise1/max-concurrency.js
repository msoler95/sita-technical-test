async function fetchURLsWithConcurrency(urls, maxConcurrency) {
    const calls = [];
    async function createCall(url) {
        const fetchResponse =  await fetch(url)
        return await fetchResponse.json()
    }
    for (let i = 0; i < urls.length; ++i) {
        calls.push( createCall(urls[i]))
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