#pragma strict

var leadsTo : String;

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
		Application.LoadLevel(leadsTo);
	}
}