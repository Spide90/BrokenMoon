#pragma strict

function Start () {
}

function Update () {
	//simple forward move for bullet
	transform.Translate(Vector3.forward * 20 * Time.deltaTime);
}