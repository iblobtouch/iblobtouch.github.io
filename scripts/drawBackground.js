function drawStuff() {
	ctx.clearRect(0, 0, c.width, c.height);
	ctx.clearRect(0, 0, c.width, c.height);
	lines = {};
	lines.v = 0;
	lines.h = 0;
	ctx.strokeStyle = "#C1C1C1";
	for (lines.h = 0; lines.h <= c.height / 26 + 2; lines.h += 1) {
		ctx.beginPath();
		ctx.moveTo(0, lines.h * 26 + offset.y);
		ctx.lineTo(c.width, lines.h * 26 + offset.y);
		ctx.stroke();
	}
	for (lines.v = 0; lines.v <= c.width / 26 + 2; lines.v += 1) {
		ctx.beginPath();
		ctx.moveTo(lines.v * 26 + offset.x, 0);
		ctx.lineTo(lines.v * 26 + offset.x, c.height);
		ctx.stroke();
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
}

function resize() {
	c.width = window.innerWidth;
	c.height = window.innerHeight;
	drawStuff();
}
resize();

window.onresize = resize;
