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
