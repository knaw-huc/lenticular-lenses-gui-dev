import React from 'react';
import {HcLlListItemMinimal, HcLlListItemMinimal2Fields, HcLlListLabel, HcLlListItemDataSelection, HcLlListItemAlignment, HcResultListPaging,HcLlListItemAlignmentLinks, HcLlListItemAlignmentClusters,HcLlListItemAlignmentClusterViewItem} from './ListItems';
import {HcLlSubNavigation, HcLlCompareItem, HcLlAlignmantInfoBar} from './Utils';
import {HclLIconDataSelection, HclLIconAlignment} from './GoldenAgents';
import {
    AlignmentLinkComparePage,
    IAlignmentDetailPage,
    IAlignmentListPage,
    IClusterViewPage
} from "../../misc/interfaces";
const tempImg = require("../../images/ga-ll-tempNetwork.svg");


export function HcLlLayoutAlignmentOverview(props: {pageData: IAlignmentListPage}) {

        return (
            <React.Fragment>

                <HcLlSubNavigation pageTitle={props.pageData.pageTitle} isDs={props.pageData.pageNavDs} isAl={props.pageData.pageNavAl} />

                <div className="hcContentContainer hcMarginBottom2">
                    <div className="hcRowJustify">
                        <div className="hcBasicSideMargin">
                            {props.pageData.introductionText}
                        </div>
                        <div className="hcBasicSideMargin">
                            <button type="button" name="button">
                                New aligment
                            </button>
                        </div>
                    </div>
                </div>

                <div className="hcContentContainer hcMarginBottom5">

                    <div className="hcList hcMarginBottom1 hcBasicSideMargin">
                        <div className="hcListHeader">

                            <div className="hcLabel hcListItemLong">Name</div>
                            <div className="hcLabel hcTxtRight">Source</div>
                            <div className="hcLabel hcTxtRight">Targets</div>
                            <div className="hcLabel hcTxtRight">Links</div>
                            <div className="hcLabel hcTxtRight">Clusters</div>
                            <div className="hcLabel">Status</div>

                            <select className="" name="">
                                <option value="">Order by name</option>
                                <option value="">Order by date updated</option>
                                <option value="">Order by date create</option>
                            </select>

                        </div>
                    </div>

                    <div className="hcList hcListDisctinctLines hcBasicSideMargin hcMarginBottom2">
                        {/* results */}
                        {props.pageData.alignmentList.map(item => (<HcLlListItemAlignment prName={item.prName} prSource={item.prSource} prTarget={item.prTarget}  prLinks={item.prLinks} prCusters={item.prCusters} prStatus={item.prStatus} />))}

                    </div>
                    {/* pagination */}
                    <HcResultListPaging/>
                </div>


            </ React.Fragment>);

}






export function HcLlAlignmentDetail(props: {pageData: IAlignmentDetailPage}) {

        return (<React.Fragment>
                <HcLlSubNavigation pageTitle={props.pageData.pageTitle} isDs={props.pageData.pageNavDs} isAl={props.pageData.pageNavAl} />

                <HcLlAlignmantInfoBar
                    infoSources={props.pageData.infoSources}  infoTargets={props.pageData.infoTargets} infoLinks={props.pageData.infoLinks} infoClusters={props.pageData.infoClusters}
                />

                <div className="hcContentContainer hcMarginBottom5">
                    <div className="hcTabs hcTabsHoriz hcBasicSideMargin">
                        <div className="hcTabLabels">
                            <div className="hcTabLabel hcRoundedCornersTop" id="tab-list-info-a">Info</div>
                            <div className="hcTabLabel hcRoundedCornersTop" id="tab-list-matching-settings">Matching settings</div>
                            <div className="hcTabLabel hcRoundedCornersTop" id="tab-list-links">Links</div>
                            <div className="hcTabLabel hcRoundedCornersTop" id="tab-list-clusters">Clusters</div>
                        </div>
                        <div className="hcTabAllContent hcStickOutBoxAside hcRoundedCornersTop">

                            {/* tab: info */}
                            <div className="hcTabContent hcMarginTop2 hcForm" id="tab-content-info-a">
                                <h3>Name</h3>
                                <input type="text" name="name" defaultValue="defaultValue" className="hcMarginBottom2"/>
                                <h3>Description</h3>
                                <textarea name="name" rows={4} className="hcMarginBottom1"/>
                                <button type="button" name="button">
                                    Save research
                                </button>
                            </div>

                            {/* tab: matching-settings */}
                            <div className="hcTabContent hcMarginTop2" id="tab-content-matching-settings">
                                <h3>Sources</h3>
                                <div className="hcList hcMarginBottom1">
                                    {props.pageData.matchSetSrc.map(item => (<div className="hcRowJustify"> <div><HclLIconDataSelection/> {item}</div><div className="hcTxtRight"><a href="">Delete</a></div> </div>))}
                                </div>
                                <button type="button" className="hcMarginBottom2" >Add source</button>

                                <h3>Targets</h3>
                                <div className="hcList hcMarginBottom1">
                                    {props.pageData.matchSetTrg.map(item => (<div className="hcRowJustify"> <div><HclLIconDataSelection/> {item}</div><div className="hcTxtRight"><a href="">Delete</a></div> </div>))}
                                </div>
                                <button type="button" className="hcMarginBottom2">Add target</button>


                            </div>

                            {/* tab: Links */}
                            <div className="hcTabContent hcMarginTop2 hcForm" id="tab-content-links">
                                <div className="hcList hcMarginBottom1">
                                    <div className="hcListHeader">
                                        <div className="hcLabel">Strenght</div>
                                        <div className="hcLabel hcListItemLong">Source</div>
                                        <div className="hcLabel hcListItemLong">Targets</div>
                                        <div className="hcLabel hcListItemLong"></div>
                                    </div>
                                </div>

                                <div className="hcList hcMarginBottom1">
                                    {props.pageData.links.map(item => (<HcLlListItemAlignmentLinks links={item} />))}
                                </div>
                            </div>

                            {/* tab: Clusters */}
                            <div className="hcTabContent hcMarginTop2" id="tab-content-clusters">
                                <div className="hcList hcMarginBottom1">
                                    <div className="hcListHeader">
                                        <div className="hcLabel">Size</div>
                                        <div className="hcLabel">Links</div>
                                        <div className="hcLabel hcListItemLong" ></div>
                                        <div className="hcLabel hcListItemLong" ></div>
                                        <div className="hcLabel hcTxtCenter">Extened</div>
                                        <div className="hcLabel hcTxtCenter">Reconciled</div>
                                        <div className="hcLabel ">ID</div>
                                    </div>
                                </div>

                                <div className="hcList hcListDisctinctLines hcMarginBottom2" >
                                    {props.pageData.clusters.map(item => (<HcLlListItemAlignmentClusters cluster={item} />))}
                                </div>



                            </div>
                        </div>
                    </div>
                </div>
            </ React.Fragment>
        );
}


export function HcLlAlignmentsLinkCompare(props: {pageData: AlignmentLinkComparePage}) {

        return (
            <React.Fragment>

                <div className="hcContentContainer hcMarginBottom1 hcMarginTop1">
                    <div className="hcBasicSideMargin hcAlignRight">
                        <a href=""><button>View settings</button></a>
                        <a href="">Close</a>
                    </div>
                </div>

                <div className="hcContentContainer hcMarginBottom5">
                    <div className="hcLayoutCols122 hcVerticalLineSeperator">
                        <div className="hcBasicSideMargin">
                            <h3>Link</h3>
                            <div className="hcLabel">nr</div>
                            <div className="hcMarginBottom1">{props.pageData.nr}</div>
                            <div className="hcLabel">Strength</div>
                            <div>{props.pageData.strength}</div>
                        </div>

                        <div className="hcBasicSideMargin">
                            <h3>Source</h3>
                            <div className="hcMarginBottom1 hcSmallTxt"><a href={props.pageData.sUri}>{props.pageData.sUri}</a></div>
                            {props.pageData.sourceItems.map(item => (<HcLlCompareItem label={item.label} content={item.content} />))}
                        </div>
                        <div className="hcBasicSideMargin">
                            <h3>Target</h3>
                            <div className="hcMarginBottom1 hcSmallTxt"><a href={props.pageData.tUri}>{props.pageData.tUri}</a></div>
                            {props.pageData.targetItems.map(item => (<HcLlCompareItem label={item.label} content={item.content} />))}
                        </div>
                    </div>
                </div>

                <div className="hcStickyFooter hcStickyFooterLook hcContentContainer">
                    <div className="hc3columns hcBasicSideMargin">

                        <div className="hcTxtLeft"><button>Previous</button></div>
                        <div className="hcTxtCenter"><button className="bgColorBrand2">Accept</button><button className="hcClrBg_Error">Decline</button></div>
                        <div className="hcTxtRight"><button>Next</button></div>
                    </div>
                </div>
            </ React.Fragment>

        );
}



export function HcLlAlignmentsClusterView(props: {pageData: IClusterViewPage}) {

        return (
            <React.Fragment>
                <div className="hcContentContainer hcMarginBottom1 hcMarginTop1">
                    <div className="hcBasicSideMargin hcAlignRight">
                        <a href=""><button>View settings</button></a>
                        <a href="">Close</a>
                    </div>
                </div>


                <div className="hcLayoutCols112">
                    <div className="hcBasicSideMargin">
                        <div className="hcLabel">Source</div>
                        <div className="hcList hcListDisctinctLines">
                            {props.pageData.targetList.map(item => (<HcLlListItemAlignmentClusterViewItem field1={item.field1} field2={item.field2} field3={item.field3} />))}
                        </div>
                    </div>




                    <div className="hcBasicSideMargin">
                        <div className="hcBasicSideMargin">
                            <div className="hcLabel">Target</div>
                            <div className="hcList hcListDisctinctLines">
                                {props.pageData.sourceList.map(item => (<HcLlListItemAlignmentClusterViewItem field1={item.field1} field2={item.field2} field3={item.field3} />))}
                            </div>
                        </div>
                    </div>



                    <div className="hcBasicSideMargin">
                        <img src={tempImg} className="tempImg" />
                    </div>

                </div>

            </ React.Fragment>

        );
}
