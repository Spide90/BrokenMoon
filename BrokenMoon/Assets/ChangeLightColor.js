#pragma strict

var newColor : Color = Color.green;

function changeColor() {
	var lights = GetComponentsInChildren(Light);
	for (var lgt : Light in lights) {
		lgt.color = newColor;
	}
}