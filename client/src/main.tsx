/// <reference path="../../node_modules/babylonjs/babylon.d.ts"/>

import * as React from "react";
import * as ReactDOM from "react-dom";

import { Game } from "./components/game";

ReactDOM.render(
    <Game />,
    document.getElementById("game")
);