import React from 'react';
import {HcHeaderGoldenAgents} from "../page_elements/GoldenAgents";
import {HcLlLayoutHome} from "../page_elements/Pages";
import {ISendEvent, ISetJobEvent, ISetValueEvent} from "../../misc/interfaces";
import {IJob} from "../../misc/apiInterfaces";
import {appName} from "../../misc/config";


export default function ResearchPick(props: {parentCallBack: ISendEvent, setValue:ISetValueEvent, setJob:ISetJobEvent, jobID:string, jobData:IJob, qsJobID:string | null}) {
    const homeData =
        {
            "pageTitle": "Home",
            "projectList": []
        }
        let qsID = "";
        if (props.qsJobID !== null) {
            qsID = props.qsJobID;
        }
    return (
        <div className="App">
            <HcHeaderGoldenAgents toolName={appName}
                                  projectName='Select project' />
            <HcLlLayoutHome pageData={homeData} parentCallBack={props.parentCallBack} setValue={props.setValue} setJob={props.setJob} jobID={props.jobID} qsJobID={qsID}/>
        </div>
    );
}

