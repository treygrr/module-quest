export default class Tile {
	constructor (public walkable: boolean = false, public textureLayers: TextureLayers[] = []) {
		return this;
	}

	removeLayer(layer: TextureLayers) {
       		const index = this.textureLayers.indexOf(layer);
        	if (index !== -1) {
            		this.textureLayers.splice(index, 1);
        	}
	}

	addLayer (layer: TextureLayers) {
		if (this.textureLayers.includes(layer)) {
			console.log(this.textureLayers, layer, this.textureLayers.indexOf(layer));
			console.log('Layer already exists');
		}
		this.textureLayers.push(layer);
	}

	toggleWalkable () {
		this.walkable = !this.walkable;
	}
}

export enum TextureLayers {
	REDSTART = "REDSTART",
	GREENSTART = "GREENSTART",
	BLUESTART = "BLUESTART",
	YELLOWSTART = "YELLOWSTART",
	NMPOINTS = "NMPOINTS",
	MINIGAME = "MINIGAME",
	REDKEY = "REDKEY",
	BLUEKEY = "BLUEKEY",
	GREENKEY = "GREENKEY",
	YELLOWKEY = "YELLOWKEY",
	GREYKEY = "GREYKEY",
	POWERUP = "POWERUP",
	GRASS = "GRASS",
	PATH = "PATH",
	STARTPOS = "STARTPOS",
}


