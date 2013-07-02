#pragma strict

function OnTriggerEnter(collider : Collider) {
	if (collider.gameObject.tag == "Bullet") {
		transform.parent = null;
		rigidbody.isKinematic = false;
	}
}