#pragma strict
//texture displayed in inventory
var inventoryTexture : Texture2D;
//texture shown at gui item info
var mouseOverTexture : Texture2D;

private var info : ItemInfo;
private var inventory : Inventory;

function Start() {
	//get info and inventory in scene
	info = FindObjectOfType(ItemInfo);
	inventory = FindObjectOfType(Inventory);
}

function OnMouseEnter() {
	//mouse over display texture
	info.setInfo(mouseOverTexture);
}

function OnMouseOver() {
	//wait for pickup command
	if (Input.GetKeyDown("q")) {
		pickUp();
	}
}

function OnMouseExit() {
	//hide when we move the mouse away from the object
	info.clearInfo();
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