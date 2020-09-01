import React from 'react';
import {
    HcLlListItemMinimal,
    HcLlListItemMinimal2Fields,
    HcLlListLabel,
    HcLlSelectEntityFromList,
    HcLlListItemDataSelection,
    HcLlListItemAlignment,
    HcResultListPaging,
    HcLlListItemAlignmentLinks,
    HcLlListItemAlignmentClusters
} from './ListItems';
import {HcLlSubNavigation} from './Utils';
import {HclLIconDataSelection, HclLIconAlignment} from './GoldenAgents';
import {
    IDataSelectionDetailPage,
    IDataSelectionListPage,
    IModalSelectDatasetPage, ISendEvent,
    ISetIndex, ISetJobEvent
} from "../../misc/interfaces";
import {IJob} from "../../misc/apiInterfaces";


export function HcLlLayoutDataSelectionOverview(props: {pageData: IDataSelectionListPage}) {

    return (<React.Fragment>
        <HcLlSubNavigation pageTitle={props.pageData.pageTitle} isDs={props.pageData.pageNavDs}
                           isAl={props.pageData.pageNavAl}/>

        <div className="hcContentContainer hcMarginBottom2">
            <div className="hcRowJustify">
                <div className="hcBasicSideMargin">
                    {props.pageData.introductionText}
                </div>
                <div className="hcBasicSideMargin">
                    <button type="button" name="button">
                        New data selection
                    </button>
                </div>
            </div>
        </div>

        <div className="hcContentContainer hcMarginBottom5">
            <div className="hcResultsHeader hcMarginBottom1 hcBasicSideMargin">
                <div>
                    {/* labels */}
                    <HcLlListLabel title="Data selections"/>
                </div>

                <div>
                    <select className="" name="">
                        <option value="">Order by name</option>
                        <option value="">Order by date updated</option>
                        <option value="">Order by date create</option>
                    </select>
                </div>
            </div>

            <div className="hcList hcListDisctinctLines hcBasicSideMargin hcMarginBottom2">
                {/* results */}
                {props.pageData.dsList.map(item => (
                    <HcLlListItemDataSelection idsList={item}/>))}

            </div>
            {/* pagination */}
            <HcResultListPaging/>
        </div>
    </ React.Fragment>);
}


export function HcLlDataSelectionDetail(props: {pageData: IDataSelectionDetailPage}) {

    return (<React.Fragment>
            <HcLlSubNavigation pageTitle={props.pageData.pageTitle} isDs={props.pageData.pageNavDs}
                               isAl={props.pageData.pageNavAl}/>


            <div className="hcContentContainer hcMarginBottom5">
                <div className="hcTabs hcTabsHoriz hcBasicSideMargin">
                    <div className="hcTabLabels">
                        <div className="hcTabLabel hcRoundedCornersTop" id="tab-list-info">Info</div>
                        <div className="hcTabLabel hcRoundedCornersTop" id="tab-list-dataset">Dataset</div>
                        <div className="hcTabLabel hcRoundedCornersTop" id="tab-list-filter">Filter</div>
                        <div className="hcTabLabel hcRoundedCornersTop" id="tab-list-sample">Sample</div>
                        <div className="hcTabLabel hcRoundedCornersTop" id="tab-list-relation">Relation</div>
                    </div>
                    <div className="hcTabAllContent hcStickOutBoxAside hcRoundedCornersTop">

                        {/* tab: info */}
                        <div className="hcTabContent hcMarginTop2 hcForm" id="tab-content-info">
                            <h3>Name</h3>
                            <input type="text" name="name" defaultValue="defaultValue" className="hcMarginBottom2"/>
                            <h3>Description</h3>
                            <textarea name="name" rows={4} className="hcMarginBottom1"/>
                            <button type="button" name="button">
                                Save project
                            </button>
                        </div>

                        {/* tab: Dataset and entity */}
                        <div className="hcTabContent hcMarginTop2" id="tab-content-dataset">
                            <h3>Dataset and entity</h3>
                            <div>
                                <div className="hc2columns hcMarginBottom2">
                                    <div>
                                        <div className="hcLabel">dataset</div>
                                        Enriched version of the Index op ondertrouwregisters
                                        <div className="hcSmallTxt hcClrTxt_Grey">
                                            Enriched version of the Index op ondertrouwregisters. Enrichment by Golden
                                            Agents.
                                        </div>
                                    </div>
                                    <div>
                                        <div className="hcLabel">entity</div>
                                        saa_Person
                                    </div>
                                </div>
                                <button type="button" name="button">
                                    Select data
                                </button>
                            </div>

                        </div>

                        {/* tab: Filter */}
                        <div className="hcTabContent hcMarginTop2 hcForm" id="tab-content-filter">
                            <h3>Filter</h3>


                        </div>

                        {/* tab: Sample */}
                        <div className="hcTabContent hcMarginTop2" id="tab-content-sample">
                            <h3>Sample</h3>
                            <div className="hc2columns">
                                <div>Only use a sample of this amount of records (-1 is no limit)</div>
                                <div><input type="number" value="-1"/></div>
                            </div>
                        </div>

                        {/* tab: Relation */}
                        <div className="hcTabContent hcMarginTop2" id="tab-content-relation">
                            <h3>Relation</h3>
                        </div>

                    </div>
                </div>
            </div>
        </ React.Fragment>
    );
}


{/* Modal select dataset */
}

export function HcLlSelectDataset(props: {pageData: IModalSelectDatasetPage, parentCallback: ISetIndex, jobData: IJob, switchState:ISendEvent, setJob: ISetJobEvent}) {

    return (
        <React.Fragment>
            <div className=" hc2columns">
                <div className="hcList hcMarginBottom4 hcBasicSideMargin hcMaxhalf">
                    {props.pageData.datasetList.map(item => (
                        <HcLlListItemMinimal2Fields fields={item} setIndex={props.pageData.setIndex} parentCallback= {props.parentCallback} />))}

                </div>
                <div className="hcBasicSideMargin hcClrBg_Grey05 hcleftMark">
                    <div className="hcMarginTop2">
                        <strong>
                            {props.pageData.detailInfoName}
                        </strong>
                    </div>
                    <div className="hcSmallTxt hcClrTxt_Grey">
                        {props.pageData.detailInfoProvider}
                    </div>
                    <div className="hcSmallTxt hcClrTxt_Grey hcMarginBottom1">
                        {props.pageData.detailInfodescription}
                    </div>
                    <div className="hcLabel">Entity</div>
                    <div className="hcList ">
                        {props.pageData.detailInfoEntities.map(item => (
                            <HcLlSelectEntityFromList title={item.field} setIndex={props.pageData.setIndex} jobData={props.jobData} switchState={props.switchState} setJob={props.setJob}/>))}
                    </div>
                </div>
            </div>


        </ React.Fragment>);
}
