import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Hammer from "hammerjs";
import Vector3 = BABYLON.Vector3;


export interface GameProps {  }

export class Game extends React.Component<GameProps, {}> {
    componentDidMount() {
        var el = ReactDOM.findDOMNode(this) as HTMLCanvasElement;
        var engine = new BABYLON.Engine(el, true);
        var scene = new BABYLON.Scene(engine);

        // Change the scene background color to green.
        scene.clearColor = new BABYLON.Color3(0, 1, 0);
        var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
        camera.setTarget(BABYLON.Vector3.Zero());
        var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
        light.intensity = .5;
        var sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, scene);
        sphere.position.y = 1;
        var ground = BABYLON.Mesh.CreateGround("ground1", 6, 6, 2, scene);
        engine.runRenderLoop(function () {
            scene.render();
        });

        var mc = new Hammer.Manager(el);
        mc.add(new Hammer.Pan({ threshold: 0, pointers: 0 }));

        mc.add(new Hammer.Swipe()).recognizeWith(mc.get('pan'));
        mc.add(new Hammer.Rotate({ threshold: 0 })).recognizeWith(mc.get('pan'));
        mc.add(new Hammer.Pinch({ threshold: 0 })).recognizeWith(mc.get('pinch'));

        mc.add(new Hammer.Tap({ event: 'doubletap', taps: 2 }));
        mc.add(new Hammer.Tap());

        mc.on("panstart panmove", function(ev){
            camera.setTarget(camera.getTarget().add(new Vector3(0.001, 0, 0)));
        });
    }

    render() {
        return <canvas width="800" height="600"></canvas>;
    }
}