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
var dScreen = firebase.database().ref('/fusionDB/dScreen');
dScreen.update({
    state: index
})
var stateChanged = false;
dScreen.on('child_changed',function(snapshot) {
    if(snapshot.key=="screenState"){
        stateIsOn = snapshot.val();
        if(stateIsOn==1){
            console.log("good to go");
            stateChanged = true;
            startMain();
        }else{
            console.log("not yet")
            // stateChanged = false;
        }
    }
    // if(snapshot.key=="state"){
    //     console.log("yes this")
    //     index = snapshot.val();
    //     stateChanged = true;
    // }
})
startMain();

function startMain(){
// if(stateChanged){

    console.log("in mainjs")

    wave();

    function wave() {
        // var context = new AudioContext();
        // Setup all nodes
        var wavesurfer = WaveSurfer.create({
            container: '#waveform'
        });



        // $("body").keydown(function(event) {
        //     console.log(event.which);



        //PART ZERO: 

        // INITIAL SCREEN = "WELCOME"

        // PART ONE: 
        // LOAD MISSION VISUALS: "This is who you heard from"
    var fusionPaths = firebase.database().ref('/fusionPaths');
    var pathIndex;
    //whenever there is an update to the child
    //thing inside function is fired
    fusionPaths.on('child_changed',function(snapshot) {
        console.log(snapshot.key); //"path present"
        activePath = snapshot.val(); //the value of the path
        changeImgs();
        console.log(activePath);
    });

    var possPaths2 = [-11, -12, -13];
    var possPaths3 = [-111, -112, -113, -121, -122, -123, -131, -132, -133];
    function changes(){
        console.log("whassup")
        console.log(activePath);
        if(activePath.toString().length==3){ 
            console.log(activePath+"hi");
        }
    }
    function changeImgs(){
        if(activePath.toString().length==2){
            //show first 3 portraits EVER
        }
        if(activePath.toString().length==3){ console.log(activePath+"hi");
            //this depends on their decision
            if(activePath==possPaths2[0]){
                //img 1 in css is replaced with This
                //index.js receives command for new image location
                $("#image-1")[0].style.backgroundImage = 'url(img/m2/1a.jpg'
                $("#image-2")[0].style.backgroundImage = 'url(img/m2/1b.jpg'
                $("#image-3")[0].style.backgroundImage = 'url(img/m2/1c.jpg'
                                //show this
            }
            if(activePath==possPaths2[1]){
                //show this
                $("#image-1")[0].style.backgroundImage = 'url(img/m2/2a.jpg'
                $("#image-2")[0].style.backgroundImage = 'url(img/m2/2b.jpg'
                $("#image-3")[0].style.backgroundImage = 'url(img/m2/2c.jpg'
            }
            if(activePath==possPaths2[2]){
                //show this
                $("#image-1")[0].style.backgroundImage = 'url(img/m2/3a.jpg'
                $("#image-2")[0].style.backgroundImage = 'url(img/m2/3b.jpg'
                $("#image-3")[0].style.backgroundImage = 'url(img/m2/3c.jpg'
            }
        }
        if(activePath.toString().length==4){
            //this depends on their decision
            if(activePath==possPaths3[0]||activePath==possPaths3[1]||activePath==possPaths3[2]){
                $("#image-1")[0].style.backgroundImage = 'url(img/m3/1a.jpg'
                $("#image-2")[0].style.backgroundImage = 'url(img/m3/1b.jpg'
                $("#image-3")[0].style.backgroundImage = 'url(img/m3/1c.jpg'
            }
            if(activePath==possPaths3[3]||activePath==possPaths3[4]||activePath==possPaths3[5]){
                $("#image-1")[0].style.backgroundImage = 'url(img/m3/2a.jpg'
                $("#image-2")[0].style.backgroundImage = 'url(img/m3/2b.jpg'
                $("#image-3")[0].style.backgroundImage = 'url(img/m3/2c.jpg'
            }
            if(activePath==possPaths3[6]||activePath==possPaths3[7]||activePath==possPaths3[8]){
                $("#image-1")[0].style.backgroundImage = 'url(img/m3/3a.jpg'
                $("#image-2")[0].style.backgroundImage = 'url(img/m3/3b.jpg'
                $("#image-3")[0].style.backgroundImage = 'url(img/m3/3c.jpg'
            }
        }            
        else{} 
}
    one();
        function one() {
            console.log("in")
            $("#imageContainer-1").fadeOut(delay2);
            $("#image-1").fadeIn(delay);
            // $(".mainPoints").fadeIn(delay * 2);

            $("#imageContainer-2").fadeOut(delay2);
            $("#image-2").fadeIn(delay * 1.1);
            $("#imageContainer-3").fadeOut(delay2);
            $("#image-3").fadeIn(delay * 1.2);
            //inc. index by 1 on keydown
            // index++;
            // console.log(index);
            // //we want to populate dscreen with a new state
            // dScreen.update({
            //     state: index
            // })

            //Load Audio 
            // wavesurfer.load('audio/Fusion_1.mp3');
            // //voice talking "This is who you heard from, you have two minutes to discuss"
            // console.log("playing audio: Welcome Back from Mission")
            // wavesurfer.on('ready', function() {
            //     wavesurfer.play();
            // });
        }

        // var myTimer = setTimeout(one, timings[0]);




        //PART 2: TRAIN SPECIAL POWERS

        function two() {
            index++;
            //we want to populate dscreen with a new state
            dScreen.update({
                state: index
            })
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
            // $(".mainPoints").fadeOut(delay * 1.1);

            // var x = document.getElementById('three-container');
            // x.style.display = "block";
            $("#three-container").fadeIn(delay * 3);

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
            console.log("Playing audio: Use your Special Power")
            wavesurfer.on('ready', function() {
                wavesurfer.play();
            });


            //Change the background of container so that text is revealed using animation
            // window.setTimeout(function() {
            // $("#image-1").css("background-image", "url('img/sp_reveal.png')");
            // $("#image-2").css("background-image", "url('img/sp_reveal.png')");
            // $("#image-3").css("background-image", "url('img/sp_reveal.png')");
            // }, 5000);

        }

        // var myTimer = setTimeout(three, timings[2]);

        // $("body").keydown(function(event) {
        //     console.log(event.which);        
        //     if (event.which == 49) { //pressed 1
        //         x.style.display = "block";
        //     }
        //     if (event.which == 50) { //pressed 1
        //         x.style.display = "none";
        //     }
        // })

        //PART FOUR: Discuss What has been revealed
        function four() {
            // x.style.display = "none";

            index++;
            dScreen.update({
                state: index
            })

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
            $(".options").fadeIn(delay * 2);

            //inc. index by 1 on keydown
            index++;
            //we want to populate dscreen with a new state
            dScreen.update({
                state: index
            })



            console.log("You now have one minute to decide which POV to follow");
            // ask players to make a decision
            wavesurfer.load('audio/decide.mp3');
            wavesurfer.on('ready', function() {
                wavesurfer.play();
            });

            // var x = document.getElementById('three-container');
            $("#three-container").fadeOut(delay * 1.1);
            // x.style.opacity = .1;

            // $('#image-1').fadeTo('slow', 1.0, function() {
            //     $(this).css('background-image', "url('img/image_text.png')");
            // }).fadeTo('slow', 1);
            // $('#image-2').fadeTo('slow', 1.0, function() {
            //     $(this).css('background-image', "url('img/image_text.png')");
            // }).fadeTo('slow', 1);
            // $('#image-3').fadeTo('slow', 1.0, function() {
            //     $(this).css('background-image', "url('img/image_text.png')");
            // }).fadeTo('slow', 1);
            // }, 5000);    

        }

        // var myTimer = setTimeout(five, timings[4]);


        // PART SIX: Provide a Decision

        function six() {
            // var x = document.getElementById('three-container');
            // x.style.display = "none";
            // Define a new speech recognition instance
            var rec = null;
            try {
                rec = new webkitSpeechRecognition();
            } catch (e) {
                document.querySelector('.msg').setAttribute('data-state', 'show');
                startRecBtn.setAttribute('disabled', 'true');
                stopRecBtn.setAttribute('disabled', 'true');
            }
            rec.start();
            console.log("recording started")

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

                                        //Time Out 5s before playing response for realism
                                        window.setTimeout(function() {
                                            answer = "Got it, Option C";
                                            console.log(answer)
                                            readOutLoud(answer);
                                        }, 3000);
                                        //fade out other options
                                        $("#image-1").fadeOut(delay * 1.2);
                                        $("#image-2").fadeOut(delay * 1.2);

                                    }else{}

                                }
                            }
                        }
                    }
                };
                //READ Out Speech
                function readOutLoud(message) {
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



        // if (event.which == 49) { //pressed 1
        //     $("#imageContainer-1").fadeOut(delay2);
        //     $("#image-1").fadeIn(delay);
        //     $("#imageContainer-2").fadeOut(delay2);
        //     $("#image-2").fadeIn(delay * 1.1);
        //     $("#imageContainer-3").fadeOut(delay2);
        //     $("#image-3").fadeIn(delay * 1.2);
        //     //inc. index by 1 on keydown
        //     index++;
        //     console.log(index);
        //     //we want to populate dscreen with a new state
        //     dScreen.update({
        //         state: index
        //     })

        //     //Load Audio 
        //     wavesurfer.load('audio/Fusion_1.mp3');
        //     //voice talking "This is who you heard from, you have two minutes to discuss"
        //     console.log("playing audio: Welcome Back from Mission")
        //     wavesurfer.on('ready', function() {
        //         wavesurfer.play();
        //     });

        //     //start timer 2 minutes      
        //     function startTimer() {
        //         console.log("TIMER STARTED")
        //     }
        //     setTimeout(startTimer, 5000);

        // }


        //PART 2a: ACTIVATE SPECIAL POWERS

        // if (event.which == 50) { //tap 2
        //     console.log("Train Special Powers");
        //     index++;
        //     //we want to populate dscreen with a new state
        //     dScreen.update({
        //         state: index
        //     })
        //     // add a timer here
        //     // message to say system trained after timer     
        // }


        // //PART 2b:
        // if (event.which == 51) { //tap 3
        //     console.log("Special Powers Trained...Activate Now");

        //     //inc. index by 1 on keydown
        //     index++;
        //     //we want to populate dscreen with a new state
        //     dScreen.update({
        //         state: index
        //     })
        //     // load special power visualization
        //     // JS app1.js app2.js app3.js
        //     // audio instruction: special power
        //     wavesurfer.load('audio/Fusion_2._Special_Power.mp3');
        //     //voice talking
        //     console.log("playing audio: Special Power")
        //     wavesurfer.on('ready', function() {
        //         wavesurfer.play();
        //     });


        //         //Change the background of container so that text is revealed using animation
        //         window.setTimeout(function() {
        //             $("#image-1").css("background-image", "url('img/sp_reveal.png')");
        //             $("#image-2").css("background-image", "url('img/sp_reveal.png')");
        //             $("#image-3").css("background-image", "url('img/sp_reveal.png')");
        //     }, 5000);
        // }


        // $("body").keydown(function(event) {

        //     //PART THREE: Please Discuss What You have revealed"
        //     if (event.which == 52) { //pressed 4

        //         //inc. index by 1 on keydown
        //         index++;
        //         //we want to populate dscreen with a new state
        //         dScreen.update({
        //             state: index
        //         })

        //         console.log("Please Discuss What You have revealed");
        //         // ask players to make a decision
        //         wavesurfer.load('audio/decide.mp3');
        //         wavesurfer.on('ready', function() {
        //             wavesurfer.play();
        //         });

        //         // Set a timer e.g. 15 seconds.
        //         // window.setTimeout(function(){
        //         // console.log("Fading Content ...")
        //         $('#image-1').fadeTo('slow', 1.0, function() {
        //             $(this).css('background-image', "url('img/image_text.png')");
        //         }).fadeTo('slow', 1);
        //         $('#image-2').fadeTo('slow', 1.0, function() {
        //             $(this).css('background-image', "url('img/image_text.png')");
        //         }).fadeTo('slow', 1);
        //         $('#image-3').fadeTo('slow', 1.0, function() {
        //             $(this).css('background-image', "url('img/image_text.png')");
        //         }).fadeTo('slow', 1);
        //         // }, 5000);     

        //     }
        //  }

        // //PART FOUR: "PLEASE DISCUSS WHAT YOU HAVE REVEALED"
        // // THIS should just be on a timer remove key press

        // if (event.which == 53) { //pressed 5
        //     console.log("Scientist Please choose the path");
        //     //Please discuss what you have revealed audio

        //     //inc. index by 1 on keydown
        //     index++;
        //     //we want to populate dscreen with a new state
        //     dScreen.update({
        //         state: index
        //     })

        //     //Set Timer for 1minute  

        //     wavesurfer.load('audio/state_decision.mp3');
        //     //voice talking
        //     wavesurfer.on('ready', function() {
        //         wavesurfer.play();
        //     });

        // }



        // //Selecting Option (A, B, C)
        // if (event.which == 65) { //pressed A
        //     //NOT WORKING reset images to image with text
        //     $("#image-1").attr("src", "img/image_text.png");
        //     $("#image-2").attr("src", "img/image_text.png");
        //     // Set border to confirm decision
        //     console.log("Decision A")
        //     $("#image-1").css("border", "5px solid #fff");
        //     wavesurfer.load('audio/option_a.mp3');
        //     //voice talking
        //     wavesurfer.on('ready', function() {
        //         wavesurfer.play();
        //         //animate content
        //     });
        //     $("#image-2").fadeOut(delay * 1.2);
        //     $("#image-3").fadeOut(delay * 1.2);

        // }
        // if (event.which == 66) { //pressed B
        //     console.log("Decision B")
        //     $("#image-2").css("border", "5px solid #fff");
        //     wavesurfer.load('audio/option_b.mp3');
        //     //voice talking
        //     wavesurfer.on('ready', function() {
        //         wavesurfer.play();
        //     });
        //     $("#image-1").fadeOut(delay * 1.2);
        //     $("#image-3").fadeOut(delay * 1.2);
        // }
        // if (event.which == 67) { //pressed B
        //     console.log("Decision C")
        //     $("#image-3").css("border", "5px solid #fff");
        //     wavesurfer.load('audio/option_c.mp3');
        //     //voice talking
        //     wavesurfer.on('ready', function() {
        //         wavesurfer.play();
        //     });
        //     $("#image-1").fadeOut(delay * 1.2);
        //     $("#image-3").fadeOut(delay * 1.2);
        // }

        // //PART FIVE: AI Update and Next Mission begins

        // //If the last decision was X, then load mission set 2.x
        // //If the last decision was X, then centre piece changes
        // //If the last decision was x, then LIGHTS CHANGE
        // //https://medium.com/javascript-in-plain-english/how-to-detect-a-sequence-of-keystrokes-in-javascript-83ec6ffd8e93

        // //build an array that keeps track of what key was pressed / decision taken
        // let buffer = [];
        // // build a timer to understand when last key was pressed
        // let lastKeyTime = Date.now();

        // // eventlistener for a keydown event, taking actual key value
        // document.addEventListener('keydown', event => {
        //     //convert to lower case so it always works and only allow character keys
        //     const charList = 'abcdefghijklmnopqrstuvwxyz0123456789';
        //     const key = event.key.toLowerCase();

        //     if (charList.indexOf(key) === -1) return;
        //     const currentTime = Date.now();
        //     //if time between last key press and current press is > 1s, clear buffer        
        //     if (currentTime - lastKeyTime > 1000) {
        //         buffer = [];
        //     }
        //     //print buffer to console
        //     buffer.push(key);
        //     lastKeyTime = currentTime;
        //     console.log(buffer);
        // });

        //
        //end of script
        // });

        //Timer 

        //

    }
}