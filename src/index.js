const MORSE_TABLE = {
    '.-':     'a',
    '-...':   'b',
    '-.-.':   'c',
    '-..':    'd',
    '.':      'e',
    '..-.':   'f',
    '--.':    'g',
    '....':   'h',
    '..':     'i',
    '.---':   'j',
    '-.-':    'k',
    '.-..':   'l',
    '--':     'm',
    '-.':     'n',
    '---':    'o',
    '.--.':   'p',
    '--.-':   'q',
    '.-.':    'r',
    '...':    's',
    '-':      't',
    '..-':    'u',
    '...-':   'v',
    '.--':    'w',
    '-..-':   'x',
    '-.--':   'y',
    '--..':   'z',
    '.----':  '1',
    '..---':  '2',
    '...--':  '3',
    '....-':  '4',
    '.....':  '5',
    '-....':  '6',
    '--...':  '7',
    '---..':  '8',
    '----.':  '9',
    '-----':  '0',
};

function decode(expr) {
    const charArray = expr.split("");
    const countRepeat = expr.length / 10;
    const morzeArray = [];
    let finishString = ""
    const prepareArray = splitArrayTenChar(charArray, countRepeat, newArray = []);

    prepareArray.forEach(miniArray => {
        const count = miniArray.length / 2;
        morzeArray.push(prepareArrayToMorze(miniArray, count, result = []));
    });

    const morzeStrings = translateToMorzeString(morzeArray);

    morzeStrings.forEach(item => {
        for (const key in MORSE_TABLE) {
            if (item === "") {
                finishString += " ";
                continue;
            }
            if (key === item) {
                finishString += MORSE_TABLE[key];
            }
        }
    }); 

    function translateToMorzeString(morzeArray) {
        const result = [];
        morzeArray.forEach(item => {
            const tempArray = item.map(code => {
                    if (code === "10") {
                        return ".";
                    } else if (code === "11") {
                        return "-";
                    } else {
                        return "";
                    }
                });
                result.push(tempArray.join(""));
            });
        return result;
    }

    function prepareArrayToMorze(array, count, result) {
        if (count === 0) return result;
        result.push(array.splice(0, 2).join(""));
        return prepareArrayToMorze(array, count - 1, result);
    }

    function splitArrayTenChar(charArray, countRepeat, newArray = []) {
        if (countRepeat === 0 ) return newArray
        newArray.push(charArray.splice(0, 10));
        return splitArrayTenChar(charArray, countRepeat - 1, newArray);
    }

    return finishString.replace(/\s+/g, " ");
}

module.exports = {
    decode
}