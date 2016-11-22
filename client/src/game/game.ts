import HammerCameraInput from "./hammerCameraInput";
import Vector3 = BABYLON.Vector3;

export default class Game {

    private canvas: HTMLCanvasElement;
    private scene: BABYLON.Scene;
    private engine: BABYLON.Engine;
    private camera: BABYLON.ArcRotateCamera;

    constructor(el:HTMLCanvasElement){
        this.canvas = el;
        this.engine = new BABYLON.Engine(el, true);
        this.scene = new BABYLON.Scene(this.engine);
        this.camera = new BABYLON.ArcRotateCamera("ArcRotateCamera", 1, 0.8, 10, new BABYLON.Vector3(0, 0, 0), this.scene);

        window.addEventListener("resize", () =>  this.engine.resize());
        this.initializeWorld();
        this.initializeCamera();
        this.initializeScene();
        this.engine.runRenderLoop(() => this.scene.render());
    }

    private initializeWorld(): void {
        this.scene.clearColor = new BABYLON.Color3(1, 1, 1);
        this.scene.fogMode = BABYLON.Scene.FOGMODE_LINEAR;
        this.scene.fogStart = 60.0;
        this.scene.fogEnd = 70.0;
        this.scene.fogColor = new BABYLON.Color3(1, 1, 1);
        this.scene.ambientColor = new BABYLON.Color3(0.4, 0.4, 0.4);
    }

    private initializeCamera(): void {
        let camera = new BABYLON.ArcRotateCamera("ArcRotateCamera", 1, 0.8, 10, new BABYLON.Vector3(0, 0, 0), this.scene)

        /* If is touchscreen device */
        if('ontouchstart' in window || navigator.maxTouchPoints){
            camera.inputs.clear();
            var hm = new HammerCameraInput();
            camera.inputs.add(hm);
        }
        camera.setTarget(BABYLON.Vector3.Zero());
        camera.attachControl(this.canvas, true);
    }

    private initializeScene(): void {
        var light = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(-1, -2, -1), this.scene);
        light.position = new BABYLON.Vector3(10, 10, 0);
        light.intensity = 0.5;

        light.diffuse = new BABYLON.Color3(1, 1, 1);
        light.specular = new BABYLON.Color3(1, 1, 1);

        var cube = BABYLON.Mesh.CreateBox("sphere1", 4, this.scene);
        cube.position.y = 2;
        var shadowGenerator = new BABYLON.ShadowGenerator(1024, light);
        shadowGenerator.useVarianceShadowMap = true;
        shadowGenerator.bias = 0.01;

        var ground = BABYLON.Mesh.CreateGround("ground1", 30, 30, 2, this.scene);
        ground.receiveShadows = true;

        shadowGenerator.getShadowMap().renderList.push(cube);
    }
}
