import React from 'react';
import {HcHeaderGoldenAgents} from "../page_elements/GoldenAgents";
import {HcLlLayoutDataSelectionOverview} from "../page_elements/Pages";
import {IJob} from "../../misc/apiInterfaces";
import {IDataSelectionListPage, ISendEvent, ISetJobEvent} from "../../misc/interfaces";

export function EntitySelection(props: {parentCallBack: ISendEvent, jobData:IJob, setJob: ISetJobEvent}) {
    const pd:IDataSelectionListPage = {
        pageTitle: "Data selection - list",
        pageNavDs: true,
        pageNavAl: false,
        introductionText: "The data selection contains the selections of datasets you will work with. They can be entities with filters on them.",
        dsList: [

        ]
    }

    return (
      <div className="App">
          <HcHeaderGoldenAgents toolName="Lenticular Lenses" projectName={props.jobData.job_title} />
          <HcLlLayoutDataSelectionOverview parentCallBack={props.parentCallBack} pageData={pd} />
      </div>
    );
}