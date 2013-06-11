#pragma strict
//all items
var items : Transform[];

function addItem(item : Transform) {
	//array has fixed size so we need to copy into a new array
	var temp = new Array(items);
	temp.Add(item);
	items = temp.ToBuiltin(Transform);
}

function removeItem(item : Transform) {
	var temp = new Array(items);
	var index = 0;
	var contained = false;
	//search for item to remove
	for (var i : Transform in items) {
		if (i == Item) {
		//found it
			temp.RemoveAt(index);
			contained = true;
		}
		index++;
		if (contained) {
			//remove it
			items = temp.ToBuiltin(Transform);
			return;
		}
	}
}