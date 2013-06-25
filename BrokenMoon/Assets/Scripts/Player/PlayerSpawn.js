#pragma strict

function Start () {
	var player = FindObjectOfType(PlayerControl);
	player.transform.position = transform.position;
	player.transform.rotation = transform.rotation;
	
	var playerControl : PlayerControl;
	playerControl = player.GetComponent(PlayerControl); 
  	playerControl.enabled = true;
  	
  	var radar : MyRadar;
  	radar = player.GetComponent(MyRadar); 
  	radar.enabled = true;
  	
  	var guiInventory : GUIInventory;
  	guiInventory = player.GetComponent(GUIInventory); 
  	guiInventory.enabled = true;
  	
  	for (var child : Transform in player.transform) {
  		if (child.GetComponent(Shoot)) {
  			child.GetComponent(Shoot).enabled = true;
  		}
  	}
	
	player.rigidbody.velocity = Vector3.zero;
	player.rigidbody.angularVelocity = Vector3.zero;
}