/// <reference path="../../node_modules/babylonjs/babylon.d.ts"/>

import * as React from "react";
import * as ReactDOM from "react-dom";

import "../css/theme.scss";
import "../fonts/fontello-codes.css";

import { Canvas } from "./components/canvas";
import { UI } from "./components/ui";

ReactDOM.render(
    <div>
        <Canvas />
        <UI />
    </div>,
    document.getElementById("game")
);