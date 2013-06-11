#pragma strict
//forward speed
var speed : float = 50;
//turn speed
var turnRate : float = 5;


function Start() {
	DontDestroyOnLoad(transform.gameObject);
}

function Update () {
	//add force to player to move forward
	rigidbody.AddRelativeForce(Vector3.forward * Input.GetAxis("Vertical") * speed);
	
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

function Awake() {
	DontDestroyOnLoad(transform.gameObject);
}
