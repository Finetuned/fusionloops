$("body").keydown(function(event){ 
console.log("in app 1")
if(event.which==50){
console.log("in here");
  var bridge = document.getElementById("image-1"),
  bridgeCanvas = bridge.getContext('2d');
  (function(){
    // get the canvas, 2d context, paragraph for data and set the radius
    var canvas = document.getElementById("image-1"),
    // document.getElementsByTagName('canvas')[0],
        ctx = canvas.getContext('2d'),
        // info = document.getElementById('data'),
        radius = 10;

    // set the canvas to cover the screen
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;

    // move the context co-ordinates to the bottom middle of the screen
    // ctx.translate(canvas.width/2, canvas.height);

    // ctx.fillStyle = "rgba(0,0,0,0.9)";
    ctx.strokeStyle = "rgba(255,0,0,0.9)";
    ctx.lineWidth = 5;

    function draw(frame) {
      // set up data array and other variables
      var data = [],
          pos, i, len;

      // cover the canvas with a 10% opaque layer for fade out effect.
      // ctx.fillStyle = "rgba(255,255,255,0.1)";
      // ctx.fillRect(-canvas.width/2,-canvas.height,canvas.width,canvas.height);

      // set the fill to black for the points
      ctx.fillStyle = "rgba(0,0,0,0.9)";

      // loop over the frame's pointables
      for (i=0, len=frame.pointables.length; i<len; i++) {
        // get the pointable and its position
        pos = frame.pointables[i].tipPosition;

        // add the position data to our data array
        data.push(pos);
  // console.log(pos);
        // draw the circle where the pointable is
        ctx.beginPath();
        ctx.arc(pos[0]-radius/2 ,-(pos[1]-radius/2),radius,0,2*Math.PI);

  // console.log(pos[0]+"  x0x  y1y "+pos[1]);
  //mouseX mouseY with leap
      var brushPos = getBrushPos(pos[0], pos[1]);
      drawDot(brushPos.x, brushPos.y);
  // console.log(brushPos.x+" "+pos[0]);

        ctx.fill();
        ctx.stroke();
      }

      // print out our position points
      // info.innerHTML = data.join(', ');
    };

    // run the animation loop with the draw command
    Leap.loop(draw);
  })();



  // var bridge = document.getElementById("bridge"),
  // bridgeCanvas = bridge.getContext('2d'),
  var brushRadius = (bridge.width / 100) * 5,
  img = new Image();

  if (brushRadius < 50) { brushRadius = 50 }

  img.onload = function(){  
    bridgeCanvas.drawImage(img, 0, 0, bridge.width, bridge.height);
  }
  img.loc = '../skeleton/img';
  img.filename = '/1.jpg';
  // if (window.devicePixelRatio >= 2) {
  //   var nameParts = img.filename.split('.');
  //   img.src = img.loc + nameParts[0]+"-2x"+"."+nameParts[1];
  // } else {
    img.src = img.loc + img.filename;
  // }

  function detectLeftButton(event) {
      if ('buttons' in event) {
          return event.buttons === 1;
      } else if ('which' in event) {
          return event.which === 1;
      } else {
          return event.button === 1;
      }
  }
  const scale = (num, in_min, in_max, out_min, out_max) => {
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
  }
  function getBrushPos(xRef, yRef) {

    var bridgeRect = bridge.getBoundingClientRect();

  //javascript mapping
    // js for leap
    return{
     x: scale(xRef, -200, 200, bridgeRect.left, bridgeRect.right),
     y: scale(yRef, 100, 300, bridgeRect.bottom, bridgeRect.height)
    }
    //js for mouse
      // return {
      // x: Math.floor((xRef-bridgeRect.left)/(bridgeRect.right-bridgeRect.left)*bridge.width),
      // y: Math.floor((yRef-bridgeRect.top)/(bridgeRect.bottom-bridgeRect.top)*bridge.height)
      // };
  }
        
  function drawDot(mouseX,mouseY){

        // bridgeCanvas.beginPath();
        // bridgeCanvas.arc(mouseX-radius/2 ,-(pos[1]-radius/2),radius,0,2*Math.PI);

    bridgeCanvas.beginPath();
      bridgeCanvas.arc(mouseX, mouseY, brushRadius, 0, 2*Math.PI, true);
      bridgeCanvas.fillStyle = '#000';
      bridgeCanvas.globalCompositeOperation = "destination-out";
      bridgeCanvas.fill();
  }

  bridge.addEventListener("mousemove", function(e) {
    var brushPos = getBrushPos(e.clientX, e.clientY);
    var leftBut = detectLeftButton(e);
    if (leftBut == 1) {
      drawDot(brushPos.x, brushPos.y);
    }
  }, false);
}
});