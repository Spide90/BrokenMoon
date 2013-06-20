#pragma strict

var leadsTo : String;
var gamePad : boolean;

function Start() {
	var player = FindObjectOfType(PlayerControl);
	
	var playerControl : PlayerControl;
	playerControl = player.GetComponent(PlayerControl); 
  	playerControl.enabled = false;
  	
  	var radar : Radar;
  	radar = player.GetComponent(Radar); 
  	radar.enabled = false;
  	
  	var guiInventory : GUIInventory;
  	guiInventory = player.GetComponent(GUIInventory); 
  	guiInventory.enabled = false;
}


function OnGUI() {
	if (GUI.Button(Rect(Screen.width/2, Screen.height/2, Screen.width/15, Screen.height/15), "Start")) {
		if (gamePad) {
			PlayerPrefs.SetInt("GamePad", 1);
		} else {
			PlayerPrefs.SetInt("GamePad", 0);
		}
		Application.LoadLevel(leadsTo);
	}
	gamePad = GUI.Toggle(Rect(Screen.width/2, Screen.height/4, Screen.width/10, Screen.height/15), gamePad, "GamePad");
}