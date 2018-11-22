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
        accel.x -= accel.amount * 4;
    }
    if (accel.y > accel.max) {
        accel.y -= accel.amount * 4;
    }
    if (accel.x < -accel.max) {
        accel.x += accel.amount * 4;
    }
    if (accel.y < -accel.max) {
        accel.y += accel.amount * 4;
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

function drawTank() {
    var tankpointx = c.width / 2 - accel.x * 20;
    var tankpointy = c.height / 2 - accel.y * 20;

    var tanksize = parseFloat(validateField(document.getElementById("body").value, 32));
    var shape = document.getElementById("shape").value;
    var customangle = parseFloat(validateField(document.getElementById("customangle").value, 0));
    var customsangle = parseFloat(validateField(document.getElementById("customsangle").value, 0));

    //Dominator Base
    if (shape === "dominator") {
        ctx.save();
        ctx.globalAlpha = tankalpha;
        ctx.fillStyle = document.getElementById("scolo").value;
        ctx.globalAlpha = tankalpha;
        if (editmode === false) {
            drawPoly(tankpointx, tankpointy, tanksize * 1.3, (angle(tankpointx, tankpointy, mouse.x, mouse.y)), document.getElementById("scolo").value, 6)
        } else {
            drawPoly(tankpointx, tankpointy, tanksize * 1.3, 0, document.getElementById("scolo").value, 6)
        }
    }
    //Protector Base
    if (shape === "base") {
        ctx.save();
        ctx.globalAlpha = tankalpha;
        ctx.fillStyle = document.getElementById("scolo").value;
        ctx.globalAlpha = tankalpha;
        if (editmode === false) {
            drawPoly(tankpointx, tankpointy, tanksize * 1.3, (angle(tankpointx, tankpointy, mouse.x, mouse.y)) + 22.5, document.getElementById("scolo").value, 8)
        } else {
            drawPoly(tankpointx, tankpointy, tanksize * 1.3, 22.5, document.getElementById("scolo").value, 8)
        }
    }

    if (editmode === false) {
        if (document.getElementById("spawn").checked === true) {
            if (shapetimer > document.getElementById("shaperate").value) {
                shapetimer = document.getElementById("shaperate").value;
            } else if (shapetimer > 1) {
                shapetimer -= 1;
            } else {
                shapetimer = document.getElementById("shaperate").value;
                shapetimer = 120;
                shapes[shapes.length] = new Shape((Math.random() * c.width), (Math.random() * c.height), Math.random());
            }
        }
        for (var n = 0; n < shapes.length; n += 1) {

            if (Math.sqrt(Math.pow(shapes[n].x - tankpointx, 2) + Math.pow(shapes[n].y - tankpointy, 2)) < parseFloat(validateField(document.getElementById("body").value, 32)) + shapes[n].size / 2) {
                if (shapes[n].health > parseFloat(validateField(document.getElementById("bodydamage").value, 50))) {
                    shapes[n].health -= parseFloat(validateField(document.getElementById("bodydamage").value, 50));
                    shapes[n].accelx += Math.cos(angle(tankpointx, tankpointy, shapes[n].x, shapes[n].y) * (Math.PI / 180));
                    shapes[n].accely += Math.sin(angle(tankpointx, tankpointy, shapes[n].x, shapes[n].y) * (Math.PI / 180));
                    accel.x += Math.cos(angle(tankpointx, tankpointy, shapes[n].x, shapes[n].y) * (Math.PI / 180)) / 5;
                    accel.y += Math.sin(angle(tankpointx, tankpointy, shapes[n].x, shapes[n].y) * (Math.PI / 180)) / 5;
                } else {
                    shapes.splice(n, 1);
                    nShape = 0;
                }
            }

            if (Math.sqrt(Math.pow(shapes[n].x - tankpointx, 2) + Math.pow(shapes[n].y - tankpointy, 2)) < (Math.sqrt(Math.pow(shapes[nShape].x - tankpointx, 2) + Math.pow(shapes[nShape].y - tankpointy, 2)))) {
                nShape = n;
            }

            //Yellow Square
            if (shapes[n].type === 0) {
                drawPoly(shapes[n].x, shapes[n].y, shapes[n].size, shapes[n].angle, "#FFE869", 4);

                //Red Triangle
            } else if (shapes[n].type === 1) {
                drawPoly(shapes[n].x, shapes[n].y, shapes[n].size, shapes[n].angle, "#FC7677", 3);

                //Blue Pentagon
            } else if (shapes[n].type === 2) {
                drawPoly(shapes[n].x, shapes[n].y, shapes[n].size, shapes[n].angle, "#768DFC", 5);

                //Blue Alpha Pentagon
            } else if (shapes[n].type === 3) {
                drawPoly(shapes[n].x, shapes[n].y, shapes[n].size, shapes[n].angle, "#768DFC", 5);

                //Green Square
            } else if (shapes[n].type === 4) {
                drawPoly(shapes[n].x, shapes[n].y, shapes[n].size, shapes[n].angle, "#92FF71", 4);

                //Green Triangle
            } else if (shapes[n].type === 5) {
                drawPoly(shapes[n].x, shapes[n].y, shapes[n].size, shapes[n].angle, "#92FF71", 3);

                //Green Pentagon
            } else if (shapes[n].type === 6) {
                drawPoly(shapes[n].x, shapes[n].y, shapes[n].size, shapes[n].angle, "#92FF71", 5);

                //Hexagon
            } else if (shapes[n].type === 7) {
                drawPoly(shapes[n].x, shapes[n].y, shapes[n].size, shapes[n].angle, "#EBB67B", 6);

                //Egg
            } else if (shapes[n].type === 8) {
                drawPoly(shapes[n].x, shapes[n].y, shapes[n].size, shapes[n].angle, "#EEEEEE", 99);

                //Heptagon
            } else if (shapes[n].type === 9) {
                drawPoly(shapes[n].x, shapes[n].y, shapes[n].size, shapes[n].angle, "#AD009C", 7);

                //Octagon
            } else if (shapes[n].type === 10) {
                drawPoly(shapes[n].x, shapes[n].y, shapes[n].size, shapes[n].angle, "#CA5E5F", 8);

                //Nonagon
            } else {
                drawPoly(shapes[n].x, shapes[n].y, shapes[n].size, shapes[n].angle, "#5E71CA", 9);
            }
            if (shapes[n].health < shapes[n].maxhealth) {
                ctx.fillStyle = "#555555";
                ctx.roundRect(shapes[n].x - shapes[n].size, shapes[n].y + shapes[n].size + 10, shapes[n].size * 2, 10, 3).fill();
                ctx.fillStyle = "#86C680";
                ctx.roundRect(shapes[n].x - shapes[n].size + 2, shapes[n].y + shapes[n].size + 12, (shapes[n].size * 2) * (shapes[n].health / shapes[n].maxhealth) - 2, 6, 3).fill();
            }

            shapes[n].x -= shapes[n].initx - offset.totalx - shapes[n].accelx;
            shapes[n].y -= shapes[n].inity - offset.totaly - shapes[n].accely;

            shapes[n].initx = offset.totalx;
            shapes[n].inity = offset.totaly;

            shapes[n].angle += shapes[n].rotatespeed;

            if ((shapes[n].accelx > 0.1) || (shapes[n].accelx < -0.1)) {
                shapes[n].accelx -= shapes[n].accelx * 0.1;
            } else {
                shapes[n].accelx = 0;
            }

            if ((shapes[n].accely > 0.1) || (shapes[n].accely < -0.1)) {
                shapes[n].accely -= shapes[n].accely * 0.1;
            } else {
                shapes[n].accely = 0;
            }

            for (var i = 0; i < bullets.length; i += 1) {
                if ((shapes[n].x + shapes[n].size + shapes[n].accelx + (offset.totalx - bullets[i].initoffx) >= bullets[i].x + (offset.totalx - bullets[i].initoffx)) && (shapes[n].x - shapes[n].size + (offset.totalx - bullets[i].initoffx) <= bullets[i].x + bullets[i].size + (offset.totalx - bullets[i].initoffx) + shapes[n].accelx)) {
                    if ((shapes[n].y + shapes[n].size + shapes[n].accely + (offset.totaly - bullets[i].initoffy) >= bullets[i].y + (offset.totaly - bullets[i].initoffy)) && (shapes[n].y - shapes[n].size + (offset.totaly - bullets[i].initoffy) <= bullets[i].y + bullets[i].size + (offset.totaly - bullets[i].initoffy) + shapes[n].accely)) {
                        console.log("Collision!");
                        if (shapes[n].health > bullets[i].damage) {
                            shapes[n].health -= bullets[i].damage;
                            shapes[n].accelx += Math.cos(angle(bullets[i].x, bullets[i].y, shapes[n].x, shapes[n].y) * (Math.PI / 180)) * (bullets[i].size / 10);
                            shapes[n].accely += Math.sin(angle(bullets[i].x, bullets[i].y, shapes[n].x, shapes[n].y) * (Math.PI / 180)) * (bullets[i].size / 10);
                        } else {
                            if ((bullets[i].type === 3) && (necrolimit < 20)) {
                                bullets[bullets.length] = bullets[i];
                                bullets[bullets.length - 1].x = shapes[n].x;
                                bullets[bullets.length - 1].y = shapes[n].y;
                            }
                            shapes.splice(n, 1);
                            nShape = 0;
                        }
                        if (bullets[i].type === 2) {
                            dronelimit -= 1;
                        }
                        if (bullets[i].type === 3) {
                            necrolimit -= 1;
                        }
                        bullets.splice(i, 1);
                    }
                }
            }
        }
    }

    for (var n = 0; n < barrels.length; n += 1) {
        if (((mouse.held === true) || (autofire === true) || ((barrels[n].type === 4) && (shapes.length > 0))) && (editmode === false)) {
            var canfire = true;
            if (barrels[n].hasOwnProperty("disabled") === true) {
                if (barrels[n].disabled === false) {
                    var canfire = false;
                }
            }

            var damage = 10;
            if (barrels[n].hasOwnProperty("damage") === true) {
                damage = barrels[n].damage;
            }

            //Starts delay timer & disables it being run a second time
            if ((barrels[n].delay <= 0) && (barrels[n].basedelay > 0) && (barrels[n].delayed === true)) {
                barrels[n].delay = barrels[n].basedelay;
                barrels[n].delayed = false;
            }

            if ((barrels[n].delay === 0) && (barrels[n].reload === 0) && (canfire === true) && (barrels[n].type < 2 || barrels[n].type === 4 || (((barrels[n].type === 2) && (dronelimit < parseFloat(validateField(document.getElementById("drones").value, 8, false)))) || ((barrels[n].type === 3) && (necrolimit < parseFloat(validateField(document.getElementById("necrodrones").value, 20, false))))))) {
                if (barrels[n].hasOwnProperty("knockback") === false) {
                    barrels[n].knockback = 0;
                }

                var ydif = xdistancefrom(c.width / 2, c.height / 2, mouse.x + ((mouse.x - tankpointx) * barrels[n].length) - accel.x, mouse.y + ((mouse.y - tankpointy) * barrels[n].length) - accel.y, barrels[n].yoffset, barrels[n].angle);
                var xdif = ydistancefrom(c.width / 2, c.height / 2, mouse.x + ((mouse.x - tankpointx) * barrels[n].length) - accel.x, mouse.y + ((mouse.y - tankpointy) * barrels[n].length) - accel.y, barrels[n].yoffset, barrels[n].angle);
                var tanksize = parseFloat(validateField(document.getElementById("body").value, 32));

                if (barrels[n].hasOwnProperty("b") === true) {
                    if ((barrels[n].type < 4) || (shapes.length === 0)) {
                        bullets[bullets.length] = new Bullet(n, barrels[n].b[0], barrels[n].b[1], barrels[n].b[2],
                            xdistancefrom(tankpointx, tankpointy, mouse.x, mouse.y, barrels[n].length + barrels[n].xoffset, barrels[n].angle) + tankpointx + xdif,
                            ydistancefrom(tankpointx, tankpointy, mouse.x, mouse.y, barrels[n].length + barrels[n].xoffset, barrels[n].angle) + tankpointy - ydif,
                            mouse.x + ((mouse.x - tankpointx) * barrels[n].length + barrels[n].xoffset) - accel.x,
                            mouse.y + ((mouse.y - tankpointy) * barrels[n].length + barrels[n].xoffset) - accel.y, barrels[n].spread, barrels[n].bulletColor);
                    } else {
                        bullets[bullets.length] = new Bullet(n, barrels[n].b[0], barrels[n].b[1], barrels[n].b[2],
                            xdistancefrom(tankpointx, tankpointy, mouse.x, mouse.y, tanksize, barrels[n].angle) + tankpointx + xdif,
                            ydistancefrom(tankpointx, tankpointy, mouse.x, mouse.y, tanksize, barrels[n].angle) + tankpointy - ydif,
                            shapes[nShape].x + ((shapes[nShape].x - tankpointx) * barrels[n].length + barrels[n].xoffset) - accel.x,
                            shapes[nShape].y + ((shapes[nShape].y - tankpointy) * barrels[n].length + barrels[n].xoffset) - accel.y, barrels[n].spread, barrels[n].bulletColor);
                    }
                } else {
                    bullets[bullets.length] = new Bullet(n, barrels[n].width / 2, 5, 360,
                        xdistancefrom(tankpointx, tankpointy, mouse.x, mouse.y, barrels[n].length + barrels[n].xoffset, barrels[n].angle) + tankpointx + xdif,
                        ydistancefrom(tankpointx, tankpointy, mouse.x, mouse.y, barrels[n].length + barrels[n].xoffset, barrels[n].angle) + tankpointy - ydif,
                        mouse.x + ((mouse.x - tankpointx) * barrels[n].length + barrels[n].xoffset) - accel.x,
                        mouse.y + ((mouse.y - tankpointy) * barrels[n].length + barrels[n].xoffset) - accel.y, 0, barrels[n].bulletColor);
                }
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
        } else {
            if ((barrels[n].delay <= 0) && ((barrels[n].delay < barrels[n].basedelay) || (barrels[n].basedelay <= 0))) {
                barrels[n].delayed = true;
            }
        }

        //Reenables delay timer
    }


    //Delay timer
    for (var n = 0; n < barrels.length; n += 1) {
        if (barrels[n].hasOwnProperty("delay") === false) {
            barrels[n].delay = 0
        } else if (barrels[n].delay > 0) {
            barrels[n].delay -= 1;
        }
    }

    if ((autospin === true)) {
        autoangle += 0.5;
        console.log(autoangle + 180);
    }

    for (var n = 0; n < bullets.length; n += 1) {
        //Loop through each bullet.

        var isclose = false;

        if (bullets[n].type > 1) {
            for (var i = 0; i < bullets.length; i += 1) {
                if ((bullets[i].type > 1) && (i != n) && (bullets[n].x >= bullets[i].x - bullets[i].size) && (bullets[n].x <= bullets[i].x + bullets[i].size) && (bullets[n].y >= bullets[i].y - bullets[i].size) && (bullets[n].y <= bullets[i].y + bullets[i].size)) {
                    bullets[n].x += (bullets[n].x - bullets[i].x) * 0.05;
                    bullets[n].y += (bullets[n].y - bullets[i].y) * 0.05;
                }
            }
        }

        if ((bullets[n].type === 1) && (bullets[n].speed > 0)) {
            bullets[n].speed -= bullets[n].speed * 0.005;
            //If it's a trap, decrease speed each tick.
        }

        if (((bullets[n].type === 2) || (bullets[n].type === 3)) && (mouse.rightdown === false)) {
            bullets[n].targetx = mouse.x;
            bullets[n].targety = mouse.y;

            bullets[n].x += xdistancefrom(bullets[n].x, bullets[n].y, bullets[n].targetx, bullets[n].targety, bullets[n].speed / 2, 0) + (offset.totalx - bullets[n].initoffx);

            bullets[n].y += ydistancefrom(bullets[n].x, bullets[n].y, bullets[n].targetx, bullets[n].targety, bullets[n].speed / 2, 0) + (offset.totaly - bullets[n].initoffy);

            bullets[n].initoffx = offset.totalx;
            bullets[n].initoffy = offset.totaly;
        } else if (((bullets[n].type === 2) || (bullets[n].type === 3)) && (mouse.rightdown === true)) {
            bullets[n].targetx = mouse.x;
            bullets[n].targety = mouse.y;

            bullets[n].x -= xdistancefrom(bullets[n].x, bullets[n].y, bullets[n].targetx, bullets[n].targety, bullets[n].speed / 2, 0) + (offset.totalx - bullets[n].initoffx);

            bullets[n].y -= ydistancefrom(bullets[n].x, bullets[n].y, bullets[n].targetx, bullets[n].targety, bullets[n].speed / 2, 0) + (offset.totaly - bullets[n].initoffy);

            bullets[n].initoffx = offset.totalx;
            bullets[n].initoffy = offset.totaly;
        } else if ((bullets[n].type === 1) || (bullets[n].type === 4)) {

            bullets[n].targetx += xdistancefrom(bullets[n].x, bullets[n].y, bullets[n].targetx, bullets[n].targety, bullets[n].speed, bullets[n].bangle);
            bullets[n].targety += ydistancefrom(bullets[n].x, bullets[n].y, bullets[n].targetx, bullets[n].targety, bullets[n].speed, bullets[n].bangle);

            bullets[n].x += xdistancefrom(bullets[n].x, bullets[n].y, bullets[n].targetx, bullets[n].targety, bullets[n].speed, bullets[n].bangle) + (offset.totalx - bullets[n].initoffx);

            bullets[n].y += ydistancefrom(bullets[n].x, bullets[n].y, bullets[n].targetx, bullets[n].targety, bullets[n].speed, bullets[n].bangle) + (offset.totaly - bullets[n].initoffy);

            bullets[n].initoffx = offset.totalx;
            bullets[n].initoffy = offset.totaly;

            //Get the bullets current x and y based on distance, offset and angle.
        } else {

            bullets[n].targetx += xdistancefrom(bullets[n].x, bullets[n].y, bullets[n].targetx, bullets[n].targety, bullets[n].speed, bullets[n].bangle);
            bullets[n].targety += ydistancefrom(bullets[n].x, bullets[n].y, bullets[n].targetx, bullets[n].targety, bullets[n].speed, bullets[n].bangle);

            bullets[n].x += xdistancefrom(bullets[n].x, bullets[n].y, bullets[n].targetx, bullets[n].targety, bullets[n].speed, bullets[n].bangle) + (offset.totalx - bullets[n].initoffx);

            bullets[n].y += ydistancefrom(bullets[n].x, bullets[n].y, bullets[n].targetx, bullets[n].targety, bullets[n].speed, bullets[n].bangle) + (offset.totaly - bullets[n].initoffy);

            bullets[n].initoffx = offset.totalx;
            bullets[n].initoffy = offset.totaly;
        }
        if (editmode === false) {
            if (bullets[n].type === 0) {
                drawBullet(bullets[n].x, bullets[n].y, bullets[n].size, bullets[n].transparency, bullets[n].color);
            }
            //Display as a bullet if it's a bullet.

            if (bullets[n].type === 1) {
                drawTrap(bullets[n].x, bullets[n].y, bullets[n].size, bullets[n].angle, bullets[n].transparency, bullets[n].color);
            }
            //Display as a trap if it's a trap.

            if (bullets[n].type === 2) {
                drawPoly(bullets[n].x, bullets[n].y, bullets[n].size, angle(bullets[n].x, bullets[n].y, mouse.x, mouse.y), bullets[n].color, 3);
            }
            //Display as a trap if it's a drone.

            if (bullets[n].type === 3) {
                drawPoly(bullets[n].x, bullets[n].y, bullets[n].size, angle(bullets[n].x, bullets[n].y, mouse.x, mouse.y), bullets[n].color, 4);
            }
            //Display as a trap if it's a drone.

            if (bullets[n].type === 4) {
                drawBullet(bullets[n].x, bullets[n].y, bullets[n].size, bullets[n].transparency, bullets[n].color);
            }
            //Display as a bullet if it's a bullet.
        }
        if (bullets[n].time <= 20) {
            bullets[n].transparency = bullets[n].time / 20;
        }
        if (bullets[n].time <= 1) {
            bullets.splice(n, 1);
            //When a bullet times out, delete it.
        } else if ((bullets[n].type < 2) || (bullets[n].type == 4)) {
            bullets[n].time -= 1;
            //If it's a bullet, decrease it's time left to live by 1 each frame.
        }
    }

    for (var n = 0; n < barrels.length; n += 1) {
        //Loop through each barrel.

        if (barrels[n].reload > (barrels[n].basereload / 8) * 7) {
            barrels[n].length -= (barrels[n].length / barrels[n].basereload);
            //If reload is > 3/4ths of its max value, reduce the length of the barrel.
        } else if (barrels[n].reload > (barrels[n].basereload / 8) * 6) {
            barrels[n].length += (barrels[n].length / barrels[n].basereload);
            //otherwise if reload is > 2/4ths of its max value, increase the length of the barrel.
        } else {
            barrels[n].length = barrels[n].baselength;
            //For the rest of the reload cycle, set it back to its inital length.
        }
        if (barrels[n].reload > 0) {
            barrels[n].reload -= 1;
        }
        var anglePlace = angle(tankpointx, tankpointy, mouse.x, mouse.y);
        if (anglePlace < 0) {
            anglePlace = 360 + anglePlace;
        }
        if ((anglePlace >= barrels[n].angle - 1) && (anglePlace <= barrels[n].angle + 1) && (editmode === true)) {
            drawBarrel(barrels[n].angle, barrels[n].xoffset, barrels[n].yoffset, barrels[n].width, barrels[n].length, 0.5, false, barrels[n].type, barrels[n].image, barrels[n].color);
            if (input.f === true) {
                barrels.splice(n, 1);
            }
        } else if ((barrels[n].type < 4) || ((barrels[n].xoffset >= 0) || (barrels[n].xoffset < -1 * parseFloat(validateField(document.getElementById("body").value, 32))))) {
            drawBarrel(barrels[n].angle, barrels[n].xoffset, barrels[n].yoffset, barrels[n].width, barrels[n].length, tankalpha, false, barrels[n].type, barrels[n].image, barrels[n].color);
        }
    }

    var btype = 0;

    if (document.getElementById("bullet").value === "trap") {
        btype = 1;
    } else if (document.getElementById("bullet").value === "drone") {
        btype = 2;
    } else if (document.getElementById("bullet").value === "necro") {
        btype = 3;
    } else if (document.getElementById("bullet").value === "auto") {
        btype = 4;
    }

    if (editmode === true) {
        if ((btype < 4) || ((parseFloat(validateField(document.getElementById("offsetx").value, 0, true)) >= 0) || (parseFloat(validateField(document.getElementById("offsetx").value, 0, true)) < -1 * parseFloat(validateField(document.getElementById("body").value, 32))))) {
            for (var n = 1; n <= mirrorBarrels; n += 1) {
                drawBarrel((angle(tankpointx, tankpointy, mouse.x, mouse.y) + 360 + ((360 / mirrorBarrels) * n)) % 360, parseFloat(validateField(document.getElementById("offsetx").value, 0, true)), parseFloat(validateField(document.getElementById("offset").value, 0, true)), parseFloat(validateField(document.getElementById("width").value, 1)), parseFloat(validateField(document.getElementById("length").value, 1)), 0.5, true, btype, document.getElementById("barrellImage").value, document.getElementById("barrellcolor").value);
                //Draw a ghosted barrel while in edit mode above the normal barrels.
            }
        }
    } else if (autospin === true) {
        mouse.x = (Math.cos((autoangle + 180) * (Math.PI / 180)) * 200) + tankpointx;
        mouse.y = (Math.sin((autoangle + 180) * (Math.PI / 180)) * 200) + tankpointy;
    }

    var tanksize = parseFloat(validateField(document.getElementById("body").value, 32));
    var shape = document.getElementById("shape").value;

    if (shape === "circle") {
        ctx.save();
        ctx.beginPath();
        ctx.arc(tankpointx, tankpointy, tanksize, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();
        ctx.clearRect(tankpointx - tanksize, tankpointy - tanksize, tanksize * 2, tanksize * 2);
        ctx.restore();
        drawBullet(tankpointx, tankpointy, tanksize, tankalpha, "#ffffff");
    }
    if (shape === "square") {
        ctx.globalAlpha = tankalpha;
        if (editmode === false) {
            drawPoly(tankpointx, tankpointy, tanksize + 12, (angle(tankpointx, tankpointy, mouse.x, mouse.y) + 45), document.getElementById("color").value, 4)
        } else {
            drawPoly(tankpointx, tankpointy, tanksize + 12, 45, document.getElementById("color").value, 4)
        }
    }

    if (shape === "triangle") {
        ctx.globalAlpha = tankalpha;
        if (editmode === false) {
            drawPoly(tankpointx, tankpointy, tanksize + 9, (angle(tankpointx, tankpointy, mouse.x, mouse.y) - 30), document.getElementById("color").value, 3)
        } else {
            drawPoly(tankpointx, tankpointy, tanksize + 9, -30, document.getElementById("color").value, 3)
        }
    }
    if (shape === "pentagon") {
        ctx.globalAlpha = tankalpha;
        if (editmode === false) {
            drawPoly(tankpointx, tankpointy, tanksize + 10, (angle(tankpointx, tankpointy, mouse.x, mouse.y) + 18), document.getElementById("color").value, 5)
        } else {
            drawPoly(tankpointx, tankpointy, tanksize + 10, 18, document.getElementById("color").value, 5)
        }
    }
    if (shape === "mothership") {
        ctx.globalAlpha = tankalpha;
        if (editmode === false) {
            drawPoly(tankpointx, tankpointy, tanksize * 1.3, (angle(tankpointx, tankpointy, mouse.x, mouse.y)), document.getElementById("color").value, 16)
        } else {
            drawPoly(tankpointx, tankpointy, tanksize * 1.3, 0, document.getElementById("color").value, 16)
        }
    }
    if (shape === "rect") {
        ctx.globalAlpha = tankalpha;
        if (editmode === false) {
            drawRect(tankpointx, tankpointy, tanksize, (angle(tankpointx, tankpointy, mouse.x, mouse.y)), document.getElementById("color").value)
        } else {
            drawRect(tankpointx, tankpointy, tanksize, 0, document.getElementById("color").value)
        }
    }
    if (shape === "smasher") {
        ctx.save();
        ctx.globalAlpha = tankalpha;
        ctx.fillStyle = document.getElementById("scolo").value;
        if (editmode === false) {
            drawPoly(tankpointx, tankpointy, tanksize * 1.3, (angle(tankpointx, tankpointy, mouse.x, mouse.y)), document.getElementById("scolo").value, 6)
        } else {
            drawPoly(tankpointx, tankpointy, tanksize * 1.3, 0, document.getElementById("scolo").value, 6)
        }
        ctx.save();
        ctx.beginPath();
        ctx.arc(tankpointx, tankpointy, tanksize, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();
        ctx.clearRect(tankpointx - tanksize, tankpointy - tanksize, tanksize * 2, tanksize * 2);
        ctx.restore();
        drawBullet(tankpointx, tankpointy, tanksize, tankalpha, "#ffffff");
    }

    if (shape === "spike") {
        ctx.save();
        ctx.globalAlpha = tankalpha;
        ctx.fillStyle = document.getElementById("scolo").value;
        if (editmode === false) {
            drawConc(tankpointx, tankpointy, tanksize * 1.4, (angle(tankpointx, tankpointy, mouse.x, mouse.y)), document.getElementById("scolo").value, 12, (tanksize + 4) / 1.2)
        } else {
            drawConc(tankpointx, tankpointy, tanksize * 1.4, 0, document.getElementById("scolo").value, 12, (tanksize + 4) / 1.2)
        }
        ctx.save();
        ctx.beginPath();
        ctx.arc(tankpointx, tankpointy, tanksize, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();
        ctx.clearRect(tankpointx - tanksize, tankpointy - tanksize, tanksize * 2, tanksize * 2);
        ctx.restore();
        drawBullet(tankpointx, tankpointy, tanksize, tankalpha, "#ffffff");
    }
    if (shape === "landmine") {
        ctx.save();
        ctx.globalAlpha = tankalpha;
        ctx.fillStyle = document.getElementById("scolo").value;
        if (editmode === false) {
            drawPoly(tankpointx, tankpointy, tanksize * 1.3, (angle(tankpointx, tankpointy, mouse.x, mouse.y)) / 2, document.getElementById("scolo").value, 6)
        } else {
            drawPoly(tankpointx, tankpointy, tanksize * 1.3, 0, document.getElementById("scolo").value, 6)
        }
        ctx.save();
        ctx.globalAlpha = tankalpha;
        ctx.fillStyle = document.getElementById("scolo").value;
        if (editmode === false) {
            drawPoly(tankpointx, tankpointy, tanksize * 1.3, (angle(tankpointx, tankpointy, mouse.x, mouse.y)), document.getElementById("scolo").value, 6)
        } else {
            drawPoly(tankpointx, tankpointy, tanksize * 1.3, 0, document.getElementById("scolo").value, 6)
        }
        ctx.save();
        ctx.beginPath();
        ctx.arc(tankpointx, tankpointy, tanksize, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();
        ctx.clearRect(tankpointx - tanksize, tankpointy - tanksize, tanksize * 2, tanksize * 2);
        ctx.restore();
        drawBullet(tankpointx, tankpointy, tanksize, tankalpha, "#ffffff");
    }
    if (shape === "dominator") {
        ctx.save();
        ctx.beginPath();
        ctx.arc(tankpointx, tankpointy, tanksize, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();
        ctx.clearRect(tankpointx - tanksize, tankpointy - tanksize, tanksize * 2, tanksize * 2);
        ctx.restore();
        drawBullet(tankpointx, tankpointy, tanksize, tankalpha, "#ffffff");
    }
    if (shape === "base") {
        ctx.save();
        ctx.beginPath();
        ctx.arc(tankpointx, tankpointy, tanksize, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();
        ctx.clearRect(tankpointx - tanksize, tankpointy - tanksize, tanksize * 2, tanksize * 2);
        ctx.restore();
        drawBullet(tankpointx, tankpointy, tanksize, tankalpha, "#ffffff");
    }
    if (shape === "trap") {
        ctx.globalAlpha = tankalpha;
        if (editmode === false) {
            drawConc(tankpointx, tankpointy, tanksize + 3, (angle(tankpointx, tankpointy, mouse.x, mouse.y) + 90), document.getElementById("color").value, 3, (tanksize + 3) / 2.5)
        } else {
            drawConc(tankpointx, tankpointy, tanksize + 3, 90, document.getElementById("color").value, 3, (tanksize + 3) / 2.5)
        }
    }
    if (shape === "drive") {
        ctx.save();
        ctx.beginPath();
        ctx.arc(tankpointx, tankpointy, tanksize, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();
        ctx.clearRect(tankpointx - tanksize, tankpointy - tanksize, tanksize * 2, tanksize * 2);
        ctx.restore();
        drawBullet(tankpointx, tankpointy, tanksize, tankalpha, "#ffffff");
        ctx.globalAlpha = tankalpha;
        if (editmode === false) {
            drawPoly(tankpointx, tankpointy, tanksize / 1.5, (angle(tankpointx, tankpointy, mouse.x, mouse.y) + 45), ColorLuminance(document.getElementById("color").value, document.getElementById("luminance").value), 4)
        } else {
            drawPoly(tankpointx, tankpointy, tanksize / 1.5, 45, ColorLuminance(document.getElementById("color").value, document.getElementById("luminance").value), 4)
        }
    }
    if (shape === "custom") {
        ctx.save();
        ctx.globalAlpha = tankalpha;
        ctx.fillStyle = document.getElementById("scolo").value;
        if (editmode === false) {
            drawConc(tankpointx, tankpointy, document.getElementById("customssize").value, (angle(tankpointx, tankpointy, mouse.x, mouse.y) + customsangle), document.getElementById("scolo").value, document.getElementById("customssides").value, document.getElementById("customssize").value / document.getElementById("customsdist").value)
            drawConc(tankpointx, tankpointy, tanksize, (angle(tankpointx, tankpointy, mouse.x, mouse.y) + customangle), document.getElementById("color").value, document.getElementById("customsides").value, tanksize / document.getElementById("customdistance").value)
        } else {
            drawConc(tankpointx, tankpointy, document.getElementById("customssize").value, customsangle, document.getElementById("scolo").value, document.getElementById("customssides").value, document.getElementById("customssize").value / document.getElementById("customsdist").value)
            drawConc(tankpointx, tankpointy, tanksize, customangle, document.getElementById("color").value, document.getElementById("customsides").value, tanksize / document.getElementById("customdistance").value)
        }
    }

    //Draw the body of the tank on top of everything.

    for (var n = 0; n < barrels.length; n += 1) {
        //Loop through each barrel.

        if ((angle(tankpointx, tankpointy, mouse.x, mouse.y) >= barrels[n].angle - 1) && (angle(tankpointx, tankpointy, mouse.x, mouse.y) <= barrels[n].angle + 1) && (editmode === true)) {
            drawBarrel(barrels[n].angle, barrels[n].xoffset, barrels[n].yoffset, barrels[n].width, barrels[n].length, 0.5, false, barrels[n].type, barrels[n].image, barrels[n].color);
            if (input.f === true) {
                barrels.splice(n, 1);
            }
        } else if ((barrels[n].type === 4) && ((barrels[n].xoffset < 0) && (barrels[n].xoffset > -2 * parseFloat(validateField(document.getElementById("body").value, 32))))) {
            drawBarrel(barrels[n].angle, barrels[n].xoffset, barrels[n].yoffset, barrels[n].width, barrels[n].length, tankalpha, false, barrels[n].type, barrels[n].image, barrels[n].color);
        }
    }

    if (editmode === true) {
        if ((btype === 4) && ((parseFloat(validateField(document.getElementById("offsetx").value, 0, true)) < 0) && (parseFloat(validateField(document.getElementById("offsetx").value, 0, true)) > -2 * parseFloat(validateField(document.getElementById("body").value, 32))))) {
            for (var n = 1; n <= mirrorBarrels; n += 1) {
                drawBarrel((angle(tankpointx, tankpointy, mouse.x, mouse.y) + 360 + ((360 / mirrorBarrels) * n)) % 360, parseFloat(validateField(document.getElementById("offsetx").value, 0, true)), parseFloat(validateField(document.getElementById("offset").value, 0, true)), parseFloat(validateField(document.getElementById("width").value, 1)), parseFloat(validateField(document.getElementById("length").value, 1)), 0.5, true, btype, document.getElementById("barrellImage").value, document.getElementById("barrellcolor").value);
                //Draw a ghosted barrel while in edit mode above the normal barrels.
            }
        }
    }
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
    var rangle = angle(tankpointx, tankpointy, mouse.x, mouse.y) + 360;

    if (shiftheld === true) {
        rangle -= rangle % (document.getElementById("increment").value);
    }
    var btype = 0;

    if (document.getElementById("bullet").value === "trap") {
        btype = 1;
    } else if (document.getElementById("bullet").value === "drone") {
        btype = 2;
    } else if (document.getElementById("bullet").value === "necro") {
        btype = 3;
    } else if (document.getElementById("bullet").value === "auto") {
        btype = 4;
    }

    for (var n = 1; n <= mirrorBarrels; n += 1) {
        barrels[barrels.length] = new Barrel((rangle + 360 + ((360 / mirrorBarrels) * n)) % 360, btype, parseFloat(validateField(document.getElementById("size").value - 10, 5, false)), parseFloat(validateField(document.getElementById("speed").value, 1, false)) / 10, parseFloat(validateField(document.getElementById("time").value * 60, 180, false)));
    }
}

function keyDownHandler(e) {
    "use strict";
    if ((e.keyCode === 65) || (e.keyCode === 37)) {
        input.right = true;
    }
    if ((e.keyCode === 68) || (e.keyCode === 39)) {
        input.left = true;
    }
    if ((e.keyCode === 87) || (e.keyCode === 38)) {
        input.up = true;
    }
    if ((e.keyCode === 83) || (e.keyCode === 40)) {
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
    if (e.keyCode === 70) {
        input.f = true;
    }
    if (editmode === true) {
        if (e.keyCode === 90) {
            undo();
        }
        if (e.keyCode === 88) {
            redo();
        }
        if (e.keyCode === 79) {
            mirrorBarrels += 1;
        }
        if ((e.keyCode === 80) && (mirrorBarrels > 1)) {
            mirrorBarrels -= 1;
        }
    }
}

function keyUpHandler(e) {
    "use strict";
    if ((e.keyCode === 65) || (e.keyCode === 37)) {
        input.right = false;
    }
    if ((e.keyCode === 68) || (e.keyCode === 39)) {
        input.left = false;
    }
    if ((e.keyCode === 87) || (e.keyCode === 38)) {
        input.up = false;
    }
    if ((e.keyCode === 83) || (e.keyCode === 40)) {
        input.down = false;
    }
    if (e.keyCode === 16) {
        shiftheld = false;
    }
    if (e.keyCode === 70) {
        input.f = false;
    }
}

function mousemove(e) {
    if (autospin === false) {
        mouse.x = e.pageX - c.offsetLeft;
        mouse.y = e.pageY - c.offsetTop;
    }
}

function mousedown(e) {
    if (e.button === 0) {
        mouse.held = true;
    } else {
        mouse.rightdown = true;
    }
}

function mouseup(e) {
    if (e.button === 0) {
        mouse.held = false;
    } else {
        mouse.rightdown = false;
    }
}

function undo() {
    if (barrels.length > 0) {
        undos[undos.length] = barrels[barrels.length - 1];
        barrels.splice(barrels.length - 1, 1);
    }
}

function redo() {
    if (undos.length > 0) {
        barrels[barrels.length] = undos[undos.length - 1];
        undos.splice(undos.length - 1, 1);
    }
}

//Set colour functions. Used in presets
function setColor(color) {
    document.getElementById("color").value = color;
}

//Set colour functions. Used in presets
function setBarrellColor(color) {
    document.getElementById("barrellcolor").value = color;
}

//Set colour functions. Used in presets
function setBulletColor(color) {
    document.getElementById("bulletColor").value = color;
}

function setSColor(scolo) {
    document.getElementById("scolo").value = scolo;
}

document.addEventListener("mousemove", mousemove, false);
document.addEventListener("mousedown", mousedown, false);
document.addEventListener("mouseup", mouseup, false);
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
window.oncontextmenu = function () {
    return false;
};

function onload() {
    var drawtimer = setInterval(drawManager, 100 / 30);
}
