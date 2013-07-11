#pragma strict

var startColor : Color = Color.black;
var endColor : Color = Color.white;
var duration : float = 1;

private var fading : boolean = false;
private var startTime : float;
function Update () {
	if (fading) {
		var time = Mathf.Clamp01(Time.time - startTime);
		renderer.material.color = Color.Lerp(startColor, endColor, time / duration);
	}
}

function StartFading() {
	startTime = Time.time;
	fading = true;
}