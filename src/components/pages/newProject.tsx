import React from 'react';
import {HcHeaderGoldenAgents} from "../page_elements/GoldenAgents";
import {HcLlLayoutProjectDetail} from "../page_elements/Pages";
import {ISendEvent, ISetIDEvent} from "../../misc/interfaces";
import {IJob} from "../../misc/apiInterfaces";

export function NewProject(props: {parentCallBack: ISendEvent, setID:ISetIDEvent, jobData:IJob}) {
    return (
        <div className="App">
            <HcHeaderGoldenAgents toolName='Lenticular Lenses'
                                  projectName='New project' />
            <HcLlLayoutProjectDetail parentCallBack={props.parentCallBack} setID={props.setID} jobData={props.jobData}/>
        </div>
    )
}