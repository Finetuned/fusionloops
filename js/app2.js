$("body").keydown(function(event){ 
console.log("in app 2")
if(event.which==50){

  var bridge = document.getElementById("image-2"),
  bridgeCanvas = bridge.getContext('2d');
  (function(){

    var canvas = document.getElementById("image-2"),
        ctx = canvas.getContext('2d'),
        radius = 10;
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;

    ctx.strokeStyle = "rgba(255,0,0,0.9)";
    ctx.lineWidth = 5;

    function draw(frame) {
      var data = [],
          pos, i, len;

      ctx.fillStyle = "rgba(0,0,0,0.9)";

      for (i=0, len=frame.pointables.length; i<len; i++) {
        pos = frame.pointables[i].tipPosition;

        data.push(pos);
  console.log(pos);
        ctx.beginPath();
        ctx.arc(pos[0]-radius/2 ,-(pos[1]-radius/2),radius,0,2*Math.PI);

      var brushPos = getBrushPos(pos[0], pos[1]);
      drawDot(brushPos.x, brushPos.y);

        ctx.fill();
        ctx.stroke();
      }


    };
    Leap.loop(draw);

  })();

  var brushRadius = (bridge.width / 100) * 5,
  img = new Image();

  if (brushRadius < 50) { brushRadius = 50 }

  img.onload = function(){  
    bridgeCanvas.drawImage(img, 0, 0, bridge.width, bridge.height);
  }
  img.loc = '../skeleton/img';
  img.filename = '/2.jpg';

    img.src = img.loc + img.filename;

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

      return {
      x: Math.floor((xRef-bridgeRect.left)/(bridgeRect.right-bridgeRect.left)*bridge.width),
      y: Math.floor((yRef-bridgeRect.top)/(bridgeRect.bottom-bridgeRect.top)*bridge.height)
      };
  }
        
  function drawDot(mouseX,mouseY){


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