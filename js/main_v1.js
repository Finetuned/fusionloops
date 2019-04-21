//CHROME FLAG FOR AUDIO MUST BE SET TO AUTOPLAY: No User Gesture

//check what time is it when they get to decision station
//if time is 
//array of delays
//array at 0 array at 1
//we need to know how long in MS something should run
//make the delay a variable instead of hard coded
//global variable time = 6000...

//timer delays
// var timings = [1000, 10000, 20000, 30000, 40000, 60000];

// var tim
var timings = [1000, 7000, 12000, 22000, 29000, 35000];

//commands for animation
var delay = 1000;
var delay2 = 5000;

//pov stuff function
var callPovStuff;

//global Timer 

//global variable for DB
var index = 0;
var answerNum;
var dScreen = firebase.database().ref('/fusionDB/dScreen');

var pressIndex = 0; //they have never pressed the button after a mission
//Here we check if they watched the intro
var isIntroOver = false;



var mission = 1;
var pickArray = 1;
// init();

//this is global and ready to be called by index.js
function tellLeapStuff(){
   console.log('send info to leap '+mission+" this place in the array"+pickArray);
   whichLeapImgs(mission, pickArray);
}




//this maybe should be tied to the end of the mission triggers
var stateChanged = false;
dScreen.on('child_changed', function(snapshot) {
    if (snapshot.key == "screenState") {
        stateIsOn = snapshot.val();
        if (stateIsOn == 1) {
            console.log("good to go");

            if (isIntroOver) {
                console.log(snapshot);
            } else startIntro();
        } else {
            console.log("not yet")
            // stateChanged = false;
        }
    }
    if(isIntroOver==true && snapshot.key=="presses"){
        index = 0;
        pressIndex = snapshot.val();
        console.log(pressIndex+"press index")
        startMain(pressIndex);
        callPovStuff();
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
        var preAIid = [331462301]; 
        var newVid = "#vid0";
        $(newVid).show();

        options.id = preAIid[0]; //if it is 0 or whatever - this has to be about the path
        console.log("AI pov")
        var whatVid = 'vid0';
        var playThis = 'player0';

        playThis = new Vimeo.Player(whatVid, options);
        playThis.setVolume(1);
        console.log("playing 0 video intro")

        playThis.on('play', function() {
            console.log('played the video!');
        }); 
        playThis.on('ended', function(data) {
            console.log("video 0 is now done at the top!")
            var oldVid = "#vid0";
            $(oldVid).hide();
            //AND START THE NEXT MISSION
            isIntroOver = true;
            startMain(1);
            //and change the dscreen state so that it shows the button
            dScreen.update({
                state:13
            })
            
            answerNum = -1;
            dataToPath(answerNum);
            myStartFunction(pathNum);

            stateChanged = true;
        })
}

var goOn = true; //will this work?
function startMain(pressIndex) {
    var arrayWords = ["Welcome Back! Discuss what you saw","Practice your special power","Use your special power!",
"Discuss what you revealed","Get ready to choose","Say your choice loudly: Option ___","Got it. Follow your new future path..."]
    //     "Welcome back!",
    //     "This is who you heard from. Discuss what you saw. Soon you'll need to choose a path to follow.", //activate timer countdown which is 2 minutes long
    //     "Scientist, please step forward + train your special power.", //activate at same time the image of training next //timer counts down
    //     "System trained, activate now.", //3 second delay before leap motion and image processing start
    //     "Please discuss what you have revealed.", //timer - 
    //     "Scientist, please choose the path to follow by saying out loud the number of the path.", //trigger from voice recognition 
    //     "Thank you, your choice has been registered. Please follow the new path." //timer until mission 2 starts
    // ]


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
        console.log("wave");
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
        var runVidOnce = true;
        //whenever there is an update to the child
        //thing inside function is fired
        if(runVidOnce){
            fusionPaths.on('child_changed', function(snapshot) {
                console.log("fusion paths changed in mainjs")
                console.log(snapshot.key); //"path present"
                if(snapshot.key=="pathPresent" && runVidOnce==true){
                    activePath = snapshot.val(); //the value of the path

                    changeImgs(activePath);
                    console.log(activePath);
                }
            }); 
        }else{ console.log("cannot because run vid once is "+runVidOnce)}

//array for POV Main Points:
        var m2pov1 = ["Fast & Convenient Travel", "Eco-Friendly Option", "Travel Virtually"]
        var m2pov2 = ["Fast & Convenient Travel", "Eco-Friendly Option", "Travel Virtually"]
        var m2pov3 = ["Fastest Possible Travel", "Most Eco-Friendly Option", "Travel Virtually"]
        var m3pov1 = ["GAME OVER", "Phosphates for food or War", "Phosphates for food or War", "Virtual Riot against Government", "Maximise Profits for Future Growth"]
        var m3pov2 = ["GAME OVER", "Virtual Riot against Government", "Bioengineered food surplus", "Bioengineered food surplus", "Earn Profits and Share Wealth"]
        var m3pov3 = ["GAME OVER", "Negotiation for technology and migration", "Virtual Riot against Government", "Trade technology for phosphates","Cooperate and Share Technology"]
//array for possible paths
        //after M1
        var possPaths2 = [-11, -12, -13];
        //after M2
        var possPaths3 = [-111, -112, -113, -121, -122, -123, -131, -132, -133];
        //after M3
        var possPaths4 = [-1131, -1132, -1133, -1211, -1212, -1213, -1221, -1222, -1223, -1231, -1232, -1233, -1313, -1311, -1312, -1321, -1322, -1323, -1331, -1332, -1333];
        //vimeo ID array for AI updates - checked
        var m1AIids = [331462487, 331464163, 331465412];

        //all good vimeo ids - checked
        //make the 0th element in here the game over - done
        var m2AIids = [331462928, 331463703, 331465258, 331466302, 331467347, 331468258, 331469268, 331470110]; 
        
        //check vimeo ids
        // var m3AIids = [331543282, 331543424, ?, ?, ?, 331543945, 331544072];
        //filler for question marks is 331543424
        var m3AIids = [331543282, 331543424, 331543424, 331543424, 331543424, 331543945, 331544072];

        function changeImgs(activePath) {
            runVidOnce = false;
            console.log("depending on mission, change imgs")
            if (activePath.toString().length == 3) {
                console.log(activePath + " we took this choice"); //from mission two
                $("#instrux").hide();
                aiUpdate1();
                //after
                //are we ready for this step yet :)
                updateImgsM2(); // this should also make their display to none
            }
            if (activePath.toString().length == 4) { //from mission three
                //this depends on their decision
                console.log(activePath + " we took this choice"); //from mission two

                $("#instrux").hide();
                aiUpdate2();
                //after
                updateImgsM3(); // this should also make their display to none
            }
            if (activePath.toString().length == 5) { //from mission three
                //this depends on their decision
                $("#instrux").hide();
                aiUpdate3();
                //after
                //centerpiece time
            } 
            else {}
        }
        // var newVid = "#vid1";
        function whichVids(mission, pathIndex){
            console.log("which vid to choose?")
            var newVid = "#vid"+mission;
            $(newVid).show();
            if(mission==1){ //if we are in mission 3
                console.log("inside"+mission+"this video index"+pathIndex);
                options.id = m1AIids[pathIndex]; //if it is 0 or whatever - this has to be about the path
                $('#vid1').show();
                playIt(mission);
            }
            if(mission==2){ //if we are in mission 3
                console.log("inside"+mission+"this video index"+pathIndex);
                options.id = m2AIids[pathIndex]; //if it is 0 or whatever - this has to be about the path
                $('#vid2').show();
                playIt(mission);
            }
            if(mission==3){ //if we are in mission 3
                console.log("inside"+mission);
                options.id = m3AIids[pathIndex]; //if it is 0 or whatever - this has to be about the path
                 $('#vid3').show();
                playIt(mission);
            }
        }
        var gameOver = false;
        // var player1, player2, player3;
        function playIt(mission){
            console.log("AI pov")
            var whatVid = 'vid'+mission;
            var playThis = 'player'+mission;

            playThis = new Vimeo.Player(whatVid, options);
            playThis.setVolume(1);
            console.log("playing AI for mission"+mission)

            playThis.on('play', function() {
                console.log('played the video!');
            }); 
            playThis.on('ended', function(data) {
                console.log("video done")
                var oldVid = "#vid"+mission;
                $(oldVid).hide();
                //AND START THE NEXT MISSION
                if(goOn==true && gameOver == false){ //if we should go on the next mission
                    goOnNextMission();
                    goOn = false;
                }
                if(goOn==true && gameOver==true){
                    console.log("game over")
                }

                //and tell dScreen button that it should go back
                dScreen.update({
                    state: 13
                })
            })
        }
        var thisPath;
        function aiUpdate1(){
            console.log("in AI1");
            if (activePath == possPaths2[0]) {
                thisPath = 0;
                whichVids(1, thisPath);
            }
            if (activePath == possPaths2[1]) {
                thisPath = 1;
                whichVids(1, thisPath);
            }
            if (activePath == possPaths2[2]) {
                thisPath = 2;
                whichVids(1, thisPath);
            }
            //just one option
        }
        function aiUpdate2(){
            console.log("AI2");
            for(var i = 0; i<possPaths3.length; i++){
               if (activePath == possPaths3[0] || activePath == possPaths3[1]) {
                //activate GAME OVER AI UPDATE
                    console.log(activePath+ " bad path! "+possPaths3[0]+" bad path! "+possPaths3[1])
                    console.log("activate game over ai update after mission 2");
                    gameOver = true;
                    //that vid should be specially accessed
                    thisPath = 0; // ai update 3 vid for game over should be at the 0th index for this ai update video array (can be same as ai update 3 vid)
               }
               else if(activePath==possPaths3[i]){
                    thisPath = i;
                }
            }
            //just one option
             whichVids(2, thisPath); //then in here if it is game over we will access the 0th item which would be a game over
        }
        function aiUpdate3(){
            console.log("AI3");
            for(var i = 0; i<possPaths4.length; i++){
                if(activePath==possPaths4[0]||activePath==possPaths4[1]||activePath==possPaths4[2]){
                    thisPath = 0;
                }
                if(activePath==possPaths4[3]||activePath==possPaths4[4]||activePath==possPaths4[5]||activePath==possPaths4[6]||activePath==possPaths4[7]||activePath==possPaths4[8]){
                    thisPath = 1;
                }
                if(activePath==possPaths4[9]||activePath==possPaths4[10]){
                    thisPath = 2;
                }
                if(activePath==possPaths4[11]||activePath==possPaths4[12]){
                    thisPath = 3;
                }
                if(activePath==possPaths4[13]||activePath==possPaths4[14]||activePath==possPaths4[15]){
                    thisPath = 4;
                }
                if(activePath==possPaths4[16]||activePath==possPaths4[17]||activePath==possPaths4[18]||activePath==possPaths4[19]){
                    thisPath = 5;
                }
               if(activePath==possPaths4[20]){
                    thisPath = 6;
                }
            }
            //just one option
             whichVids(3, thisPath); //then in here if it is game over we will access the 0th item which would be a game over
        }

        function updateImgsM2(){
            //this depends on their decision
            if (activePath == possPaths2[0]) {
mission = 2;
pickArray = 0;
init();
                //img 1 in css is replaced with This
                //index.js receives command for new image location
$('#image-1').attr('src','img/M_2_POV_1.png');
                document.getElementById("mainPoints1").innerHTML = m2pov1[0];
$('#image-2').attr('src','img/M_2_POV_2.png');
                document.getElementById("mainPoints2").innerHTML = m2pov2[0];
$('#image-3').attr('src','img/M_2_POV_3.png');
                document.getElementById("mainPoints3").innerHTML = m2pov3[0];
                //show this
            }
            if (activePath == possPaths2[1]) {
mission = 2;
pickArray = 1;
init();
                //show this
$('#image-1').attr('src','img/M_2_POV_1.png');
                document.getElementById("mainPoints1").innerHTML = m2pov1[1];
$('#image-2').attr('src','img/M_2_POV_2.png');
                document.getElementById("mainPoints2").innerHTML = m2pov2[1];
$('#image-3').attr('src','img/M_2_POV_3.png');
                document.getElementById("mainPoints3").innerHTML = m2pov3[1];
            }
            if (activePath == possPaths2[2]) {
mission = 2;
pickArray = 2;
init();
                //show this
$('#image-1').attr('src','img/M_2_POV_1.png');
                document.getElementById("mainPoints1").innerHTML = m2pov1[2];
$('#image-2').attr('src','img/M_2_POV_2.png');
                document.getElementById("mainPoints2").innerHTML = m2pov2[2];
$('#image-3').attr('src','img/M_2_POV_3.png');
                document.getElementById("mainPoints3").innerHTML = m2pov3[2];
            }
        }

//MISSION 3

        function updateImgsM3(){
//-111 -112            
           if (activePath == possPaths3[0] || activePath == possPaths3[1]) {
//nothing should happen at all in threejs either
$('#three-container').hide();
// mission = 3;
// pickArray = 0;
// init();
$('#image-1').fadeOut();
$('#image-2').fadeOut();
$('#image-3').fadeOut();
$("#mainPoints1").fadeOut();
$("#mainPoints2").fadeOut();
$("#mainPoints3").fadeOut();
$("#instrux").hide();
//game over
            }
//-113
            if (activePath == possPaths3[2]){
mission = 3;
pickArray = 1;
init();

$('#image-1').attr('src','img/M_3_POV_1_3_1.png');
                document.getElementById("mainPoints1").innerHTML = m3pov1[1];
$('#image-2').attr('src','img/M_3_POV_1_3_2.png');
                document.getElementById("mainPoints2").innerHTML = m3pov2[1];
$('#image-3').attr('src','img/M_3_POV_1_3_3.png');
                document.getElementById("mainPoints3").innerHTML = m3pov3[1];
            }
//-121
            if (activePath == possPaths3[3]){
mission = 3;
pickArray = 2;
init();

$('#image-1').attr('src','img/M_3_POV_2_1_1.png');
                document.getElementById("mainPoints1").innerHTML = m3pov1[2];
$('#image-2').attr('src','img/M_3_POV_2_1_2.png');
                document.getElementById("mainPoints2").innerHTML = m3pov2[2];
$('#image-3').attr('src','img/M_3_POV_2_1_3.png');
                document.getElementById("mainPoints3").innerHTML = m3pov3[2];
            }

//-122 -123
            if (activePath == possPaths3[4] || activePath == possPaths3[5]) {
mission = 3;
pickArray = 3;
init();

$('#image-1').attr('src','img/M_3_POV_2_2_1.png');
                document.getElementById("mainPoints1").innerHTML = m3pov1[3];
$('#image-2').attr('src','img/M_3_POV_2_2_2.png');
                document.getElementById("mainPoints2").innerHTML = m3pov2[3];
$('#image-3').attr('src','img/M_3_POV_2_2_3.png');
                document.getElementById("mainPoints3").innerHTML = m3pov3[3];
            }
//-131 -132 -133
            if (activePath == possPaths3[6] || activePath == possPaths3[7] || activePath == possPaths3[8])  {
mission = 3;
pickArray = 4;
init();

$('#image-1').attr('src','img/M_3_POV_3_1_1.png');
                document.getElementById("mainPoints1").innerHTML = m3pov1[4];
$('#image-2').attr('src','img/M_3_POV_3_1_2.png');
                document.getElementById("mainPoints2").innerHTML = m3pov2[4];
$('#image-3').attr('src','img/M_3_POV_3_1_3.png');
                document.getElementById("mainPoints3").innerHTML = m3pov3[4];
            }
        }


        //if something about the button has happened and we are on that mission
        //start the one
        //but then we will always be there, running it
        //so... 


         callPovStuff = function(){
            dScreen.update({
                state:0
            })
            // console.log(newState);
            console.log(pressIndex+"in pov start");
            // if(pressIndex==newState){
                var myTimer = setTimeout(one, timings[0]);
                var myTimer = setTimeout(two, timings[1]);
                var myTimer = setTimeout(three, timings[2]);
                var myTimer = setTimeout(four, timings[3]);
                var myTimer = setTimeout(five, timings[4]);
                var myTimer = setTimeout(six, timings[5]);
            // } 
        }


        function one() {
            console.log("in ONE")
            document.getElementById("instrux").innerHTML = arrayWords[index];

            $("#imageContainer-1").fadeOut(delay);
            $("#image-1").fadeIn(delay*1.1);
            $("#mainPoints1").fadeIn(delay);

            $("#imageContainer-2").fadeOut(delay);
            $("#image-2").fadeIn(delay * 1.1);
            $("#mainPoints2").fadeIn(delay);


            $("#imageContainer-3").fadeOut(delay);
            $("#image-3").fadeIn(delay * 1.1);
            $("#mainPoints3").fadeIn(delay);

            $("#instrux").show(); //should there  be a fade delay

            //inc. index by 1 on keydown
            index++;
            console.log(index);
            //we want to populate dscreen with a new state
            dScreen.update({
                state: index
            })
            if (audioCtx.state === 'suspended') {
                audioCtx.resume();
            }
            //Load Audio 
            wavesurfer.load('audio/Fusion_1.mp3');
            //voice talking "This is who you heard from, you have two minutes to discuss"
            console.log("one: welcome back: images from mission")
            // wavesurfer.on('ready', function() {
            //     wavesurfer.play();
            // });
            // $('#three-container').show();
        }




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
            console.log("two: practice special power")
            // wavesurfer.on('ready', function() {
            //     wavesurfer.play();
            // });
        }



        //IMPORTANT! THERE IS A KEYPRESS HERE "3" 


        //PART 3: USE SPECIAL POWER
        function three() {
            $("#image-1").fadeOut(delay * 1.1);
            $("#image-2").fadeOut(delay * 1.1);
            $("#image-3").fadeOut(delay * 1.1);
            $("#mainPoints1").fadeOut(delay);
            $("#mainPoints2").fadeOut(delay);
            $("#mainPoints3").fadeOut(delay);

            //something for the three container?
            $("#three-container").show();
            // go();

            index++;
            //we want to populate dscreen with a new state
            dScreen.update({
                state: index
            })

            document.getElementById("instrux").innerHTML = arrayWords[index];
            
            if (audioCtx.state === 'suspended') {
                audioCtx.resume();
            }

            // audio instruction: special power
            wavesurfer.load('audio/Fusion_2._Special_Power.mp3');
            //voice talking
            console.log("three: reveal hidden information")
            // wavesurfer.on('ready', function() {
            //     wavesurfer.play();
            // });
        }


        //PART FOUR: Discuss What has been revealed
        function four() {
            // x.style.display = "none";
            theyLive = true;

            index++;
            dScreen.update({
                state: index
            })
            document.getElementById("instrux").innerHTML = arrayWords[index];

            console.log("four: discuss what you revealed")
            // wavesurfer.load('audio/4-Revealed.mp3');
            // wavesurfer.on('ready', function() {
            //     wavesurfer.play();
            // });
        }


        // PART FIVE: Discuss a Decision

        function five() {
            $("#three-container").hide();
            theyLive = false;
            
            $("#image-1").fadeIn(delay * 1.3);
            $("#image-2").fadeIn(delay * 1.3);
            $("#image-3").fadeIn(delay * 1.3);
            $("#mainPoints1").fadeIn(delay);
            $("#mainPoints2").fadeIn(delay);
            $("#mainPoints3").fadeIn(delay);
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
            console.log("five: get ready to decide")
            // ask players to make a decision
            wavesurfer.load('audio/decide.mp3');
            // wavesurfer.on('ready', function() {
            //     wavesurfer.play();
            // });

            // var x = document.getElementById('three-container');
            // $("#three-container").fadeOut(delay * 1.1);
            // x.style.opacity = .1;
        }


        // PART SIX: Provide a Decision
        function six() {
            console.log("six: say your choice")
            document.getElementById("instrux").innerHTML = arrayWords[index];

            answerNum = 0;
            // if(audioCtx.state === 'suspended') {
            //   audioCtx.resume();
            // }

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
            console.log("seven: choice registered, follow the new path")
            document.getElementById("instrux").innerHTML = arrayWords[index]; //may need to be specifically "A" and so on

                                        //Time Out 5s before playing response for realism
                                        window.setTimeout(function() {
                                            answer = "Got it, Option Ay";
                                            readOutLoud(answer);
                                        }, 3000);
                                        //fade our other options
            $("#image-2").fadeOut(delay);
            $("#image-3").fadeOut(delay);
            $("#image-1").fadeOut(delay);

            $("#mainPoints1").fadeOut(delay);
            $("#mainPoints2").fadeOut(delay);
            $("#mainPoints3").fadeOut(delay);
                                        //Thank you decision has been registered
                                        // Add voice update here
                                        //logic so AI videos aren't triggered twice
                                        // var runVidOnce = true;

                                        //send the answer to the database so we can add it to the path
                                        answerNum = 1;
                                        dataToPath(answerNum);
                                        //update the text on the screen
                                        // document.getElementById("instrux").innerHTML = arrayWords[index];
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
            console.log("seven: choice registered, follow the new path")
            document.getElementById("instrux").innerHTML = arrayWords[index];

                                        answerNum = 2;
                                        dataToPath(answerNum);
                                        // document.getElementById("instrux").innerHTML = arrayWords[index];

                                        //Time Out 5s before playing response for realism
                                        window.setTimeout(function() {
                                            answer = "Got it, Option B";
                                            console.log(answer)
                                            readOutLoud(answer);
                                        }, 3000);
                                        //fade out other options
            $("#image-1").fadeOut(delay);
            $("#image-3").fadeOut(delay);
            $("#image-2").fadeOut(delay);

            $("#mainPoints1").fadeOut(delay);
            $("#mainPoints2").fadeOut(delay);
            $("#mainPoints3").fadeOut(delay);

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
            console.log("seven: choice registered, follow the new path")
            document.getElementById("instrux").innerHTML = arrayWords[index];

                                        answerNum = 3;
                                        dataToPath(answerNum);
                                        // document.getElementById("instrux").innerHTML = arrayWords[index];

                                        //Time Out 5s before playing response for realism
                                        window.setTimeout(function() {
                                            answer = "Got it, Option C";
                                            console.log(answer)
                                            readOutLoud(answer);
                                        }, 3000);
                                        //fade out other options
            $("#image-1").fadeOut(delay);
            $("#image-2").fadeOut(delay);
            $("#image-3").fadeOut(delay);

            $("#mainPoints1").fadeOut(delay);
            $("#mainPoints2").fadeOut(delay);
            $("#mainPoints3").fadeOut(delay);
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
                    console.log("speaking answer");
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


        //////////////////////////

        // To do:
        // LOADING AI UPDATE
        //

    }
}