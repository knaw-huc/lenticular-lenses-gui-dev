import React from 'react';
import {ISendEvent, ISetJobEvent, IDataSelectionDetailPage} from "../../misc/interfaces";
import {IJob} from "../../misc/apiInterfaces";
import {HcHeaderGoldenAgents} from "../page_elements/GoldenAgents";
import {HcLlDataSelectionDetail} from "../page_elements/Pages";
import {appName} from "../../misc/config";

export function DataSetDetail(props: {parentCallBack: ISendEvent, jobData: IJob, setJob: ISetJobEvent, dsIndex: number}) {
    const pd: IDataSelectionDetailPage = {
        "pageTitle": props.jobData.entity_type_selections[props.dsIndex].label,
        "description": props.jobData.entity_type_selections[props.dsIndex].description,
        "dataset": props.jobData.entity_type_selections[props.dsIndex].dataset.dataset_id,
        "collection": props.jobData.entity_type_selections[props.dsIndex].dataset.collection_id,
        "pageNavDs": true,
        "pageNavAl": false,
        "filters": [
            {
                "filterNr":1,
                "filterSetting": "OR",
                "filterRows": [
                    {"entities": ["pnv_hasName","pnv_PersonName","ns1_ontology_isInRecordList","ns1_ontology_Boedelinventaris","rdf_type"]}
                ],
                "condition":"Has value"
            },
            {
                "filterNr":2,
                "filterSetting": "OR",
                "filterRows": [
                    {"entities": ["pnv_hasName","pnv_PersonName","ns1_ontology_isInRecordList","ns1_ontology_Boedelinventaris","rdf_type"]}
                ],
                "condition":"Has value"
            }
        ]
    };


    return (
        <div className="App">
        <HcHeaderGoldenAgents toolName={appName} projectName={props.jobData.job_title} />
    <HcLlDataSelectionDetail pageData={pd} parentCallBack={props.parentCallBack} jobData={props.jobData} setJob={props.setJob} dsIndex={props.dsIndex}/>
        </div>
    );
}