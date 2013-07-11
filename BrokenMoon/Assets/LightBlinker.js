#pragma strict

var delay : float = 0;
var interval : float = 3;
var blinkDuration : float = 0.7;

private var baseIntensity : float;

function Start () {
	baseIntensity = light.intensity;
}

function Update () {
	var sTime : float = (Time.time - delay) % interval;
	var up : float = Mathf.SmoothStep(0, baseIntensity, sTime / (blinkDuration/2));
	var down : float = Mathf.SmoothStep(baseIntensity, 0, (sTime-blinkDuration/2) / (blinkDuration/2));
	var result = Mathf.Min(up, down);
	light.intensity = result;
}