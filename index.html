<!DOCTYPE html>
<html lang="en">
	<title>Fantasy Tank Builder</title>
	<head>
		<link rel="stylesheet" href="normalize.css" />
		<link rel="stylesheet" href="styles.css" />
		<link href="https://fonts.googleapis.com/css?family=Ubuntu" rel="stylesheet" />
		<link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
		<!--If you remove the following line, the code might break in some browsers.-->
		<meta charset="utf8" />
		<meta name="description" content="Build a fantasy diep.io tank! Made by iblobtouch on Github." />
		<meta name="keywords" content="diep.io,tank,ftb,fantasy tank,io" />
		<meta name="author" content="iblobtouch" />
	</head>
	<body onload="onload()">
		<noscript>
			<div id="noscript">
				<h1>
					The tank editor requires JavaScript to work. Please turn it on to get rid of this message. You can learn how to re-enable JavaScript <a href="//enable-javascript.com/">here</a>.
				</h1>
			</div>
		</noscript>
		<canvas id="game"></canvas>
		<script src="scripts/globals.js"></script>
		<script src="scripts/drawBackground.js"></script>
		<script src="scripts/drawGraphics.js"></script>
		<script src="scripts/gameController.js"></script>
		
		<p id="watermark">Play at iblobtouch.github.io!</p>
		
		<button id="editbutton" onclick="editButtonClick()">Edit Mode</button>
		<button id="infobutton" onclick="infoClick()">ⓘ</button>
		<div class="spawn">
			<input type="checkbox" value="None" id="spawn" name="check" />
			<label for="spawn">⬟</label>
		</div>
		<button class="editbuttons" id="settingsbutton" onclick="settingsClick()">⚙</button>
		<button class="editbuttons" id="bodybutton" onclick="bodyClick()">Body/Color</button>
		<button class="editbuttons" id="barrelbutton" onclick="barrelClick()">Barrel</button>
		<button class="editbuttons" id="bulletbutton" onclick="bulletClick()">Bullet</button>
		<button class="editbuttons" id="savebutton" onclick="saveClick()">Export/Import</button>
		<button class="editbuttons" id="undobutton" onclick="undo()">⟲ Undo</button>
		<button class="editbuttons" id="redobutton" onclick="redo()">Redo ⟳</button>
		
		<!-- Info menu -->
		<p class="editbuttons infosettings infomation">Press the edit mode button to edit the tank. <br /> Press <kbd>E</kbd> to autofire and <kbd>C</kbd> to autospin. <br /> Refresh the page to get a new tank. <br /> <kbd>Z</kbd>/<kbd>X</kbd> To undo/redo. <br /> <kbd>O</kbd>/<kbd>P</kbd> To Increase/decrease the number of barrels places at once. </p>
		
		<!-- Settings menu -->
		<p class="editbuttons settingssettings infomation warning">These options can break the game!<br /> None of the settings here will ever be saved to export.</p>

		<p class="editbuttons settingssettings pos5label"><b>Shape spawn rate </b><span data-tooltip="Specifies the rate that shapes spawn. Default: 120" class="info">ⓘ</span></p>
		<textarea class="editbuttons settingssettings pos5" id="shaperate" rows="1" cols="10" placeholder="0" data-tooltip="Specifies the rate that shapes spawn. Default: 120">120</textarea>
		
		<p class="editbuttons settingssettings pos6label"><b>Shift Increments </b><span data-tooltip="Specifies the increment you rotate the barrels while holding shift. Measured in degrees. Default: 15" class="info">ⓘ</span></p>
		<textarea class="editbuttons settingssettings pos6" id="increment" rows="1" cols="10" placeholder="0" data-tooltip="Specifies the increment you rotate the barrels while holding shift. Measured in degrees. Default: 15">15</textarea>

		<button class="editbuttons settingssettings pos7label" onclick="clearShapes()" >Clear Shapes</button>

		<button class="editbuttons settingssettings pos7" onclick="clearBullets()">Clear Bullets</button>

		<!-- Body menu -->
		<p class="editbuttons tanksettings pos1label"><b>Radius </b><span data-tooltip="Specifies the radius of the tank's main body." class="info">ⓘ</span></p>
		<textarea class="editbuttons tanksettings pos1" id="body" rows="1" cols="10" placeholder="0" data-tooltip="Specifies the radius of the tank's main body.">32</textarea>
		
		<p class="editbuttons tanksettings pos2label"><b>Body </b><span data-tooltip="Specifies the type of body that should be used." class="info">ⓘ</span></p>
		<select class="editbuttons tanksettings pos2" id="shape" data-tooltip="Specifies the type of body should be used.">
			<option value="circle">Circle</option> 
  			<option value="square">Square</option>
  			<option value="smasher">Smasher</option>
			<option value="spike">Spike</option>
			<option value="triangle">Triangle</option>
			<option value="pentagon">Pentagon</option>
			<option value="mothership">Mothership</option>
			<option value="landmine">Landmine</option>
			<option value="dominator">Dominator</option>
		</select>
		
     		<p class="editbuttons tanksettings pos3label"><b>Colour </b><span data-tooltip="Specifies what colour should be used for the tank and bullets." class="info">ⓘ</span></p>
		<input type="color" class="editbuttons tanksettings pos3" id="color" value="#00B2E1" data-tooltip="Specifies what colour should be used for the tank and bullets.">
		
		<input type="button" class="editbuttons tanksettings pos3 presetred" id="setcolorred" onclick="setColor('#F14E54')" title="Red Team" />
		<input type="button" class="editbuttons tanksettings pos3 presetblue" id="setcolorblue" onclick="setColor('#00B2E1')" title="Blue Team" />
		<input type="button" class="editbuttons tanksettings pos3 presetgreen" id="setcolorgreen" onclick="setColor('#00E16E')" title="Green Team" />
		<input type="button" class="editbuttons tanksettings pos3 presetpurple" id="setcolorpurple" onclick="setColor('#BF7FF5')" title="Purple Team" />
		<input type="button" class="editbuttons tanksettings pos3 presetyellow" id="setcoloryellow" onclick="setColor('#FFEB69')" title="Arena Closer/No Team" />
		<input type="button" class="editbuttons tanksettings pos3 presetlightgrey" id="setcolorlightgrey" onclick="setColor('#C0C0C0')" title="Fallen Tank" />
		<input type="button" class="editbuttons tanksettings pos3 presetpalered" id="setcolorpalered" onclick="setColor('#FC7677')" title="Defender" />
		<input type="button" class="editbuttons tanksettings pos3 presetviolet" id="setcolorviolet" onclick="setColor('#F177DD')" title="Protector of Pentagons" />
		<input type="button" class="editbuttons tanksettings pos3 presetgrey" id="setcolorgrey" onclick="setColor('#999999')" title="Barrel Grey" />
		<input type="button" class="editbuttons tanksettings pos3 presetdarkgrey" id="setcolordarkgrey" onclick="setColor('#555555')" title="Border Grey" />
		<input type="button" class="editbuttons tanksettings pos3 presetbrown" id="setcolorbrown" onclick="setColor('#D68165')" title="Brown Team(Removed)" />
		
		<p class="editbuttons tanksettings pos4label"><b>Invisibility </b><span data-tooltip="Toggles fadeout invisibility for tanks. WARNING: Does not save to export. Yet." class="warninginfo">ⓘ</span></p>
		<div class="editbuttons tanksettings pos4 toggle">
			<input type="checkbox" value="None" id="invis" name="check" />
			<label for="invis"></label>
		</div>
		
		<p class="editbuttons tanksettings pos5label"><b>Drone Limit </b><span data-tooltip="Specifies the maximum number of drones that can be on screen. WARNING: Does not save to export. Yet." class="warninginfo">ⓘ</span></p>
		<textarea class="editbuttons tanksettings pos5" id="drones" rows="1" cols="10" placeholder="0" data-tooltip="Specifies the maximum number of drones that can be on screen. WARNING: Does not save to export. Yet.">8</textarea>
		
		<p class="editbuttons tanksettings pos6label"><b>Necro Limit </b><span data-tooltip="Specifies the maximum number of Necromancer type drones that can be on screen. WARNING: Does not save to export. Yet." class="warninginfo">ⓘ</span></p>
		<textarea class="editbuttons tanksettings pos6" id="necrodrones" rows="1" cols="10" placeholder="0" data-tooltip="Specifies the maximum number of Necromancer type drones that can be on screen. WARNING: Does not save to export. Yet.">16</textarea>
		
		<p class="editbuttons tanksettings pos7label"><b>Body Damage </b><span data-tooltip="Specifies the damage the body of the tank does to a shape on collision. WARNING: Does not save to export. Yet." class="warninginfo">ⓘ</span></p>
		<textarea class="editbuttons tanksettings pos7" id="bodydamage" rows="1" cols="10" placeholder="0" data-tooltip="Specifies the damage the body of the tank does to a shape on collision. WARNING: Does not save to export. Yet.">50</textarea>
		
		<!-- Barrel menu -->
		<p class="editbuttons barrelsettings pos1label" id="traplabel"><b>Barrel </b><span data-tooltip="Specifies what type of barrel you want to place." class="info">ⓘ</span></p>
		<select class="editbuttons barrelsettings pos1" id="bullet" data-tooltip="Specifies what type of barrel you want to place.">
			<option value="bullet">Gun</option> 
  			<option value="trap">Trap Layer</option>
  			<option value="drone">Drone Maker</option>
			<option value="necro">Necro Drone Maker</option>
			<option value="auto">Auto Turret</option>
		</select>
		
		<p class="editbuttons barrelsettings pos2label"><b>Can Shoot? </b><span data-tooltip="Toggles this cannon's ability to shoot." class="info">ⓘ</span></p>
		<div class="editbuttons barrelsettings pos2 toggle" style="visibility: hidden;">
			<input type="checkbox" value="None" id="disable" name="check" checked="" />
			<label for="disable"></label>
		</div>
		
		<p class="editbuttons barrelsettings pos3label"><b>Width </b><span data-tooltip="Specifies the width of the cannon." class="info">ⓘ</span></p>
		<textarea class="editbuttons barrelsettings pos3" id="width" rows="1" cols="10"  placeholder="0" data-tooltip="Specifies the width of the cannon.">25</textarea>
		
		<p class="editbuttons barrelsettings pos4label"><b>Length </b><span data-tooltip="Specifies the length of the cannon." class="info">ⓘ</span></p>
		<textarea class="editbuttons barrelsettings pos4" id="length" rows="1" cols="10"  placeholder="0" data-tooltip="Specifies the length of the cannon.">65</textarea>
		
		<p class="editbuttons barrelsettings pos5label"><b>X Offset </b><span data-tooltip="Specifies the distance above or below the center. Negative values moves to the right, positive to the left." class="info">ⓘ</span></p>
		<textarea class="editbuttons barrelsettings pos5" id="offset" rows="1" cols="10"  placeholder="0" data-tooltip="Specifies the distance above or below the center. Negative values moves to the right, positive to the left.">0</textarea>
		
		<p class="editbuttons barrelsettings pos6label"><b>Y Offset </b><span data-tooltip="Specifies the distance from the center of the tank. Negative values moves down, positive moves up." class="info">ⓘ</span></p>
		<textarea class="editbuttons barrelsettings pos6" id="offsetx" rows="1" cols="10"  placeholder="0" data-tooltip="Specifies the distance from the center of the tank. Negative values moves down, positive moves up.">0</textarea>
		
		<p class="editbuttons barrelsettings pos7label"><b>Reload </b><span data-tooltip="Specifies the time it takes to fire again, in seconds." class="info">ⓘ</span></p>
		<textarea class="editbuttons barrelsettings pos7" id="reload" rows="1" cols="10"  placeholder="0" data-tooltip="Specifies the time it takes to fire again, in seconds.">2</textarea>
		
		<p class="editbuttons barrelsettings pos8label"><b>Recoil </b><span data-tooltip="Specifies how much recoil/knockback this cannon gives." class="info">ⓘ</span></p>
		<textarea class="editbuttons barrelsettings pos8" id="knockback" rows="1" cols="10"  placeholder="0" data-tooltip="Specifies how much recoil/knockback this cannon gives.">0</textarea>
		
		<p class="editbuttons barrelsettings pos9label"><b>Spread </b><span data-tooltip="Specifies the accuracy of this cannon in degrees. 0=Fires in a straight line. 360=fires randomly in any direction. Recommended values are between 0-30." class="info">ⓘ</span></p>
		<textarea class="editbuttons barrelsettings pos9" id="spread" rows="1" cols="10"  placeholder="0" data-tooltip="Specifies the accuracy of this cannon in degrees. 0=Fires in a straight line. 360=fires randomly in any direction. Recommended values are between 0-30.">0</textarea>
		
		<p class="editbuttons barrelsettings pos10label"><b>Delay </b><span data-tooltip="Specifies the delay before the cannon can first fire." class="info">ⓘ</span></p>
		<textarea class="editbuttons barrelsettings pos10" id="basedelay" rows="1" cols="10"  placeholder="0" data-tooltip="Specifies the delay before the cannon can first fire.">0</textarea>
		
		<!-- Bullet menu -->
		<p class="editbuttons bulletsettings pos1label"><b>Bullet Size </b><span data-tooltip="Specifies the size of the projectiles this cannon fires." class="info">ⓘ</span></p>
		<textarea class="editbuttons bulletsettings pos1" id="size" rows="1" cols="10"  placeholder="0" data-tooltip="Specifies the size of the projectiles this cannon fires.">15</textarea>
		
		<p class="editbuttons bulletsettings pos2label"><b>Bullet Speed </b><span data-tooltip="Specifies the speed of the projectiles this cannon fires." class="info">ⓘ</span></p>
		<textarea class="editbuttons bulletsettings pos2" id="speed" rows="1" cols="10"  placeholder="0" data-tooltip="Specifies the speed of the projectiles this cannon fires.">50</textarea>
		
		<p class="editbuttons bulletsettings pos3label"><b>Bullet Lifespan </b><span data-tooltip="Specifies the lifetime of the projectiles this cannon fires. Does not effect drones. Value is in seconds." class="info">ⓘ</span></p>
		<textarea class="editbuttons bulletsettings pos3" id="time" rows="1" cols="10"  placeholder="0" data-tooltip="Specifies the lifetime of the projectiles this cannon fires. Does not effect drones. Value is in seconds.">1</textarea>
		
		<p class="editbuttons bulletsettings pos4label"><b>Bullet Damage </b><span data-tooltip="Specifies the damage of the bullets this cannon fires. Squares=100HP  Triangles=300HP  Pentagons=1400HP" class="info">ⓘ</span></p>
		<textarea class="editbuttons bulletsettings pos4" id="damage" rows="1" cols="10"  placeholder="0" data-tooltip="Specifies the damage of the bullets this cannon fires. Squares=100HP  Triangles=300HP  Pentagons=1400HP">65</textarea>
		
		<p class="editbuttons bulletsettings pos5label"><b>Toggle Inherit </b><span data-tooltip="Toggles if these values are used by the barrel or not. Uncheck to use these values. If left checked, these values will automatically be generated by the editor." class="info">ⓘ</span></p>
		<div class="editbuttons bulletsettings pos5 toggle" style="visibility: hidden;">
			<input type="checkbox" value="None" id="use" name="check" checked="" />
			<label for="use"></label>
		</div>
		
		<!-- Save menu -->
		<button class="editbuttons savesettings pos1label" onclick="printObject()" >Export tank</button>
		<button class="editbuttons savesettings pos2label" onclick="importObject()" >Import tank</button>
		<button class="editbuttons savesettings pos4label warning" onclick="clearObject()" >Clear Tank</button>
		<textarea class="editbuttons savesettings pos1 textexport" id="save" placeholder="Save Codes go here..."></textarea>
		
		<p class="editbuttons" id="notes"><kbd>Q</kbd> to place barrels. Barrels place in order of last placed to first. <br /> <kbd>F</kbd> to remove barrels. WARNING: Removes all barrels within 1° at once! <br /> Hold <kbd>Shift</kbd> to align in 15° increments. Red line determines front of tank. <br /> <kbd>Ctrl</kbd> + Scroll Wheel to adjust zoom (limited in some browsers). <br /> Alternatively, try <kbd>Ctrl</kbd> + <kbd>+</kbd> to zoom in, and <kbd>Ctrl</kbd> + <kbd>-</kbd> to zoom out. <br /> Click outside of textboxes before placing or removing barrels. </p>
	</body>
</html>
