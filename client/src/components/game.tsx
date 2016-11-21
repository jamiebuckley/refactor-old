import * as React from "react";
import * as ReactDOM from "react-dom";
import Vector3 = BABYLON.Vector3;
import HammerCameraInput from "../game/hammerCameraInput";
import Scene from "../game/scene";

export interface GameProps {  }

export class Game extends React.Component<GameProps, {}> {
    componentDidMount() {
       let el = ReactDOM.findDOMNode(this) as HTMLCanvasElement;
       let scene = new Scene(el);
    }

    render() {
        return <canvas width="800" height="600"></canvas>;
    }
}