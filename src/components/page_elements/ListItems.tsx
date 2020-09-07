import React from 'react';
import {HclLIconDataSelection, HclLIconAlignment} from './GoldenAgents';
import {
    AlignmentLinkComparePage,
    IAlignmentList, IClusterList,
    IDoubleList,
    IDsList,
    ILinkList, IReloadDatasets, ISendEvent, ISetIndex, ISetBufferIndex, ISetBufferIndexEvent, ISetJob, ISetJobEvent,
    ITripleList
} from "../../misc/interfaces";
import {IJob, IJobDataSet, ILensSpecs, ILinkSetSpecs} from "../../misc/apiInterfaces";
import {defaultIJobDataSet} from "../../misc/functions";
import {API_LOCATION} from "../../misc/config";


export function HcLlListItemMinimal(props: { title: string }) {

    return (
        <div className="hcEntityName">
            {props.title}
        </div>


    );
}

export function HcLlSelectEntityFromList(props: { title: string, setIndex: string, jobData: IJob, switchState: ISendEvent, setJob: ISetJobEvent }) {
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
        const response = await fetch("/job/update", requestOptions);
        const json: any = await response.json();

        if (json.result === "updated") {
            const sj: ISetJob = {
                type: "SET_JOB",
                value: formData
            }
            props.setJob(sj);
            props.switchState("ENTITY");
        } else {
            console.log(json);
        }
    }

    return (
        <div className="hcEntityName" onClick={() => {
            const dataSet: IJobDataSet = defaultIJobDataSet();
            dataSet.id = formData.entity_type_selections.length;
            dataSet.dataset.dataset_id = props.setIndex;
            dataSet.dataset.collection_id = props.title;
            formData.entity_type_selections.push(dataSet);

            sendJob(formData);
        }}>
            {props.title}
        </div>


    );
}


export function HcLlListItemMinimal2Fields(props: { fields: IDoubleList, setIndex: string, parentCallback: ISetIndex }) {
    const active: boolean = props.fields.key == props.setIndex;
    let klasse: string = "";
    if (active) {
        klasse = "hcAlignVerticalActive hcIsLink";
    } else {
        klasse = "hcAlignVertical hcIsLink";
    }


    return (
        <div className={klasse} onClick={() => props.parentCallback(props.fields.key)}>
            <div>
                {props.fields.field1}
                <div className="hcSmallTxt hcClrTxt_Grey">
                    {props.fields.field2}
                </div>
            </div>
        </div>


    );
}


export function HcLlListLabel(props: { title: string }) {

    return (
        <div className="hcLabel">
            {props.title}
        </div>


    );
}


export function HcLlListItemDataSelection(props: { parentCallBack: ISendEvent, idsList: IDsList, jobData:IJob, setJob: ISetJobEvent, reload: IReloadDatasets, setBufferIndex: ISetBufferIndexEvent }) {
    function duplicate(index: number): void {
        let job = props.jobData;
        const buffer = JSON.parse(JSON.stringify(job.entity_type_selections));
        let currentDataSet: IJobDataSet = buffer[index];
        job.entity_type_selections.push(currentDataSet);
        sendJob(job);
    }

    function remove(index: number): void {
        let job = props.jobData;
        job.entity_type_selections.splice(index, 1);
        sendJob(job);
    }

    async function sendJob(job: IJob) {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(job)
        };
        const response = await fetch("/job/update", requestOptions);
        const json: any = await response.json();

        if (json.result === "updated") {
            update_data(job);
        } else {
            console.log(json);
        }
    }

    function update_data(job: IJob) {
        const struc:ISetJob = {
            type: "SET_JOB",
            value: job
        }
        props.setJob(struc);
        props.reload();
    }

    function loadPage(index: number): void {
        const struc: ISetBufferIndex = {
            type: "SET_INDEX",
            value: index
        };
        props.setBufferIndex(struc);
        props.parentCallBack("DATASET_DETAIL");
    }


    return (
        <div className="hcListBasicResult">
            <div className="hcListItemLong" onClick={() => {loadPage(props.idsList.dsIndex)}}>
                <strong><HclLIconDataSelection/> {props.idsList.dsName}</strong>
                <div className="hcSmallTxt">
                    {props.idsList.dsDataset}
                </div>
                <div className="hcSmallTxt">
                    {props.idsList.dsProvider}
                </div>
            </div>
            <div className="hcListActionItem" onClick={() => {alert("No samples available.");}}>Show sample</div>
            <div className="hcListActionItem" onClick={() => {duplicate(props.idsList.dsIndex)}}>Duplicate</div>
            <div className="hcListActionItem" onClick={() => {remove(props.idsList.dsIndex)}}>Delete</div>
        </div>
    );
}


export function HcLlListItemAlignment(props: IAlignmentList) {

    return (
        <div className="hcListBasicResult">
            <div className="hcListItemLong">
                <strong> <HclLIconAlignment/>{props.prName}</strong>
            </div>
            <div className="hcSmallTxt hcTxtRight">
                {props.prSource}
            </div>
            <div className="hcSmallTxt hcTxtRight">
                {props.prSource}
            </div>
            <div className="hcSmallTxt hcTxtRight">
                {props.prTarget}
            </div>
            <div className="hcSmallTxt hcTxtRight">
                {props.prLinks}
            </div>
            <div className="hcSmallTxt hcTxtRight">
                {props.prCusters}
            </div>
            <div className="hcSmallTxt hcTxtRight">
                {props.prStatus}
            </div>
            <div><a href="">Duplicate</a></div>
        </div>


    );
}


export function HcLlListItemAlignmentLinks(props: { links: ILinkList }) {

    return (
        <div className="hcListBasicResult">
            <div className="hcListItemLong">{props.links.strength}</div>
            <div className="hcListItemLong">
                <div className="hcLabel"><HclLIconDataSelection/></div>
                <strong></strong>
                <div className="hcSmallTxt hcClrTxt_Grey hcTextTruncate"></div>
            </div>
            <div className="hcListItemLong">
                <div className="hcLabel"><HclLIconDataSelection/></div>
                <strong></strong>
                <div className="hcSmallTxt hcClrTxt_Grey hcTextTruncate"></div>
            </div>
            <div className="hcListItemLong">
                <button type="button" name="button">Compare</button>
                <button className="bgColorBrand2">Accept</button>
                <button className="hcClrBg_Error">Decline</button>
            </div>
        </div>
    );

}


export function HcLlListItemAlignmentClusters(props: { cluster: IClusterList }) {

    return (
        <div className="hcListBasicResult">
            <div className="hcSmallTxt">391</div>
            <div className="hcSmallTxt">73.642</div>
            <div className="hcListItemLong">
                <div className="hcLabel"><HclLIconDataSelection/> foaf_name</div>
                <strong>Mary Jans</strong>
            </div>
            <div className="hcListItemLong">
                <div className="hcLabel"><HclLIconDataSelection/> Schema_Name</div>
                <strong>Brugge-Antwerpen</strong>
            </div>
            <div className="hcSmallTxt hcTxtCenter"> x</div>
            <div className="hcSmallTxt hcTxtCenter"> x</div>
            <div className="hcSmallTxt"> 2345234542</div>
        </div>
    );
}


export function HcLlListItemAlignmentClusterViewItem(props: ITripleList) {

    return (
        <div>
            <div>
                <div>{props.field1}</div>
                <strong>{props.field2}</strong>
                <div className="hcSmallTxt hcClrTxt_Grey">{props.field3}</div>
            </div>
        </div>

    );
}


export function HcResultListPaging() {

    return (
        <div className="hcPagination">
            {/*<div><a href="#">← Previous</a></div>
            <div><a href="#">1</a></div>
            <div className="bgColorBrand2"><a href="#">2</a></div>
            <div><a href="#">3</a></div>
            <div><a href="#">4</a></div>
            <div><a href="#">5</a></div>
            <div><a href="#">6</a></div>
            <div><a href="#">Next →</a></div>*/}
        </div>
    );
}
