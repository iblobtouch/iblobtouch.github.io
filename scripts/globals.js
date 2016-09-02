var c = document.getElementById('game'),
	ctx = c.getContext('2d');
// resize the canvas to fill browser window dynamically

var autofire = false;
var autospin = false;
var editmode = false;
var shiftheld = false;
var autoangle = 0;
var dronelimit = 0;
var necrolimit = 0;
var tankalpha = 1;
var shapetimer = 120;

var tankpointx = c.width / 2;
var tankpointy = c.height / 2;

var offset = {};
offset.x = 0;
offset.y = 0;
offset.totalx = 0;
offset.totaly = 0;

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
input.f = false;

var mouse = {};
mouse.x = 0;
mouse.y = 0;
mouse.held = false;
mouse.rightdown = false;

function Barrel(a, type, size, speed, time) {
	this.angle = a;
	//Angle is the offset from the angle from mouse to tank.
	this.xoffset = parseFloat(validateField(document.getElementById("offsetx").value, 0, true));
	//xoffset affect how far into the tank the barrel it.
	this.yoffset = parseFloat(validateField(document.getElementById("offset").value, 0, true));
	//yoffset affect how far away from the center the barrel rotates.
	this.width = parseFloat(validateField(document.getElementById("width").value, 20));
	//width affects the width of the barrel.
	this.baselength = parseFloat(validateField(document.getElementById("length").value, 60));
	//baselength is the starting length of the barrel.
	this.length = parseFloat(validateField(document.getElementById("length").value, 60));
	//length affects the width of the barrel.
	this.basereload = parseFloat(validateField(document.getElementById("reload").value * 60, 120));
	//basereload is the maximum delay between shots in frames.
	this.reload = 0;
	//Reload is how many frames until the barrel can fire again.
	this.hasKnockBack = true;
	//Does firing a bullet from this barrel knock you back?
	this.type = type;
	//0 = bullet firer, 1 = trap layer, 2 = drone maker.
	this.knockback = parseFloat(validateField(document.getElementById("knockback").value, 0, false)) / 10;
	this.disabled = document.getElementById("disable").checked;
	this.spread = parseFloat(validateField(document.getElementById("spread").value, 0, false));
	
	if (document.getElementById("use").checked === false) {
		this.b = [size, speed, time];
	} else {
		this.b = [parseFloat(validateField(document.getElementById("width").value, 20)) / 2, parseFloat(validateField(document.getElementById("length").value, 60)) / 10, 360];
	}
	this.damage = parseFloat(validateField(document.getElementById("damage").value, 10, false));
}

var barrels = [];
//Array containing all the barrels, each entry is a Barrel object.

function Bullet(n, size, speed, time, x, y, targetx, targety, spr) {
	this.xoffset = barrels[n].xoffset;
	this.yoffset = barrels[n].yoffset;
	this.x = x;
	this.y = y;
	this.bangle = barrels[n].angle + (Math.random() * spr) - (spr / 2);
	this.size = size;
	this.knockback = barrels[n].knockback;
	this.damage = barrels[n].damage;
	this.speed = speed;
	this.health = 100;
	this.distance = barrels[n].length;
	this.time = time;
	this.type = barrels[n].type;
	this.targetx = targetx;
	this.targety = targety;
	this.initoffx = offset.totalx;
	this.initoffy = offset.totaly;
	this.transparency = 1;
}

var bullets = [];
//Array containing all the barrels, each entry is a Barrel object.

function Shape(x, y, random) {
	var stype = 0;
	
	if (random < 0.45) {
		stype = 0;
	} else if (random < 0.9) {
		stype = 1;
	} else if (random < 0.990) {
		stype = 2;
	} else if (random < 0.995) {
		stype = 3;
	} else {
		stype = 4;
	}
	
	this.initx = offset.totalx;
	this.inity = offset.totaly;
	this.x = x;
	this.y = y;
	this.type = stype;
	this.angle = 0;
	this.rotatespeed = Math.random() - 0.5;
	this.health = stype * 50 + 50;
	this.maxhealth = stype * 50 + 50;
	this.accelx = 0;
	this.accely = 0;
	this.size = random * 20 + 10;
}

var shapes = [];

function angle(cx, cy, ex, ey) {
	var dy = ey - cy,
		dx = ex - cx;
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
		showhide("visible", "hidden", "hidden", "hidden", "visible");
	} else {
		editmode = false;
		showhide("hidden", "hidden", "hidden", "hidden", "hidden");
	}
}

function bodyClick() {
	showhide("visible", "visible", "hidden", "hidden", "hidden");
}

function barrelClick() {
	showhide("visible", "hidden", "visible", "hidden", "hidden");
}

function bulletClick() {
	showhide("visible", "hidden", "hidden", "visible", "hidden");
}


function saveClick() {
	showhide("visible", "hidden", "hidden", "hidden", "visible");
}

function showhide(e, bo, ba, bu, s) {
	var elements = document.getElementsByClassName("editbuttons");

	for (var i = 0; i < elements.length; i++) {
		elements[i].style.visibility = e;
	}
	
	elements = document.getElementsByClassName("tanksettings");

	for (var i = 0; i < elements.length; i++) {
		elements[i].style.visibility = bo;
	}
	
	elements = document.getElementsByClassName("barrelsettings");

	for (var i = 0; i < elements.length; i++) {
		elements[i].style.visibility = ba;
	}
	
	elements = document.getElementsByClassName("bulletsettings");

	for (var i = 0; i < elements.length; i++) {
		elements[i].style.visibility = bu;
	}
	
	elements = document.getElementsByClassName("savesettings");

	for (var i = 0; i < elements.length; i++) {
		elements[i].style.visibility = s;
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
	var outtext = parseFloat(validateField(document.getElementById("body").value, 0, true)) + "*" + document.getElementById("shape").value + "[";
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

function xdistancefrom(x, y, cx, cy, distance, aoffset) {
	var anglefrom = (angle(x, y, cx, cy) + aoffset) * (Math.PI / 180);
	return Math.cos(anglefrom) * (distance);
	//return cx - x;
}

function ydistancefrom(x, y, cx, cy, distance, aoffset) {
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
