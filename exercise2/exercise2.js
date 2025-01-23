function findIntervalIndex(n, intervals) {

    for (let i = 0; i < intervals.length; ++i) {
        console.log('iteration '+i+" interval " + intervals[i])
        if (i === 0 && n < intervals[i]) return i
        else if (n >= intervals[i-1] && n < intervals[i]) return i
    }
    throw new Error('Out of range')

}


function getLicense(n) {


    const numberOfLettersInTheAlphabet = 26

    // I'm trying to know given the n, where the letter should go.
    // There will be 7 intervals where the n could fit.
    // Then if I know where the letters go (right part) i also know where the number goes (left part)
    // And later if I do interval module n, i will get the letters of right part.
    // And later if I do interval divided n, i will get the numbers of left part.
    const intervals = [
        10**6, // no letters: from 0 to 10^6
        10**5 * numberOfLettersInTheAlphabet,  // -----X: from 10^6-1 to 10^5 * numberOfLettersInTheAlphabet. The 10^5 represents the left side of the plate and the numberOfLettersInTheAlphabet is the right
        10**4 * numberOfLettersInTheAlphabet**2,  // ----XX
        10**3 * numberOfLettersInTheAlphabet**3,  // ---XXX
        10**2 * numberOfLettersInTheAlphabet**4,  // --XXXX
        10*numberOfLettersInTheAlphabet**5,  // -XXXXX
        numberOfLettersInTheAlphabet**6,  // XXXXXX
    ]

    return findIntervalIndex(n, intervals)
}
console.log(getLicense(999999))
console.log(getLicense(1000000))
console.log(getLicense(10000000))
console.log(getLicense(100000000))

//console.log(getLicense(10000000000))