#pragma strict

enum AIState {Idle, Aware, Attacking};

var speed : float;
var turnRate : float;
var signalRange : float;
var attackRange : float;
var fireRate : float = 3;

private var lastShoot : float;
private var yAxis;
private var state : AIState;
private var player : PlayerControl;

function Start () {
	player = FindObjectOfType(PlayerControl);
	yAxis = transform.position.y;
}

function aiIdle() {
	rigidbody.velocity = Vector3.zero;
}

function aiAware() {
	transform.LookAt(Vector3(player.transform.position.x, transform.position.y, player.transform.position.z));
	
	var randomTurn : float = Random.Range(-20, 20);

	rigidbody.AddRelativeForce(Vector3.forward * speed);
}

function aiAttacking() {
	rigidbody.velocity = Vector3.zero;
	rigidbody.angularVelocity = Vector3.zero;
	transform.LookAt(Vector3(player.transform.position.x, transform.position.y, player.transform.position.z));
	if (Time.time > lastShoot) {
		shoot();
		lastShoot = Time.time + fireRate;
	}
}

function shoot() {
	var cannon = gameObject.GetComponentInChildren(AIShoot);
	cannon.shoot();
}

function Update () {
	var distance = (transform.position - player.transform.position).magnitude;
	if (distance < signalRange) {
		if (distance < attackRange) {
			state = AIState.Attacking;
		} else {
			state = AIState.Aware;
		}
	} else {
		state = AIState.Idle;
	}
	switch (state) {
		case AIState.Idle:
			aiIdle();
			break;
		case AIState.Aware:
			aiAware();
			break;
		case AIState.Attacking:
			aiAttacking();
			break;
	}
	transform.position.y = yAxis;
}