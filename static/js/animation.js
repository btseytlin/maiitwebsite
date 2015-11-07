function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}

function getSpeed(){
  return Math.round( Math.random() * 1.3) - 0.5;
}
var canvas;


var mousePos = {x:0, y:0};

document.addEventListener('mousemove', function(evt) {
  if (canvas){
    mousePos = getMousePos(canvas, evt);
  }
  }, false);
document.addEventListener("DOMContentLoaded", function(event) { 
  

  if (window.innerWidth < 1000){
    return null;
  }
  canvas = document.querySelector('canvas');
  
  var ctx = canvas.getContext('2d'),
     particles = [],
  patriclesNum = 10,
             w = window.innerWidth,
             h = window.innerHeight,
        colors = ['#34708D','#000'],
        connect_dist = 100,
        mouse_effective_dist = 50,
        mouse_speed_change = 0.5;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  

  function Factory(){  
    this.x =  Math.round( Math.random() * w);
    this.y =  Math.round( Math.random() * h);
    this.rad = Math.round( Math.random() * 10) + 2;
    this.rgba = colors[ Math.round( Math.random() * 3) ];
    this.vx = getSpeed();
    this.vy = getSpeed();
  }

  function speed_modifier(speed, mspeedchange, effective_dist, dist){

    var base = speed/mspeedchange*effective_dist/dist;
    if (base>2.2*speed){
      base = 2.2*speed;
    }
    return  base
  }
     
  function draw(){
    ctx.clearRect(0, 0, w, h);
    ctx.globalCompositeOperation = 'lighter';
    for(var i = 0;i < patriclesNum; i++){
      var temp = particles[i];
      var factor = 1;
       
      for(var j = 0; j<patriclesNum; j++){
        
         var temp2 = particles[j];
         ctx.linewidth = 3.5;
        
         if(findDistance(temp, temp2)<connect_dist){
            ctx.strokeStyle = temp.rgba;
            ctx.beginPath();
            ctx.moveTo(temp.x, temp.y);
            ctx.lineTo(temp2.x, temp2.y);
            ctx.stroke();
            factor++;
         }
      }
      
      
      ctx.fillStyle = temp.rgba;
      ctx.strokeStyle = temp.rgba;
      
      ctx.beginPath();
      ctx.arc(temp.x, temp.y, temp.rad, 0, Math.PI*2, true);
      ctx.fill();
      ctx.closePath();
      
      ctx.beginPath();
      ctx.arc(temp.x, temp.y, (temp.rad+5), 0, Math.PI*2, true);
      ctx.stroke();
      ctx.closePath();
      
      var dist = findDistance(mousePos, temp);
      var speed_mod = speed_modifier(temp.vx,mouse_speed_change, mouse_effective_dist, dist);
      temp.x += temp.vx + speed_mod;
      temp.y += temp.vy + speed_mod;
      if(temp.x > w){ temp.x=w;temp.vx = Math.abs(getSpeed()) * -Math.sign(temp.vx)}
      if(temp.x < 0){ temp.x=0;temp.vx = Math.abs(getSpeed()) * -Math.sign(temp.vx)}
      if(temp.y > h){ temp.y=h;temp.vy = Math.abs(getSpeed()) * -Math.sign(temp.vy)}
      if(temp.y < 0){ temp.y=0;temp.vy = Math.abs(getSpeed()) * -Math.sign(temp.vy)}
      
      
    }
  }

  
  function findDistance(p1,p2){  
    return Math.sqrt( Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2) );
  }

  window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            function( callback ){
              window.setTimeout(callback, 1000 / 60);
            };
  })();

  (function init(){

    for(var i = 0; i < patriclesNum; i++){
      particles.push(new Factory);
    }
  })();

  (function loop(){
    draw();
    requestAnimFrame(loop);
  })();

});
