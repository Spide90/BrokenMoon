#pragma strict

private var offset : Vector3;
var target : Transform;

function Start () {
	offset = transform.position - target.position;
}

function Update () {
	transform.position = target.position + offset;
}