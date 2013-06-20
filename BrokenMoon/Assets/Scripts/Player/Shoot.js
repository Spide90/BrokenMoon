#pragma strict

var projectile : Rigidbody;

function Start () {

}

function Update () {
	//wait for LMB
	if (Input.GetButtonDown("Fire1")) {
		//create a bullet 
		var instance : Rigidbody = Instantiate(projectile, transform.position, transform.rotation);
		Physics.IgnoreCollision(transform.parent.collider, instance.collider);
		instance.AddForce(instance.transform.forward * 2000 * Time.deltaTime);
		Destroy(instance.gameObject, 3);
	}
}