/// <reference path="../../node_modules/babylonjs/babylon.d.ts"/>

import * as React from "react";
import * as ReactDOM from "react-dom";

import { Canvas } from "./components/canvas";
import { UI } from "./components/ui";

ReactDOM.render(
    <div>
        <Canvas />
        <UI />
    </div>,
    document.getElementById("game")
);