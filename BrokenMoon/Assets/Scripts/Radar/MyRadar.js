#pragma strict

var astroidTexture : Texture2D;
var enemyTextureIdle : Texture2D;
var enemyTextureChase : Texture2D; 
var waypointTexture : Texture2D;

private var textureSizeX : float = 16;
private var textureSizeY : float = 16;

var radarSphereDistance : float = 0;
var standartDistance : float = 0;

var scanRange : float = 250;

function Start () {
}

function OnGUI() {
	drawEnemies();
	drawAstroids();
	drawWaypoints();
}

function drawEnemies() {
	//find all objects in the scene
	var enemies : GameObject[] = GameObject.FindGameObjectsWithTag("Enemy");
	for (var enemy : GameObject in enemies) {
		if ((enemy.transform.position - transform.position).magnitude > scanRange) continue;
		//get a vector pointing from ship to object (normalized)
		var direction = (enemy.transform.position - transform.position).normalized;
		//create a ray with (0,0,0) in ship position and move along this ray
		var angle = Vector3.Angle(Vector3.forward, direction);
		if (Vector3.Cross(Vector3.forward, direction).y < 0) {
			angle += 180;
		}
		direction = Vector3(10.4 * direction.x, direction.y,5 * direction.z);
		var worldPoint = direction + transform.position;
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
		if ((astroid.transform.position - transform.position).magnitude > scanRange) continue;
		var direction = (astroid.transform.position - transform.position).normalized;
		var angle = Vector3.Angle(transform.forward, direction);
		if (Vector3.Cross(transform.forward, direction).y < 0) {
			angle -= 360;
		}
		direction = Vector3(10.4 * direction.x, direction.y,5 * direction.z);
		var worldPoint = direction + transform.position;
		var screenPoint = Camera.main.WorldToScreenPoint(worldPoint);
		var guiPoint = Camera.main.ScreenToViewportPoint(Vector2(screenPoint.x, screenPoint.y));
		GUI.DrawTexture(Rect((guiPoint.x * Screen.width) - textureSizeX/2, Screen.height - (guiPoint.y * Screen.height) - textureSizeY/2, textureSizeX, textureSizeY), astroidTexture, ScaleMode.ScaleToFit);
	}
}

function drawWaypoints() {
	var waypoints : GameObject[] = GameObject.FindGameObjectsWithTag("Waypoint");
	for (var waypoint : GameObject in waypoints) {
		if ((waypoint.transform.position - transform.position).magnitude > scanRange) continue;
		var direction = (waypoint.transform.position - transform.position).normalized;
		var angle = Vector3.Angle(transform.forward, direction);
		if (Vector3.Cross(transform.forward, direction).y < 0) {
			angle -= 360;
		}
		direction = Vector3(10.4 * direction.x, direction.y, 5 * direction.z);
		var worldPoint = direction + transform.position;
		var screenPoint = Camera.main.WorldToScreenPoint(worldPoint);
		var guiPoint = Camera.main.ScreenToViewportPoint(Vector2(screenPoint.x, screenPoint.y));
		GUI.DrawTexture(Rect((guiPoint.x * Screen.width) - textureSizeX/2, Screen.height - (guiPoint.y * Screen.height) - textureSizeY/2, textureSizeX, textureSizeY), waypointTexture, ScaleMode.ScaleToFit);
	}	
}