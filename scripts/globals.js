var c = document.getElementById('game'), ctx = c.getContext('2d');
// resize the canvas to fill browser window dynamically

var autofire = false;
var autospin = false;
var editmode = false;
var shiftheld = false;
var autoangle = 0;
var dronelimit = 0;
var necrolimit = 0;
var tankalpha = 1;

var tankpointx = c.width / 2;
var tankpointy = c.height / 2;

var offset = {};
offset.x = 0;
offset.y = 0;
offset.totalx = 100;
offset.totaly = 100;

var accel = {};
accel.x = 0;
accel.y = 0;
accel.amount = 0.005;
accel.max = 1;

var input = {};
input.up = false;
input.down = false;
input.left = false;
input.right = false;

var mouse = {};
mouse.x = 0;
mouse.y = 0;
mouse.held = false;
mouse.rightdown = false;

function Barrel(a, xoff, yoff, width, length, baseReload, hasKnockBack, type, knockback) {
	this.angle = a;
	//Angle is the offset from the angle from mouse to tank.
	this.xoffset = xoff;
	//xoffset affect how far into the tank the barrel it.
	this.yoffset = yoff;
	//yoffset affect how far away from the center the barrel rotates.
	this.width = width;
	//width affects the width of the barrel.
	this.baselength = length;
	//baselength is the starting length of the barrel.
	this.length = length;
	//length affects the width of the barrel.
	this.basereload = baseReload;
	//basereload is the maximum delay between shots in frames.
	this.reload = 0;
	//Reload is how many frames until the barrel can fire again.
	this.hasKnockBack = hasKnockBack;
	//Does firing a bullet from this barrel knock you back?
	this.type = type;
	//0 = bullet firer, 1 = trap layer, 2 = drone maker.
	this.knockback = knockback;
}

var barrels = [];
//Array containing all the barrels, each entry is a Barrel object.

function Bullet(xoffset, yoffset, x, y, bangle, size, knockback, damage, speed, health, distance, time, type, targetx, targety, initoffx, initoffy) {
	this.xoffset = xoffset;
	this.yoffset = yoffset;
	this.x = x;
	this.y = y;
	this.bangle = bangle;
	this.size = size;
	this.knockback = knockback;
	this.damage = damage;
	this.speed = speed;
	this.health = health;
	this.distance = distance;
	this.time = time;
	this.type = type;
	this.targetx = targetx;
	this.targety = targety;
	this.initoffx = initoffx;
	this.initoffy = initoffy;
	this.transparency = 1;
}

var bullets = [];
//Array containing all the barrels, each entry is a Barrel object.

function angle(cx, cy, ex, ey) {
  var dy = ey - cy, dx = ex - cx;
  var theta = Math.atan2(dy, dx); // range (-PI, PI]
  theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
  //if (theta < 0) theta = 360 + theta; // range [0, 360)
  //theta *= (Math.PI / 180);
  return theta;
}

function editButtonClick() {
	if (editmode === false) {
		editmode = true;
		autofire = false;
		autospin = false;
		accel.x = 0;
		accel.y = 0;
		tankalpha = 1.0;
		var elements = document.getElementsByClassName("textbox");

    	for (var i = 0; i < elements.length; i++){
        	elements[i].style.visibility = "visible";
    	}
	} else {
		editmode = false;
		var elements = document.getElementsByClassName("textbox");

    	for (var i = 0; i < elements.length; i++){
        	elements[i].style.visibility = "hidden";
    	}
	}
}

function validateField(value, returnval, ignoreneg) {
	if (value.length == 0) {
	    return returnval;
	}
	if ((value < 0) && (ignoreneg !== true)) {
	    return returnval;
	}
	if (isNaN(value) === true) {
		return returnval;
	} else {
		return value;
	}
}

function printObject() {
	var barreltext = ""; 
	var outtext = parseFloat(validateField(document.getElementById("body").value, 0, true)) + "*" +  document.getElementById("shape").value + "[";
	if (barrels.length > 0) {
		for (var i = 0; i < barrels.length; i += 1) {
			outtext += JSON.stringify(barrels[i]);
			if (i < barrels.length - 1) {
				outtext += ", ";
			}
		}
	}
	outtext += "]";
	document.getElementById("save").value = outtext;
}

function xdistancefrom (x, y, cx, cy, distance, aoffset) {
	var anglefrom = (angle(x, y, cx, cy) + aoffset) * (Math.PI / 180);
	return Math.cos(anglefrom) * (distance);
	//return cx - x;
}

function ydistancefrom (x, y, cx, cy, distance, aoffset) {
	var anglefrom = (angle(x, y, cx, cy) + aoffset) * (Math.PI / 180);
	return Math.sin(anglefrom) * (distance);
	//return cy - y;
}

function importObject() {
	var inputtext = "" + document.getElementById("save").value;
	if (inputtext.length > 0) {
		if (inputtext.substr(0, 1) === "[") {
			console.log("notfound");
			document.getElementById("body").value = 32;
			barrels = JSON.parse(inputtext);
		} else if (inputtext.indexOf("*") === -1) {
			document.getElementById("body").value = inputtext.substr(0, inputtext.indexOf("["));
			document.getElementById("shape").value = "circle";
			barrels = JSON.parse(inputtext.substr(inputtext.indexOf("[")));
		} else {
			document.getElementById("body").value = inputtext.substr(0, inputtext.indexOf("*"));
			document.getElementById("shape").value = inputtext.substr(inputtext.indexOf("*") + 1, inputtext.indexOf("[") - 1 - inputtext.indexOf("*"));
			barrels = JSON.parse(inputtext.substr(inputtext.indexOf("[")));
		}
	}
}