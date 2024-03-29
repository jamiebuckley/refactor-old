import * as React from "react";
import * as ReactDOM from "react-dom";
import Vector3 = BABYLON.Vector3;
import HammerCameraInput from "../game/hammerCameraInput";
import Game from "../game/game";

export interface CanvasProps {  }

export class Canvas extends React.Component<CanvasProps, {}> {
    componentDidMount() {
       let el = ReactDOM.findDOMNode(this) as HTMLCanvasElement;
       el.width  = window.innerWidth;
       el.height = window.innerHeight;

       let scene = new Game(el);
    }

    render() {
        return <canvas className="fullScreen"></canvas>;
    }
}