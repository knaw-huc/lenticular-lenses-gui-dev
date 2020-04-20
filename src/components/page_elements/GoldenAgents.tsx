import React from 'react';
import logoGa from "../../images/logo-ga.png";



export function HcHeaderGoldenAgents(props: {toolName: string, projectName: string}) {
        return (
            <div className="hcGaHeader hcMarginBottom4 bgColorBrand1">
                <div className="hcGaHeaderLogo">
                    <img
                        src={logoGa}
                        alt="Golden Agents logo" />
                </div>
                <div className="hcGaHeaderToolName">
                    {props.toolName}
                </div>
                <div className="hcGaHeaderProject">
                    {props.projectName}
                </div>
                <div className="hcGaHeaderHelp" />
            </div>

        );
}



export class HclLIconDataSelection extends React.Component {
    render() {
        return (
            <div className="hc-ga-icon hc-ga-icon-ds hcRoundedCorners"/>

        );
    }
}


export class HclLIconAlignment extends React.Component {
    render() {
        return (
            <div className="hc-ga-icon hc-ga-icon-al hcRoundedCorners"> </div>

        );
    }
}
