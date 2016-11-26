import {IShadowRenderList} from "../interfaces/IShadowRenderList";
import ShadowGenerator = BABYLON.ShadowGenerator;

export class ShadowGeneratorFacade implements IShadowRenderList {

    private _shadowGenerator: ShadowGenerator;

    constructor(shadowGenerator: ShadowGenerator){
        this._shadowGenerator = shadowGenerator;
    }

    addToMap(obj: BABYLON.AbstractMesh) {
        this._shadowGenerator.getShadowMap().renderList.push(obj);
    }
}