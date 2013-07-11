#pragma strict

var delay : float = 0;
var interval : float = 3;
var blinkDuration : float = 0.7;

var lensFlareIntensity : float = 1;
private var baseIntensity : float;

function Start () {
	baseIntensity = light.intensity;
}

function Update () {
	var sTime : float = (Time.time - delay) % interval;
	var up : float = Mathf.SmoothStep(0, 1, sTime / (blinkDuration/2));
	var down : float = Mathf.SmoothStep(1, 0, (sTime-blinkDuration/2) / (blinkDuration/2));
	var result = Mathf.Min(up, down);
	light.intensity = result * baseIntensity;
	var lf = light.GetComponent(LensFlare);
	if (lf) {
		lf.brightness = result * lensFlareIntensity;
	}
}