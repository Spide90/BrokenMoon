#pragma strict

enum AIState {Idle, Aware, Attacking};

var speed : float;
var turnRate : float;
var signalRange : float;
var attackRange : float;
var fireRate : float = 3;

private var state : AIState;
private var lastShoot : float;
private var yAxis;
private var player : PlayerControl;
var targetLock : Texture2D;
private var cameraControl : CameraControl;

private var audioFly : AudioSource;
private var audioShoot : AudioSource;

function Start () {
	cameraControl = Camera.main.GetComponent(CameraControl);
	player = FindObjectOfType(PlayerControl);
	yAxis = transform.position.y;
	
	var sources = GetComponents(AudioSource);
	audioFly = sources[0];
	audioShoot	= sources[1];
}

function aiIdle() {
	rigidbody.velocity = Vector3.zero;
}

function aiAware() {
	//transform.LookAt(Vector3(player.transform.position.x, transform.position.y, player.transform.position.z));
	var targetRotation = Quaternion.LookRotation(Vector3(player.transform.position.x, transform.position.y, player.transform.position.z) - transform.position);
 
	transform.rotation = Quaternion.Slerp(transform.rotation, targetRotation, turnRate * Time.deltaTime);
	
	var randomTurn : float = Random.Range(-20, 20);

	rigidbody.AddRelativeForce(Vector3.forward * speed);
	if (!audioFly.isPlaying) {
		audioFly.Play();
	}
}

function aiAttacking() {
	transform.LookAt(Vector3(player.transform.position.x, transform.position.y, player.transform.position.z));
	if (Time.time > lastShoot) {
		shoot();
		lastShoot = Time.time + fireRate;
	}
}

function shoot() {
	var cannon = gameObject.GetComponentInChildren(AIShoot);
	cannon.shoot();
	audioShoot.Play();
}

function isChasing() : boolean {
	return state != AIState.Idle;
}

function Update () {
	var distance = (transform.position - player.transform.position).magnitude;
	if (distance < signalRange) {
		if (distance < attackRange) {
			state = AIState.Attacking;
		} else {
			if (state == AIState.Idle) {
				cameraControl.addEnemy(gameObject);
			}
			state = AIState.Aware;
		}
	} else {
		if (state == AIState.Aware) {
			cameraControl.deleteEnemy(gameObject);
		}
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

function OnMouseEnter() {
	//var screenPoint = Camera.main.WorldToScreenPoint(transform.position);
	//if(Event.current.type.Equals(EventType.Repaint))
		//Graphics.DrawTexture(Rect(screenPoint.x - 8, screenPoint.y - 8, 16, 16), targetLock);
	player.transform.GetComponent(Shoot).setTarget(this.transform);
}

function OnMouseExit() {
	player.transform.GetComponent(Shoot).setTarget(null);
}

function OnDestroy() {
	cameraControl.deleteEnemy(gameObject);
}