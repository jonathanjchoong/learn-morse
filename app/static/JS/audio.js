var shortSound = new Audio(" {{url_for('static', filename = 'audio/523.3Hz_0.2s.mp3')}} ") 
var longSound = new Audio(" {{url_for('static', filename = 'audio/523.3Hz_0.6s.mp3')}} ")   

function playlong() {
    longSound.play();
}
function playshort() {
    shortSound.play();
}
function delay(){
    console.log('waiting')
}

function showInputs(){
    document.getElementById('form1').style.display = 'block';

}


const sleep = (time) => {
    return new Promise(y => setTimeout(y, time))
}

async function playSound(testArray) {
    var string_2_play = testArray[1];
    var delay_time; 

    if(string_2_play[0]=='.'){
        delay_time = 400;
    } else{
        delay_time = 800;
    };

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
    document.getElementsByClassName('audioIcon')[0].style.display='inline-block';
    setTimeout(function(){document.getElementsByClassName('audioIcon')[0].style.margin='0%';},3000);
    showInputs();
}