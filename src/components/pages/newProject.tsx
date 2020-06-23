import React from 'react';
import {HcHeaderGoldenAgents} from "../page_elements/GoldenAgents";
import {HcLlLayoutProjectDetail} from "../page_elements/Pages";
import {ISendEvent, ISetJobEvent, ISetValueEvent} from "../../misc/interfaces";
import {IJob} from "../../misc/apiInterfaces";

export function NewProject(props: {parentCallBack: ISendEvent, setValue:ISetValueEvent, setJob:ISetJobEvent, jobID:string, jobData:IJob}) {
    return (
        <div className="App">
            <HcHeaderGoldenAgents toolName='Lenticular Lenses'
                                  projectName='New project' />
            <HcLlLayoutProjectDetail parentCallBack={props.parentCallBack} setValue={props.setValue} setJob={props.setJob} jobID={props.jobID} jobData={props.jobData}/>
        </div>
    )
}