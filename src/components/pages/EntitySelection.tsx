import React from 'react';
import {HcHeaderGoldenAgents} from "../page_elements/GoldenAgents";
import {HcLlLayoutDataSelectionOverview} from "../page_elements/Pages";
import {IJob} from "../../misc/apiInterfaces";
import {IDataSelectionListPage} from "../../misc/interfaces";

export function EntitySelection(props: {jobData:IJob}) {
    const pd:IDataSelectionListPage = {
        pageTitle: "Data selection - list",
        pageNavDs: true,
        pageNavAl: false,
        introductionText: "The data selection contains the selections of datasets you will work with. They can be entities with filters on them.",
        dsList: [
            {
                dsName: "Marriages in 1600-1649",
                dsDataset: "Index op notarieel archief",
                dsProvider: "Stadsarchief Amsterdam"
            },
            {
                dsName: "Marriages in the 17th Century",
                dsDataset: "Index op notarieel archief",
                "dsProvider": "Stadsarchief Amsterdam"
            },
            {
                dsName: "Marriages in the 18th Century",
                dsDataset: "Index op notarieel archief",
                dsProvider: "Stadsarchief Amsterdam"
            }
        ]
    }

    return (
      <div className="App">
          <HcHeaderGoldenAgents toolName="Lenticular Lenses" projectName={props.jobData.job_title} />
          <HcLlLayoutDataSelectionOverview pageData={pd} />
      </div>
    );
}