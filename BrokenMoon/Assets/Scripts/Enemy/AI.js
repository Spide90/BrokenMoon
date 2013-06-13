#pragma strict

enum AIState {Idle, Aware, Attacking};

var player : PlayerControl;
var speed : float = 100;
var turnRate : float = 5;
var state : AIState;
var signalRange : float = 50;
var attackRange : float = 25;
var shootIntervall : float = 1;

function Start () {
	player = FindObjectOfType(PlayerControl);
}

function aiIdle() {
	transform.velocity = Vector3.zero;
}

function aiAware() {
	var rotation = Quaternion.LookRotation();
	var randomTurn : float = Random.Range(-20, 20);
	rotation.Euler(0, randomTurn, 0);
	transfom.rotation = rotation;
	transform.translate(Vector3.Forward * speed);
}

function aiAttacking() {
	var rotation = Quaternion.LookRotation();
	transform.rotation = rotation;
	transform.translate(Vector3.Forward * speed);
	
}

function shoot() {
	var cannon = gameObject.GetComponentInChildren(Cannon);
	cannon.shoot();
}

function Update () {
	var distance = Vector3.magnitude(transform.position - player.transform.position);
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
}