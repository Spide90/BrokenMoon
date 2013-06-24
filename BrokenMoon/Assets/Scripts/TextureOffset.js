#pragma strict

var speed : Vector2;

function Update () {
	//renderer.material.mainTextureOffset.x += speed.x * Time.deltaTime;
	renderer.material.mainTextureOffset += speed * Time.deltaTime;
}