//---------------------------------------------------------------------------------------------
// File handles the playing of the morse code audio in all games 
//----------------------------------------------------------------------------------------------

// Import the audio files as assets 
var shortSound = new Audio(" {{url_for('static', filename = 'audio/523.3Hz_0.2s.mp3')}} "); 
var longSound = new Audio(" {{url_for('static', filename = 'audio/523.3Hz_0.6s.mp3')}} ") ;

//play the different lengths of morse sounds
function playlong() {
    longSound.play();
}
function playshort() {
    shortSound.play();
}
function delay(){
    console.log('waiting')
}

//show the user input forms 
function showInputs(){
    document.getElementById('form1').style.display = 'block';

}

//set a time out for the audio assets
const sleep = (time) => {
    return new Promise(y => setTimeout(y, time))
}

//play each audio asset based in correct timing 
async function playSound(testArray) {
    var string_2_play = testArray[1];
    var delay_time; 

    //set the time delay time to the length of the audio file plus 200ms
    if(string_2_play[0]=='.'){
        delay_time = 400;
    } else{
        delay_time = 800;
    };

    //loop through the morse code string 
    //play respective audio for each character in correct timing
    for (let i = 0; i < string_2_play.length; i++){
        let chr = string_2_play[i];
        let x = await sleep(delay_time);
        if(chr == '.'){
            delay_time = 400;
            setTimeout(playshort,200);
        } else {
            delay_time = 800;
            setTimeout(playlong, 200);
        }
    }
    //make the audio button disapear for a short time after the button is clicked
    document.getElementsByClassName('audioIcon')[0].style.display='inline-block';
    setTimeout(function(){document.getElementsByClassName('audioIcon')[0].style.margin='0%';},3000);
    showInputs(); // show the input form again after the sound has finished playing completely 
}