#pragma strict

var quest : Quest;

function increaseCounter() {
	if (!(quest.counter >= quest.max)) {
		if (!quest) {
			var gui = FindObjectOfType(QuestGui);
			quest = gui.getQuest();
		}
		if (quest) {
			quest.increaseQuestCounter();
		}
	}
}

function decreaseCounter() {
	if (quest) {
		quest.decreaseQuestCounter();
	}
}