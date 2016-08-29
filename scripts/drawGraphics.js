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
}

function drawBarrel(a, xoffset, yoffset, width, length, alpha, isghost, type) {
	var tankpointx = c.width / 2 - accel.x * 20;
	var tankpointy = c.height / 2 - accel.y * 20;
	
	ctx.save();
	ctx.strokeStyle = "rgba(85, 85, 85, " + alpha + ")";
	ctx.lineWidth = 10;
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
		ctx.strokeRect(xoffset, 0 - ((width / 2) + yoffset), length, width);
		ctx.fillRect(xoffset, 0 - ((width / 2) + yoffset), length, width);
	}
	
	if (type === 1) {
		ctx.beginPath();
		ctx.moveTo(xoffset + length, 0 - ((width / 2) + yoffset));
		ctx.lineTo(xoffset + length + (length / 2),  0 - ((width / 2) + yoffset) - (width / 4) );
		ctx.lineTo(xoffset + length + (length / 2),  ((width / 2) - yoffset) + (width / 4) );
		ctx.lineTo(xoffset + length, ((width / 2) + yoffset));
		ctx.closePath();
		ctx.stroke();
		ctx.fill();

		ctx.strokeRect(xoffset, 0 - ((width / 2) + yoffset), length, width);
		ctx.fillRect(xoffset, 0 - ((width / 2) + yoffset), length, width);
	}
	
	if (type === 2) {
		ctx.beginPath();
		ctx.moveTo(xoffset + 20, -(width / 4) - yoffset);
		ctx.lineTo(xoffset + 20 + (length / 2),  0 - ((width / 2) + yoffset) - (width / 4) );
		ctx.lineTo(xoffset + 20 + (length / 2),  ((width / 2) - yoffset) + (width / 4) );
		ctx.lineTo(xoffset + 20, (width / 4) - yoffset);
		ctx.lineTo(xoffset + 20, -(width / 4) - yoffset);
		ctx.closePath();
		ctx.stroke();
		ctx.fill();
	}
	ctx.restore();
}

function drawBullet(x, y, size) {
	//Draw a bullet using the given parameters.
	
	ctx.save();
	ctx.strokeStyle = "#555555";
	ctx.lineWidth = 10;
	ctx.fillStyle = "#00B2E1";
	ctx.beginPath();
	ctx.arc(x, y, size, 0, Math.PI * 2, true);
	ctx.stroke();
	ctx.fill();
	ctx.restore();
}

function drawTrap(x, y, size, angle) {
	ctx.save();
	ctx.strokeStyle = "#555555";
	ctx.lineWidth = 10;
	ctx.fillStyle = "#00B2E1";
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
	ctx.stroke();
	ctx.fill();
	ctx.restore();
}

function drawDrone(x, y, size, angle) {
	ctx.save();
	ctx.strokeStyle = "#555555";
	ctx.lineWidth = 10;
	ctx.fillStyle = "#00B2E1";
	ctx.translate(x, y);
	ctx.beginPath();
	ctx.rotate(angle * (Math.PI / 180));
	ctx.moveTo(0, size);
	ctx.rotate(120 * (Math.PI / 180));
	ctx.lineTo(0, size);
	ctx.rotate(120 * (Math.PI / 180));
	ctx.lineTo(0, size);
	ctx.rotate(120 * (Math.PI / 180));
	ctx.lineTo(0, size);
	ctx.closePath();
	ctx.stroke();
	ctx.fill();
	ctx.restore();
}

function drawTank() {
	var tankpointx = c.width / 2 - accel.x * 20;
	var tankpointy = c.height / 2 - accel.y * 20;
	if (((mouse.held === true) || (autofire === true)) && (editmode === false)) {
		for (var n = 0; n < barrels.length; n += 1) {
			if ((barrels[n].reload === 0) && ((barrels[n].type < 2) || (dronelimit < 8))) {
				bullets[bullets.length] = new Bullet(barrels[n].xoffset, barrels[n].yoffset, 
				0, 0, 
				barrels[n].angle + angle(tankpointx, tankpointy, mouse.x, mouse.y) + 180, barrels[n].width * 0.5,  (barrels[n].width + barrels[n].length) / 500, 10, 0.5 * (barrels[n].length / 10), 100, barrels[n].length, 360, barrels[n].type);
				barrels[n].reload = barrels[n].basereload;
				
				if (barrels[n].hasKnockBack == true) {
					accel.x -= Math.cos(bullets[bullets.length - 1].angle * Math.PI / 180) * (bullets[bullets.length - 1].knockback);
        			accel.y -= Math.sin(bullets[bullets.length - 1].angle * Math.PI / 180) * (bullets[bullets.length - 1].knockback);
				}
				
				if (barrels[n].type === 2) {
					bullets[bullets.length - 1].x = (Math.cos(bullets[bullets.length - 1].angle * Math.PI / 180) * (-bullets[bullets.length - 1].distance - bullets[bullets.length - 1].xoffset) + (c.width / 2) + (offset.totalx - bullets[bullets.length - 1].originx))
					+ (Math.cos((bullets[bullets.length - 1].angle - 90) * Math.PI / 180) * (-bullets[bullets.length - 1].yoffset));
					   
					bullets[bullets.length - 1].y = (Math.sin(bullets[bullets.length - 1].angle * Math.PI / 180) * (-bullets[bullets.length - 1].distance - bullets[bullets.length - 1].xoffset) + (c.height / 2 ) + (offset.totaly - bullets[bullets.length - 1].originy))
					+ (Math.sin((bullets[bullets.length - 1].angle - 90) * Math.PI / 180) * (-bullets[bullets.length - 1].yoffset));
					
					dronelimit += 1;
				}
			}
		}
	}
	
	if (editmode === true) {
		ctx.save();
		ctx.strokeStyle = "#FF0000";
		ctx.beginPath;
		ctx.moveTo(tankpointx, tankpointy);
		ctx.lineTo(c.width, tankpointy);
		ctx.stroke();
		ctx.restore();
	}
	
	if ((autospin === true) && (autoangle === 180)) {
		autoangle = -180;
	} else {
		autoangle += 0.5;
	}
	
	for (var n = 0; n < bullets.length; n += 1) {
		//Loop through each bullet.

		if ((bullets[n].type === 1) && (bullets[n].speed > 0)) {
			bullets[n].speed -= bullets[n].speed * 0.01;
			//If it's a trap, decrease speed each tick.
		}

		if (bullets[n].type < 2) {
			
			bullets[n].distance += bullets[n].speed;
			//Increase distance each tick based on speed.
			
			bullets[n].x = (Math.cos(bullets[n].angle * Math.PI / 180) * (-bullets[n].distance - bullets[n].xoffset) + (c.width / 2) + (offset.totalx - bullets[n].originx))
			+ (Math.cos((bullets[n].angle - 90) * Math.PI / 180) * (-bullets[n].yoffset));
			bullets[n].y = (Math.sin(bullets[n].angle * Math.PI / 180) * (-bullets[n].distance - bullets[n].xoffset) + (c.height / 2 ) + (offset.totaly - bullets[n].originy))
			+ (Math.sin((bullets[n].angle - 90) * Math.PI / 180) * (-bullets[n].yoffset));
		} else if (autospin === true) {
			bullets[n].x = (Math.cos(autoangle * Math.PI / 180) * (-200 - bullets[n].xoffset) + (c.width / 2) + (offset.totalx - bullets[n].originx))
			+ (Math.cos((bullets[n].angle - 90) * Math.PI / 180) * (-bullets[n].yoffset));
			bullets[n].y = (Math.sin(autoangle * Math.PI / 180) * (-200 - bullets[n].xoffset) + (c.height / 2 ) + (offset.totaly - bullets[n].originy))
			+ (Math.sin((bullets[n].angle - 90) * Math.PI / 180) * (-bullets[n].yoffset));
		} else if (editmode === false){
			if (bullets[n].x < mouse.x) {
				bullets[n].x += bullets[n].speed / 2;
			}
			if (bullets[n].x > mouse.x) {
				bullets[n].x -= bullets[n].speed / 2;
			}
			if (bullets[n].y < mouse.y) {
				bullets[n].y += bullets[n].speed / 2;
			}
			if (bullets[n].y > mouse.y) {
				bullets[n].y -= bullets[n].speed / 2;
			}
		}

		//Get the bullets current x and y based on distance, offset and angle.

		if (bullets[n].type === 0) {
			drawBullet(bullets[n].x, bullets[n].y, bullets[n].size);
		}
		//Display as a bullet if it's a bullet.
		
		if (bullets[n].type === 1) {
			drawTrap(bullets[n].x, bullets[n].y, bullets[n].size, bullets[n].angle);
		}
		//Display as a trap if it's a trap.
		
		if (bullets[n].type === 2) {
			drawDrone(bullets[n].x, bullets[n].y, bullets[n].size, angle(bullets[n].x, bullets[n].y, mouse.x, mouse.y));
		}
		//Display as a trap if it's a drone.
		
		if (bullets[n].time <= 1) {
			bullets.splice(n, 1);
			//When a bullet times out, delete it.
		} else if (bullets[n].type === 0){
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
		drawBarrel(barrels[n].angle, barrels[n].xoffset, barrels[n].yoffset, barrels[n].width, barrels[n].length, alpha, false, barrels[n].type);
		if (barrels[n].reload > 0) {
			barrels[n].reload -= 1;
		}
	}
	
	var btype = 0;
	
	if (document.getElementById("bullet").value === "trap") {
		btype = 1;
	} else if (document.getElementById("bullet").value === "drone") {
		btype = 2;
	}
	
	if (editmode === true) {
		drawBarrel(Math.atan2((mouse.y - c.height / 2 - accel.y * 20), (mouse.x - c.width / 2 - accel.x * 20)) * (180 / Math.PI), 0, parseFloat(validateField(document.getElementById("offset").value, 0)), parseFloat(validateField(document.getElementById("width").value, 1)), parseFloat(validateField(document.getElementById("length").value, 1)), 0.5, true, btype);
		//Draw a ghosted barrel while in edit mode above the normal barrels.
	}
	
	ctx.save();
	ctx.strokeStyle = "#555555";
	ctx.lineWidth = 10;
	ctx.fillStyle = "#00B2E1";
	ctx.beginPath();
	ctx.arc(c.width / 2 - accel.x * 20, c.height / 2 - accel.y * 20, parseFloat(validateField(document.getElementById("body").value, 32)), 0, Math.PI*2, true);
	//Draw the body of the tank on top of everything.
	ctx.stroke();
	ctx.fill();
	ctx.restore();
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
	var rangle = Math.atan2((mouse.y - c.height / 2 - accel.y * 20), (mouse.x - c.width / 2 - accel.x * 20)) * (180 / Math.PI);
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
	}

	barrels[barrels.length] = new Barrel(rangle, 0, parseFloat(validateField(document.getElementById("offset").value, 0)), parseFloat(validateField(document.getElementById("width").value, 20)), parseFloat(validateField(document.getElementById("length").value, 60)), parseFloat(validateField(document.getElementById("reload").value * 60, 2)), document.getElementById("knockback").checked, btype);
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
			autoangle = Math.atan2((mouse.y - c.height / 2 - accel.y * 20), (mouse.x - c.width / 2 - accel.x * 20)) * (180 / Math.PI);
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
    mouse.x = e.pageX - c.offsetLeft;
    mouse.y = e.pageY - c.offsetTop;
}

function mousedown(e) {
	mouse.held = true;
}

function mouseup() {
	mouse.held = false;
}

document.addEventListener("mousemove", mousemove, false);
document.addEventListener("mousedown", mousedown, false);
document.addEventListener("mouseup", mouseup, false);
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function onload() {
	var drawtimer = setInterval(drawManager, 100 / 60);
}