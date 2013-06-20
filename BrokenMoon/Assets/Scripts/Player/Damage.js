#pragma strict

var damage : int;
var particles : Transform;

function OnTriggerEnter(col : Collider) {
	var health : Health;
	var emitterInstance = Instantiate(particles, transform.position, Quaternion.Inverse(transform.rotation));
	Destroy(emitterInstance.gameObject, emitterInstance.particleSystem.duration);
	
	if (col.gameObject.tag == "Player") {
		health = col.gameObject.GetComponent(Health);
		health.decreaseHealth(damage);
	}
	if (col.gameObject.tag == "Enemy") {
		health = col.gameObject.GetComponent(Health);
		health.decreaseHealth(damage);
	}
	Destroy(gameObject, 0);
}