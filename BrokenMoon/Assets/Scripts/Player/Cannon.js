#pragma strict

var projectile : Rigidbody;

function shoot() {
	//create a bullet 
	audio.Play();
	var instance : Rigidbody = Instantiate(projectile, transform.position, transform.rotation);
	instance.AddForce(instance.transform.forward * 50000 * Time.deltaTime);
	Destroy(instance.gameObject, 3);
}