import * as React from "react";
import * as ReactDOM from "react-dom";
import {MenuButton} from "./menuButton";

export class UI extends React.Component<{}, {}> {
    componentDidMount() {
        let el = ReactDOM.findDOMNode(this) as HTMLCanvasElement;
        el.width  = window.innerWidth;
        el.height = window.innerHeight;
    }

    render() {
        return (<div id="uiLayer" className="fullScreen noTouch">
            <MenuButton/>
        </div>);
    }
}