//Javascript file which handles the importing of data to the database from our individual games



//function takes an array with the following indexes
    //[0] letter_guessed char
    //[1] is_correct BOOL
    //[2] game_mode int --> [1,2,3] only
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
        console.log('POST  request:' + text)
    })

    // $.ajax({
    //     url: theURL,
    //     type: 'POST',
    //     data: JSON.stringify(inputArray),
    //     success: function(response){ 
    //         response.text();
    //         console.log('POST request' + text)
    //     }
    // });

    //$.post(theURL, inputArray);


};

