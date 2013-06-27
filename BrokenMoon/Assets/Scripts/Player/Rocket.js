#pragma strict

var rocket : Rigidbody;
var speed : float;
var reloadTime : float;

private var available : boolean = false;
private var lastShot : float = 0;
private var rocketInstance : Rigidbody;

function Start() {
}

function rocketAvailable() : boolean {
	return available;
}	

function shoot(target : Transform) {
	if (available) {
		var enemies : GameObject[] = GameObject.FindGameObjectsWithTag("Enemy");
		var closest : GameObject; 
		if (!target) {
			var distance = Mathf.Infinity; 
			var position = transform.position; 
			for (var enemy : GameObject in enemies)  { 
				var diff = (enemy.transform.position - position);
				var curDistance = diff.sqrMagnitude; 
				if (curDistance < distance) { 
					closest = enemy; 
					distance = curDistance; 
				} 
			}
		} else {
			closest = target.gameObject;
		}
		rocketInstance.transform.parent = null;
		rocketInstance.rigidbody.isKinematic = false;
		rocketInstance.rigidbody.AddForce(transform.forward * 500);
		var instance : RocketMove = rocketInstance.transform.GetComponent(RocketMove);
		instance.setTarget(closest.transform);
		rocketInstance = null;
		lastShot = Time.time;
		available = false;
	}
}
	
function Update() {
	if ((Time.time >= lastShot + reloadTime) && !rocketInstance) {
		available = true;
		rocketInstance = Instantiate(rocket, Vector3.zero, transform.rotation);
		Physics.IgnoreCollision(rocketInstance.collider, transform.parent.collider);
		rocketInstance.transform.parent = transform;
		rocketInstance.transform.localPosition = Vector3.zero;
		rocketInstance.transform.parent = transform.parent;
	}
}