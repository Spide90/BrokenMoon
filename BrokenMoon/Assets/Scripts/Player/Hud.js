#pragma strict

var associatedHealth : Health;

var redBar : GUITexture;
var greenBar : GUITexture;

function Start() {
	associatedHealth = FindObjectOfType(PlayerControl) as Health;
	var redBarColor : Color = redBar.color;
	redBarColor.a = 0;
	redBar.color = redBarColor;
	var greenBarColor : Color = greenBar.color;
	greenBarColor.a = 1;
	greenBar.color = greenBarColor;
}

function OnGUI() {
	if (!associatedHealth) {
		associatedHealth = FindObjectOfType(PlayerControl) as Health;
	} else {
		var healthPercentage = associatedHealth.healthPercentage;
		var redBarColor : Color = redBar.color;
		redBarColor.a = 1 - healthPercentage;
		redBar.color = redBarColor;
		var greenBarColor : Color = greenBar.color;
		greenBarColor.a = healthPercentage;
		greenBar.color = greenBarColor;
	}
}