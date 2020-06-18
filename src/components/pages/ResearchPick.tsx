import React from 'react';
import {HcHeaderGoldenAgents} from "../page_elements/GoldenAgents";
import {HcLlLayoutHome} from "../page_elements/Pages";
import {ISendEvent} from "../../misc/interfaces";


export default function ResearchPick(props: {parentCallBack: ISendEvent}) {
    const homeData =
        {
            "pageTitle": "Home",
            "projectList": []
        }

    return (
        <div className="App">
            <HcHeaderGoldenAgents toolName='Lenticular Lenses'
                                  projectName='Select project' />
            <HcLlLayoutHome pageData={homeData} parentCallBack={props.parentCallBack}/>
        </div>
    );
}

