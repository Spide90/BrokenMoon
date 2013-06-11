#pragma strict
var leadsTo : String;

function OnTriggerEnter(col:Collider) {
	if (col.transform.parent.GetComponent(PlayerControl)) {
		Application.LoadLevel (leadsTo);
	}
}