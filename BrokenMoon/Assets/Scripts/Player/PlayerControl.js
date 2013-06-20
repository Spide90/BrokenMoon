#pragma strict
//forward speed
var speed : float = 50;
//turn speed
var turnRate : float = 5;

var rocketParticleSystems : ParticleSystem[];
var emissionRate : float = 300;
var baseEmissionRate : float = 5;

var cursor : Texture2D;
private var cursorSizeX: int = 16;
private var cursorSizeY: int = 16;
 

function Start() {
	DontDestroyOnLoad(transform.gameObject);
	
	Screen.showCursor = false;
}

function Update () {
	//add force to player to move forward
	rigidbody.AddRelativeForce(Vector3.forward * Input.GetAxis("Vertical") * speed * Time.deltaTime);
	if (PlayerPrefs.GetInt("GamePad") == 1) {
		transform.Rotate(Vector3.up * Input.GetAxis("Horizontal") * turnRate);
	} else {
		//mousefollow
		//create an invisible plane on the x,z axis with y = player height
		var playerPlane = new Plane(Vector3.up, transform.position);
 
		//project mouse position on 2d screen in scene
		var ray = Camera.main.ScreenPointToRay (Input.mousePosition);
 
		var hitdist = 0.0;
		//calculate intersect point plane and mouse projection point -> mouse point to look at
		if (playerPlane.Raycast (ray, hitdist)) {
			//rotate player to look at this point
			var targetPoint = ray.GetPoint(hitdist);
 
			var targetRotation = Quaternion.LookRotation(targetPoint - transform.position);
 
			transform.rotation = Quaternion.Slerp(transform.rotation, targetRotation, turnRate * Time.deltaTime);
		}
    }
    
    // particleSystem Control
    for (var ps : ParticleSystem in rocketParticleSystems) {
    	ps.emissionRate = emissionRate * Input.GetAxis("Vertical") + baseEmissionRate;
    }
}

function Awake() {
	DontDestroyOnLoad(transform.gameObject);
}

function OnGUI(){
	if (PlayerPrefs.GetInt("GamePad") == 1 && Input.GetAxis("Jump")) {
		GUI.DrawTexture(Rect(Event.current.mousePosition.x-cursorSizeX/2, Event.current.mousePosition.y-cursorSizeY/2, cursorSizeX, cursorSizeY), cursor);
	}
	if (PlayerPrefs.GetInt("GamePad") == 0) {
		GUI.DrawTexture (Rect(Input.mousePosition.x-cursorSizeX/2 + cursorSizeX/2, (Screen.height-Input.mousePosition.y)-cursorSizeY/2 + cursorSizeY/2, cursorSizeX, cursorSizeY), cursor);
	}
}