import React from 'react';
import {HcHeaderGoldenAgents} from "../page_elements/GoldenAgents";
import {HcLlLayoutDataSelectionOverview} from "../page_elements/Pages";
import {IJob} from "../../misc/apiInterfaces";
import {
    ICreateList,
    IDataSelectionListPage,
    IDsList,
    ISendEvent,
    ISetBufferIndexEvent,
    ISetJobEvent
} from "../../misc/interfaces";
import {appName} from "../../misc/config";

export function EntitySelection(props: { parentCallBack: ISendEvent, jobData: IJob, setJob: ISetJobEvent, setBufferIndex: ISetBufferIndexEvent }) {
    const pd: IDataSelectionListPage = {
        pageTitle: "Data selection - list",
        pageNavDs: true,
        pageNavAl: false,
        introductionText: "The data selection contains the selections of datasets you will work with. They can be entities with filters on them.",
        dsList: createList(props.jobData)
    }

    function createList(jd: IJob): IDsList[] {
        let retList: IDsList[] = [];
        if (jd.entity_type_selections !== null) {
            jd.entity_type_selections.map((item, index) => {
                const buffer: IDsList = {
                    dsName: item.label,
                    dsDataset: item.description,
                    dsProvider: "",
                    dsIndex: index
                }
                retList.push(buffer);
            });
        }
        return retList;
    }

    return (
        <div className="App">
            <HcHeaderGoldenAgents toolName={appName} projectName={props.jobData.job_title}/>
            <HcLlLayoutDataSelectionOverview parentCallBack={props.parentCallBack} pageData={pd} jobData={props.jobData}
                                             setJob={props.setJob} setBufferIndex={props.setBufferIndex}/>
        </div>
    );
}