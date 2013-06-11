//the target to follow
var target : Transform;

//distance to the object DO NOT SET ANY VALUES
private var distanceBehind : float;
private var distanceAbove : float;

function Start() {
	var player = FindObjectOfType(PlayerControl);
	target = player.transform;
	//calculate the camera distance based on the initial position of camera and target
	var position = target.position;
	var initialCameraPosition = transform.position;
	distanceAbove = initialCameraPosition.y - position.y;
	distanceBehind = position.z - initialCameraPosition.z;
}



function LateUpdate () {
	if (!target) {
		return;
	} else {
		//move camera to the preset distance behind the target, ignore x axis
		transform.position = target.position + Vector3(0, distanceAbove, (-1) * distanceBehind);
		// Always look at the target
		transform.LookAt (target);
	}
}