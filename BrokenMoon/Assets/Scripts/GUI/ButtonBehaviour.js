#pragma strict

var debugText : String = "Hello world";

private var initialScale : Vector3;
private var touched : boolean = false;
private var pressed : boolean = false;
private var scaleFactor : float = 1;
var touchIncrement : float = 0.02;
var touchFactor : float = 1.1;
var color : Color;
var pressColor : Color;

function Start () {
	initialScale = transform.localScale;
}

function Update() {
	if (touched) {
		scaleFactor += touchIncrement;
		if (scaleFactor > touchFactor) scaleFactor = touchFactor;
	} else {
		scaleFactor -= touchIncrement;
		if (scaleFactor < 1) scaleFactor = 1;
	}
	if (pressed) {
		renderer.material.color = pressColor;
		Debug.Log("asdf");
		Application.LoadLevel("DemoScene");
	} else {
		renderer.material.color = color;
	}
	transform.localScale = initialScale * scaleFactor;
}

function OnMouseEnter() {
	touched = true;
}

function OnMouseExit() {
	touched = false;
	pressed = false;
}

function OnMouseDown() {
	pressed = true;
}

function OnMouseUpAsButton() {
	Debug.Log("ACTION");
	pressed = false;
}