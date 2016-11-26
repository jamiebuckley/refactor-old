import * as React from "react";

export class Clock extends React.Component<{}, {}> {
    render(){
        return (
            <svg id="clock" width="220" height="220" style={{ position:"absolute", right: "10px", top: "10px" }}>
                <g transform="translate(110,110)">
                    <g>
                        <circle r="108" fill="none" strokeWidth="4" stroke="gray"/>
                        <circle r="97" fill="none" strokeWidth="11" stroke="black" strokeDasharray="4,46.789082" transform="rotate(-1.5)"/>
                        <circle r="100" fill="none" strokeWidth="5" stroke="black" strokeDasharray="2,8.471976" transform="rotate(-.873)"/>
                    </g>
                    <g id="hands" transform="rotate(180)">
                        <g id="hour" transform="rotate(47.9) rotate(0.0639353)">
                            <line strokeWidth="5" y2="75" strokeLinecap="round" stroke="blue" opacity=".5"/>
                                <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="12h" by="360"/>
                            <circle r="7"/>
                        </g>
                        <g id="minute" transform="rotate(214.8) rotate(0.767224)">
                            <line strokeWidth="4" y2="93" strokeLinecap="round" stroke="green" opacity=".9"/>
                                <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="60min" by="360"/>
                            <circle r="6" fill="red"/>
                        </g>
                        <g id="second" transform="rotate(288) rotate(46.0334)">
                            <line strokeWidth="2" y1="-20" y2="102" strokeLinecap="round" stroke="red"/>
                                <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="60s" by="360"/>
                            <circle r="4" fill="blue"/>
                        </g>
                    </g>
                </g>
            </svg>
        )
    }
}