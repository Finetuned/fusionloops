$("body").keydown(function(event){ 
	console.log(event.which);

	if(event.which==84){ //pressed "t" as a test key
		console.log("test running");


(function() {
	// Define a new speech recognition instance
	var rec = null;
	try {
		rec = new webkitSpeechRecognition();
	} 
	catch(e) {
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
		       			if (userSaid(str, 'option')){
		       			//then listening for decision (A, B, C)
		       				if (userSaid(str, 'a')){			
								$("#image-1").css("border", "5px solid #fff");	
		       					console.log("border applied");
		       					rec.stop();
		       					console.log("stopped recording")

		       					//inc. index by 1 on keydown
								index++;
						    	console.log(index);
						    //we want to populate dscreen with a new state
						    	dScreen.update({
						      	state:index
						    	})

		       			//Time Out 5s before playing response for realism
		       					window.setTimeout(function(){
		       					answer = "Got it, Option Ay";
          						readOutLoud(answer);
          						}, 3000);
          				//fade our other options
          						$("#image-2").fadeOut(delay*1.2);
								$("#image-3").fadeOut(delay*1.2);
						//Thank you decision has been registered
						// Add voice update here
								console.log("choice registered, follow the new path")
		       				}
		       				// Option B
		       				else if (userSaid(str, 'b')){
								$("#image-2").css("border", "5px solid #fff");	
		       					console.log("border applied");
		       					rec.stop();
		       					console.log("stopped recording")
		
		//inc. index by 1 on keydown
								index++;
						    	console.log(index);
						    //we want to populate dscreen with a new state
						    	dScreen.update({
						      	state:index
						    	})

		       			//Time Out 5s before playing response for realism
		       					window.setTimeout(function(){
		       					answer = "Got it, Option B";
		       					console.log(answer)
          						readOutLoud(answer);
          						}, 3000);
		//fade out other options
          						$("#image-1").fadeOut(delay*1.2);
								$("#image-3").fadeOut(delay*1.2);          						
		       				}		       					
		       				
		       				// Option C
		       				else if (userSaid(str, 'c')){
								$("#image-3").css("border", "5px solid #fff");	
		       					console.log("border applied");
		       					rec.stop();
		       					console.log("stopped recording")
		//inc. index by 1 on keydown
								index++;
						    	console.log(index);
						    //we want to populate dscreen with a new state
						    	dScreen.update({
						      	state:index
						    	})

		       			//Time Out 5s before playing response for realism
		       					window.setTimeout(function(){
		       					answer = "Got it, Option C";
		       					console.log(answer)
          						readOutLoud(answer);
          						}, 3000);
		       		//fade out other options
         						$("#image-1").fadeOut(delay*1.2);
								$("#image-2").fadeOut(delay*1.2);
		       				}

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
})();

}
});
