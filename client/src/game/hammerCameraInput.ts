import Camera = BABYLON.Camera;
import ICameraInput = BABYLON.ICameraInput;
import * as Hammer from "hammerjs";
import Vector3 = BABYLON.Vector3;

export default class HammerCameraInput<TCamera extends BABYLON.ArcRotateCamera> implements ICameraInput<Camera>     {
    camera: BABYLON.ArcRotateCamera;

    private currentScale: number = 5.0;
    private lastScale: number = 0.0;

    private currentRotation: number = 0.0;
    private lastRotation: number = 0.0;

    attachControl(element: HTMLElement, noPreventDefault?: boolean): void {
        console.log(element.parentElement);
        let mc = new Hammer.Manager(element.parentElement);
        mc.add(new Hammer.Pan({ threshold: 0, pointers: 0 }));
        mc.add(new Hammer.Swipe()).recognizeWith(mc.get('pan'));
        mc.add(new Hammer.Rotate({ threshold: 0 })).recognizeWith(mc.get('pan'));
        mc.add(new Hammer.Pinch({ threshold: 0 })).recognizeWith(mc.get('rotate'));
        mc.get('pinch').set({ enable: true });
        mc.add(new Hammer.Tap({ event: 'doubletap', taps: 2 }));
        mc.add(new Hammer.Tap());
        console.log("Touch events enabled");


        mc.on("rotate", (ev) => {

        });

        mc.on("rotateend", (ev) => {
            this.lastRotation = 0.0;
            console.log("rotateend");
        });


        mc.on("panstart panmove", (ev) => {
            console.log("h9");
        });

        mc.on("pinch", (ev) => {
            let scaleDifference = ev.scale - this.lastScale;
            this.lastScale = ev.scale;
            this.currentScale += (scaleDifference * 5);
            this.camera.radius = this.currentScale;
        });

        mc.on("pinchend", (ev) => {
            console.log("pinchend");
            this.lastScale = 1.0;
        });

        mc.get('pinch').set({ enable: true });
    }

    detachControl(element: HTMLElement): void {

    }

    getTypeName(): string {
        return undefined;
    }

    getSimpleName(): string {
        return undefined;
    }

}