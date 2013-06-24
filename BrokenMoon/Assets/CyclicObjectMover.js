#pragma strict

private var startPosition : Vector3;
var speed : float = 1.0;
var direction : Vector3 = Vector3(0, 0, 1);
var distance : float = 27.0;
var startDelay : float = 3.0;
private var startTime : float;

function Start () {
	startPosition = transform.position;
	startTime = Time.time;
}

function Update () {
	if (startTime + startDelay > Time.time) return;
	
	transform.position += direction * speed * Time.deltaTime;
	if ((transform.position-startPosition).magnitude > distance) {
		transform.position = startPosition;
	}
}