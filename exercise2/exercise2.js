function toBase26(val, length) {
    let result = '';
    for (let i = 0; i < length; i++) {
        const remainder = val % 26;
        const letter = String.fromCharCode(65 + remainder);
        result = letter + result;
        val = Math.floor(val / 26);
    }
    return result;
}


function findIntervalIndex(n, intervals) {
    for (let i = 0; i < intervals.length; ++i) {
        if (i === 0 && n < intervals[i]) return i
        else if (n >= intervals[i-1] && n < intervals[i]) return i
    }
    throw new Error('Out of range')
}


function getLicense(n) {


    const numberOfLettersInTheAlphabet = 26

    // I'm trying to know given the n, where the letter should go.
    // Then if I know where the letters go (right part) i also know where the number goes (left part)
    // And later if I do interval module n, i will get the letters of right part.
    // And later if I do interval divided n, i will get the numbers of left part.
    // There will be 7 intervals where the n could fit.
    const intervals = [
        10**6, // no letters: from 0 to 10^6
        10**5 * numberOfLettersInTheAlphabet,  // -----X: from 10^6-1 to 10^5 * numberOfLettersInTheAlphabet. The 10^5 represents the left side of the plate and the numberOfLettersInTheAlphabet is the right
        10**4 * numberOfLettersInTheAlphabet**2,  // ----XX
        10**3 * numberOfLettersInTheAlphabet**3,  // ---XXX
        10**2 * numberOfLettersInTheAlphabet**4,  // --XXXX
        10*numberOfLettersInTheAlphabet**5,  // -XXXXX
        numberOfLettersInTheAlphabet**6,  // XXXXXX
    ]
    const intervalIndex = findIntervalIndex(n, intervals);
    console.log('intervalIndex', intervalIndex)
    //The interval number of letters on the right side is equal to the intervalIndex (right side)
    const numberOfLettersInRightSide = intervalIndex;
    //And 6-numberOfLettersInRightSide is equal to the number of digits on the left side
    const numbersOfDigitsInLeftSide = 6-numberOfLettersInRightSide;

    //Convert the digit index to a zero-padded string of length (6 - b) (leading zeros).
    const leftNumber =Math.floor( intervalIndex === 0 ? n : ( intervals[intervalIndex] / n ))
    const rightNumber = intervalIndex=== 0 ? "" : toBase26(intervals[intervalIndex] % n )
    console.log('leftNumber', leftNumber)
    console.log('rightNumber', rightNumber)
    return leftNumber.toString()+rightNumber.toString()




}
console.log('result', getLicense(999999))
console.log('result', getLicense(1000000))
console.log('result', getLicense(10000000))
console.log('result', getLicense(100000000))

//console.log(getLicense(10000000000))