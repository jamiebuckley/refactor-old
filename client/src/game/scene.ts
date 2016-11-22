import HammerCameraInput from "./hammerCameraInput";
import Vector3 = BABYLON.Vector3;
export default class Scene {
    constructor(el:HTMLCanvasElement){
        let engine = new BABYLON.Engine(el, true);
        let scene = new BABYLON.Scene(engine);
        scene.clearColor = new BABYLON.Color3(1, 1, 1);
/*        scene.fogMode = BABYLON.Scene.FOGMODE_LINEAR;
        scene.fogStart = 60.0;
        scene.fogEnd = 70.0;
        scene.fogColor = new BABYLON.Color3(1, 1, 1);*/
        //scene.ambientColor = new BABYLON.Color3(0.4, 0.4, 0.4);

        let camera = new BABYLON.ArcRotateCamera("ArcRotateCamera", 1, 0.8, 10, new BABYLON.Vector3(0, 0, 0), scene)
        //camera.inputs.clear();
        //var hm = new HammerCameraInput();
        //camera.inputs.add(hm);
        camera.setTarget(BABYLON.Vector3.Zero());
        camera.attachControl(el, true);

        var light = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(-1, -1, 0), scene);
        light.position = new Vector3(0, 20, 40);
        light.diffuse = new BABYLON.Color3(1, 1, 1);
        light.specular = new BABYLON.Color3(1, 1, 1);

  /*      var light0 = new BABYLON.HemisphericLight("Hemi0", new BABYLON.Vector3(0, 1, 0), scene);
        light0.diffuse = new BABYLON.Color3(0.5, 0.5, 0.5);
        light0.specular = new BABYLON.Color3(1, 1, 1);
        light0.groundColor = new BABYLON.Color3(0, 0, 0);*/
        //light.intensity = .8;
        var shadowGenerator = new BABYLON.ShadowGenerator(1024, light);
        shadowGenerator.bias = 0.01;

        var ground = BABYLON.Mesh.CreateGround("ground1", 6, 6, 2, scene);

        var cube = BABYLON.Mesh.CreateBox("sphere1", 4, scene);
        cube.position.y = 4;
        shadowGenerator.getShadowMap().renderList.push(cube);

        ground.receiveShadows = true;

        engine.runRenderLoop(function () {
            scene.render();
        });
    }
}
