//----------------------------------------------------------------------------------------------
//Javascript file which handles the importing of data to the database from our individual games
//post request sending the array
//function takes an array with the following indexes
    //[0] letter_guessed char
    //[1] is_correct BOOL
    //[2] game_mode int --> [1,2,3,4] only
    //user_id is validated in flask after the post request 
//-----------------------------------------------------------------------------------------------

function dataToDB(theURL,inputArray){
    fetch(theURL,  {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(inputArray)
    })
    .then(function(response){
        return response.text()  
    })
    .then(function(text){
        console.log('POST  request:' + text)    //console log of the flask return string
    })
};

