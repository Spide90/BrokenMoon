#pragma strict
//collision object that destroys this object
var collisionObject : Rigidbody;
//the ore pieces this item drops
var ore : Rigidbody;
var oreSize = 1;

function OnTriggerEnter(col : Collider) {
	//did the right object hit the object?
	Debug.Log(col.gameObject.tag);
	if (col.gameObject.tag == "Bullet") {
		Destroy(col.gameObject, 0);
		var astroidScale = this.transform.localScale;
		var instance : Rigidbody;
		var shattered = false;
		while(!shattered) {
			//get some random numbers for scaling the ore pieces
			if ((astroidScale.x + astroidScale.y + astroidScale.z) < oreSize) {
				instance = Instantiate(ore, transform.position, transform.rotation);
				instance.transform.localScale = astroidScale;
				shattered = true;
				break;
			}
			var xShatter = Random.Range(0.5, astroidScale.x);
			var yShatter = Random.Range(0.5, astroidScale.y);
			var zShatter = Random.Range(0.5, astroidScale.z);
			instance = Instantiate(ore, transform.position + Vector3(xShatter, 0, zShatter), transform.rotation);
			instance.transform.localScale = Vector3(xShatter, yShatter, zShatter);
			astroidScale.x -= xShatter;
			astroidScale.y -= yShatter;
			astroidScale.z -= zShatter;
		}
		//destroy the original object
		Destroy(this.gameObject, 0);
	}
}