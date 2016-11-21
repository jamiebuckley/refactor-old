import HammerCameraInput from "./hammerCameraInput";
export default class Scene {
    constructor(el:HTMLCanvasElement){
        let engine = new BABYLON.Engine(el, true);
        let scene = new BABYLON.Scene(engine);
        scene.clearColor = new BABYLON.Color3(1, 1, 1);
        let camera = new BABYLON.ArcRotateCamera("ArcRotateCamera", 1, 0.8, 10, new BABYLON.Vector3(0, 0, 0), scene)
        camera.inputs.clear();
        var hm = new HammerCameraInput();
        camera.inputs.add(hm);
        camera.setTarget(BABYLON.Vector3.Zero());
        camera.attachControl(el, true);



        var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
        light.intensity = .5;
        var sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, scene);
        sphere.position.y = 1;
        var ground = BABYLON.Mesh.CreateGround("ground1", 6, 6, 2, scene);
        engine.runRenderLoop(function () {
            scene.render();
        });
    }
}
