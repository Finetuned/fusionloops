var holo = firebase.database().ref('/fusionDB/hologram');
var dScreen = firebase.database().ref('/fusionDB/dScreen');
var fusionPaths = firebase.database().ref('/fusionPaths');
var pov = firebase.database().ref('/fusionDB/pov/');

var pathNum = -1;

//we may need to pull pathnum from the database first
function dataToPath(decision){
	var decisionDB = decision.toString();
	if(decision==-1){
		pathNum = -1;
		// myStartFunction();
	}
	if(decision>-1){
		pathNum = +(pathNum+decisionDB);
		console.log(pathNum+"pathNum");
	}
	fusionPaths.update({
		pathPresent: pathNum //here we are making the path
	})
}
// 	//if a decision was made 
// 	//let's imagine the decision was 1
// 	//we need to add that to the decision path, literally
fusionPaths.on('child_changed',function(snapshot) {
	console.log(snapshot.key);
	console.log(snapshot.val()); //now we have a path we should use in the missions and AI update and hologram

	//everytime you call this you chuck it in with the timesnap
	//only if you are done with the whole journey
	if(snapshot.key=="pathPresent" && snapshot.val().toString().length==5){
		console.log("whole thing over");
		console.log(pathNum);
		console.log(snapshot.val())
		fusionPaths.push({
			pathTotal:pathNum
		})
	}
});

reset();
var index = 0;
var inactive = 0;
var active = 1;
var p1 = inactive;
var p2 = inactive;
var p3 = inactive;
function reset(){
	//population dScreen with the beginning state
	dScreen.update({
	    screenState: 0,
	    presses:0,
	    state: 13
	})

	//when program starts all pov should be inactive
	fusionPaths.update({
		pathPresent: -1 //here we are making the path
	})

	//we want to populate pov with the beginning state
	pov.update({
		m1:
			{
				pov1:0,
				pov2:0,
				pov3:0,
				state:-1
			},
		m2:
			{
				pov1:0,
				pov2:0,
				pov3:0,
				state:-1
			},
		m3:
			{
				pov1:0,
				pov2:0,
				pov3:0,
				state:-1
			}		
	})
}


// //how long each mission lasts
var lightIndex = 0;
var start = true;
var lightMission;

var lightStuffUp;
var lengthPovTime = 9000; //this is just for the LEDs to know how long they should wait until they light up the next POV

//MAYBE SHOULDN'T HAVE THIS YET
function myStartFunction(pathNum){
	lightStuffUp= setInterval(lightMission, lengthPovTime);	
}

function lightMission(){
	lightIndex++;
	lightUp(pathNum,lightIndex) //pathnum means mission stage but also will mean mission type in this case - 
}

function lightUp(mission, povLight){
	console.log(mission+" missionsit "+povLight+"light up" + " and this is the pathnum:"+pathNum)
	if(mission.toString().length==2 && povLight>4){
		lightIndex = 0;
		start = false;
		clearInterval(lightStuffUp)
	}
	if(povLight>4){
		lightIndex = 0;
		clearInterval(lightStuffUp);
		goOn = true; //will this work?
	}
	if(povLight==1){
		p1 = active;
		p2 = inactive;
		p3 = inactive;
	}
	if(povLight==2){
		p1 = inactive;
		p2 = active;
		p3 = inactive;
	}
	if(povLight==3){
		p1 = inactive;
		p2 = inactive;
		p3 = active;
	}
	if(povLight==4){
		p1 = inactive;
		p2 = inactive;
		p3 = inactive;
	}

	if(mission.toString().length==2&&start==true){
		pov.update({
			m1:
				{
					pov1:p1,
					pov2:p2,
					pov3:p3,
					state:pathNum
				},		
		})	
	}
	if(mission.toString().length==3){
		pov.update({
			m2:
				{
					pov1:p1,
					pov2:p2,
					pov3:p3,
					state:pathNum
				},		
		})	
	}
	if(mission.toString().length==4){
		pov.update({
			m3:
				{
					pov1:p1,
					pov2:p2,
					pov3:p3,
					state:pathNum
				},		
		})	
	}
	if(mission.toString().length==5){
		console.log("hologram center piece time")	
	}
}

// // waterfall effect
// fusionPaths.on('child_changed',function(snapshot) {
// 	console.log(snapshot.key);
// 	console.log(snapshot.val()); //now we have a path we should use in the missions and AI update and hologram
// 	console.log(pathNum);

// this should be called after the AI update instead
		// myStartFunction(pathNum);
// })

function goOnNextMission(){
    myStartFunction(pathNum);
}
