function toBase26(val, length) {
    let result = '';
    for (let i = 0; i < length; i++) {
        const remainder = val % 26;
        const letter = String.fromCharCode(65 + remainder); // 'A'=65
        result = letter + result;
        val = Math.floor(val / 26);
    }
    return result;
}

function getLeftWith0(number, positions) {
    return number
        .toString()
        .padStart(positions, '0');
}

function getLettersAsLetters(rightLetters, numberOfLettersInRightSide) {
    return toBase26(rightLetters, numberOfLettersInRightSide)
}



function findIntervalIndex(n, intervals) {
    for (let i = 0; i < intervals.length; ++i) {
        // If n is less than intervals[i], it lies in block i
        if (n < intervals[i]) {
            return i;
        }
    }
    throw new Error('Out of range');
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
    // Now we accumulate the interval to know where n should fit
    for (let i = 1; i < intervals.length; i++) {
        intervals[i] += intervals[i - 1];
    }
    const intervalIndex = findIntervalIndex(n, intervals);
    //console.log('intervalIndex', intervalIndex)
    //The interval number of letters on the right side is equal to the intervalIndex (right side)
    const numberOfLettersInRightSide = intervalIndex;
    //And 6-numberOfLettersInRightSide is equal to the number of digits on the left side
    const numbersOfDigitsInLeftSide = 6-numberOfLettersInRightSide;
    //And the maximum posible digit to generate now in the left side is 10^numbersOfDigitsInLeftSide
    const maxiumPosibleDigitToGenerate =  10**(numbersOfDigitsInLeftSide);

    // how far inside the bloc we are
    let offset;
    if (intervalIndex === 0) {
        offset = n;
    } else {
        offset = n - intervals[intervalIndex - 1];
    }
    console.log('offset', offset)

    console.log('intervalIndex', intervalIndex)
    console.log('numberOfLettersInRightSide', numberOfLettersInRightSide)
    console.log('numbersOfDigitsInLeftSide', numbersOfDigitsInLeftSide)
    console.log('maxiumPosibleDigitToGenerate', maxiumPosibleDigitToGenerate)
    //The divider (without decimals) of n/maxiumPosibleDigitToGenerate are the letters (without converting to base 26)
    const rightLetters =Math.floor( offset / maxiumPosibleDigitToGenerate )
    //The remainer of n/maxiumPosibleDigitToGenerate are the digits without converting to base 26
    const leftDigits = offset % maxiumPosibleDigitToGenerate;
    console.log('before converting '+  leftDigits + "-"+rightLetters)
    const leftDigitsString = getLeftWith0(leftDigits, numbersOfDigitsInLeftSide)
    const rightLettersAsLetters = getLettersAsLetters(rightLetters, numberOfLettersInRightSide)
    return leftDigitsString +rightLettersAsLetters




}
console.log('number 999999')
console.log('result', getLicense(999999))
console.log('---')
console.log('number 1000001')
console.log('result', getLicense(1000001))
console.log('---')
console.log('number 10000000')
console.log('result', getLicense(10000000))
console.log('---')
console.log('number 100000000')
console.log('result', getLicense(100000000))

//console.log(getLicense(10000000000))