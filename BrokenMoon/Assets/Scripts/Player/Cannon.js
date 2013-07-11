#pragma strict

var projectile : Rigidbody;

function shoot() {
	//create a bullet 
	audio.Play();
	var instance : Rigidbody = Instantiate(projectile, transform.position, transform.rotation);
	Physics.IgnoreCollision(transform.parent.collider, instance.collider);
	instance.AddForce(instance.transform.forward * 50000 * Time.deltaTime);
	Destroy(instance.gameObject, 3);
}