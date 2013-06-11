#pragma strict

var projectile : Rigidbody;

function Start () {

}

function Update () {
	//wait for LMB
	if (Input.GetButtonDown("Fire1")) {
		//create a bullet 
		var instance : Rigidbody = Instantiate(projectile, transform.position, transform.rotation);
		projectile.AddForce(gameObject.transform.forward * 2000);
		Destroy(instance.gameObject, 1);
	}
}