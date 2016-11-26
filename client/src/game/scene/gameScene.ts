///<reference path="../../../../node_modules/inversify/dts/inversify.d.ts"/>

import ShadowGenerator = BABYLON.ShadowGenerator;
import TYPES from "../../../types";
import {inject} from "inversify";
import Scene = BABYLON.Scene;

export class GameScene {
    private shadowGenerator: ShadowGenerator;
    private scene: Scene;

    constructor(
        @inject(TYPES.Scene) scene: Scene,
        @inject(TYPES.ShadowGenerator) shadowGenerator: ShadowGenerator){
        this.scene = scene;
        this.shadowGenerator = shadowGenerator;
    }

    start() : void {

    }

    update(): void {

    }
}