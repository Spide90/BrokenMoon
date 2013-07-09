#pragma strict

var associatedHealth : Health;

var redBar : GUITexture;
var greenBar : GUITexture;

function Start() {
	var player = FindObjectOfType(PlayerControl);
	associatedHealth = player.GetComponent(Health);
	var redBarColor : Color = redBar.color;
	redBarColor.a = 0;
	redBar.color = redBarColor;
	var greenBarColor : Color = greenBar.color;
	greenBarColor.a = 1;
	greenBar.color = greenBarColor;
}

function OnGUI() {
	if (!associatedHealth) {
		var player = FindObjectOfType(PlayerControl);
		associatedHealth = player.GetComponent(Health);
		Debug.Log(associatedHealth);
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