#pragma strict

var projectile : Rigidbody;

function shoot() {
	var instance : Rigidbody = Instantiate(projectile, transform.position, transform.rotation);
	projectile.AddRelativeForce(gameObject.transform.forward * 2000);
	Destroy(instance.gameObject, 1);
}