#pragma strict

var around : Vector3 = Vector3(1, 0, 0);
var speed : float = 5.0;

function Start () {

}

function Update () {
	transform.Rotate(around * speed * Time.deltaTime);
}