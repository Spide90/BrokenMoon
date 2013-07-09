#pragma strict

private var releaseTime = 0;
private var direction : Vector3;

function OnTriggerEnter(collider : Collider) {
	if (collider.gameObject.tag == "Bullet") {
		transform.parent = null;
		rigidbody.isKinematic = false;
		//direction = (transform.position - collider.transform.position).normalized;
		releaseTime = Time.time;
	}
}

function FixedUpdate() {
	if (transform.parent == null && releaseTime + 3 > Time.time) {
		rigidbody.AddForce(transform.up * 3);
	}
}