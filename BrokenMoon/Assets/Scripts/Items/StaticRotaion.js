#pragma strict

var speed : float;

function Update () {
	transform.RotateAround(transform.position, Vector3(1, 1, 1), speed * Time.deltaTime);
}