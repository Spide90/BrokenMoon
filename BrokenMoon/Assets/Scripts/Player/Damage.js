#pragma strict

var damage : int;

function OnTriggerEnter(col : Collider) {
	if (typeof(col) == PlayerControl) {
		var health : Health; 
		health = col as Health;
		health.decreaseHealth(damage);
	}
}