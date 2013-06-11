#pragma strict
//show/hide info texture
function setInfo(InfoTexture : Texture2D) {
	guiTexture.texture = InfoTexture;
	guiTexture.enabled = true;
}

function clearInfo() {
	guiTexture.enabled = false;
}