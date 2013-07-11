#pragma strict

function Start () {
	rigidbody.AddRelativeForce(Vector3.forward * 150);
}

function Update () {
	//simple forward move for bullet
	//transform.Translate(Vector3.forward * 50 * Time.deltaTime);
	//collider.Move(Vector3.forward * 50 * Time.deltaTime);
	//Debug.Log(renderer.isVisible);
}