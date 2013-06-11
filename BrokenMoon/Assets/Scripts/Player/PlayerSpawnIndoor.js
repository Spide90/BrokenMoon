#pragma strict

function Start () {
	var player = FindObjectOfType(PlayerControl);
	player.transform.position = transform.position;
	player.transform.rotation = transform.rotation;
	
	var playerControl : PlayerControl;
	playerControl = player.GetComponent(PlayerControl); 
  	playerControl.enabled = false;
  	
  	var radar : Radar;
  	radar = player.GetComponent(Radar); 
  	radar.enabled = false;
  	
  	var guiInventory : GUIInventory;
  	guiInventory = player.GetComponent(GUIInventory); 
  	guiInventory.enabled = false;
  	
  	 for (var child : Transform in player.transform) {
  		if (child.GetComponent(Shoot)) {
  			child.GetComponent(Shoot).enabled = false;
  		}
  	}
	
	player.rigidbody.velocity = Vector3.zero;
	player.rigidbody.angularVelocity = Vector3.zero;
}