import * as React from "react";

export class MenuButton extends React.Component<{}, {}>{
    render(){
        return <span className="circleButton icon-cog" style={{ right: "-10px", bottom: "-10px"}}></span>
    }
}