#pragma strict

var newColor : Color = Color.green;
var newLensFlareColor : Color = Color.green;

function changeColor() {
	var lights = GetComponentsInChildren(Light);
	for (var lgt : Light in lights) {
		lgt.color = newColor;
		var lf = lgt.GetComponent(LensFlare);
		if (lf) {
			lf.color = newLensFlareColor;
		}
	}
}