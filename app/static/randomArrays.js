//random
//math.random is a random between 0 - 1
//length of array * math.random, floored
const dict = {};
dict.letter_to_morse = // Source https://gist.github.com/mohayonao/094c71af14fe4791c5dd
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
};

// arrays of morse and letters 
var letterArray = [];
var morseArray = [];

for (let tuple of Object.entries(dict.letter_to_morse)){
    letterArray.push(tuple[0]);
    morseArray.push(tuple[1])
};

//randomise letters
function randomLetterIndex(){
    return Math.floor(Math.random() * letterArray.length)
};

//randomise morse
function randomMorseIndex(){
    return Math.floor(Math.random() * morseArray.length)
};

//get an array of three 

function arrayOfThree(testArray, type = 'Letter'){
    // New array populate with three letters right off the bat
    if (testArray.length==0){
        for (let i=0; i < 3 ; i++ ){
            if (type == 'Letter'){
                let numIndex = randomLetterIndex();
                let letter = letterArray[numIndex];
                testArray.push(letter);
                //testArray[0]='';
            } else {
                let numIndex = randomMorseIndex();
                let morse = morseArray[numIndex];
                testArray.push(morse);
                //testArray[0]='';
            }
        }
    } else { //when there is already populated drop the first index and then repopulate
        testArray.shift();
        if (type == 'Letter'){
            let numIndex = randomLetterIndex();
            let letter = letterArray[numIndex];
            testArray.push(letter);
        } else {
            let numIndex = randomMorseIndex();
            let morse = morseArray[numIndex];
            testArray.push(morse);

        }
    }
    return testArray
}


function presentArray(testArray, gameType){
    //populate the array
    testArray = arrayOfThree(testArray,gameType);
    if(gameType=='Letter'){
        testStr=testArray.join('');
        testStr.toUpperCase();
    } else {
        testStr = testArray;
    };
    //present the strings
    document.getElementById('beforeBox').innerHTML = testStr[0].split('').join('');
    document.getElementById('currentBox').innerHTML = testStr[1].split('').join('');
    document.getElementById('nextBox').innerHTML = testStr[2].split('').join('');
    
    return testArray
}

