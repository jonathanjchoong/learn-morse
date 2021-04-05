// This script is to implement some useful functions and objects that will be used accross
// all learning pages.

const translator = {}
// Defining objects to look up letters and morse.
translator.letter_to_morse = // Source https://gist.github.com/mohayonao/094c71af14fe4791c5dd
{
    "0": "-----",
    "1": ".----",
    "2": "..---",
    "3": "...--",
    "4": "....-",
    "5": ".....",
    "6": "-....",
    "7": "--...",
    "8": "---..",
    "9": "----.",
    "a": ".-",
    "b": "-...",
    "c": "-.-.",
    "d": "-..",
    "e": ".",
    "f": "..-.",
    "g": "--.",
    "h": "....",
    "i": "..",
    "j": ".---",
    "k": "-.-",
    "l": ".-..",
    "m": "--",
    "n": "-.",
    "o": "---",
    "p": ".--.",
    "q": "--.-",
    "r": ".-.",
    "s": "...",
    "t": "-",
    "u": "..-",
    "v": "...-",
    "w": ".--",
    "x": "-..-",
    "y": "-.--",
    "z": "--..",
    ".": ".-.-.-",
    ",": "--..--",
    "?": "..--..",
    "!": "-.-.--",
    "-": "-....-",
    "/": "-..-.",
    "@": ".--.-.",
    "(": "-.--.",
    ")": "-.--.-"
}

//Turning the keys of letter_to_morse into entries and entries into keys.
translator.morse_to_letter = {};
for (let tuple of Object.entries(translator.letter_to_morse)) {
    translator.morse_to_letter[tuple[1]] = tuple[0];
}
// ============================

// Defining some useful functions
translator.func = {};
translator.func.word_to_morse = function (word) {//Takes a word and returns an array of morse code
    word = word.toLowerCase()
    output = []
    for (i = 0; i < word.length; i++) {
        output.push(translator.letter_to_morse[word[i]])
    }
    return output;
}

translator.func.morse_to_word = function (morse) {//Takes an array of morse and returns a word
    output = ""
    for (i = 0; i < morse.length; i++) {
        morse_letter = translator.morse_to_letter[morse[i]]
        if (morse_letter === undefined){return undefined}
        output += morse_letter
    }
    return output;
}