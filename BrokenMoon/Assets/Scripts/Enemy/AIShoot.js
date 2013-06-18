#pragma strict

var projectile : Rigidbody;

function shoot() {
	var instance : Rigidbody = Instantiate(projectile, transform.position, transform.rotation);
	projectile.AddForce(gameObject.transform.forward * 2000);
	Destroy(instance.gameObject, 1);
}