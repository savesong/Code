// draw a rectangle
var c1 = document.getElementById("canvas1");
var ctx1 = c1.getContext("2d");
ctx1.fillStyle = "#FF0000";
ctx1.fillRect(10, 10, 150, 75);

// draw a line
var c2 = document.getElementById("canvas2");
var ctx2 = c2.getContext("2d");
ctx2.moveTo(0, 0);
ctx2.lineTo(200, 100);
ctx2.stroke();

// draw a circle
var c3 = document.getElementById("canvas3");
var ctx3 = c3.getContext("2d");
ctx3.beginPath();
ctx3.arc(95, 50, 40, 0, 2*Math.PI);
ctx3.stroke();

// create a linear gradient
var c4 = document.getElementById("canvas4");
var ctx4 = c4.getContext("2d");
var grd4 = ctx4.createLinearGradient(0, 0, 200, 0);
grd4.addColorStop(0, "red");
grd4.addColorStop(1, "white");
ctx4.fillStyle = grd4;
ctx4.fillRect(10, 10, 150, 80);

// create a radial/circular gradient
var c5 = document.getElementById("canvas5");
var ctx5 = c5.getContext("2d");
var grd5 = ctx5.createRadialGradient(75, 50, 5, 90, 60, 100);
grd5.addColorStop(0, "red");
grd5.addColorStop(1, "white");
ctx5.fillStyle = grd5;
ctx5.fillRect(10, 10, 150, 80);

// set font to 30px "Arial" and write a filled text on the canvas
var c6 = document.getElementById("canvas6");
var ctx6 = c6.getContext("2d");
ctx6.font = "30px Arial";
ctx6.fillText("Hello World", 10, 50);

// set font ot 30px "Arial" and write a text, with no fill, on the canvas
var c7 = document.getElementById("canvas7");
var ctx7 = c7.getContext("2d");
ctx7.font = "30px Arial";
ctx7.strokeText("Hello World", 10, 50);

// set font to 30px "Comic Sans MS" and write a filled red text in the center of the canvas
var c8 = document.getElementById("canvas8");
var ctx8 = c8.getContext("2d");
ctx8.font = "30px Comic Sans MS";
ctx8.fillStyle = "red";
ctx8.textAlign = "center";
ctx8.fillText("Hello World", c7.width/2, c7.height/2);

// draw an image on the canvas
function drawImageOnCanvas() {
  var c9 = document.getElementById("canvas9");
  var ctx9 = c9.getContext("2d");
  var img = document.getElementById("scream");
  ctx9.drawImage(img, 10, 10);
}
window.onload = function() {
  drawImageOnCanvas();
}

// build an analog clock using HTML canvas
var c10 = document.getElementById("canvas10");
var ctx10 = c10.getContext("2d");
var radius = c10.height / 2;
ctx10.translate(radius, radius);
radius *= 0.9;
setInterval(drawClock, 1000);

function drawClock() {
  drawFace(ctx10, radius);
  drawNumbers(ctx10, radius);
  drawTime(ctx10, radius);
}

function drawFace(ctx, radius) {
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, 2 * Math.PI);
  ctx.fillStyle = "white";
  ctx.fill();

  var grad = ctx.createRadialGradient(0, 0, radius*0.95, 0, 0, radius*1.05);
  grad.addColorStop(0, "#333");
  grad.addColorStop(0.5, "white");
  grad.addColorStop(1, "#333");
  ctx.strokeStyle = grad;
  ctx.lineWidth = radius * 0.1;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
  ctx.fillStyle = "#333";
  ctx.fill();
}

function drawNumbers(ctx, radius) {
  ctx.font = radius * 0.15 + "px arial";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  var ang;
  for (var num = 1; num < 13; num++) {
    ang = num * Math.PI / 6;
    ctx.rotate(ang);
    ctx.translate(0, -radius * 0.85);
    ctx.rotate(-ang);
    ctx.fillText(num.toString(), 0, 0);
    ctx.rotate(ang);
    ctx.translate(0, radius * 0.85);
    ctx.rotate(-ang);
  }
  ctx.stroke();
}

function drawTime(ctx, radius) {
  var now = new Date();
  var hour = now.getHours();
  var minute = now.getMinutes();
  var second = now.getSeconds();
  // hour
  hour = hour % 12;
  hour = (hour * Math.PI / 6) 
    + (minute * Math.PI / (6 * 60))
    + (second * Math.PI / (360 * 60));
  drawHand(ctx, hour, radius * 0.5, radius * 0.07);
  // minute
  minute = (minute * Math.PI / 30)
    + (second * Math.PI / (30 * 60));
  drawHand(ctx, minute, radius * 0.8, radius * 0.07);
  // second
  second = second * Math.PI / 30;
  drawHand(ctx, second, radius * 0.9, radius * 0.02);
}

function drawHand(ctx, pos, length, width) {
  ctx.beginPath();
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.moveTo(0, 0);
  ctx.rotate(pos);
  ctx.lineTo(0, -length);
  ctx.stroke();
  ctx.rotate(-pos);
}
