#pragma strict

var astroidTexture : Texture2D;
var enemyTextureIdle : Texture2D;
var enemyTextureChase : Texture2D; 

private var textureSizeX : float = 16;
private var textureSizeY : float = 16;

private var radarSphereDistance : float = 5;
private var scanRange : float = Mathf.Infinity;

function Start () { 
	debug();
}

function OnGUI() {
	drawEnemies();
	drawAstroids();
}

function drawEnemies() {
	var enemies : GameObject[] = GameObject.FindGameObjectsWithTag("Enemy");
	for (var enemy : GameObject in enemies) {
		var direction = (enemy.transform.position - transform.position).normalized;
		var worldPoint =  (radarSphereDistance * direction) + transform.position;
		var screenPoint = Camera.main.WorldToScreenPoint(worldPoint);
		var guiPoint = GUIUtility.ScreenToGUIPoint(screenPoint);
		Debug.Log(guiPoint);
		if (enemy.GetComponent(AI).isChasing()) {
			GUI.DrawTexture(Rect(guiPoint.x - textureSizeX/2, guiPoint.y - textureSizeY/2, textureSizeX, textureSizeY), enemyTextureChase, ScaleMode.ScaleToFit);
		} else {
			GUI.DrawTexture(Rect(guiPoint.x - textureSizeX/2, guiPoint.y - textureSizeY/2, textureSizeX, textureSizeY), enemyTextureIdle, ScaleMode.ScaleToFit);
		}
	}
}

function debug() {
	var enemies : GameObject[] = GameObject.FindGameObjectsWithTag("Enemy");
	for (var enemy : GameObject in enemies) {
		var direction = (enemy.transform.position - transform.position).normalized;
		var worldPoint = (radarSphereDistance * direction) + transform.position;
		var tmp = gameObject.CreatePrimitive(PrimitiveType.Sphere);
		tmp.transform.position = worldPoint;
	}
}

function drawAstroids() {
}