//-----------------------------------------------------------------
// Functions create random arrays of letters and the corresponding
// translated morse code and presents them to users if needed
//-----------------------------------------------------------------

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

//seperate the dictionary into a morse and letter arrays
for (let tuple of Object.entries(dict.letter_to_morse)){
    letterArray.push(tuple[0]);
    morseArray.push(tuple[1])
};

//randomise letters index
function randomLetterIndex(){
    return Math.floor(Math.random() * letterArray.length)
};

//randomise morse index
function randomMorseIndex(){
    return Math.floor(Math.random() * morseArray.length)
};

//get an array of three 
function arrayOfThree(testArray, type = 'Letter'){
    // New array populate with three letters right off the bat
    if (testArray.length==0){
        // get three letters for the array 
        for (let i=0; i < 3 ; i++ ){
            if (type == 'Letter' | type == 'FC'){
                let numIndex = randomLetterIndex();
                let letter = letterArray[numIndex];
                testArray.push(letter);
            } else {
                let numIndex = randomMorseIndex();
                let morse = morseArray[numIndex];
                testArray.push(morse);
            }
        }
    } else { //when there is already populated drop the first index and then repopulate
        testArray.shift();
        //drop the first index and add a new item
        if (type == 'Letter' | type =='FC'){
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


//present the arrays to users
function presentArray(testArray, gameType){
    //populate the array test array
    //if type audio, populate the same as morse game
    if (gameType == 'audio'){ 
        testArray = arrayOfThree(testArray,'Morse'); 
    } else{ 
    testArray = arrayOfThree(testArray,gameType);
    }
    
    //upper case the letters
    //only for the games where the test array is letters
    if(gameType=='Letter' | gameType=='FC'){
        testStr=testArray.join('');
        testStr.toUpperCase();
    } else {
        testStr = testArray;
    };

    //present the strings 
    //audio does not need a letter or morse to be displayed
    if(gameType =='FC'){
        document.getElementById('displayBox').innerHTML = testStr[1].split('').join('')

    } else  if (gameType != 'audio'){
    //present the array to users
    document.getElementById('beforeBox').innerHTML = testStr[0].split('').join('');
    document.getElementById('currentBox').innerHTML = testStr[1].split('').join('');
    document.getElementById('nextBox').innerHTML = testStr[2].split('').join('');
    }
    return testArray //return array back 
}

