var myFullpage;
$(document).ready(function() {
  console.log("page ready");
  myFullpage = new fullpage('#fullpage', {
    onLeave: function(index, nextIndex, direction){
      if(index.index == 0){
      sketch.PauseState(true);
      }
    },
    afterLoad: function(origin, destination, direction){
      /*
      var menu = document.getElementById("menu");
      menu.style.height = window.innerHeight+"px";
      if(direction == "up"){
        menu.style.top = 0 + "px";
      }else{
        menu.style.top = (window.outerHeight - window.innerHeight) + "px";
      }
      */
      if(destination.index == 0){
        sketch.PauseState(false);
      }
    },
    afterReBuild: function(){
    },
    afterRender: function(){
      document.getElementsByTagName("BODY")[0].style.overflow = "hidden";
    },
    licenseKey: 'YOUR_KEY_HERE',
    anchors: ['homePage', 'firstSlide', 'secondSlide'],
    scrollBar: true,
    normalScrollElements: '#scrollable',
    menu: '#menu',
    animateAnchor: false,
    navigation: false,
    /*
    autoScrolling: true,
    fixedElements: '#menu',
    navigationPosition: 'right',
    responsiveHeight: 1000,
    scrollHorizontally: true,
    slidesNavPosition: 'bottom',
    slidesNavigation: true,
    showActiveTooltip: false,
    */
  });
var index;
barba.init({
  preventRunning: true,
  views: [{
    namespace: 'slider',
    afterEnter() {
    },
    beforeLeave() {
      var sourceNav = $('#sourceNav');
      index = sourceNav.children('.w-active').index();
      console.log("Index is: " + index);
    }
  }],
  transitions: [{
    name: 'CustomTransition',
    leave(data) {
      gsap.to(data.current.container, 0.25, { opacity: 0, onComplete: this.async(), });
    },
    enter(data) {
      data.current.container.parentNode.removeChild(data.current.container);
      gsap.from(data.next.container, 0.25, {opacity: 0, onComplete: this.async(),});
    },
    after(data){
      console.log("After is: " + data.next.namespace);
      /*
      window.Webflow && window.Webflow.destroy();
      window.Webflow && window.Webflow.ready();
      window.Webflow && window.Webflow.require( 'ix2' ).init();
      document.dispatchEvent( new Event( 'readystatechange' ) );

      if(data.next.namespace == 'slider'){
        var sourceNav = $('#sourceNav');
        sourceNav.children().eq(index).trigger('tap');
      }
      */
    }
  },]
});
});

window.onresize = function(event) {
  fullpage_api.reBuild();
  myFullpage.reBuild();
  myFullpage.fitToSection();
  //Webflow.require('ix2').init();
};

let oceanWaves = function(s0){
    let bgGraphics, maskGraphics, mixingGraphics
    let overAllTexture
	let pallete = ["#4D6F83", "#278DD3", "#F8B623", "#D51311", "#02020C"];
    let rs;
	let sep = 3;

    var vehicles = [];
    var maxPoints = 5;
    let startPoint;
    let kMax;
    let step;
    let n = 1;
    let radius = 200;
    let inter = 5;
    let maxNoise = 100;
    let angleStep = 360 / 10;
    let noiseProg = (x) => (x);
    let interactiveDiv, myWidth, myHeight, myCanvas;
    let playing = true;
    let GLOBAL_MOUSEX, GLOBAL_MOUSEY = -999999;

    s0.setup = function() {
        s0.resizeSketch();
        s0.colorMode(s0.HSB, 360, 100, 100, 100);
        s0.angleMode(s0.DEGREES);
        kMax = 1;
        step = 0.01;
        rs = s0.random(10000);
        for (let theta = 0; theta <= 360 + angleStep * 2; theta += angleStep) {
            var vehicle = new Vehicle(0, 0);
            vehicles.push(vehicle);
        }
    }

    s0.windowResized = function() {
        s0.resizeSketch();
    }

    var initilize = false;
    s0.resizeSketch = function(){
    if(!initilize){
        initilize = true;
        interactiveDiv = document.getElementById('interactiveLandingContainer');
        myWidth = interactiveDiv.offsetWidth;
        //myHeight =  s0.windowHeight;
        myHeight = myWidth;
        let cnv = s0.createCanvas(myWidth, myHeight);
        cnv.style('display', 'block');
        s0.pixelDensity(1);
        bgGraphics = s0.createGraphics(s0.width,s0.height);
        maskGraphics = s0.createGraphics(s0.width,s0.height);
        mixingGraphics = s0.createImage(s0.width,s0.height);
        overAllTexture= s0.createGraphics(s0.width,s0.height);
    }
    else{
        myWidth = interactiveDiv.offsetWidth;
        //myHeight =  s0.windowHeight;
        myHeight = myWidth;
        s0.resizeCanvas(myWidth, myHeight);
        bgGraphics.resizeCanvas(s0.width,s0.height);
        maskGraphics.resizeCanvas(s0.width,s0.height);
        mixingGraphics.resize(myWidth,myHeight);
    }
    radius = myWidth * .2;
    }

    let isPaused = false;
    s0.PauseState = function(pause){
    isPaused = pause;
        if(pause){
        s0.noLoop();
        }else{
        s0.loop();
        }
    }

    let touchDevice = false;
    s0.mouseMoved = function(){
        if(!touchDevice){
        GLOBAL_MOUSEX = s0.mouseX;
            GLOBAL_MOUSEY = s0.mouseY;
        }
    }

    s0.mousePressed = function(){
        if(!isPaused){
            rs = s0.frameCount;
        }
    }

    s0.touchStarted = function(){
        touchDevice = true;
        if(!isPaused){
        GLOBAL_MOUSEX = s0.mouseX;
        GLOBAL_MOUSEY = s0.mouseY;
        rs = s0.frameCount;
        setTimeout(s0.reset,500);
        //return false;
        }
    }

    s0.reset = function(){
        alert(window.innerHeight + "||" + window.outerHeight)
        GLOBAL_MOUSEX = -99999;
        GLOBAL_MOUSEY = -99999;
    }

    s0.touchEnded = function(){
        //GLOBAL_MOUSEX = -9999999;
        //GLOBAL_MOUSEY = -9999999;
        //rs = s0.frameCount;
    }

function blob(size, xCenter, yCenter, k, t, noisiness) {
  let index = 0;
	maskGraphics.beginShape();
	for (let theta = 0; theta <= 360 + angleStep * 2; theta += angleStep) {
    let r1, r2;
		r1 = s0.cos(theta)+1;
		r2 = s0.sin(theta)+1;
		let r = size + s0.noise(k * r1,  k * r2, t) * noisiness;
		let x = xCenter + r * s0.cos(theta);
		let y = yCenter + r * s0.sin(theta);
		let newPos = s0.createVector(x, y);
		var v = vehicles[index];
		v.setTarget(newPos)
		v.behaviours();
		v.update();
		v.show();
		index++
	}
  maskGraphics.endShape();
}

s0.draw = function() {
    s0.clear();
	maskGraphics.clear();
    maskGraphics.fill(0);
    maskGraphics.push();

    maskGraphics.translate(s0.width/2,s0.height/2);
    let t = s0.frameCount/100;
    kMax = s0.noise(t/2);
    let size = radius + 1 * inter;
    let k = kMax * s0.sqrt(1/n);
    let noisiness = maxNoise * noiseProg(1 / n);
    blob(size, 0, 0, k, t+ 1 * step, noisiness);

		maskGraphics.pop();

    //Circle particles
	for(var i=0;i<5;i++){
        maskGraphics.ellipse(s0.width / 2 + s0.map(s0.noise(i, 5000, s0.frameCount / 400), 0.2, 0.8, -s0.width / 3, s0.width / 3), s0.height / 2 + s0.map(s0.noise(i, 10000, s0.frameCount / 400), 0.2, 0.8, -s0.height / 3, s0.height / 3), s0.noise(i, 20000, s0.frameCount / 400) * s0.constrain(s0.frameCount * .8, 0, 100));
	}
	for(var i=0;i<8;i++){
        maskGraphics.ellipse(s0.width / 2 + s0.map(s0.noise(i, 5000, s0.frameCount / 400), 0.3, 0.7, -s0.width / 3, s0.width / 3), s0.height / 2 + s0.map(s0.noise(i, 10000, s0.frameCount / 400), 0.3, 0.7, -s0.height / 3, s0.height / 3), s0.noise(i, 100000, s0.frameCount / 400) * s0.constrain(s0.frameCount * .8, 0, 20));
    }
	bgGraphics.clear();

    s0.randomSeed(rs);
    for (let y = -s0.height/2; y < s0.height; y += s0.height / 7) {
        let c1 = s0.random(pallete);
        let c2 = s0.random(pallete);
        let c3 = s0.random(pallete);
        while (c1 == c2 || c2 == c3 || c3 == c1) {
            c1 = s0.random(pallete);
            c2 = s0.random(pallete);
            c3 = s0.random(pallete);
        }
      let gradient = bgGraphics.drawingContext.createLinearGradient(0, 0, s0.width, 0);
      gradient.addColorStop(0.0, c1);
      gradient.addColorStop(s0.random(0.3,0.7), c2);
      gradient.addColorStop(1.0, c3);
      bgGraphics.drawingContext.fillStyle = gradient;
      bgGraphics.noStroke();
      bgGraphics.beginShape();
      for (let x = -200; x <= s0.width+200; x+=50) {
        let yy = y + s0.map(s0.noise(rs+y, x / 400, s0.frameCount / 300), 0, 1, -s0.height / sep, s0.height / sep);
        bgGraphics.curveVertex(x, yy);
        }
      bgGraphics.vertex(s0.width+200, s0.height + 200);
      bgGraphics.vertex(0-200, s0.height + 200);
      bgGraphics.endShape();
  	}


    mixingGraphics.copy(bgGraphics,0,0,s0.width,s0.height,0,0,s0.width,s0.height);
    mixingGraphics.mask(maskGraphics);
    s0.image(mixingGraphics,0,0);
  }

  function Vehicle(x, y){
    this.pos = s0.createVector(0, 0);
    this.target = s0.createVector(x, y);
    this.vel = s0.createVector();
    this.acc = s0.createVector();
    this.r = 8;
    this.maxspeed = 5;
    this.maxforce = 2;
  }

  Vehicle.prototype.setTarget = function(newTarget){
    this.target.set(newTarget);
  }

  Vehicle.prototype.behaviours = function(){
    var arrive = this.arrive(this.target);
    this.applyForce(arrive);

    var mouseVector = s0.createVector(GLOBAL_MOUSEX-s0.width/2, GLOBAL_MOUSEY-s0.height/2);
    var flee = this.flee(mouseVector);
    this.applyForce(flee);
  }

  Vehicle.prototype.applyForce = function(f){
    this.acc.add(f);
  }

  Vehicle.prototype.arrive = function(target){
    var desired = p5.Vector.sub(target, this.pos);
    var d = desired.mag();
    var speed = this.maxspeed;
    if(d < 100){
    speed = s0.map(d, 0, 100, 0, this.maxspeed);
    }
    desired.setMag(speed);
    var steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxforce);
    return steer;
  }

  Vehicle.prototype.flee = function(target){
    var desired = p5.Vector.sub(target, this.pos);
    var d = desired.mag();
    if(d < 150){
    desired.setMag(d);
      desired.mult(-1);
      var steer = p5.Vector.sub(desired, this.vel);
      steer.limit(this.maxforce);
      return steer;
    }else{
      return s0.createVector(0,0);
    }
  }

  Vehicle.prototype.update = function(){
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc.mult(0);
  }

  Vehicle.prototype.show = function(){
    maskGraphics.curveVertex(this.pos.x, this.pos.y);
    //maskGraphics.stroke(0);
    //maskGraphics.strokeWeight(20);
    //maskGraphics.point(this.pos.x, this.pos.y);
  }
}

let sketch = new p5(oceanWaves, 'interactiveLandingContainer');