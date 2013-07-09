#pragma strict

private var clipTime = 10;

function Update () {
	if (Time.time > clipTime) {
		Application.LoadLevel("StartScene");
	}
}