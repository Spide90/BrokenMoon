//the target to follow
var target : Transform;

private var radar : MyRadar;

//distance to the object DO NOT SET ANY VALUES
private var distanceBehind : float;
private var distanceAbove : float;
private var distanceScaling : float;

private var zoomSpeed : float = 5;

private var standartDistanceBehind : float;
private var standartDistanceAbove : float;

var visibleTransforms : GameObject[];

function Start() {
	var player = FindObjectOfType(PlayerControl);
	target = player.transform;
	radar = player.GetComponent(MyRadar);
	//calculate the camera distance based on the initial position of camera and target
	var position = target.position;
	var initialCameraPosition = transform.position;
	distanceAbove = initialCameraPosition.y - position.y;
	distanceBehind = position.z - initialCameraPosition.z;
	distanceScaling = distanceBehind / distanceAbove;
	standartDistanceBehind = distanceBehind;
	standartDistanceAbove = distanceAbove;
}

function adjustCamera() {
	var allVisible = true;
	for (var enemy : GameObject in visibleTransforms) {
		if (!enemy.GetComponentInChildren(MeshRenderer).isVisible) {
			allVisible = false;
			break;
		}
	}
	if (!allVisible) {
		distanceBehind += zoomSpeed * Time.deltaTime;
		distanceAbove += zoomSpeed * Time.deltaTime;
		radar.radarSphereDistance += 0.35 * Time.deltaTime;
	} else {
		distanceBehind -= zoomSpeed * Time.deltaTime;
		distanceAbove -= zoomSpeed * Time.deltaTime;
		radar.radarSphereDistance -= 0.35 * Time.deltaTime;
	}
	if (distanceBehind <= standartDistanceBehind) {
		distanceBehind = standartDistanceBehind;
		distanceAbove = standartDistanceAbove;
		radar.radarSphereDistance = radar.standartDistance;
	}
}

function addEnemy(enemy : GameObject) {
	var temp = new Array(visibleTransforms);
	temp.Add(enemy);
	visibleTransforms = temp.ToBuiltin(GameObject);
}

function deleteEnemy(enemy : GameObject) {
	if (!visibleTransforms) {
		return;
	}
	var temp = new Array(visibleTransforms);
	var index = 0;
	var contained = false;
	//search for item to remove
	for (var i : GameObject in visibleTransforms) {
		if (i == enemy) {
		//found it
			temp.RemoveAt(index);
			contained = true;
		}
		index++;
		if (contained) {
			//remove it
			visibleTransforms = temp.ToBuiltin(GameObject);
			return;
		}
	}
}

function LateUpdate () {
	if (!target) {
		return;
	} else {
		adjustCamera();
		//move camera to the preset distance behind the target, ignore x axis
		transform.position = target.position + Vector3(0, distanceAbove, (-1) * distanceBehind);
		// Always look at the target
		transform.LookAt (target);
	}
}