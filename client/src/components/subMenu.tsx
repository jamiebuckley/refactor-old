import * as React from "react";
import * as ReactDOM from "react-dom";

export class SubMenu extends React.Component<{}, {}> {
    componentDidMount() {

    }

    render() {
        return (<div>
            <span className="circleButton icon-hammer" style={{ right: "60px", bottom: "-10px"}}></span>
            <span className="circleButton icon-trash" style={{ right: "60px", bottom: "60px"}}></span>
            <span className="circleButton icon-hand-pointer-o" style={{ right: "-10px", bottom: "60px"}}></span>
        </div>);
    }
}