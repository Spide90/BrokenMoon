#pragma strict

private var target : Transform;
private var fired : boolean = false;

function setTarget(target : Transform) {
	this.target = target;
	Destroy(gameObject, 10);
	fired = true;
	var particleSystem : ParticleSystem = GetComponentInChildren(ParticleSystem);
	particleSystem.enableEmission = true;
}

function Update () {
	if (fired) {
		transform.LookAt(target);
		rigidbody.AddForce(transform.forward * 500);
	}
}