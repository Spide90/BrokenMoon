#pragma strict

var flickerRange : float = 1.0;
var timeScale : float = 1.0;
var seed : int = 1234;

private var baseIntensity : float;

function Start () {
	baseIntensity = light.intensity;
}

function Update () {
	light.intensity = baseIntensity + flickerRange * Mathf.PerlinNoise(Time.time * timeScale + seed, Time.time * timeScale + seed);
}