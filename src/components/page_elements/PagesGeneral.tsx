import React from 'react';
import {HcLlListItemMinimal, HcLlListItemMinimal2Fields, HcLlListLabel, HcLlListItemDataSelection, HcLlListItemAlignment, HcResultListPaging,HcLlListItemAlignmentLinks, HcLlListItemAlignmentClusters} from './ListItems';
import {HcLlSubNavigation} from './Utils';
import {HclLIconDataSelection, HclLIconAlignment} from './GoldenAgents';
import {IHomePage} from "../../misc/interfaces";

export function HcLlLayoutHome(props: {pageData: IHomePage}) {

        return (<div className="hcContentContainer hcMarginBottom4 hcMarginTop5">
            <div className="hc2columns">

                {/* left column */}
                <div className="hcMarginBottom2 hcBasicSideMargin">
                    <h2>
                        New research
                    </h2>
                    Start a new research to reconcile one or more datasets.
                    <br/>
                    <br/>
                    <button type="button" name="button">
                        New research
                    </button>
                    <div className="hcLoginArea">
                        <button type="button" name="loginButton">
                            Login
                        </button>
                    </div>
                </div>

                {/* right column */}
                <div className="hcBasicSideMargin hcMarginBottom4">
                    <h2>Research</h2>
                    <div className="hcList hcMarginBottom4">
                        {props.pageData.projectList.map(item => (<HcLlListItemMinimal title={item.prName}/>))}
                    </div>
                    <div className="hcStickOutBox hcRoundedCorners">
                        <p className="hcMarginBottom1">
                            Or enter your research ID:
                        </p>
                        <input type="text" name="name" defaultValue="defaultValue" className="hcMarginBottom1"/>
                        <button type="button" name="button">
                            Load research
                        </button>
                    </div>
                </div>
            </div>
        </div>);
}






export class HcLlLayoutProjectDetail extends React.Component {
    render() {
        return (<div className="hcContentContainer hcMarginBottom4 hcMarginTop5">
            <div className="hc2columns">

                {/* left column */}
                <div className="hcMarginBottom2 hcBasicSideMargin hcForm">
                    <h3>Research name</h3>
                    Start a new research to reconcile one or more datasets.
                    <input type="text" name="" value="" className="hcMarginBottom2"/>

                    <h3>Research description</h3>
                    Start a new research to reconcile one or more datasets.
                    <textarea rows={4} className="hcMarginBottom1"></textarea>

                    <button type="button">Save research</button>
                </div>

                {/* right column */}
                <div className="hcBasicSideMargin hcMarginBottom4"></div>
            </div>
        </div>);
    }
}
