#pragma strict

var astroidTexture : Texture2D;
var enemyTextureIdle : Texture2D;
var enemyTextureChase : Texture2D; 

private var textureSizeX : float = 16;
private var textureSizeY : float = 16;

private var radarSphereDistance : float = 5;
private var scanRange : float = Mathf.Infinity;

function Start () {
}

function OnGUI() {
	drawEnemies();
	drawAstroids();
}

function drawEnemies() {
	//find all objects in the scene
	var enemies : GameObject[] = GameObject.FindGameObjectsWithTag("Enemy");
	for (var enemy : GameObject in enemies) {
		//get a vector pointing from ship to object (normalized)
		var direction = (enemy.transform.position - transform.position).normalized;
		//create a ray with (0,0,0) in ship position and move along this ray
		var worldPoint =  (radarSphereDistance * direction) + transform.position;
		//project this 3d point in cameras 2d screen
		var screenPoint = Camera.main.WorldToScreenPoint(worldPoint);
		//project to cameras viewport (viewport: (0,0) = bottom left, (1,1) topright) 
		var guiPoint = Camera.main.ScreenToViewportPoint(Vector2(screenPoint.x, screenPoint.y));
		if (enemy.GetComponent(AI).isChasing()) {
			GUI.DrawTexture(Rect((guiPoint.x * Screen.width) - textureSizeX/2, Screen.height - (guiPoint.y * Screen.height) - textureSizeY/2, textureSizeX, textureSizeY), enemyTextureChase, ScaleMode.ScaleToFit);
		} else {
			GUI.DrawTexture(Rect((guiPoint.x * Screen.width) - textureSizeX/2, Screen.height - (guiPoint.y * Screen.height) - textureSizeY/2, textureSizeX, textureSizeY), enemyTextureIdle, ScaleMode.ScaleToFit);
		}
	}
}

function drawAstroids() {
	var astroids : GameObject[] = GameObject.FindGameObjectsWithTag("Astroid");
	for (var astroid : GameObject in astroids) {
		var direction = (astroid.transform.position - transform.position).normalized;
		var worldPoint =  (radarSphereDistance * direction) + transform.position;
		var screenPoint = Camera.main.WorldToScreenPoint(worldPoint);
		var guiPoint = Camera.main.ScreenToViewportPoint(Vector2(screenPoint.x, screenPoint.y));
		GUI.DrawTexture(Rect((guiPoint.x * Screen.width) - textureSizeX/2, Screen.height - (guiPoint.y * Screen.height) - textureSizeY/2, textureSizeX, textureSizeY), astroidTexture, ScaleMode.ScaleToFit);
	}
}
