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

translator.func.morse_to_word = function (morse) {
    //Takes an array of morse and returns a word
    //It will ignore unrecognised characters
    output = ""
    for (i = 0; i < morse.length; i++) {
        morse_letter = translator.morse_to_letter[morse[i]]
        if (morse_letter === undefined){continue;}
        output += morse_letter
    }
    return output;
}

translator.func.sentence_to_morse = function(sentence){
    return 'test';
}

const player = {};
player.timings = {};
player.dot = new Audio("../Assets/523.3Hz_0.2s.wav");
player.dash = new Audio("../Assets/523.3Hz_0.6s.wav");
player.timings.inter_blip = 0.2 * 1000
player.timings.inter_letter = 0.6 * 1000;
player.timings.inter_word = 1.4 * 1000;

player.play_morse = function(morse_string){
    // Takes in a string (or array) of dots, dashes, spaces, and slashes and plays them.
    // Spaces indicate gaps between letters, slashes indicate gaps between words
    for (i=0; i<morse_string.length; i++){
        play_character = morse_string[i];
        switch (play_character){
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

