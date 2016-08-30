function drawMovement() {
	
	offset.totalx += accel.x;
	offset.totaly += accel.y;
	
	offset.x += accel.x;
	offset.y += accel.y;
	
	offset.x %= 26;
	offset.y %= 26;
	
	drawStuff();
	
	if ((input.left === true) && (accel.x > -accel.max)) {
		accel.x -= accel.amount;
		if (accel.x > 0) {
			accel.x -= accel.amount;
		}
	} else if ((input.right === true) && (accel.x < accel.max)) {
		accel.x += accel.amount;
		if (accel.x < 0) {
			accel.x += accel.amount;
		}
	} else {
		if (accel.x > 0) {
			accel.x -= accel.amount;
		}
		if (accel.x < 0) {
			accel.x += accel.amount;
		}
	}
	
	if ((input.down === true) && (accel.y > -accel.max)) {
		accel.y -= accel.amount;
		if (accel.y > 0) {
			accel.y -= accel.amount;
		}
	} else if ((input.up === true) && (accel.y < accel.max)) {
		accel.y += accel.amount;
		if (accel.y < 0) {
			accel.y += accel.amount;
		}
	} else {
		if (accel.y > 0) {
			accel.y -= accel.amount;
		}
		if (accel.y < 0) {
			accel.y += accel.amount;
		}
	}
	if (accel.x > accel.max) {
		accel.x -= accel.amount * 2;
	}
	if (accel.y > accel.max) {
		accel.y -= accel.amount * 2;
	}
	if (accel.x < -accel.max) {
		accel.x += accel.amount * 2;
	}
	if (accel.y < -accel.max) {
		accel.y += accel.amount * 2;
	}
	if (editmode === false) {
		if (((accel.x > -0.1) && (accel.x < 0.1)) && ((accel.y > -0.1) && (accel.y < 0.1))) {
			if ((tankalpha > 0.2) && (document.getElementById("invis").checked === true)) {
				tankalpha -= 0.002;
			}
		} else if (tankalpha < 1) {
			tankalpha += 0.002;
		}
	}
	
	tankpointx = c.width / 2 - accel.x * 20;
	tankpointy = c.height / 2 - accel.y * 20;
}

function drawBarrel(a, xoffset, yoffset, width, length, alpha, isghost, type) {
	ctx.save();
	ctx.strokeStyle = "rgba(85, 85, 85, " + alpha + ")";
	ctx.lineWidth = 5;
	ctx.fillStyle = "rgba(153, 153, 153, " + alpha + ")";
	ctx.translate(tankpointx, tankpointy, 0);
	if (editmode === false){
		ctx.rotate ((angle(tankpointx, tankpointy, mouse.x, mouse.y) + a) * (Math.PI / 180));
	} else if ((isghost === true) && (shiftheld === true)) {
		if ((a <= -172.5) || (a >= 172.5)) {
			a = 180;
		}
		a -= a % 15;
		ctx.rotate (a * (Math.PI / 180));
	} else {
		ctx.rotate (a * (Math.PI / 180));
	}
	
	if (type === 0) {
		ctx.fillRect(xoffset, 0 - ((width / 2) + yoffset), length, width);
		ctx.strokeRect(xoffset, 0 - ((width / 2) + yoffset), length, width);
	}
	
	if (type === 1) {
		ctx.beginPath();
		ctx.moveTo(xoffset + length, -(width / 2) - yoffset);
		ctx.lineTo(xoffset + length + (length / 2),  0 - ((width * 1.5) + yoffset));
		ctx.lineTo(xoffset + length + (length / 2),  ((width * 1.5) - yoffset));
		ctx.lineTo(xoffset + length, (width / 2) - yoffset);
		ctx.lineTo(xoffset + length, -(width / 2) - yoffset);
		ctx.closePath();
		ctx.fill();
		ctx.stroke();

		ctx.fillRect(xoffset, 0 - ((width / 2) + yoffset), length, width);
		ctx.strokeRect(xoffset, 0 - ((width / 2) + yoffset), length, width);
	}
	
	if (type > 1) {
		ctx.beginPath();
		ctx.moveTo(xoffset + 20, -(width / 4) - yoffset);
		ctx.lineTo(xoffset + 20 + (length / 2),  0 - ((width / 2) + yoffset) - (width / 4) );
		ctx.lineTo(xoffset + 20 + (length / 2),  ((width / 2) - yoffset) + (width / 4) );
		ctx.lineTo(xoffset + 20, (width / 4) - yoffset);
		ctx.lineTo(xoffset + 20, -(width / 4) - yoffset);
		ctx.closePath();
		ctx.fill();
		ctx.stroke();
	}
	ctx.restore();
}

function drawBullet(x, y, size, transparency) {
	//Draw a bullet using the given parameters.
	
	ctx.save();
	ctx.strokeStyle = "#555555";
	ctx.lineWidth = 5;
	ctx.fillStyle = "#00B2E1";
	ctx.globalAlpha = transparency;
	ctx.beginPath();
	ctx.arc(x, y, size + 2, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
	ctx.restore();
}

function drawTrap(x, y, size, angle, transparency) {
	ctx.save();
	ctx.strokeStyle = "#555555";
	ctx.lineWidth = 5;
	ctx.fillStyle = "#00B2E1";
	ctx.globalAlpha = transparency;
	ctx.translate(x, y);
	ctx.beginPath();
	ctx.moveTo(0, size / 3);
	ctx.rotate(60 * (Math.PI / 180));
	ctx.lineTo(0, size);
	ctx.rotate(60 * (Math.PI / 180));
	ctx.lineTo(0, size / 3);
	ctx.rotate(60 * (Math.PI / 180));
	ctx.lineTo(0, size);
	ctx.rotate(60 * (Math.PI / 180));
	ctx.lineTo(0, size / 3);
	ctx.rotate(60 * (Math.PI / 180));
	ctx.lineTo(0, size);
	ctx.rotate(60 * (Math.PI / 180));
	ctx.lineTo(0, size / 3);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
	ctx.restore();
}

function drawDrone(x, y, size, angle) {
	ctx.save();
	ctx.strokeStyle = "#555555";
	ctx.lineWidth = 5;
	ctx.fillStyle = "#00B2E1";
	ctx.translate(x, y);
	ctx.beginPath();
	ctx.rotate((angle + 10) * (Math.PI / 180));
	ctx.moveTo(0, size);
	ctx.rotate(120 * (Math.PI / 180));
	ctx.lineTo(0, size);
	ctx.rotate(120 * (Math.PI / 180));
	ctx.lineTo(0, size);
	ctx.rotate(120 * (Math.PI / 180));
	ctx.lineTo(0, size);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
	ctx.restore();
}

function drawNecro(x, y, size, angle) {
	ctx.save();
	ctx.fillStyle = "#FCC376";
	ctx.strokeStyle = "#555555";
	ctx.lineWidth = 10;
	ctx.translate(x, y);
	ctx.rotate(angle * (Math.PI / 180));
	ctx.strokeRect(-size / 2, -size / 2, size, size);
	ctx.fillRect(-size / 2, -size / 2, size, size);
	ctx.restore();
}

function drawTank() {
	var tankpointx = c.width / 2 - accel.x * 20;
	var tankpointy = c.height / 2 - accel.y * 20;
	if (((mouse.held === true) || (autofire === true)) && (editmode === false)) {
		for (var n = 0; n < barrels.length; n += 1) {
			if ((barrels[n].reload === 0) && (barrels[n].type < 2 || (((barrels[n].type === 2) && (dronelimit < 8)) || ((barrels[n].type === 3) && (necrolimit < 20))))) {
				if (barrels[n].hasOwnProperty("knockback") === false ) {
					barrels[n].knockback = 0;
				}
				bullets[bullets.length] = new Bullet(barrels[n].xoffset, barrels[n].yoffset, 
				xdistancefrom(tankpointx, tankpointy, mouse.x, mouse.y, barrels[n].length + barrels[n].xoffset, barrels[n].angle) + tankpointx, 
				ydistancefrom(tankpointx, tankpointy, mouse.x, mouse.y, barrels[n].length + barrels[n].xoffset, barrels[n].angle) + tankpointy,
				barrels[n].angle, barrels[n].width / 2, barrels[n].knockback, 10, barrels[n].length / 40, 100, barrels[n].length, 360, barrels[n].type, mouse.x, mouse.y, offset.totalx, offset.totaly);
				
				barrels[n].reload = barrels[n].basereload;
				
				tankalpha = 1.0;
				
				if (barrels[n].hasKnockBack == true) {
					accel.x += Math.cos((angle(c.width / 2, c.height / 2, mouse.x, mouse.y) + barrels[n].angle) * (Math.PI / 180)) * (bullets[bullets.length - 1].knockback);
        			accel.y += Math.sin((angle(c.width / 2, c.height / 2, mouse.x, mouse.y) + barrels[n].angle) * (Math.PI / 180)) * (bullets[bullets.length - 1].knockback);
				}
				if (barrels[n].type === 1) {
					bullets[bullets.length - 1].time *= 5;
				}
				if (barrels[n].type === 2) {
					dronelimit += 1;
				} else {
					necrolimit += 1;
				}
			}
		}
	}
	
	if ((autospin === true)) {
		autoangle += 0.5;
		console.log(autoangle + 180);
	}
	
	for (var n = 0; n < bullets.length; n += 1) {
		//Loop through each bullet.
		bullets[n].distance += bullets[n].speed;
		//Increase distance each tick based on speed.

		if ((bullets[n].type === 1) && (bullets[n].speed > 0)) {
			bullets[n].speed -= bullets[n].speed * 0.005;
			//If it's a trap, decrease speed each tick.
		}
		
		if ((bullets[n].type > 1) && (mouse.rightdown === false)) {
			bullets[n].targetx = mouse.x;
			bullets[n].targety = mouse.y;
			
			bullets[n].x += xdistancefrom(bullets[n].x, bullets[n].y, bullets[n].targetx, bullets[n].targety, 1, 0);
		
			bullets[n].y += ydistancefrom(bullets[n].x, bullets[n].y, bullets[n].targetx, bullets[n].targety, 1, 0);
		} else if ((bullets[n].type > 1) && (mouse.rightdown === true)) {
			bullets[n].targetx = mouse.x;
			bullets[n].targety = mouse.y;
			
			bullets[n].x -= xdistancefrom(bullets[n].x, bullets[n].y, bullets[n].targetx, bullets[n].targety, 1, 0);
		
			bullets[n].y -= ydistancefrom(bullets[n].x, bullets[n].y, bullets[n].targetx, bullets[n].targety, 1, 0);
		} else if (bullets[n].type === 1) {
			var ydif = xdistancefrom(c.width / 2, c.height / 2, bullets[n].targetx, bullets[n].targety, bullets[n].yoffset, bullets[n].bangle);
			var xdif = ydistancefrom(c.width / 2, c.height / 2, bullets[n].targetx, bullets[n].targety, bullets[n].yoffset, bullets[n].bangle);
			
			bullets[n].x = xdistancefrom(c.width / 2, c.height / 2, bullets[n].targetx, bullets[n].targety, bullets[n].distance + bullets[n].xoffset, bullets[n].bangle) + c.width / 2 + xdif + (offset.totalx - bullets[n].initoffx);
		
			bullets[n].y = ydistancefrom(c.width / 2, c.height / 2, bullets[n].targetx, bullets[n].targety, bullets[n].distance + bullets[n].xoffset, bullets[n].bangle) + c.height / 2 - ydif + (offset.totaly - bullets[n].initoffy);

			//Get the bullets current x and y based on distance, offset and angle.
		} else {
			var ydif = xdistancefrom(tankpointx, tankpointy, bullets[n].targetx, bullets[n].targety, bullets[n].yoffset, bullets[n].bangle);
			var xdif = ydistancefrom(tankpointx, tankpointy, bullets[n].targetx, bullets[n].targety, bullets[n].yoffset, bullets[n].bangle);
			
			bullets[n].x = xdistancefrom(tankpointx, tankpointy, bullets[n].targetx, bullets[n].targety, bullets[n].distance + bullets[n].xoffset, bullets[n].bangle) + tankpointx + xdif + (offset.totalx - bullets[n].initoffx);
		
			bullets[n].y = ydistancefrom(tankpointx, tankpointy, bullets[n].targetx, bullets[n].targety, bullets[n].distance + bullets[n].xoffset, bullets[n].bangle) + tankpointy - ydif + (offset.totaly - bullets[n].initoffy);

			//Get the bullets current x and y based on distance, offset and angle.
		}

		if (bullets[n].type === 0) {
			drawBullet(bullets[n].x, bullets[n].y, bullets[n].size, bullets[n].transparency);
		}
		//Display as a bullet if it's a bullet.
		
		if (bullets[n].type === 1) {
			drawTrap(bullets[n].x, bullets[n].y, bullets[n].size, bullets[n].angle, bullets[n].transparency);
		}
		//Display as a trap if it's a trap.
		
		if (bullets[n].type === 2) {
			drawDrone(bullets[n].x, bullets[n].y, bullets[n].size, angle(bullets[n].x, bullets[n].y, mouse.x, mouse.y));
		}
		//Display as a trap if it's a drone.
		
		if (bullets[n].type === 3) {
			drawNecro(bullets[n].x, bullets[n].y, bullets[n].size, angle(bullets[n].x, bullets[n].y, mouse.x, mouse.y));
		}
		//Display as a trap if it's a drone.
		if (bullets[n].time <= 20) {
			bullets[n].transparency = bullets[n].time / 20;
		} 
		if (bullets[n].time <= 1) {
			bullets.splice(n, 1);
			//When a bullet times out, delete it.
		} else if (bullets[n].type < 2){
			bullets[n].time -= 1;
			//If it's a bullet, decrease it's time left to live by 1 each frame.
		}
	}
	
	for (var n = 0; n < barrels.length; n += 1) {
		//Loop through each barrel.
		var alpha = 1.0;
		
		if (barrels[n].reload > (barrels[n].basereload / 4) * 3) {
			barrels[n].length -= (barrels[n].length / barrels[n].basereload);
			//If reload is > 3/4ths of its max value, reduce the length of the barrel.
		} else if (barrels[n].reload > (barrels[n].basereload / 4) * 2) {
			barrels[n].length += (barrels[n].length / barrels[n].basereload);
			//otherwise if reload is > 2/4ths of its max value, increase the length of the barrel.
		} else {
			barrels[n].length = barrels[n].baselength;
			//For the rest of the reload cycle, set it back to its inital length.
		}
		drawBarrel(barrels[n].angle, barrels[n].xoffset, barrels[n].yoffset, barrels[n].width, barrels[n].length, tankalpha, false, barrels[n].type);
		if (barrels[n].reload > 0) {
			barrels[n].reload -= 1;
		}
	}
	
	var btype = 0;
	
	if (document.getElementById("bullet").value === "trap") {
		btype = 1;
	} else if (document.getElementById("bullet").value === "drone") {
		btype = 2;
	} else if (document.getElementById("bullet").value === "necro") {
		btype = 3;
	}
	
	if (editmode === true) {
		drawBarrel(angle(tankpointx, tankpointy, mouse.x, mouse.y), parseFloat(validateField(document.getElementById("offsetx").value, 0, true)), parseFloat(validateField(document.getElementById("offset").value, 0, true)), parseFloat(validateField(document.getElementById("width").value, 1)), parseFloat(validateField(document.getElementById("length").value, 1)), 0.5, true, btype);
		//Draw a ghosted barrel while in edit mode above the normal barrels.
	} else if (autospin === true) {
		mouse.x = (Math.cos((autoangle + 180) * (Math.PI / 180)) * 200) + tankpointx;
		mouse.y = (Math.sin((autoangle + 180) * (Math.PI / 180)) * 200) + tankpointy;
	}
	
	var tanksize = parseFloat(validateField(document.getElementById("body").value, 32));
	var shape = document.getElementById("shape").value;
	
	if (shape=== "circle") {
		ctx.save();
		ctx.beginPath();
		ctx.arc(tankpointx, tankpointy, tanksize, 0, Math.PI*2, true);
		ctx.clip();
		ctx.clearRect(0, 0, c.width, c.height);
		ctx.restore();
		ctx.save();
		ctx.globalAlpha = tankalpha;
		ctx.strokeStyle = "#555555";
		ctx.lineWidth = 5;
		ctx.fillStyle = "#00B2E1";
		ctx.beginPath();
		ctx.arc(tankpointx, tankpointy, tanksize, 0, Math.PI*2, true);
		ctx.fill();
		ctx.stroke();
		ctx.restore();
	}
	if (shape === "square") {
		ctx.save();
		ctx.translate(tankpointx, tankpointy);
		if (editmode === false) {
			ctx.rotate(angle(tankpointx, tankpointy, mouse.x, mouse.y) * (Math.PI / 180));
		}
		ctx.beginPath();
		ctx.rect(-tanksize - 2, -tanksize - 2, (tanksize + 2) * 2, (tanksize + 2) * 2);
		ctx.clip();
		ctx.clearRect(-c.width, -c.height, c.width * 2, c.height * 2);
		ctx.restore();
		ctx.save();
		ctx.globalAlpha = tankalpha;
		ctx.strokeStyle = "#555555";
		ctx.lineWidth = 5;
		ctx.fillStyle = "#00B2E1";
		ctx.translate(tankpointx, tankpointy);
		if (editmode === false) {
			ctx.rotate(angle(tankpointx, tankpointy, mouse.x, mouse.y) * (Math.PI / 180));
		}
		ctx.fillRect(-tanksize, -tanksize, tanksize * 2, tanksize * 2);
		ctx.strokeRect(-tanksize, -tanksize, tanksize * 2, tanksize * 2);
		ctx.restore();
	}
	
	if (shape=== "smasher") {
		ctx.save();
		ctx.globalAlpha = tankalpha;
		ctx.fillStyle = "#555555";
		ctx.translate(tankpointx, tankpointy);
		ctx.beginPath();
		if (editmode === false) {
			ctx.rotate(angle(tankpointx, tankpointy, mouse.x, mouse.y) * (Math.PI / 180));
		}
		ctx.moveTo(0, tanksize + (tanksize / 3));
		ctx.rotate((360 / 6) * (Math.PI / 180));
		ctx.lineTo(0, tanksize + (tanksize / 3));
		ctx.rotate((360 / 6) * (Math.PI / 180));
		ctx.lineTo(0, tanksize + (tanksize / 3));
		ctx.rotate((360 / 6) * (Math.PI / 180));
		ctx.lineTo(0, tanksize + (tanksize / 3));
		ctx.rotate((360 / 6) * (Math.PI / 180));
		ctx.lineTo(0, tanksize + (tanksize / 3));
		ctx.rotate((360 / 6) * (Math.PI / 180));
		ctx.lineTo(0, tanksize + (tanksize / 3));
		ctx.rotate((360 / 6) * (Math.PI / 180));
		ctx.lineTo(0, tanksize + (tanksize / 3));
		ctx.closePath();
		ctx.clip();
		ctx.translate(-tankpointx, -tankpointy);
		ctx.clearRect(0, 0, c.width, c.height);
		ctx.translate(tankpointx, tankpointy);
		ctx.fill();
		ctx.restore();
		
		ctx.save();
		ctx.globalAlpha = tankalpha;
		ctx.strokeStyle = "#555555";
		ctx.lineWidth = 5;
		ctx.fillStyle = "#00B2E1";
		ctx.beginPath();
		ctx.arc(tankpointx, tankpointy, tanksize, 0, Math.PI*2, true);
		ctx.fill();
		ctx.restore();
	}
	//Draw the body of the tank on top of everything.
}

function drawUI() {
	ctx.save();
	ctx.font = "16px ubuntu";
	
	if (autofire === true) {
		ctx.fillStyle = "rgba(120, 120, 209, 0.5)";
		ctx.fillRect(c.width / 2 - 78, 10, 156, 30);
		ctx.fillStyle = "white";
		ctx.font = "bold 20px ubuntu";
		ctx.fillText("Auto Fire: ON", c.width / 2 - 60, 32);
	} else {
		ctx.fillStyle = "rgba(120, 120, 209, 0.5)";
		ctx.fillRect(c.width / 2 - 78, 10, 156, 30);
		ctx.fillStyle = "white";
		ctx.font = "bold 20px ubuntu";
		ctx.fillText("Auto Fire: OFF", c.width / 2 - 64, 32);
	}
	
	if (autospin === true) {
		ctx.fillStyle = "rgba(120, 120, 209, 0.5)";
		ctx.fillRect(c.width / 2 - 78, 50, 156, 30);
		ctx.fillStyle = "white";
		ctx.font = "bold 20px ubuntu";
		ctx.fillText("Auto Spin: ON", c.width / 2 - 60, 72);
	} else {
		ctx.fillStyle = "rgba(120, 120, 209, 0.5)";
		ctx.fillRect(c.width / 2 - 78, 50, 156, 30);
		ctx.fillStyle = "white";
		ctx.font = "bold 20px ubuntu";
		ctx.fillText("Auto Spin: OFF", c.width / 2 - 64, 72);
	}
	
	ctx.restore();
}

function drawManager() {
	
	drawMovement();
	
	drawTank();
	
	drawUI();
}

function placeBarrel() {
	var rangle = angle(tankpointx, tankpointy, mouse.x, mouse.y);
	console.log(rangle);
			
	if (shiftheld === true) {
		if ((rangle <= -172.5) || (rangle >= 172.5)) {
			rangle = 180;
		} else {
			rangle -= rangle % 15;
		}
	}
	console.log(rangle);
	var btype = 0;
	
	if (document.getElementById("bullet").value === "trap") {
		btype = 1;
	} else if (document.getElementById("bullet").value === "drone") {
		btype = 2;
	} else if (document.getElementById("bullet").value === "necro") {
		btype = 3;
	}

	barrels[barrels.length] = new Barrel(rangle, parseFloat(validateField(document.getElementById("offsetx").value, 0, true)), parseFloat(validateField(document.getElementById("offset").value, 0, true)), parseFloat(validateField(document.getElementById("width").value, 20)), parseFloat(validateField(document.getElementById("length").value, 60)), parseFloat(validateField(document.getElementById("reload").value * 60, 120)), true, btype, parseFloat(validateField(document.getElementById("knockback").value, 0, false)) / 10);
}

function keyDownHandler(e) {
    "use strict";
    if (e.keyCode === 68) {
        input.left = true;
    }
    if (e.keyCode === 65) {
        input.right = true;
    }
    if (e.keyCode === 87) {
		input.up = true;
    }
	if (e.keyCode === 83) {
		input.down = true;
	}
	if (e.keyCode === 69) {
		if ((autofire === false) && (editmode === false)) {
			autofire = true;
		} else {
			autofire = false;
		}
	}
	if (e.keyCode === 67) {
		if ((autospin === false) && (editmode === false)) {
			autoangle = angle(tankpointx, tankpointy, mouse.x, mouse.y) + 180;
			autospin = true;
		} else {
			autospin = false;
		}
	}
	if (e.keyCode === 16) {
		shiftheld = true;
	}
	if (e.keyCode === 81) {
		if (editmode === true) {
			placeBarrel();
		}
	}
}

function keyUpHandler(e) {
    "use strict";
    if (e.keyCode === 68) {
		input.left = false;
    }
    if (e.keyCode === 65) {
		input.right = false;
    }
    if (e.keyCode === 87) {
		input.up = false;
    }
	if (e.keyCode === 83) {
		input.down = false;
	}
	if (e.keyCode === 16) {
		shiftheld = false;
	}
}

function mousemove(e) {
	if (autospin === false) {
    	mouse.x = e.pageX - c.offsetLeft;
    	mouse.y = e.pageY - c.offsetTop;
	}
}

function mousedown(e) {
	if (e.button === 0){
		mouse.held = true;
	} else {
		mouse.rightdown = true;
	}
}

function mouseup(e) {
	if (e.button === 0){
		mouse.held = false;
	} else {
		mouse.rightdown = false;
	}
}

document.addEventListener("mousemove", mousemove, false);
document.addEventListener("mousedown", mousedown, false);
document.addEventListener("mouseup", mouseup, false);
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
window.oncontextmenu = function () {return false;};

function onload() {
	var drawtimer = setInterval(drawManager, 100 / 30);
}