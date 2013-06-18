#pragma strict
var leadsTo : String;

function OnTriggerEnter(col:Collider) {
	if (col.transform.GetComponent(PlayerControl)) {
		Application.LoadLevel (leadsTo);
	}
}