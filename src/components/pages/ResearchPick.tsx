import React from 'react';
import {HcHeaderGoldenAgents} from "../page_elements/GoldenAgents";
import {HcLlLayoutHome} from "../page_elements/Pages";
import {ISendEvent, ISetIDEvent} from "../../misc/interfaces";


export default function ResearchPick(props: {parentCallBack: ISendEvent, setID:ISetIDEvent , jobID: string}) {
    const homeData =
        {
            "pageTitle": "Home",
            "projectList": []
        }

    return (
        <div className="App">
            <HcHeaderGoldenAgents toolName='Lenticular Lenses'
                                  projectName='Select project' />
            <HcLlLayoutHome pageData={homeData} parentCallBack={props.parentCallBack} setID={props.setID} jobID={props.jobID}/>
        </div>
    );
}

