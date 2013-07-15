#pragma strict

var projectile : Rigidbody;
var projectileSpeed : int = 9001;

function shoot() {
	//create a bullet 
	audio.Play();
	var instance : Rigidbody = Instantiate(projectile, transform.position, transform.rotation);
	instance.AddForce(instance.transform.forward * projectileSpeed * Time.deltaTime);
	Destroy(instance.gameObject, 3);
}