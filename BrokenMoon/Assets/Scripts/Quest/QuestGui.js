#pragma strict

private var quest : Quest;
private var activeQuest = false;

function OnGUI() {
	if (activeQuest) {
		GUI.Label(Rect(0,Screen.height/2, 250, 50), quest.title + "\n" + quest.description + " : " + quest.counter + " / " + quest.max);
	}
}

function startQuest(quest : Quest) {
	this.quest = quest;
	activeQuest = true;
}

function  finishQuest() {
	activeQuest = false;
	quest = null;
}

function getQuest() : Quest {
	return quest;
}