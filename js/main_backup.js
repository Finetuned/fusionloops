//commands for animation
var delay = 10000;
var delay2 = 5000;

//global Timer 





//global variable for DB
var index = 0;
var dScreen = firebase.database().ref('/fusionDB/dScreen');
dScreen.update({
    state: index
})


var wavesurfer = WaveSurfer.create({
    container: '#waveform'


});

$("body").keydown(function(event) {
    console.log(event.which);


    //PART ZERO: 

    // INITIAL SCREEN = "WELCOME"

    //PART ONE: 
    //LOAD MISSION VISUALS: "This is who you heard from"

    if (event.which == 49) { //pressed 1
        $("#imageContainer-1").fadeOut(delay2);
        $("#image-1").fadeIn(delay);
        $("#imageContainer-2").fadeOut(delay2);
        $("#image-2").fadeIn(delay * 1.1);
        $("#imageContainer-3").fadeOut(delay2);
        $("#image-3").fadeIn(delay * 1.2);
        //inc. index by 1 on keydown
        index++;
        console.log(index);
        //we want to populate dscreen with a new state
        dScreen.update({
            state: index
        })

        //Load Audio 
        wavesurfer.load('audio/Fusion_1.mp3');
        //voice talking "This is who you heard from, you have two minutes to discuss"
        console.log("playing audio: Welcome Back from Mission")
        wavesurfer.on('ready', function() {
            wavesurfer.play();
        });

        //start timer 2 minutes		
        function startTimer() {
            console.log("TIMER STARTED")
        }
        setTimeout(startTimer, 5000);

    }


    //PART 2a: ACTIVATE SPECIAL POWERS

    if (event.which == 50) { //tap 2
        console.log("Train Special Powers");
        index++;
        //we want to populate dscreen with a new state
        dScreen.update({
            state: index
        })
        // add a timer here
        // message to say system trained after timer		
    }
    //PART 2b:
    if (event.which == 51) { //tap 3
        console.log("Special Powers Trained...Activate Now");

        //inc. index by 1 on keydown
        index++;
        //we want to populate dscreen with a new state
        dScreen.update({
            state: index
        })
        // load special power visualization
        // JS app1.js app2.js app3.js
        // audio instruction: special power
        wavesurfer.load('audio/Fusion_2._Special_Power.mp3');
        //voice talking
        console.log("playing audio: Special Power")
        wavesurfer.on('ready', function() {
            wavesurfer.play();
        });


            //Change the background of container so that text is revealed using animation
            window.setTimeout(function() {
                $("#image-1").css("background-image", "url('img/sp_reveal.png')");
                $("#image-2").css("background-image", "url('img/sp_reveal.png')");
                $("#image-3").css("background-image", "url('img/sp_reveal.png')");
        }, 5000);
    }




    //PART THREE: Please Discuss What You have revealed"
    if (event.which == 52) { //pressed 4

        //inc. index by 1 on keydown
        index++;
        //we want to populate dscreen with a new state
        dScreen.update({
            state: index
        })

        console.log("Please Discuss What You have revealed");
        // ask players to make a decision
        wavesurfer.load('audio/decide.mp3');
        wavesurfer.on('ready', function() {
            wavesurfer.play();
        });

        // Set a timer e.g. 15 seconds.
        // window.setTimeout(function(){
        // console.log("Fading Content ...")
        $('#image-1').fadeTo('slow', 1.0, function() {
            $(this).css('background-image', "url('img/image_text.png')");
        }).fadeTo('slow', 1);
        $('#image-2').fadeTo('slow', 1.0, function() {
            $(this).css('background-image', "url('img/image_text.png')");
        }).fadeTo('slow', 1);
        $('#image-3').fadeTo('slow', 1.0, function() {
            $(this).css('background-image', "url('img/image_text.png')");
        }).fadeTo('slow', 1);
        // }, 5000);   	

    }

    //PART FOUR: "PLEASE DISCUSS WHAT YOU HAVE REVEALED"
    // THIS should just be on a timer remove key press

    if (event.which == 53) { //pressed 5
        console.log("Scientist Please choose the path");
        //Please discuss what you have revealed audio

        //inc. index by 1 on keydown
        index++;
        //we want to populate dscreen with a new state
        dScreen.update({
            state: index
        })

        //Set Timer for 1minute	

        wavesurfer.load('audio/state_decision.mp3');
        //voice talking
        wavesurfer.on('ready', function() {
            wavesurfer.play();
        });

    }



    //Selecting Option (A, B, C)
    if (event.which == 65) { //pressed A
        //NOT WORKING reset images to image with text
        $("#image-1").attr("src", "img/image_text.png");
        $("#image-2").attr("src", "img/image_text.png");
        // Set border to confirm decision
        console.log("Decision A")
        $("#image-1").css("border", "5px solid #fff");
        wavesurfer.load('audio/option_a.mp3');
        //voice talking
        wavesurfer.on('ready', function() {
            wavesurfer.play();
            //animate content
        });
        $("#image-2").fadeOut(delay * 1.2);
        $("#image-3").fadeOut(delay * 1.2);

    }
    if (event.which == 66) { //pressed B
        console.log("Decision B")
        $("#image-2").css("border", "5px solid #fff");
        wavesurfer.load('audio/option_b.mp3');
        //voice talking
        wavesurfer.on('ready', function() {
            wavesurfer.play();
        });
        $("#image-1").fadeOut(delay * 1.2);
        $("#image-3").fadeOut(delay * 1.2);
    }
    if (event.which == 67) { //pressed B
        console.log("Decision C")
        $("#image-3").css("border", "5px solid #fff");
        wavesurfer.load('audio/option_c.mp3');
        //voice talking
        wavesurfer.on('ready', function() {
            wavesurfer.play();
        });
        $("#image-1").fadeOut(delay * 1.2);
        $("#image-3").fadeOut(delay * 1.2);
    }

    //PART FIVE: AI Update and Next Mission begins

    //If the last decision was X, then load mission set 2.x
    //If the last decision was X, then centre piece changes
    //If the last decision was x, then LIGHTS CHANGE
    //https://medium.com/javascript-in-plain-english/how-to-detect-a-sequence-of-keystrokes-in-javascript-83ec6ffd8e93

    //build an array that keeps track of what key was pressed / decision taken
    let buffer = [];
    // build a timer to understand when last key was pressed
    let lastKeyTime = Date.now();

    // eventlistener for a keydown event, taking actual key value
    document.addEventListener('keydown', event => {
        //convert to lower case so it always works and only allow character keys
        const charList = 'abcdefghijklmnopqrstuvwxyz0123456789';
        const key = event.key.toLowerCase();

        if (charList.indexOf(key) === -1) return;
        const currentTime = Date.now();
        //if time between last key press and current press is > 1s, clear buffer        
        if (currentTime - lastKeyTime > 1000) {
            buffer = [];
        }
        //print buffer to console
        buffer.push(key);
        lastKeyTime = currentTime;
        console.log(buffer);
    });

    //
    //end of script
});