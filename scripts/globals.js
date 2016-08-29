var autofire = false;
var autospin = false;
var editmode = false;
var shiftheld = false;
var autoangle = 0;
var dronelimit = 0;

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

var mouse = {};
mouse.x = 0;
mouse.y = 0;
mouse.held = false;

function Barrel(a, xoff, yoff, width, length, baseReload, hasKnockBack, type) {
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
}

var barrels = [];
//Array containing all the barrels, each entry is a Barrel object.

function Bullet(xoffset, yoffset, x, y, angle, size, knockback, damage, speed, health, distance, time, type) {
	this.xoffset = xoffset;
	this.yoffset = yoffset;
	this.x = x;
	this.y = y;
	this.angle = angle;
	this.size = size;
	this.knockback = knockback;
	this.damage = damage;
	this.speed = speed;
	this.health = health;
	this.distance = distance;
	this.time = time;
	this.originx = offset.totalx;
	this.originy = offset.totaly;
	this.type = type;
}

var bullets = [];
//Array containing all the barrels, each entry is a Barrel object.

function angle(cx, cy, ex, ey) {
	if (autospin === true) {
		return autoangle;
	}
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

function validateField(value, returnval) {
	if (value.length == 0) {
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
	var outtext = "[";
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

function importObject() {
	if (document.getElementById("save").value.length > 0) {
		barrels = JSON.parse(document.getElementById("save").value);
	}
}