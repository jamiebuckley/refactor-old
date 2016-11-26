///<reference path="../../../node_modules/inversify/dts/inversify.d.ts"/>

import * as Inversify from "inversify";
import HammerCameraInput from "./hammerCameraInput";
import TYPES from "../../types";

/* aliases */
import Vector3 = BABYLON.Vector3;
import Engine = BABYLON.Engine;
import Material = BABYLON.Material;
import StandardMaterial = BABYLON.StandardMaterial;
import Color3 = BABYLON.Color3;

export default class Game {

    private canvas: HTMLCanvasElement;
    private scene: BABYLON.Scene;
    private engine: BABYLON.Engine;
    private camera: BABYLON.ArcRotateCamera;
    private container: any;

    constructor(el:HTMLCanvasElement){
        this.canvas = el;
        this.engine = new BABYLON.Engine(el, true);
        this.scene = new BABYLON.Scene(this.engine);

        window.addEventListener("resize", () =>  this.engine.resize());
        this.initializeWorld();
        this.initializeCamera();
        this.initializeScene();
        this.initializeObjectGraph();
        this.engine.runRenderLoop(() => this.scene.render());
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

    private initializeObjectGraph(): void {
        Inversify.decorate(Inversify.injectable(), BABYLON.Scene);
        Inversify.decorate(Inversify.injectable(), BABYLON.Engine);

        this.container = new Inversify.Container();
        this.container.bind(TYPES.Engine).toConstantValue(this.engine);
        this.container.bind(TYPES.Scene).toConstantValue(this.scene);
    }

    private initializeScene(): void {
        var light = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(-1, -2, -1), this.scene);
        light.position = new BABYLON.Vector3(10, 10, 0);
        light.intensity = 0.4;

        light.diffuse = new BABYLON.Color3(1, 1, 1);
        light.specular = new BABYLON.Color3(1, 1, 1);

        var light0 = new BABYLON.HemisphericLight("Hemi0", new BABYLON.Vector3(0, 1, 0), this.scene);
        light0.diffuse = new BABYLON.Color3(0.3, 0.3, 0.3);
        light0.specular = new BABYLON.Color3(1, 1, 1);
        light0.groundColor = new BABYLON.Color3(0, 0, 0);

        var cube = BABYLON.Mesh.CreateBox("sphere1", 4, this.scene);
        cube.position.y = 2;
        let cubeMaterial = new StandardMaterial("sphere1Material", this.scene);
        cubeMaterial.diffuseColor = new Color3(1, 0.8, 0.8);
        cubeMaterial.ambientColor = new BABYLON.Color3(0.5, 0.5, 0.5);
        cube.material = cubeMaterial;


        var shadowGenerator = new BABYLON.ShadowGenerator(1024, light);
        shadowGenerator.useVarianceShadowMap = true;
        shadowGenerator.bias = 0.01;

        var ground = BABYLON.Mesh.CreateGround("ground1", 30, 30, 2, this.scene);
        let groundMaterial = new StandardMaterial("ground1Material", this.scene);
        groundMaterial.diffuseColor = new Color3(1, 1, 1);
        groundMaterial.ambientColor = new BABYLON.Color3(0.5, 0.5, 0.5);
        ground.material = groundMaterial;

        ground.receiveShadows = true;

        shadowGenerator.getShadowMap().renderList.push(cube);
    }
}
