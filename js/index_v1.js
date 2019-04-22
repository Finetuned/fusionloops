// https://codepen.io/anon/pen/JVLzWR

var width = 30; 
var height = 30;

var tl;
var tl2;
var root;
var slide;
var slide2;
var slide3;
var slide4;
var slide5;
var slide6;

var spacing = window.innerWidth/22.9;
var index = 0;
console.log("variables loaded")

var theyLive = false;

var controller = new Leap.Controller();
  controller.setBackground(true); //enable

//what happens with display shifting on and off for the three container
//MISSION 1
//M1 SP VISUALS
var m1pov1 = '../img/M_1_POV_1.png';
var m1pov2 = '../img/M_1_POV_2.png';
var m1pov3 = '../img/M_1_POV_3.png';
//M1 SP TEXT
var m1sp1 = '../img/SP_POW_POV_1.png';
var m1sp2 = '../img/SP_POW_POV_2.png';
var m1sp3 = '../img/SP_POW_POV_3.png';
//MISSION 2
//M2 SP VISUALS
var m2pov1 = "../img/M_2_POV_1.png";
var m2pov2 = "../img/M_2_POV_2.png";
var m2pov3 = "../img/M_2_POV_3.png";
//M2 SP TEXT
//special case for sp1 text which has one change in a particular path
var m2sp1Array = ['../img/SP_POW_POV_1_1.png','../img/SP_POW_POV_1_2.png', '../img/SP_POW_POV_1_3.png']; 
var m2sp2 = '../img/SP_POW_POV_1_2.png';
var m2sp3 = '../img/SP_POW_POV_1_3.png';

var m3pov1imgArray = [" ", "../img/M_3_POV_1_3_1.png", '../img/M_3_POV_2_1_1.png', '../img/M_3_POV_2_2_1.png', '../img/M_3_POV_3_1_1.png'];
var m3pov2imgArray = [" ", "../img/M_3_POV_1_3_2.png", '../img/M_3_POV_2_1_2.png', '../img/M_3_POV_2_2_2.png', '../img/M_3_POV_3_1_2.png'];
var m3pov3imgArray = [" ", "../img/M_3_POV_1_3_3.png", '../img/M_3_POV_2_1_3.png', '../img/M_3_POV_2_2_3.png', '../img/M_3_POV_3_1_3.png'];
//also for sp
var m3pov1spArray = ['', '../img/SP_POW_POV_1_3_1.png', '../img/SP_POW_POV_2_1_1.png','../img/SP_POW_POV_2_2_1.png', '../img/SP_POW_POV_3_1_1.png'];
var m3pov2spArray = ['', '../img/SP_POW_POV_1_3_2.png', '../img/SP_POW_POV_2_1_2.png','../img/SP_POW_POV_2_2_2.png', '../img/SP_POW_POV_3_1_2.png'];
var m3pov3spArray = ['', '../img/SP_POW_POV_1_3_3.png', '../img/SP_POW_POV_2_1_3.png','../img/SP_POW_POV_2_2_3.png', '../img/SP_POW_POV_3_1_3.png'];


var go;
// init();
var isLoaded = false;

window.onload = init;
console.ward = function() {}; // what warnings?

function init() {
$('canvas').remove();
console.log("init loaded")
  root = new THREERoot({
    createCameraControls: !true,
    antialias: (window.devicePixelRatio === 1),
    fov: 80
  });

  root.renderer.setClearColor(0x000000, 0);
  root.renderer.setPixelRatio(window.devicePixelRatio || 1);
  root.camera.position.set(0, 0, 60);
  
  go();


}


function whichLeapImgs(mission, pickArray){

    if (mission == 2) {
      console.log("Mission: " + mission);
      root.scene.remove(slide);
      root.scene.remove(slide2);
      root.scene.remove(slide3);
      root.scene.remove(slide4);
      root.scene.remove(slide5);
      root.scene.remove(slide6);
      //update contents of the pov bubbles
      m1pov1 = m2pov1;
      m1pov2 = m2pov2;
      m1pov3 = m2pov3; 
      //update contents of the sp bubbles
      m1sp1 = m2sp1Array[pickArray];
      m1sp2 = m2sp2;
      m1sp3 = m2sp3; 

     }
     if(mission==3) {
      //somethinga bout pickarray to decide which images shoudl be there
      root.scene.remove(slide)
      root.scene.remove(slide2)
      root.scene.remove(slide3)
      root.scene.remove(slide4)
      root.scene.remove(slide5)
      root.scene.remove(slide6)
      //update contents of the pov bubbles from array depending on pickArray
      m1pov1 = m3pov1imgArray[pickArray]
      m1pov2 = m3pov2imgArray[pickArray]
      m1pov3 = m3pov3imgArray[pickArray]
      //update contents of the sp bubbles from array depending on pickArray
      m1sp1 = m3pov1spArray[pickArray]
      m1sp2 = m3pov2spArray[pickArray]
      m1sp3 = m3pov3spArray[pickArray]
    
      
     }
  }


var bridge = document.getElementById('three-container');
const scale = (num, in_min, in_max, out_min, out_max) => {
 return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}



go = function(){
  console.log("go");
  tellLeapStuff();
  isLoaded = true;

  // tl = new TimelineMax({repeat:-1, repeatDelay:1.0, yoyo: false});
  tl = new TimelineMax();

  slide = new Slide(width, height, 'in');
	var l1 = new THREE.ImageLoader();
	l1.setCrossOrigin('Anonymous');
  //POV image
  // var thisImg = $("#imageContainer-3")
	l1.load(m1pov1, function(img) {
	  slide.setImage(img);
	})
  slide.position.set(-spacing/2,0,0)
  root.scene.add(slide);
  //  //Super Power Text
  slide2 = new Slide(width, height, 'out');
  var l2 = new THREE.ImageLoader();
	l2.setCrossOrigin('Anonymous');
	l2.load(m1sp1, function(img) {
		slide2.setImage(img);
	})
  slide2.position.set(-spacing/2,0,0)
  root.scene.add(slide2);


  tl.add(slide.transition(), 0);
  tl.add(slide2.transition(), 0);

  slide3 = new Slide(width, height, 'in');
  var l3 = new THREE.ImageLoader();
  l3.setCrossOrigin('Anonymous');
  l3.load(m1pov2, function(img) {
    slide3.setImage(img);
  })
  slide3.position.set(-.5,0,0)
  root.scene.add(slide3);
  slide4 = new Slide(width, height, 'out');
  var l4 = new THREE.ImageLoader();
  l4.setCrossOrigin('Anonymous');
  l4.load(m1sp2, function(img) {
    slide4.setImage(img);
  })
  slide4.position.set(-.5,0,0)
  root.scene.add(slide4);

  tl.add(slide3.transition(), 0);
  tl.add(slide4.transition(), 0);

    slide5 = new Slide(width, height, 'in');
    var l5 = new THREE.ImageLoader();
    l5.setCrossOrigin('Anonymous');

    l5.load(m1pov3, function(img) {
      slide5.setImage(img);
    })
    slide5.position.set((spacing/2)-.5,0,0)
    root.scene.add(slide5);
    slide6 = new Slide(width, height, 'out');
    var l6 = new THREE.ImageLoader();
    l6.setCrossOrigin('Anonymous');
    l6.load(m1sp3, function(img) {
      slide6.setImage(img);
    })
    slide6.position.set((spacing/2)-.5,0,0)
    root.scene.add(slide6);
    tl.add(slide5.transition(), 0);
    tl.add(slide6.transition(), 0);
    // createTweenScrubber(tl);
  // }

  //tween the images and mesh them together
  createTweenScrubber(tl);
// }
}

// go2 = function(){
//   console.log("go2")
//   // tl = new TimelineMax({repeat:-1, repeatDelay:1.0, yoyo: false});
//   tl = new TimelineMax();

//   slide = new Slide(width, height, 'in');
//   var l1 = new THREE.ImageLoader();
//   l1.setCrossOrigin('Anonymous');
//   //POV image
//   // var thisImg = $("#imageContainer-3")
//   l1.load(m2sp1, function(img) {
//     slide.setImage(img);
//   })
//   slide.position.set(-spacing,0,0)
//   root.scene.add(slide);
//   //  //Super Power Text
//   slide2 = new Slide(width, height, 'out');
//   var l2 = new THREE.ImageLoader();
//   l2.setCrossOrigin('Anonymous');
//   l2.load(m2pov1, function(img) {
//     slide2.setImage(img);
//   })
//   slide2.position.set(-spacing,0,0)
//   root.scene.add(slide2);


//   tl.add(slide.transition(), 0);
//   tl.add(slide2.transition(), 0);

//   slide3 = new Slide(width, height, 'in');
//   var l3 = new THREE.ImageLoader();
//   l3.setCrossOrigin('Anonymous');
//   l3.load(m2sp2, function(img) {
//     slide3.setImage(img);
//   })
//   slide3.position.set(0,0,0)
//   root.scene.add(slide3);
//   slide4 = new Slide(width, height, 'out');
//   var l4 = new THREE.ImageLoader();
//   l4.setCrossOrigin('Anonymous');
//   l4.load(m2pov2, function(img) {
//     slide4.setImage(img);
//   })
//   slide4.position.set(0,0,0)
//   root.scene.add(slide4);

//   tl.add(slide3.transition(), 0);
//   tl.add(slide4.transition(), 0);

//     slide5 = new Slide(width, height, 'in');
//     var l5 = new THREE.ImageLoader();
//     l5.setCrossOrigin('Anonymous');

//     l5.load(m2sp3, function(img) {
//       slide5.setImage(img);
//     })
//     slide5.position.set(spacing,0,0)
//     root.scene.add(slide5);
//     slide6 = new Slide(width, height, 'out');
//     var l6 = new THREE.ImageLoader();
//     l6.setCrossOrigin('Anonymous');
//     l6.load(m2pov3, function(img) {
//       slide6.setImage(img);
//     })
//     slide6.position.set(spacing,0,0)
//     root.scene.add(slide6);
//     tl.add(slide5.transition(), 0);
//     tl.add(slide6.transition(), 0);
//     // createTweenScrubber(tl);
//   // }

//   //tween the images and mesh them together
//   createTweenScrubber(tl);
// // }
// }

////////////////////
// CLASSES
////////////////////

function Slide(width, height, animationPhase) {
  var plane = new THREE.PlaneGeometry(width, height, width * 2, height * 2);

  THREE.BAS.Utils.separateFaces(plane);

  var geometry = new SlideGeometry(plane);

  geometry.bufferUVs();

  var aAnimation = geometry.createAttribute('aAnimation', 2);
  var aStartPosition = geometry.createAttribute('aStartPosition', 3);
  var aControl0 = geometry.createAttribute('aControl0', 3);
  var aControl1 = geometry.createAttribute('aControl1', 3);
  var aEndPosition = geometry.createAttribute('aEndPosition', 3);

  var i, i2, i3, i4, v;

  var minDuration = 0.8;
  var maxDuration = 1.2;
  var maxDelayX = 0.9;
  var maxDelayY = 0.125;
  var stretch = 0.11;

  this.totalDuration = maxDuration + maxDelayX + maxDelayY + stretch;

  var startPosition = new THREE.Vector3();
  var control0 = new THREE.Vector3();
  var control1 = new THREE.Vector3();
  var endPosition = new THREE.Vector3();

  var tempPoint = new THREE.Vector3();




  function getControlPoint0(centroid) {
    // if(portrait1 == true){
      // console.log("yes")
      var signY = Math.sign(centroid.y);

      tempPoint.x = THREE.Math.randFloat(0.1, 0.3) * 50;
      tempPoint.y = signY * THREE.Math.randFloat(0.1, 0.3) * 70;
      tempPoint.z = THREE.Math.randFloatSpread(20);

      return tempPoint;
  }

  function getControlPoint1(centroid) {

      var signY = Math.sign(centroid.y);

      tempPoint.x = THREE.Math.randFloat(0.3, 0.6) * 50;
      tempPoint.y = -signY * THREE.Math.randFloat(0.3, 0.6) * 70;
      tempPoint.z = THREE.Math.randFloatSpread(20);

      return tempPoint;
  }

  for (i = 0, i2 = 0, i3 = 0, i4 = 0; i < geometry.faceCount; i++, i2 += 6, i3 += 9, i4 += 12) {
    var face = plane.faces[i];
    var centroid = THREE.BAS.Utils.computeCentroid(plane, face);

    // animation
    var duration = THREE.Math.randFloat(minDuration, maxDuration);
    var delayX;
    var delayY;
    // if(portrait1 == true){
      // console.log("yes3")

      delayX = THREE.Math.mapLinear(centroid.x, -width * 0.5, width * 0.5, 0.0, maxDelayX);
      delayY;

      if (animationPhase === 'in') {
        delayY = THREE.Math.mapLinear(Math.abs(centroid.y), 0, height * 0.5, 0.0, maxDelayY)
      }
      else {
        delayY = THREE.Math.mapLinear(Math.abs(centroid.y), 0, height * 0.5, maxDelayY, 0.0)
      }

    for (v = 0; v < 6; v += 2) {
      aAnimation.array[i2 + v]     = delayX + delayY + (Math.random() * stretch * duration);
      aAnimation.array[i2 + v + 1] = duration;
    }

    // positions

    endPosition.copy(centroid);
    startPosition.copy(centroid);

    if (animationPhase === 'in') {
      control0.copy(centroid).sub(getControlPoint0(centroid));
      control1.copy(centroid).sub(getControlPoint1(centroid));
    }
    else { // out
      control0.copy(centroid).add(getControlPoint0(centroid));
      control1.copy(centroid).add(getControlPoint1(centroid));
    }


    for (v = 0; v < 9; v += 3) {
      aStartPosition.array[i3 + v]     = startPosition.x;
      aStartPosition.array[i3 + v + 1] = startPosition.y;
      aStartPosition.array[i3 + v + 2] = startPosition.z;

      aControl0.array[i3 + v]     = control0.x;
      aControl0.array[i3 + v + 1] = control0.y;
      aControl0.array[i3 + v + 2] = control0.z;

      aControl1.array[i3 + v]     = control1.x;
      aControl1.array[i3 + v + 1] = control1.y;
      aControl1.array[i3 + v + 2] = control1.z;

      aEndPosition.array[i3 + v]     = endPosition.x;
      aEndPosition.array[i3 + v + 1] = endPosition.y;
      aEndPosition.array[i3 + v + 2] = endPosition.z;
    }
  }

  var material = new THREE.BAS.BasicAnimationMaterial(
    {
      shading: THREE.FlatShading,
      side: THREE.DoubleSide,
      uniforms: {
        uTime: {type: 'f', value: 0}
      },
      shaderFunctions: [
        THREE.BAS.ShaderChunk['cubic_bezier'],
        //THREE.BAS.ShaderChunk[(animationPhase === 'in' ? 'ease_out_cubic' : 'ease_in_cubic')],
        THREE.BAS.ShaderChunk['ease_in_out_cubic'],
        THREE.BAS.ShaderChunk['quaternion_rotation']
      ],
      shaderParameters: [
        'uniform float uTime;',
        'attribute vec2 aAnimation;',
        'attribute vec3 aStartPosition;',
        'attribute vec3 aControl0;',
        'attribute vec3 aControl1;',
        'attribute vec3 aEndPosition;',
      ],
      shaderVertexInit: [
        'float tDelay = aAnimation.x;',
        'float tDuration = aAnimation.y;',
        'float tTime = clamp(uTime - tDelay, 0.0, tDuration);',
        'float tProgress = ease(tTime, 0.0, 1.0, tDuration);'
        //'float tProgress = tTime / tDuration;'
      ],
      shaderTransformPosition: [
        (animationPhase === 'in' ? 'transformed *= tProgress;' : 'transformed *= 1.0 - tProgress;'),
        'transformed += cubicBezier(aStartPosition, aControl0, aControl1, aEndPosition, tProgress);'
      ]
    },
    {
      map: new THREE.Texture(),
    }
  );

  THREE.Mesh.call(this, geometry, material);

  this.frustumCulled = false;
}
Slide.prototype = Object.create(THREE.Mesh.prototype);
Slide.prototype.constructor = Slide;
Object.defineProperty(Slide.prototype, 'time', {
  get: function () {
    return this.material.uniforms['uTime'].value;
  },
  set: function (v) {
    this.material.uniforms['uTime'].value = v;
  }
});

Slide.prototype.setImage = function(image) {
  this.material.uniforms.map.value.image = image;
  this.material.uniforms.map.value.needsUpdate = true;
};

Slide.prototype.transition = function() {
  return TweenMax.fromTo(this, 1.0, {time:0.0}, {time:this.totalDuration, ease:Power0.easeInOut});
};


function SlideGeometry(model) {
  THREE.BAS.ModelBufferGeometry.call(this, model);
}
SlideGeometry.prototype = Object.create(THREE.BAS.ModelBufferGeometry.prototype);
SlideGeometry.prototype.constructor = SlideGeometry;
SlideGeometry.prototype.bufferPositions = function () {
  var positionBuffer = this.createAttribute('position', 3).array;

  for (var i = 0; i < this.faceCount; i++) {
    var face = this.modelGeometry.faces[i];
    var centroid = THREE.BAS.Utils.computeCentroid(this.modelGeometry, face);

    var a = this.modelGeometry.vertices[face.a];
    var b = this.modelGeometry.vertices[face.b];
    var c = this.modelGeometry.vertices[face.c];

    positionBuffer[face.a * 3]     = a.x - centroid.x;
    positionBuffer[face.a * 3 + 1] = a.y - centroid.y;
    positionBuffer[face.a * 3 + 2] = a.z - centroid.z;

    positionBuffer[face.b * 3]     = b.x - centroid.x;
    positionBuffer[face.b * 3 + 1] = b.y - centroid.y;
    positionBuffer[face.b * 3 + 2] = b.z - centroid.z;

    positionBuffer[face.c * 3]     = c.x - centroid.x;
    positionBuffer[face.c * 3 + 1] = c.y - centroid.y;
    positionBuffer[face.c * 3 + 2] = c.z - centroid.z;
  }
};


function THREERoot(params) {
  params = utils.extend({
    fov: 60,
    zNear: 10,
    zFar: 100000,

    createCameraControls: true
  }, params);

  this.renderer = new THREE.WebGLRenderer({
    antialias: params.antialias,
    alpha: true
  });
  this.renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
  document.getElementById('three-container').appendChild(this.renderer.domElement);

  this.camera = new THREE.PerspectiveCamera(
    params.fov,
    window.innerWidth / window.innerHeight,
    params.zNear,
    params.zfar
  );

  this.scene = new THREE.Scene();

  if (params.createCameraControls) {
    this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
  }

  this.resize = this.resize.bind(this);
  this.tick = this.tick.bind(this);

  this.resize();
  this.tick();

  window.addEventListener('resize', this.resize, false);
}
THREERoot.prototype = {
  tick: function () {
    this.update();
    this.render();
    requestAnimationFrame(this.tick);
  },
  update: function () {
    this.controls && this.controls.update();
  },
  render: function () {
    this.renderer.render(this.scene, this.camera);
  },
  resize: function () {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(window.innerWidth,window.innerHeight); //maybe problem place
  }
};

////////////////////
// UTILS
////////////////////

var utils = {
  extend: function (dst, src) {
    for (var key in src) {
      dst[key] = src[key];
    }

    return dst;
  },
  randSign: function () {
    return Math.random() > 0.5 ? 1 : -1;
  },
  ease: function (ease, t, b, c, d) {
    return b + ease.getRatio(t / d) * c;
  },
  fibSpherePoint: (function () {
    var vec = {x: 0, y: 0, z: 0};
    var G = Math.PI * (3 - Math.sqrt(5));

    return function (i, n, radius) {
      var step = 2.0 / n;
      var r, phi;

      vec.y = i * step - 1 + (step * 0.5);
      r = Math.sqrt(1 - vec.y * vec.y);
      phi = i * G;
      vec.x = Math.cos(phi) * r;
      vec.z = Math.sin(phi) * r;

      radius = radius || 1;

      vec.x *= radius;
      vec.y *= radius;
      vec.z *= radius;

      return vec;
    }
  })(),
  spherePoint: (function () {
    return function (u, v) {
      u === undefined && (u = Math.random());
      v === undefined && (v = Math.random());

      var theta = 2 * Math.PI * u;
      var phi = Math.acos(2 * v - 1);

      var vec = {};
      vec.x = (Math.sin(phi) * Math.cos(theta));
      vec.y = (Math.sin(phi) * Math.sin(theta));
      vec.z = (Math.cos(phi));

      return vec;
    }
  })()
};
var mouseM = false;

//controls the movement from left to right of the images 
function createTweenScrubber(tween, seekSpeed) {
  seekSpeed = seekSpeed || 0.001;
  if(mouseM==false){
    stop();
  }
  function stop() {
    TweenMax.to(tween, 1, {timeScale:0});
  }

  function resume() {
    TweenMax.to(tween, 1, {timeScale:1});
  }

  function seek(dx) {
    var progress = tween.progress(); 
    var p = THREE.Math.clamp((progress + (dx * seekSpeed)), 0, 1); //seekSpeed .0001

    tween.progress(p);
  }


function getBrushPos(xRef) {

    var bridgeRect = bridge.getBoundingClientRect();

    return{
        x: scale(xRef, -200, 200, bridgeRect.left, bridgeRect.right/4),
    }
}  

  var _cx = 0;
  var _cy = 0;
  // desktop
  var mouseDown = false;
  function draw(frame) {
    // set up data array and other variables
    var data = [],
        pos, i, len;
    if(!theyLive){
    // loop over the frame's pointables
      for (i=0, len=frame.pointables.length; i<len; i++) {
        // get the pointable and its position
        pos = frame.pointables[i].tipPosition;
        // add the position data to our data array
        data.push(pos);
        var brushPos = getBrushPos(pos[0]);
        // console.log(pos[0]);
        mouseM = true;
          var cx = brushPos.x;
            var dx = cx - _cx;
            _cx = cx;
            resume();
            stop();
            seek(dx); 
      }
    }

//idea is to remove slide with POV once we are done with special power:
//we set theyLive to true in the main.js 

    if(theyLive){
root.scene.remove(slide)
root.scene.remove(slide3)
root.scene.remove(slide5)
        seek(-37); 
        stop();
    }

    // if()
    // print out our position points
    // info.innerHTML = data.join(', ');
  };
  // run the animation loop with the draw command
  Leap.loop(draw);





}