import React from 'react';
import {HcHeaderGoldenAgents} from "../page_elements/GoldenAgents";
import {HcLlLayoutProjectDetail} from "../page_elements/Pages";
import {ISendEvent} from "../../misc/interfaces";
import {IJob} from "../../misc/apiInterfaces";

export function NewProject(props: {parentCallBack: ISendEvent, jobData:IJob}) {
    return (
        <div className="App">
            <HcHeaderGoldenAgents toolName='Lenticular Lenses'
                                  projectName='New project' />
            <HcLlLayoutProjectDetail parentCallBack={props.parentCallBack} jobData={props.jobData}/>
        </div>
    )
}