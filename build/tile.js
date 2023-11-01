"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextureLayers = void 0;
class Tile {
    walkable;
    textureLayers;
    constructor(walkable = false, textureLayers = []) {
        this.walkable = walkable;
        this.textureLayers = textureLayers;
        return this;
    }
    removeLayer(layer) {
        const index = this.textureLayers.indexOf(layer);
        if (index !== -1) {
            this.textureLayers.splice(index, 1);
        }
    }
    addLayer(layer) {
        if (this.textureLayers.includes(layer)) {
            console.log(this.textureLayers, layer, this.textureLayers.indexOf(layer));
            console.log('Layer already exists');
        }
        this.textureLayers.push(layer);
    }
    toggleWalkable() {
        this.walkable = !this.walkable;
    }
}
exports.default = Tile;
var TextureLayers;
(function (TextureLayers) {
    TextureLayers["REDSTART"] = "REDSTART";
    TextureLayers["GREENSTART"] = "GREENSTART";
    TextureLayers["BLUESTART"] = "BLUESTART";
    TextureLayers["YELLOWSTART"] = "YELLOWSTART";
    TextureLayers["NMPOINTS"] = "NMPOINTS";
    TextureLayers["MINIGAME"] = "MINIGAME";
    TextureLayers["REDKEY"] = "REDKEY";
    TextureLayers["BLUEKEY"] = "BLUEKEY";
    TextureLayers["GREENKEY"] = "GREENKEY";
    TextureLayers["YELLOWKEY"] = "YELLOWKEY";
    TextureLayers["GREYKEY"] = "GREYKEY";
    TextureLayers["POWERUP"] = "POWERUP";
    TextureLayers["GRASS"] = "GRASS";
    TextureLayers["PATH"] = "PATH";
    TextureLayers["STARTPOS"] = "STARTPOS";
})(TextureLayers || (exports.TextureLayers = TextureLayers = {}));
