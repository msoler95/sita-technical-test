async function fetchURLsWithConcurrency(urls, maxConcurrency) {
    const calls = [];
    for (let i = 0; i < urls.length; ++i) {
        calls.push( (await fetch(urls[i])).json())
    }

    const result =  await Promise.all(calls)
    return result
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