#pragma strict

var leadsTo : String;

function OnGUI() {
	if (GUI.Button(Rect(0, 0, Screen.width/15, Screen.height/15), "Launch")) {
		Application.LoadLevel(leadsTo);
	}
}