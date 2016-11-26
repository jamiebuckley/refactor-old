import {Container, decorate, injectable} from "inversify";
import HammerCameraInput from "./hammerCameraInput";
import TYPES from "../../types";
import {GameScene} from "./scene/gameScene";
import {IShadowRenderList} from "./interfaces/IShadowRenderList";
import {ShadowGeneratorFacade} from "./facades/ShadowGeneratorFacade";

/* aliases */
import Vector3 = BABYLON.Vector3;
import Engine = BABYLON.Engine;
import Material = BABYLON.Material;
import StandardMaterial = BABYLON.StandardMaterial;
import Color3 = BABYLON.Color3;
import ShadowGenerator = BABYLON.ShadowGenerator;

export default class Game {

    private canvas: HTMLCanvasElement;
    private scene: BABYLON.Scene;
    private engine: BABYLON.Engine;
    private camera: BABYLON.ArcRotateCamera;

    private container: Container;
    private gameScene: GameScene;
    private shadowGenerator: ShadowGenerator;

    constructor(el:HTMLCanvasElement){
        this.canvas = el;
        this.engine = new BABYLON.Engine(el, true);
        this.scene = new BABYLON.Scene(this.engine);

        window.addEventListener("resize", () =>  this.engine.resize());
        this.initializeWorld();
        this.initializeCamera();
        this.initializeScene();
        this.initializeObjectGraph();

        this.gameScene = this.container.get<GameScene>(TYPES.GameScene);
        this.engine.runRenderLoop(() => {
            this.gameScene.update();
            this.scene.render();
        });
        this.gameScene.start();
    }

    private initializeWorld(): void {
        this.scene.clearColor = new BABYLON.Color3(1, 1, 1);
        this.scene.fogMode = BABYLON.Scene.FOGMODE_LINEAR;
        this.scene.fogStart = 200.0;
        this.scene.fogEnd = 300.0;
        this.scene.fogColor = new BABYLON.Color3(1, 1, 1);
        this.scene.ambientColor = new BABYLON.Color3(0.8, 0.8, 0.8);
    }

    private initializeCamera(): void {
        this.camera = new BABYLON.ArcRotateCamera("ArcRotateCamera", 1, 0.8, 10, new BABYLON.Vector3(0, 0, 0), this.scene)

        /* If is touchscreen device */
        if('ontouchstart' in window || navigator.maxTouchPoints){
            this.camera.inputs.clear();
            var hm = new HammerCameraInput();
            this.camera.inputs.add(hm);
        }
        this.camera.setTarget(BABYLON.Vector3.Zero());
        this.camera.attachControl(this.canvas, true);
        console.log("Initialized camera");
    }

    private initializeScene(): void {
        var directionalLight = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(-1, -2, -1), this.scene);
        directionalLight.position = new BABYLON.Vector3(10, 10, 0);
        directionalLight.intensity = 0.4;
        directionalLight.diffuse = new BABYLON.Color3(1, 1, 1);
        directionalLight.specular = new BABYLON.Color3(1, 1, 1);

        var hemisphericLight = new BABYLON.HemisphericLight("Hemi0", new BABYLON.Vector3(0, 1, 0), this.scene);
        hemisphericLight.diffuse = new BABYLON.Color3(0.3, 0.3, 0.3);
        hemisphericLight.specular = new BABYLON.Color3(1, 1, 1);
        hemisphericLight.groundColor = new BABYLON.Color3(0, 0, 0);

        this.shadowGenerator = new BABYLON.ShadowGenerator(1024, directionalLight);
        this.shadowGenerator.useVarianceShadowMap = true;
        this.shadowGenerator.bias = 0.01;
    }

    private initializeObjectGraph(): void {
        decorate(injectable(), BABYLON.Scene);
        decorate(injectable(), BABYLON.Engine);

        this.container = new Container();
        this.container.bind(TYPES.Engine).toConstantValue(this.engine);
        this.container.bind(TYPES.Scene).toConstantValue(this.scene);
        this.container.bind(TYPES.ShadowGenerator).toConstantValue(this.shadowGenerator);

        this.container.bind<IShadowRenderList>(TYPES.Shadow).to(ShadowGeneratorFacade);
        this.container.bind<GameScene>(TYPES.GameScene).to(GameScene);
    }
}
