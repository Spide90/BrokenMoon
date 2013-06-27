#pragma strict

private var target : Transform;

function Update () {
	//wait for LMB
	if (Input.GetButtonDown("Fire1")) {
		var cannons : Component[] = GetComponentsInChildren(typeof(Cannon));
		for (var cannon : Cannon in cannons) {
			cannon.shoot();
		}
	}
	if (Input.GetButtonDown("Fire2")) {
		var rockets : Component[] = GetComponentsInChildren(typeof(Rocket));
		for (var rocket : Rocket in rockets) {
			if (rocket.rocketAvailable()) {
				rocket.shoot(target);
				return;
			}
		}
	}
}

function setTarget(target : Transform) {
	this.target = target;
}