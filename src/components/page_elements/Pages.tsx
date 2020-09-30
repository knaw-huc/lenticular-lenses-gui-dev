import React from 'react';
import {
    HcLlListItemMinimal,
    HcLlListItemMinimal2Fields,
    HcLlListLabel,
    HcLlListItemDataSelection,
    HcLlListItemAlignment,
    HcResultListPaging,
    HcLlListItemAlignmentLinks,
    HcLlListItemAlignmentClusters,
} from './ListItems';
import {HcLlSubNavigation} from './Utils';
import {useState} from "react";
import {HclLIconDataSelection, HclLIconAlignment} from './GoldenAgents';
import {
    IHomePage,
    IDataSelectionListPage,
    IModalSelectDatasetPage,
    IAlignmentListPage,
    IAlignmentDetailPage,
    ISendEvent,
    ISetValueEvent,
    ISetValue,
    ISetJobEvent,
    ISetIndex,
    ISetBufferIndex,
    IReloadDatasets,
    ISetBufferIndexEvent,
    IDataSelectionDetailPage, IDataSetDetailForm, ISetJob
} from "../../misc/interfaces";
import {IJob, IJobBasic, IJobDataSet, ILensSpecs, ILinkSetSpecs, IUpdateJob} from "../../misc/apiInterfaces";
import {API_LOCATION, APP_HOME, AUTH_SERVER} from "../../misc/config";
import {defaultIJobDataSet} from "../../misc/functions";

export function HcLlLayoutHome(props: { pageData: IHomePage, parentCallBack: ISendEvent, setValue: ISetValueEvent, setJob: ISetJobEvent, jobID: string, qsJobID: string }) {
    let projectID: string = props.qsJobID;
    const [error, setError] = useState("");


    function handleChange(e: React.FormEvent<HTMLInputElement>) {
        projectID = e.currentTarget.value;
    }

    function submit() {
        if (projectID === "") {
            setError("No research ID given!");
        } else {
            getProject();
        }
    }

    function doLogin() {
        const form = document.createElement('form');
        form.action = AUTH_SERVER;
        form.method = 'POST';
        form.innerHTML = `<input name="hsurl" value=${window.location} type="hidden" />`;
        form.style.display = 'none';
        document.body.appendChild(form);
        form.submit();
    }

    async function getProject() {
        const url = API_LOCATION + "/job/" + projectID;
        try {
            const response = await fetch(url);
            const json: IJob = await response.json();
            const struc: ISetValue = {type: "SET_ID", value: json.job_id};
            props.setValue(struc);
            const jobStruc: ISetJob = {type: "SET_JOB", value: json};
            props.setJob(jobStruc);
            props.parentCallBack("ENTITY");
        } catch (err) {
            setError("Job not found! Try again with a correct job ID.");
        }
    }

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
                <button type="button" name="button" onClick={() => props.parentCallBack("NEW")}>
                    New research
                </button>
                <div className="hcLoginArea">
                    <h2>Login</h2>
                    Login to get access to private datasets.
                    <button type="button" name="loginButton" className="loginBtn" onClick={() => {
                        doLogin()
                    }}>
                        Login
                    </button>
                </div>
            </div>

            {/* right column */}
            <div className="hcBasicSideMargin hcMarginBottom4">
                <h2>Existing research</h2>
                <div>&nbsp;</div>
                {/*<div className="hcList hcMarginBottom4">
                    {props.pageData.projectList.map(item => (<HcLlListItemMinimal title={item.prName}/>))}
                </div>*/}
                <div className="hcStickOutBox hcRoundedCorners">
                    <p className="hcMarginBottom1">
                        Enter your research ID:
                    </p>
                    <input type="text" name="projectID" onChange={handleChange} className="hcMarginBottom1"
                           defaultValue={props.qsJobID}/>
                    <button type="button" name="button" onClick={submit}>
                        Load research
                    </button>
                </div>
            </div>
            <div className="errorMsg">{error}</div>
        </div>
    </div>);
}


export function HcLlLayoutProjectDetail(props: { parentCallBack: ISendEvent, setValue: ISetValueEvent, setJob: ISetJobEvent, jobID: string, jobData: IJob }) {
    let formData: IJobBasic = {
        job_title: props.jobData.job_title,
        job_description: props.jobData.job_description,
        job_link: props.jobData.job_link
    };

    let nw: boolean = false;

    if (props.jobID === "") {
        nw = true;
    }

    const [newJob, setNewJob] = useState<boolean>(nw);

    function handleChange(e: React.FormEvent<HTMLInputElement>): void {
        switch (e.currentTarget.name) {
            case "job_title":
                formData.job_title = e.currentTarget.value;
                break;
            case "job_link":
                formData.job_link = e.currentTarget.value;
                break;
        }
    }

    function handleTextChange(e: React.FormEvent<HTMLTextAreaElement>): void {
        formData.job_description = e.currentTarget.value;
    }

    function sendData() {
        if (newJob) {
            sendNew();
        } else {
            sendUpdate();
        }
    }

    async function sendNew() {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData)
        };
        const response = await fetch(API_LOCATION + "/job/create", requestOptions);
        const data = await response.json();
        console.log(data);
        if (data.result === "created") {
            props.setValue({type: "SET_ID", value: data.job_id});
        }
        window.location.href = APP_HOME + "?job_id=" + data.job_id;
        //props.parentCallBack("FETCH");
    }

    async function sendUpdate() {
        let updateValues: IUpdateJob = {
            job_id: props.jobData.job_id,
            job_title: formData.job_title,
            job_description: formData.job_description,
            job_link: formData.job_link
        }


        if (props.jobData.entity_type_selections !== null) {
            updateValues.entity_type_selections = props.jobData.entity_type_selections;
        }

        if (props.jobData.lens_specs !== null) {
            updateValues.lens_specs = props.jobData.lens_specs;
        }

        if (props.jobData.linkset_specs !== null) {
            updateValues.linkset_specs = props.jobData.linkset_specs;
        }

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(updateValues)
        };
        const response = await fetch(API_LOCATION + "/job/update", requestOptions);
        console.log(response);
        const data = await response.json();
        if (data.result !== undefined && data.result === "updated") {
            props.setValue({type: "SET_ID", value: data.job_id});
        }

    }


    return (<div className="hcContentContainer hcMarginBottom4 hcMarginTop5">
        <form className="hc2columns">

            {/* left column */}
            <div className="hcMarginBottom2 hcBasicSideMargin hcForm">
                <h3>Research name</h3>
                <input type="text" name="job_title" defaultValue={formData.job_title} onChange={handleChange}
                       className="hcMarginBottom2"/>

                <h3>Research description</h3>
                <textarea className="hcMarginBottom1" name="job_description"
                          defaultValue={formData.job_description} onChange={handleTextChange}>

                </textarea>

                <h3>Research link</h3>
                <input type="text" name="job_link" defaultValue={formData.job_link} onChange={handleChange}
                       className="hcMarginBottom2"/>
                <button type="button" onClick={() => props.parentCallBack("RESEARCH")}>Back</button>
                <button type="button" onClick={() => sendData()}>Save research</button>
                {!newJob ? (
                    <button type="button" onClick={() => props.parentCallBack("ENTITY")}>Next</button>
                ) : (<div/>)}
            </div>

            {/* right column */}
            <div className="hcBasicSideMargin hcMarginBottom4"></div>
        </form>
    </div>);

}


export function HcLlLayoutDataSelectionOverview(props: { parentCallBack: ISendEvent, pageData: IDataSelectionListPage, jobData: IJob, setJob: ISetJobEvent, setBufferIndex: ISetBufferIndexEvent }) {
    const [refresh, setRefresh] = useState(true);

    const reload: IReloadDatasets = () => {
        setRefresh(!refresh);
    }

    let formData: IJob = {
        entity_type_selections: props.jobData.entity_type_selections,
        job_description: props.jobData.job_description,
        job_id: props.jobData.job_id,
        job_link: props.jobData.job_link,
        job_title: props.jobData.job_title,
        lens_specs: props.jobData.lens_specs,
        linkset_specs: props.jobData.linkset_specs
    }

    async function sendJob(data: IJob) {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData)
        };
        const response = await fetch(API_LOCATION + "/job/update", requestOptions);
        const json: any = await response.json();

        if (json.result === "updated") {
            const sj: ISetJob = {
                type: "SET_JOB",
                value: formData
            }
            props.setJob(sj);

            const index: number = formData.entity_type_selections.length - 1;
            const struc: ISetBufferIndex = {
                type: "SET_INDEX",
                value: 0
            };
            props.setBufferIndex(struc);
            //console.log(formData.entity_type_selections.length);
            props.parentCallBack("DATASET_DETAIL");
        } else {
            console.log(json);
        }
    }

    function newDataSelection() {
        const dataSet: IJobDataSet = defaultIJobDataSet();
        if (formData.entity_type_selections == null) {
            formData.entity_type_selections = [];
        }
        if (formData.lens_specs == null) {
            formData.lens_specs = [];
        }
        if (formData.linkset_specs == null) {
            formData.linkset_specs = [];
        }
        dataSet.id = formData.entity_type_selections.length;
        formData.entity_type_selections.unshift(dataSet);
        sendJob(formData);
    }

    return (<React.Fragment>
        <HcLlSubNavigation pageTitle={props.pageData.pageTitle} isAl={props.pageData.pageNavAl}
                           isDs={props.pageData.pageNavDs} goTo = {props.parentCallBack} />

        <div className="hcContentContainer hcMarginBottom2">
            <div className="hcRowJustify">
                <div className="hcBasicSideMargin">
                    The data selection contains the selections of datasets you will work with.
                    <br/>They can be entities with filters on them.
                </div>
                <div className="hcBasicSideMargin">
                    <button type="button" name="button" onClick={() => newDataSelection()}>
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

                {/*<div>
                    <select className="" name="">
                        <option value="">Order by name</option>
                        <option value="">Order by date updated</option>
                        <option value="">Order by date create</option>
                    </select>
                </div>*/}
            </div>

            <div className="hcList hcListDisctinctLines hcBasicSideMargin hcMarginBottom2">
                {/* results */}
                {props.pageData.dsList.map(item => (
                    <HcLlListItemDataSelection parentCallBack={props.parentCallBack} idsList={item}
                                               jobData={props.jobData} setJob={props.setJob} reload={reload}
                                               setBufferIndex={props.setBufferIndex}/>))}
            </div>
            {/* pagination */}
            <HcResultListPaging/>
        </div>
    </ React.Fragment>);
}


export function HcLlDataSelectionDetail(props: { pageData: IDataSelectionDetailPage, parentCallBack: ISendEvent, jobData: IJob, setJob: ISetJobEvent, dsIndex: number }) {
    const [tab, setTab] = useState("info");
    const formData: IDataSetDetailForm = {
        label: props.pageData.pageTitle,
        description: props.pageData.description
    }

    function change(item: string) {
        setTab(item);
    }

    function submit() {
        let job = props.jobData;
        job.entity_type_selections[props.dsIndex].label = formData.label;
        job.entity_type_selections[props.dsIndex].description = formData.description;
        sendJob(job);
    }

    async function sendJob(job: IJob) {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(job)
        };
        const response = await fetch(API_LOCATION + "/job/update", requestOptions);
        const json: any = await response.json();

        if (json.result === "updated") {
            update_data(job);
        } else {
            console.log(json);
        }
    }

    function selectEntity() {
        props.parentCallBack("DATASETS");
    }

    function update_data(job: IJob) {
        const struc: ISetJob = {
            type: "SET_JOB",
            value: job
        }
        props.setJob(struc);
        props.parentCallBack("ENTITY");
    }

    function handleChange(e: React.FormEvent<HTMLInputElement>): void {
        switch (e.currentTarget.name) {
            case "label":
                formData.label = e.currentTarget.value;
                break;
        }
    }

    function handleTextChange(e: React.FormEvent<HTMLTextAreaElement>): void {
        formData.description = e.currentTarget.value;
    }

    return (<React.Fragment>
            <HcLlSubNavigation pageTitle={props.pageData.pageTitle} isAl={props.pageData.pageNavAl}
                               isDs={props.pageData.pageNavDs} goTo={props.parentCallBack}/>
            {/*<div className="hcContentContainer hcMarginBottom3">
                <div className="hcRowJustify">
                    <div className="hcBasicSideMargin">
                        <h3><HclLIconDataSelection/>
                            {props.pageData.pageTitle}</h3>
                    </div>
                </div>
            </div>*/}

            <div className="hcContentContainer hcMarginBottom5">
                <div className="hcTabs hcTabsHoriz hcBasicSideMargin">
                    <div className="hcTabLabels">
                        <div className="hcTabLabel hcRoundedCornersTop" id="tab-list-info"
                             onClick={() => setTab("info")}>Info
                        </div>
                        <div className="hcTabLabel hcRoundedCornersTop" id="tab-list-dataset"
                             onClick={() => setTab("set")}>Dataset
                        </div>
                        <div className="hcTabLabel hcRoundedCornersTop" id="tab-list-filter"
                             onClick={() => setTab("filter")}>Filter
                        </div>
                        <div className="hcTabLabel hcRoundedCornersTop" id="tab-list-sample"
                             onClick={() => setTab("sample")}>Sample
                        </div>
                        <div className="hcTabLabel hcRoundedCornersTop" id="tab-list-relation"
                             onClick={() => setTab("relation")}>Relation
                        </div>
                    </div>
                    <div className="hcTabAllContent hcStickOutBoxAside hcRoundedCornersTop">

                        {/* tab: info */}
                        {tab === "info" ? (
                            <div className="hcTabContent hcMarginTop2 hcForm" id="tab-content-info">
                                <h3>Label</h3>
                                <input type="text" name="label" defaultValue={props.pageData.pageTitle} placeholder="Type name of your selection"
                                       className="hcMarginBottom2" onChange={handleChange}/>
                                <h3>Description</h3>
                                <textarea name="description" rows={4} defaultValue={props.pageData.description} placeholder="Add your description"
                                          className="hcMarginBottom1" onChange={handleTextChange}/><br/>
                                <button type="button" name="button" onClick={() => submit()}>
                                    Save research
                                </button>
                                <button type="button" name="back" onClick={() => {
                                    props.parentCallBack("ENTITY")
                                }}>
                                    Back
                                </button>
                            </div>) : (<div/>)
                        }
                        {/* tab: Dataset and entity */}
                        {tab === "set" ? (
                            <div className="hcTabContent hcMarginTop2" id="tab-content-dataset">
                                <h3>Dataset and entity</h3>
                                <div>
                                    <div className="hc2columns hcMarginBottom2">
                                        <div>
                                            <div className="hcLabel">dataset</div>
                                            {props.pageData.dataset}
                                            {/*<div className="hcSmallTxt hcClrTxt_Grey">
                                            Enriched version of the Index op ondertrouwregisters. Enrichment by
                                            Golden Agents.
                                        </div>*/}
                                        </div>
                                        <div>
                                            <div className="hcLabel">entity</div>
                                            {props.pageData.collection}
                                        </div>
                                    </div>
                                    <button type="button" name="button" onClick={() => {selectEntity();}}>
                                        Select data
                                    </button>
                                </div>

                            </div>) : (<div/>)
                        }

                        {/* tab: Filter */}
                        {tab === "filter" ? (
                            <div className="hcTabContent hcMarginTop2 hcForm" id="tab-content-filter">
                                <h3>Filter</h3>


                            </div>) : (<div/>)
                        }

                        {/* tab: Sample */}
                        {tab === "sample" ? (
                            <div className="hcTabContent hcMarginTop2" id="tab-content-sample">
                                <h3>Sample</h3>
                                <div className="hc2columns">
                                    <div>Only use a sample of this amount of records (-1 is no limit)</div>
                                    <div><input type="number" value="-1"/></div>
                                </div>
                            </div>) : (<div/>)
                        }

                        {/* tab: Relation */}
                        {tab === "relation" ? (
                            <div className="hcTabContent hcMarginTop2" id="tab-content-relation">
                                <h3>Relation</h3>
                            </div>) : (<div/>)
                        }

                    </div>
                </div>
            </div>
        </ React.Fragment>
    );
}


{/* Modal select dataset */
}

export function HcLlSelectDataset(props: { pageData: IModalSelectDatasetPage, parentCallback: ISetIndex }) {

    return (
        <React.Fragment>
            <div className=" hc2columns">
                <div className="hcList hcMarginBottom4 hcBasicSideMargin hcMaxhalf">
                    {props.pageData.datasetList.map(item => (
                        <HcLlListItemMinimal2Fields fields={item} setIndex={props.pageData.setIndex}
                                                    parentCallback={props.parentCallback}/>))}

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
                            <HcLlListItemMinimal title={item.field}/>))}
                    </div>
                </div>
            </div>


        </ React.Fragment>);
}


{/* Modal select dataset */
}

export function HcLlLayoutAlignmentOverview(props: { pageData: IAlignmentListPage, parentCallBack: ISendEvent }) {

    return (
        <React.Fragment>

            <HcLlSubNavigation pageTitle={props.pageData.pageTitle} isAl={props.pageData.pageNavAl}
                               isDs={props.pageData.pageNavDs}  goTo={props.parentCallBack}/>

            <div className="hcContentContainer hcMarginBottom2">
                <div className="hcRowJustify">
                    <div className="hcBasicSideMargin">
                        Alignments
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
                    {props.pageData.alignmentList.map(item => (
                        <HcLlListItemAlignment prName={item.prName} prSource={item.prSource}
                                               prTarget={item.prTarget} prLinks={item.prLinks}
                                               prCusters={item.prCusters} prStatus={item.prStatus}/>))}

                </div>
                {/* pagination */}
                <HcResultListPaging/>
            </div>


        </ React.Fragment>);
}


export function HcLlAlignmentDetail(props: { pageData: IAlignmentDetailPage, parentCallBack: ISendEvent }) {

    return (<React.Fragment>
            <HcLlSubNavigation pageTitle={props.pageData.pageTitle} isAl={props.pageData.pageNavAl}
                               isDs={props.pageData.pageNavDs} goTo={props.parentCallBack}/>
            <div className="hcContentContainer hcMarginBottom3">
                <div className="hcRowJustify">
                    <div className="hcBasicSideMargin">
                        <h3><HclLIconAlignment/> Getty & Frick vs NA:: soundex 0,85</h3>
                    </div>
                </div>
            </div>

            <div className="hcContentContainer hcMarginBottom5">
                <div className="hcTabs hcTabsHoriz hcBasicSideMargin">
                    <div className="hcTabLabels">
                        <div className="hcTabLabel hcRoundedCornersTop" id="tab-list-info-a">Info</div>
                        <div className="hcTabLabel hcRoundedCornersTop" id="tab-list-matching-settings">Matching
                            settings
                        </div>
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
                                {props.pageData.matchSetSrc.map(item => (<div className="hcRowJustify">
                                    <div><HclLIconDataSelection/> {item}</div>
                                    <div className="hcTxtRight"><a href="">Delete</a></div>
                                </div>))}
                            </div>
                            <button type="button" className="hcMarginBottom2">Add source</button>

                            <h3>Targets</h3>
                            <div className="hcList hcMarginBottom1">
                                {props.pageData.matchSetTrg.map(item => (<div className="hcRowJustify">
                                    <div><HclLIconDataSelection/> {item}</div>
                                    <div className="hcTxtRight"><a href="">Delete</a></div>
                                </div>))}
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
                                {props.pageData.links.map(item => (
                                    <HcLlListItemAlignmentLinks links={item}/>))}
                            </div>
                        </div>

                        {/* tab: Clusters */}
                        <div className="hcTabContent hcMarginTop2" id="tab-content-clusters">
                            <div className="hcList hcMarginBottom1">
                                <div className="hcListHeader">
                                    <div className="hcLabel">Size</div>
                                    <div className="hcLabel">Links</div>
                                    <div className="hcLabel hcListItemLong"></div>
                                    <div className="hcLabel hcListItemLong"></div>
                                    <div className="hcLabel hcTxtCenter">Extened</div>
                                    <div className="hcLabel hcTxtCenter">Reconciled</div>
                                    <div className="hcLabel ">ID</div>
                                </div>
                            </div>

                            <div className="hcList hcListDisctinctLines hcMarginBottom2">
                                {props.pageData.clusters.map(item => (
                                    <HcLlListItemAlignmentClusters cluster={item}/>))}
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </ React.Fragment>
    );
}
