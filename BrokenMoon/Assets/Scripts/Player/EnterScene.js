#pragma strict
var leadsTo : String;

function OnTriggerEnter(col:Collider) {
Debug.Log('trigger');
Debug.Log(col.gameObject);
Debug.Log(col.gameObject.tag);
	if (col.gameObject.tag == "Player") {
		Application.LoadLevel (leadsTo);
	}
}