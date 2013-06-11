#pragma strict

var healthPercentage : float;

var healthMaximum : int;
var healthCurrent : int;

function increaseHealth(value : int) {
	if (healthCurrent + value > healthMaximum) {
		healthCurrent = healthMaximum;
	} else {
		healthCurrent += value;
	}
	updatePercentHealth();
}

function decreaseHealth(value : int) {
	if (healthCurrent + value <= 0) {
		Destroy(transform, 0);
	} else {
		healthCurrent -= value;
	}
	updatePercentHealth();
}

function updatePercentHealth() {
	healthPercentage = healthCurrent/healthMaximum;
}