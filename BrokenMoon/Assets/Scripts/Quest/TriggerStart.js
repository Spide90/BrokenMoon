#pragma strict

var quest : Quest;

function OnTriggerEnter() {
	quest.startQuest();
	this.enabled = false;
}