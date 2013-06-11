#pragma strict

var title : String;
var description : String;
var counter : int;
var max : int;

private var gui : QuestGui;

function Start() {
	gui = FindObjectOfType(QuestGui);
}

function startQuest() {
	gui.startQuest(this);
}

function finishQuest() {
	gui.finishQuest();
}

function increaseQuestCounter() {
	counter++;
	if (counter >= max) {
		finishQuest();
	}
}

function decreaseQuestCounter() {
	counter--;
}