// This script is to implement some useful functions and objects that will be used accross
// all learning pages.

/// TEMPORARY FUNCTION UNTIL WE IMPLEMENT ASYNCRONOUS MORSE CODE PLAYING (SO IT DOESN'T PAUSE THE WEBPAGE)
function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

const translator = {}
// Defining objects to look up letters and morse.
translator.letter_to_morse = // Source https://gist.github.com/mohayonao/094c71af14fe4791c5dd
{
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
    "z": "--.."
}

//Turning the keys of letter_to_morse into entries and entries into keys.
translator.morse_to_letter = {};
for (let tuple of Object.entries(translator.letter_to_morse)) {
    translator.morse_to_letter[tuple[1]] = tuple[0];
}

// Arrays of the letters/morse available to facilitate randomly choosing an element.
translator.letter_array = Object.keys(translator.letter_to_morse)
translator.morse_array = Object.keys(translator.morse_to_letter)

// ============================

// Defining some useful functions
translator.func = {};
translator.func.text_to_morse = function (text, return_type = "string") {
    /**
     * @param {string} text Input text for the function to convert to morse.
     * @param {string} return_type Specifies the type of return value ("string" or "array").
     * @return The translated morse code
     */

    if (!(["string", "array"].includes(return_type))) {
        console.log("Invalid return type specified.")
        return undefined;
    }

    text = text.toLowerCase()
    output = []
    for (i = 0; i < text.length; i++) {
        letter = text[i];
        morse = translator.letter_to_morse[letter];
        if (letter == " ") { morse = "/" } // Spaces between words are represented with a slash

        if (morse == undefined) { continue; }

        output.push(morse)
    }

    if (return_type == "string") { return output.join(" "); }
    else if (return_type == "array") { return output; }
    return
}

translator.func.morse_to_text = function (morse) {
    /**
     * @param {object} morse Takes an array or a string of morse.
     * @return {string} The resulting text of the translated string
     */
    if (typeof (morse) == "string") {
        morse_array = morse.split(" ");
    } else if (Array.isArray(morse)) {
        morse_array = morse;
    } else {
        console.log("Unexpected input type. Please input string or array.");
        return
    }

    output = []

    for (i = 0; i < morse_array.length; i++) {
        morse_letter = translator.morse_to_letter[morse_array[i]]
        if (morse_array[i] == "/") { morse_letter = " "; }
        if (morse_letter === undefined) { continue; }
        output.push(morse_letter)
    }
    return output.join("");
}

const player = {};
player.timings = {};
player.dot = new Audio("../Assets/523.3Hz_0.2s.wav");
player.dash = new Audio("../Assets/523.3Hz_0.6s.wav");
player.timings.inter_blip = 0.2 * 1000
player.timings.inter_letter = 0.6 * 1000;
player.timings.inter_word = 1.4 * 1000;

player.play_morse = function (morse_string) {
    // Takes in a string (or array) of dots, dashes, spaces, and slashes and plays them.
    // Spaces indicate gaps between letters, slashes indicate gaps between words
    for (i = 0; i < morse_string.length; i++) {
        play_character = morse_string[i];
        switch (play_character) {
            case ".":
                player.dot.play();
                sleep(player.timings.inter_blip);
            case "-":
                player.dash.play();
                sleep(player.timings.inter_blip);
            case " ":
                sleep(player.timings.inter_letter);
            case "/":
                sleep(player.timings.inter_word)
            default:
                continue
        }

    }

}

// player.play = function(sentence){
//     sentence = sentence.toLowerCase();
//     for (i=0; i<sentence.length; i++){
//         played_character = sentence[i];
//         if played_
//     }

// }

