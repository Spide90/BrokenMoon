#pragma strict

var debugText : String = "Hello world";

private var initialScale : Vector3;
private var scaleFactor : float = 1;
var touchIncrement : float = 0.02;
var touchFactor : float = 1.1;
var color : Color;
var pressColor : Color;
enum ButtonState {None, Hover, Pressed};
var buttonState : ButtonState = ButtonState.None;
private var alreadyPressed = false;
var mainCam : GameObject;
var newLevel : String;


var lightChanger : ChangeLightColor;

function Start () {
	initialScale = transform.localScale;
}

function Update() {
	if (Input.GetAxis("Start")) {
		if (!alreadyPressed) {
		alreadyPressed = true;
		lightChanger.changeColor();
		mainCam.animation.Play();
		buttonState = ButtonState.None;
	}
	}
	switch (buttonState) {
	case ButtonState.None:
		scaleFactor = Mathf.Clamp(scaleFactor - touchIncrement, 1, touchFactor);
		break;
	case ButtonState.Hover:
		scaleFactor = Mathf.Clamp(scaleFactor + touchIncrement, 1, touchFactor);
		break;
	}
	if (buttonState == ButtonState.Pressed) {
		renderer.material.color = Color.Lerp(renderer.material.color, pressColor, 0.2);
	} else {
		renderer.material.color = Color.Lerp(renderer.material.color, color, 0.2);
	}
	transform.localScale = initialScale * scaleFactor;
}

function OnMouseEnter() {
	buttonState = ButtonState.Hover;
}

function OnMouseExit() {
	if (buttonState != ButtonState.Pressed) {
		buttonState = ButtonState.None;
	}
}

function OnMouseDown() {
	buttonState = ButtonState.Pressed;
}

function OnMouseUpAsButton() {
	if (!alreadyPressed) {
		alreadyPressed = true;
		lightChanger.changeColor();
		mainCam.animation.Play();
		buttonState = ButtonState.None;
	}
}

function ChangeLevel() {
	PlayerPrefs.SetInt("GamePad", 1);
	Application.LoadLevel(newLevel);
}