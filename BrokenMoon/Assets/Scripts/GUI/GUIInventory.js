#pragma strict
//the background texture
var inventoryTexture : Texture2D;
//position variables DO NO SET ANY VALUES!!
var windowPosition : Vector2;
var windowSize : Vector2;
var itemIconSize : Vector2;

var updateListDelay = 1.0;
var lastUpdate = 0.0;
//inventory copy
var UpdatedList : Transform[];
//the inventory to display
var associatedInventory : Inventory;

private var shown = false;

//update function for updating the inventory
function UpdateInventoryList(){
	UpdatedList=associatedInventory.items;
}

function OnGUI(){	
	//only show inventory when open
	if (shown) {
		//calculate position of inventory
		windowPosition = Vector2(Screen.width / 4, Screen.height / 4);
		windowSize = Vector2(Screen.width / 2, Screen.height / 2);
		itemIconSize = Vector2(Screen.width / 15, Screen.height / 15);
		var currentX = windowPosition.x + 10;
		var currentY = windowPosition.y + 10;
		//draw inventory background
		GUI.DrawTexture(Rect(windowPosition.x, windowPosition.y, windowSize.x, windowSize.y), inventoryTexture, ScaleMode.StretchToFill);
		//display all items on background
		for(var i:Transform in UpdatedList){
		var item = i.GetComponent(Item);
			if(GUI.Button(Rect(currentX, currentY, itemIconSize.x, itemIconSize.y), item.inventoryTexture)){//drop item
				associatedInventory.removeItem(i);
				item.drop();
				lastUpdate = 0.0;
			}
			currentX += itemIconSize.x + 10;
			if(currentX + itemIconSize.x + 10 > windowPosition.x + windowSize.x){ //next row
				currentX = windowPosition.x + 10;
				currentY += itemIconSize.y + 10;
				if(currentY + itemIconSize.y > windowPosition.y + windowSize.y){
					return;
				}
			}
		}
	}
}

function FixedUpdate(){
	//if we droped an item we need to update the inventory
	if(Time.time > lastUpdate){
		lastUpdate = Time.time+updateListDelay;
		UpdateInventoryList();
	}
	var scroll = Input.GetAxis("Mouse ScrollWheel");
	if (scroll) {
		//mouse wheel up > 0
		//mouse wheel down < 0
		shown = scroll > 0; 
	}
}