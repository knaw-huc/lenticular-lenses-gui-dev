import React from 'react';
import {HcHeaderGoldenAgents} from "../page_elements/GoldenAgents";
import {HcLlLayoutProjectDetail} from "../page_elements/Pages";
import {ISendEvent, ISetJobEvent, ISetValue, ISetJob, ISetValueEvent} from "../../misc/interfaces";
import {useState, useEffect} from "react";
import {IJob} from "../../misc/apiInterfaces";
import {API_LOCATION} from "../../misc/config";

export function EditProjectBasics(props: { parentCallBack: ISendEvent, setValue: ISetValueEvent, setJob:ISetJobEvent, jobID:string, jobData:IJob}) {
    const [loading, setLoading] = useState(true);
    const [job, setJob] = useState<IJob>(props.jobData);

    async function getProject() {
        const url = API_LOCATION + "job/" + props.jobID;
        const response = await fetch(url);
        const json: IJob = await response.json();
        const struc: ISetJob = {type: "SET_JOB", value: json};
        props.setJob(struc);
        setJob(json);
        setLoading(false);
    }

    useEffect(() => {
        getProject();
    }, [loading]);

    return (
        <div className="App">
            {loading ? (
                <HcHeaderGoldenAgents toolName='Lenticular Lenses'
                                      projectName='Loading...'/>
            ) : (
                <div>
                <HcHeaderGoldenAgents toolName='Lenticular Lenses' projectName={job.job_title}/>
                <HcLlLayoutProjectDetail parentCallBack={props.parentCallBack} setValue={props.setValue} setJob={props.setJob} jobID={props.jobID} jobData={props.jobData}/>
                </div>
                )}
        </div>)
}