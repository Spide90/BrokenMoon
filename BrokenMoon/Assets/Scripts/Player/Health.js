#pragma strict

var healthPercentage : float;

var healthMaximum : float;
var healthCurrent : float;

function increaseHealth(value : int) {
	if (healthCurrent + value > healthMaximum) {
		healthCurrent = healthMaximum;
	} else {
		healthCurrent += value;
	}
	updatePercentHealth();
}

function decreaseHealth(value : int) {
	if (healthCurrent - value <= 0) {
		Destroy(gameObject, 0);
	} else {
		healthCurrent -= value;
	}
	updatePercentHealth();
}

function updatePercentHealth() {
	healthPercentage = 1f*healthCurrent/healthMaximum;
}