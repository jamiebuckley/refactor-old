import * as React from "react";
import * as ReactDOM from "react-dom";
import {MenuButton} from "./menuButton";
import {SubMenu} from "./subMenu";
import {Clock} from "./clock";

export class UI extends React.Component<{}, {}> {
    componentDidMount() {
        let el = ReactDOM.findDOMNode(this) as HTMLCanvasElement;
        el.width  = window.innerWidth;
        el.height = window.innerHeight;
    }

    render() {
        return (<div id="uiLayer" className="fullScreen noTouch">
            <Clock/>
            <MenuButton/>
            <SubMenu/>
        </div>);
    }
}