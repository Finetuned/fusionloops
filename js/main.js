//CHROME FLAG FOR AUDIO MUST BE SET TO AUTOPLAY: No User Gesture

//check what time is it when they get to decision station
//if time is 
//array of delays
//array at 0 array at 1
//we need to know how long in MS something should run
//make the delay a variable instead of hard coded
//global variable time = 6000...

//timer delays
var timings = [5000, 10000, 20000, 30000, 40000, 60000];

//commands for animation
var delay = 10000;
var delay2 = 5000;

//global Timer 

//global variable for DB
var index = 0;
var answerNum;
var dScreen = firebase.database().ref('/fusionDB/dScreen');

var pressIndex = 0; //they have never pressed the button after a mission
//Here we check if they watched the intro
var isIntroOver = false;

//this maybe should be tied to the end of the mission triggers
var stateChanged = false;
dScreen.on('child_changed', function(snapshot) {
    if (snapshot.key == "screenState") {
        stateIsOn = snapshot.val();
        if (stateIsOn == 1) {
            console.log("good to go");
            // if (audioCtx.state === 'suspended') {
            //     audioCtx.resume();
            // }

            if (isIntroOver) {
                console.log(snapshot);
            } else startIntro();
        } else {
            console.log("not yet")
            // stateChanged = false;
        }
    }
    if(isIntroOver==true && snapshot.key=="presses"){
        pressIndex = snapshot.val();
        console.log(pressIndex+"press index")
        startMain(pressIndex);
        stateChanged = true;
    }
})

var options;
var setWidth = window.innerWidth;
    options = {
        background: true,
        loop: false,
        muted: false,
        controls: false,
        width: setWidth,
        playsinline: true,
        autoplay: true
    };

function startIntro() {
        var preAIid = [330484088];
        var newVid = "#vid1";
        $(newVid).show();

        options.id = preAIid[0]; //if it is 0 or whatever - this has to be about the path
        console.log("AI pov")
        var whatVid = 'vid1';
        var playThis = 'player1';

        playThis = new Vimeo.Player(whatVid, options);
        playThis.setVolume(1);
        console.log("playing AI")

        playThis.on('play', function() {
            console.log('played the video!');
        }); 
        playThis.on('ended', function(data) {
            console.log("video done")
            var oldVid = "#vid1";
            $(oldVid).hide();
            //AND START THE NEXT MISSION
            isIntroOver = true;
            startMain(1);

            answerNum = -1;
            dataToPath(answerNum);
            
            stateChanged = true;
        })
}

function startMain(pressIndex) {
    var arrayWords = [
        "Welcome!",
        "This is who you heard from. Discuss what you saw. Soon you'll need to choose a path to follow.", //activate timer countdown which is 2 minutes long
        "Scientist, please step forward + train your special power.", //activate at same time the image of training next //timer counts down
        "System trained, activate now.", //3 second delay before leap motion and image processing start
        "Please discuss what you have revealed.", //timer - 
        "Scientist, please choose the path to follow by saying out loud the number of the path.", //trigger from voice recognition 
        "Thank you, your choice has been registered. Please follow the new path." //timer until mission 2 starts
    ]
    //for the timer circle when ready
    // interval = null;
    // var circle1 = document.getElementById("circle1")
    // var circle2 = document.getElementById("circle2")
    // var circle3 = document.getElementById("circle3")
    // var totalTime = 0;
    // if (index == 2) {
    //     totalTime = 10;
    //     circle1.style.webkitAnimationPlayState = "running";
    //     interval = setInterval(myTimer, 1000);
    // }
    // if (index == 3) {
    //     totalTime = 20; //how much time it will run
    //     circle2.style.webkitAnimationPlayState = "running";
    //     interval = setInterval(myTimer, 1000);
    // }
    // var min;
    // var sec;

    // function myTimer() {
    //     min = Math.floor(totalTime / 60);
    //     sec = totalTime - min * 60;
    //     totalTime--;
    //     var finalTime = str_pad_left(min, '0', 2) + ':' + str_pad_left(sec, '0', 2);
    //     document.getElementById("time").innerHTML = finalTime;
    //     if (totalTime < 0) {
    //         clearInterval(interval);
    //         if (index == 2) {
    //             circle1.remove();
    //         }
    //         if (index == 3) {
    //             circle2.remove();
    //         }
    //     }
    // }
    // function str_pad_left(string, pad, length) {
    //     return (new Array(length + 1).join(pad) + string).slice(-length);
    // }

    console.log("in mainjs")

    wave(pressIndex);

    function wave(pressIndex) {
        // var context = new AudioContext();
        // Setup all nodes
        var wavesurfer = WaveSurfer.create({
            container: '#waveform'
        });

        //PART ZERO: 

        // INITIAL SCREEN = "WELCOME"

        // PART ONE: 
        // LOAD MISSION VISUALS: "This is who you heard from"

        //BEFORE EVERYTHING STARTS

        //THIS DECIDES WHAT VISUALS AND WORDS SHOULD BE SHOWN DEPENDING ON THE MISSION YOU WENT ON
        var fusionPaths = firebase.database().ref('/fusionPaths');
        var pathIndex;
        //whenever there is an update to the child
        //thing inside function is fired
        fusionPaths.on('child_changed', function(snapshot) {
            console.log("fusion paths changed in mainjs")
            console.log(snapshot.key); //"path present"
            activePath = snapshot.val(); //the value of the path
            changeImgs(activePath);
            console.log(activePath);
        });

        var m2pov1 = ["green green", "brown brown", "black"]
        var m2pov2 = ["greeeeeeeeen", "broooooooown", "blaaaaaaaack"]
        var m2pov3 = ["greem", "browm", "blak"]
        var m3pov1 = ["sparkles", "ok ok", "terrible"]
        var m3pov2 = ["unicorns", "yeah just not the best", "but i have money"]
        var m3pov3 = ["twinkling stars", "ugh not happy", "lucifer and hell is good to me"]
        var possPaths2 = [-11, -12, -13];
        var possPaths3 = [-111, -112, -113, -121, -122, -123, -131, -132, -133];
        var possPaths3 = [-1111, -1112, -1113, -1121, -1122, -1123, -1131, -1132, -1133];

        var m1AIids = [330484088, 330484118, 330484145];
        var m2AIids = [330484088, 330484118, 330484145,330484088, 330484118, 330484145,330484088, 330484118, 330484145];
        var m3AIids = [330484088, 330484118, 330484145,330484088, 330484118, 330484145,330484088, 330484118, 330484145,330484088, 330484118, 330484145,330484088, 330484118, 330484145,330484088, 330484118, 330484145,330484088, 330484118, 330484145];

        function changeImgs(activePath) {
            console.log("change imgs")
            if (activePath.toString().length == 2) {
                //show first 3 portraits EVER
                // aiUpdate0();
                //on end, we are ready for mission to start

                //updateImgsM1(); //this should show the first series of images
            }
            if (activePath.toString().length == 3) {
                // aiUpdate1();
                //after
                // updateImgsM2(); // this should also make their display to none
                console.log(activePath + "hi"); //from mission two
            }
            if (activePath.toString().length == 4) { //from mission three
                //this depends on their decision
                // aiUpdate2();
                //after
                // updateImgsM3(); // this should also make their display to none
            }
            if (activePath.toString().length == 5) { //from mission three
                //this depends on their decision
                // aiUpdate3();
                //after
                // updateImgsM4(); // this should also make their display to none
            } 
            else {}
        }
        function whichVids(mission, pathIndex){
            console.log("yup")
            var newVid = "#vid1";
            $(newVid).show();
            if(mission==1){ //if we are in mission 3
                console.log("inside"+mission);
                options.id = m1AIids[pathIndex]; //if it is 0 or whatever - this has to be about the path
                playIt();
            }
            if(mission==2){ //if we are in mission 3
                console.log("inside"+mission);
                options.id = m2AIids[pathIndex]; //if it is 0 or whatever - this has to be about the path
                playIt();
            }
            if(mission==3){ //if we are in mission 3
                console.log("inside"+mission);
                options.id = m3AIids[pathIndex]; //if it is 0 or whatever - this has to be about the path
                playIt();
            }
        }
        // var player1, player2, player3;
        function playIt(){
            console.log("AI pov")
            var whatVid = 'vid1';
            var playThis = 'player1';

            playThis = new Vimeo.Player(whatVid, options);
            playThis.setVolume(1);
            console.log("playing AI")

            playThis.on('play', function() {
                console.log('played the video!');
            }); 
            playThis.on('ended', function(data) {
                console.log("video done")
                var oldVid = "#vid1";
                $(oldVid).hide();
                //AND START THE NEXT MISSION
            })
        }
        var thisPath;
        function aiUpdate0(){
            console.log("starting");
            //just one option
            whichVids(0, activePath)
        }
        function aiUpdate1(){
            console.log("AI1");
            if (activePath == possPaths2[0]) {
                thisPath = 0;
            }
            if (activePath == possPaths2[1]) {
                thisPath = 1;
            }
            if (activePath == possPaths2[2]) {
                thisPath = 2;
            }
            //just one option
            whichVids(1, thisPath)
        }
        function aiUpdate2(){
            console.log("AI2");
            for(var i = 0; i<possPaths3.length; i++){
                if(activePath==possPaths3[i]){
                    thisPath = i;
                }
            }
            //just one option
             whichVids(2, thisPath)
        }
        function aiUpdate3(){
            console.log("AI3");
            for(var i = 0; i<possPaths4.length; i++){
                if(activePath==possPaths4[i]){
                    thisPath = i;
                }
            }
            //just one option
             whichVids(3, thisPath)
        }

        function updateImgsM2(){
            //this depends on their decision
            if (activePath == possPaths2[0]) {
                //img 1 in css is replaced with This
                //index.js receives command for new image location
                $("#image-1")[0].style.backgroundImage = 'url(img/m2/1a.jpg'; //pov1
                document.getElementById("mainPoints1").innerHTML = m2pov1[0];
                $("#image-2")[0].style.backgroundImage = 'url(img/m2/1b.jpg'; //pov2
                document.getElementById("mainPoints2").innerHTML = m2pov2[0];
                $("#image-3")[0].style.backgroundImage = 'url(img/m2/1c.jpg'; //pov3
                document.getElementById("mainPoints3").innerHTML = m2pov3[0];
                //show this
            }
            if (activePath == possPaths2[1]) {
                //show this
                $("#image-1")[0].style.backgroundImage = 'url(img/m2/2a.jpg'
                document.getElementById("mainPoints1").innerHTML = m2pov1[1];
                $("#image-2")[0].style.backgroundImage = 'url(img/m2/2b.jpg'
                document.getElementById("mainPoints2").innerHTML = m2pov2[1];
                $("#image-3")[0].style.backgroundImage = 'url(img/m2/2c.jpg'
                document.getElementById("mainPoints3").innerHTML = m2pov3[1];
            }
            if (activePath == possPaths2[2]) {
                //show this
                $("#image-1")[0].style.backgroundImage = 'url(img/m2/3a.jpg'
                document.getElementById("mainPoints1").innerHTML = m2pov1[2];
                $("#image-2")[0].style.backgroundImage = 'url(img/m2/3b.jpg'
                document.getElementById("mainPoints2").innerHTML = m2pov2[2];
                $("#image-3")[0].style.backgroundImage = 'url(img/m2/3c.jpg'
                document.getElementById("mainPoints3").innerHTML = m2pov3[2];
            }
        }

        function updateImgsM3(){
           if (activePath == possPaths3[0] || activePath == possPaths3[1] || activePath == possPaths3[2]) {
                $("#image-1")[0].style.backgroundImage = 'url(img/m3/1a.jpg'
                document.getElementById("mainPoints1").innerHTML = m3pov1[0];
                $("#image-2")[0].style.backgroundImage = 'url(img/m3/1b.jpg'
                document.getElementById("mainPoints2").innerHTML = m3pov2[0];
                $("#image-3")[0].style.backgroundImage = 'url(img/m3/1c.jpg'
                document.getElementById("mainPoints3").innerHTML = m3pov3[0];
            }
            if (activePath == possPaths3[3] || activePath == possPaths3[4] || activePath == possPaths3[5]) {
                $("#image-1")[0].style.backgroundImage = 'url(img/m3/2a.jpg'
                document.getElementById("mainPoints1").innerHTML = m3pov1[1];
                $("#image-2")[0].style.backgroundImage = 'url(img/m3/2b.jpg'
                document.getElementById("mainPoints2").innerHTML = m3pov2[1];
                $("#image-3")[0].style.backgroundImage = 'url(img/m3/2c.jpg'
                document.getElementById("mainPoints3").innerHTML = m3pov3[1];
            }
            if (activePath == possPaths3[6] || activePath == possPaths3[7] || activePath == possPaths3[8]) {
                $("#image-1")[0].style.backgroundImage = 'url(img/m3/3a.jpg'
                document.getElementById("mainPoints1").innerHTML = m3pov1[2];
                $("#image-2")[0].style.backgroundImage = 'url(img/m3/3b.jpg'
                document.getElementById("mainPoints2").innerHTML = m3pov2[2];
                $("#image-3")[0].style.backgroundImage = 'url(img/m3/3c.jpg'
                document.getElementById("mainPoints3").innerHTML = m3pov3[2];
            }
        }


        // one();
        //if something about the button has happened and we are on that mission
        //start the one
        console.log(pressIndex+"pressIndex")
        if(pressIndex>1){
            var myTimer = setTimeout(one, timings[0]);
        }
        function one() {
            console.log("in ONE")
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
            document.getElementById("instrux").innerHTML = arrayWords[index];
            if (audioCtx.state === 'suspended') {
                audioCtx.resume();
            }
            //Load Audio 
            wavesurfer.load('audio/Fusion_1.mp3');
            //voice talking "This is who you heard from, you have two minutes to discuss"
            console.log("playing audio: Welcome Back from Mission")
            wavesurfer.on('ready', function() {
                wavesurfer.play();
            });
        }
        // var myTimer = setTimeout(one, timings[0]);




        //PART 2: TRAIN SPECIAL POWERS

        function two() {
            index++;
            //we want to populate dscreen with a new state
            dScreen.update({
                state: index
            })
            document.getElementById("instrux").innerHTML = arrayWords[index];
            if (audioCtx.state === 'suspended') {
                audioCtx.resume();
            }
            //Load Audio 
            wavesurfer.load('audio/2a-Train-Power.mp3');
            //voice talking "This is who you heard from, you have two minutes to discuss"
            console.log("Train Special Powers");
            wavesurfer.on('ready', function() {
                wavesurfer.play();
            });
        }
        // var myTimer = setTimeout(two, timings[1]);



        //IMPORTANT! THERE IS A KEYPRESS HERE "3" 


        //PART 3: USE SPECIAL POWER
        function three() {
            $("#image-1").fadeOut(delay * 1.1);
            $("#image-2").fadeOut(delay * 1.1);
            $("#image-3").fadeOut(delay * 1.1);

            // var x = document.getElementById('three-container');
            // x.style.display = "block";

            $("#three-container").fadeIn();
            go();
            index++;
            //we want to populate dscreen with a new state
            dScreen.update({
                state: index
            })
            document.getElementById("instrux").innerHTML = arrayWords[index];
            if (audioCtx.state === 'suspended') {
                audioCtx.resume();
            }
            // load special power visualization
            // JS app1.js app2.js app3.js
            // audio instruction: special power
            wavesurfer.load('audio/Fusion_2._Special_Power.mp3');
            //voice talking
            console.log("Playing audio: Use your Special Power")
            wavesurfer.on('ready', function() {
                wavesurfer.play();
            });
        }
        // var myTimer = setTimeout(three, timings[2]);


        //PART FOUR: Discuss What has been revealed
        function four() {
            // x.style.display = "none";
            theyLive = true;

            index++;
            dScreen.update({
                state: index
            })
            document.getElementById("instrux").innerHTML = arrayWords[index];

            console.log("Please Discuss What You have Revealed");
            // wavesurfer.load('audio/4-Revealed.mp3');
            // wavesurfer.on('ready', function() {
            //     wavesurfer.play();
            // });
        }
        // var myTimer = setTimeout(four, timings[3]);


        // PART FIVE: Discuss a Decision

        function five() {
            $("#image-1").fadeIn(delay * 1.3);
            $("#image-2").fadeIn(delay * 1.3);
            $("#image-3").fadeIn(delay * 1.3);
            // $(".options").fadeIn(delay * 2);
            document.getElementById("mainPoints1").innerHTML = "Option A";
            document.getElementById("mainPoints2").innerHTML = "Option B";
            document.getElementById("mainPoints3").innerHTML = "Option C";
            //inc. index by 1 on keydown
            index++;
            //we want to populate dscreen with a new state
            dScreen.update({
                state: index
            })

            document.getElementById("instrux").innerHTML = arrayWords[index];
            if (audioCtx.state === 'suspended') {
                audioCtx.resume();
            }
            console.log("You now have one minute to decide which POV to follow");
            // ask players to make a decision
            wavesurfer.load('audio/decide.mp3');
            wavesurfer.on('ready', function() {
                wavesurfer.play();
            });

            // var x = document.getElementById('three-container');
            $("#three-container").fadeOut(delay * 1.1);
            // x.style.opacity = .1;
        }
        // var myTimer = setTimeout(five, timings[4]);


        // PART SIX: Provide a Decision
        function six() {
            answerNum = 0;
            // if(audioCtx.state === 'suspended') {
            //   audioCtx.resume();
            // }
            // var x = document.getElementById('three-container');
            // x.style.display = "none";
            // Define a new speech recognition instance
            var rec = null;
            try {
                rec = new webkitSpeechRecognition();
            } catch (e) {
                console.log(e);
                document.querySelector('.msg').setAttribute('data-state', 'show');
                startRecBtn.setAttribute('disabled', 'true');
                stopRecBtn.setAttribute('disabled', 'true');
            }
            rec.start();
            console.log("recording started")
            setInterval(resetVoiceRecog, 10000);

            function resetVoiceRecog() {
                rec.stop();
            }
            rec.onend = function(event) {
                if (answerNum > 0) {
                    rec.stop();
                } else {
                    rec.start();
                }
            }
            if (rec) {
                rec.continuous = true;
                rec.interimResults = true;
                rec.lang = 'en';

                // Define a threshold above which we are confident(!) that the recognition results are worth looking at 
                var confidenceThreshold = 0.5;

                // Simple function that checks existence of s in str
                var userSaid = function(str, s) {
                    return str.indexOf(s) > -1;
                }

                // Process the results when they are returned from the recogniser
                rec.onresult = function(e) {
                    // Check each result starting from the last one
                    for (var i = e.resultIndex; i < e.results.length; ++i) {
                        // If this is a final result
                        if (e.results[i].isFinal) {
                            // If the result is equal to or greater than the required threshold
                            if (parseFloat(e.results[i][0].confidence) >= parseFloat(confidenceThreshold)) {
                                var str = e.results[i][0].transcript;
                                console.log('Recognised: ' + str);
                                // If the user said 'option' then parse it further
                                if (userSaid(str, 'option')) {
                                    //then listening for decision (A, B, C)
                                    if (userSaid(str, 'a')) {
                                        $("#image-1").css("border", "5px solid #fff");
                                        console.log("border applied");
                                        rec.stop();
                                        console.log("stopped recording")

                                        //inc. index by 1 on keydown
                                        index++;
                                        console.log(index);
                                        //we want to populate dscreen with a new state
                                        dScreen.update({
                                            state: index
                                        })
                                        answerNum = 1;
                                        dataToPath(answerNum);
                                        document.getElementById("instrux").innerHTML = arrayWords[index];
                                        //Time Out 5s before playing response for realism
                                        window.setTimeout(function() {
                                            answer = "Got it, Option Ay";
                                            readOutLoud(answer);
                                        }, 3000);
                                        //fade our other options
                                        $("#image-2").fadeOut(delay * 1.2);
                                        $("#image-3").fadeOut(delay * 1.2);
                                        //Thank you decision has been registered
                                        // Add voice update here
                                        console.log("choice registered, follow the new path")
                                    }
                                    // Option B
                                    else if (userSaid(str, 'b')) {
                                        $("#image-2").css("border", "5px solid #fff");
                                        console.log("border applied");
                                        rec.stop();
                                        console.log("stopped recording")

                                        //inc. index by 1 on keydown
                                        index++;
                                        console.log(index);
                                        //we want to populate dscreen with a new state
                                        dScreen.update({
                                            state: index
                                        })
                                        answerNum = 2;
                                        dataToPath(answerNum);
                                        document.getElementById("instrux").innerHTML = arrayWords[index];

                                        //Time Out 5s before playing response for realism
                                        window.setTimeout(function() {
                                            answer = "Got it, Option B";
                                            console.log(answer)
                                            readOutLoud(answer);
                                        }, 3000);
                                        //fade out other options
                                        $("#image-1").fadeOut(delay * 1.2);
                                        $("#image-3").fadeOut(delay * 1.2);
                                    }

                                    // Option C
                                    else if (userSaid(str, 'c')) {
                                        $("#image-3").css("border", "5px solid #fff");
                                        console.log("border applied");
                                        rec.stop();
                                        console.log("stopped recording")
                                        //inc. index by 1 on keydown
                                        index++;
                                        console.log(index);
                                        //we want to populate dscreen with a new state
                                        dScreen.update({
                                            state: index
                                        })
                                        answerNum = 3;
                                        dataToPath(answerNum);
                                        document.getElementById("instrux").innerHTML = arrayWords[index];

                                        //Time Out 5s before playing response for realism
                                        window.setTimeout(function() {
                                            answer = "Got it, Option C";
                                            console.log(answer)
                                            readOutLoud(answer);
                                        }, 3000);
                                        //fade out other options
                                        $("#image-1").fadeOut(delay * 1.2);
                                        $("#image-2").fadeOut(delay * 1.2);

                                    } else {}

                                }
                            }
                        }
                    }
                };
                //READ Out Speech
                function readOutLoud(message) {
                    if (audioCtx.state === 'suspended') {
                        audioCtx.resume();
                    }
                    read = true;
                    var speech = new SpeechSynthesisUtterance();
                    // Set the text and voice attributes.
                    speech.text = message;
                    speech.volume = 1;
                    speech.rate = 1;
                    speech.pitch = 1;
                    window.speechSynthesis.speak(speech);
                }

                // Start speech recognition
                var startRec = function() {
                    rec.start();
                    recStatus.innerHTML = 'recognising';
                }
                // Stop speech recognition
                var stopRec = function() {
                    rec.stop();
                    recStatus.innerHTML = 'not recognising';
                }
                // Setup listeners for the start and stop recognition buttons
                startRecBtn.addEventListener('click', startRec, false);
                stopRecBtn.addEventListener('click', stopRec, false);
            }
        };
        // var myTimer = setTimeout(six, timings[5]);


        //////////////////////////

        // To do:
        // LOADING AI UPDATE
        //

    }
}