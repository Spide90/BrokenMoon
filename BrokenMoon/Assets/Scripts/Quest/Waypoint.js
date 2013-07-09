#pragma strict

var quest : Quest;

function OnTriggerEnter() {
	quest.increaseQuestCounter();
}