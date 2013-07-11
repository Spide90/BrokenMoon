#pragma strict
//forward speed
var speed : float = 50;
//turn speed
var turnRate : float = 5;

var rocketParticleSystems : ParticleSystem[];
var rocketLights : Light[];
var emissionRate : float = 300;
var baseEmissionRate : float = 5;
var lightIntensity : float = 1;

var cursor : Texture2D;
private var cursorSizeX: int = 16;
private var cursorSizeY: int = 16;
 
private var audioFly : AudioSource;
private var audioIdle : AudioSource;

function Start() {

	var sources = GetComponents(AudioSource);
	audioFly = sources[0];
	audioIdle = sources[1];
	
	DontDestroyOnLoad(transform.gameObject);
	
	Screen.showCursor = false;
}

function Update () {
	//add force to player to move forward
	rigidbody.AddRelativeForce(Vector3.forward * Input.GetAxis("Vertical") * speed * Time.deltaTime);
	if (PlayerPrefs.GetInt("GamePad") == 1) {
		transform.Rotate(Vector3.up * Input.GetAxis("Horizontal") * turnRate);
		if (Input.GetAxis("Vertical") != 0) {
			audioIdle.Stop();
			if (!audioFly.isPlaying) {
				audioFly.Play();
			}
		} else {
			audioFly.Stop();
			if (!audioIdle.isPlaying) {
				audioIdle.Play();
			}
		}
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
    for (var l : Light in rocketLights) {
    	var bValue =  Mathf.Clamp01(Input.GetAxis("Vertical"));
    	l.intensity = lightIntensity * bValue;
    	var lf = l.GetComponent(LensFlare);
    	if (lf) {
    		lf.brightness = bValue;
    	}
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
		GUI.DrawTexture (Rect(Input.mousePosition.x-cursorSizeX/2 , (Screen.height-Input.mousePosition.y)-cursorSizeY/2, cursorSizeX, cursorSizeY), cursor);
	}
}