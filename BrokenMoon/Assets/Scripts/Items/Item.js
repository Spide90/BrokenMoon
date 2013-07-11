#pragma strict
//texture displayed in inventory
var inventoryTexture : Texture2D;

private var info : ItemInfo;
private var inventory : Inventory;

function Start() {
	//get info and inventory in scene
	info = FindObjectOfType(ItemInfo);
	inventory = FindObjectOfType(Inventory);
}


function OnMouseOver() {
	//wait for pickup command
	if (Input.GetKeyDown("q") && !transform.parent) {
		Debug.Log("asdfgrewefwe");
		pickUp();
	}
}

function Update() {
	if (Input.GetAxis("Fire3") && !transform.parent) {
		var distance = (transform.position - inventory.transform.position).magnitude;
		if (distance < 30) {
			pickUp();
		}
	}
}

function pickUp() {
	inventory.addItem(this.transform);
	//hide picked up item
	//item follows player for easier drop
	transform.collider.isTrigger = true;
	transform.renderer.enabled = false;
	transform.parent = inventory.transform;
	transform.localPosition = Vector3.zero;
	var questItem = this.GetComponent(IncreaseOnPickup);
	if (questItem) {
		questItem.increaseCounter();
	}
}

function drop() {
	//show dropped item
	transform.collider.isTrigger = false;
	transform.renderer.enabled = true;
	transform.parent = null;
	var questItem = this.GetComponent(IncreaseOnPickup);
	if (questItem) {
		questItem.increaseCounter();
	}
}