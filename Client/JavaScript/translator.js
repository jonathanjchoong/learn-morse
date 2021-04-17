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
player.timings.inter_blip = 0.2 * 1000 + 2000;
player.timings.inter_letter = 0.6 * 1000 + 2000;
player.timings.inter_word = 1.4 * 1000 + 2000;

player.queue = []


player.play_morse = function (morse_string) {
    // Takes in a string (or array) of dots, dashes, spaces, and slashes and plays them.
    // Spaces indicate gaps between letters, slashes indicate gaps between words
    let morse_array = morse_string.split(" ")

    for (i=0; i<morse_array.length; i++){
        morse_array[i] = morse_array[i].split("").join(",") //Adding in spaces representing "intercharacter" timings
    }
    
    let play_string = morse_array.join("")

    let play_position = 0

    play_blip = function(){
        if (play_position + 1> play_string.length){// When the loop ends
            return
        }
        
        blip = play_string[play_position]
        play_position += 1

        switch (blip) {
            case ".":
                player.dot.play();
                setTimeout(play_blip(), 0);
            case "-":
                player.dash.play();
                setTimeout(play_blip(), 0);
            case ",":
                setTimeout(play_blip(), player.timings.inter_blip);
            case " ":
                setTimeout(play_blip(), player.timings.inter_letter);
            case "/":
                setTimeout(play_blip(), player.timings.inter_word);
            default:
                console.log("Unexpected character when playing tone." + blip)
        }
    }
    console.log(play_string)
    play_blip() // Getting the ball rolling

    return
}


player.test = function () {
    let index = 0
    play_blip = function(){
        if (index > 2){
            return
        }
        player.dot.play()
        index += 1
        setTimeout(play_blip, player.timings.inter_letter);
    }
    play_blip() // Getting the ball rolling

    return
}

// player.play = function(sentence){
//     sentence = sentence.toLowerCase();
//     for (i=0; i<sentence.length; i++){
//         played_character = sentence[i];
//         if played_
//     }

// }

