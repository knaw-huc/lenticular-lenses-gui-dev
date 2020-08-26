import React from 'react';
import ReactDOM from 'react-dom';
import './css/huc-connect-sets.css';
import './css/huc-data-entry.css';
import './css/huc-search.css';
import './css/GoldenAgents.css';
import ResearchPick from "./components/pages/ResearchPick";
import {StateMachineComponent} from './renderMachine';
import {lenseMachine} from "./machines/LenseMachine";
import {NewProject} from "./components/pages/newProject";
import {EditProjectBasics} from "./components/pages/editProjectBasics";
import {interpret} from "xstate";
import {ISendEvent, ISetJob, ISetJobEvent, ISetValue, ISetValueEvent} from "./misc/interfaces";
import * as serviceWorker from './serviceWorker';
import {EntitySelection} from "./components/pages/EntitySelection";
import {PickDataSets} from "./components/pages/PickDataSets";


const interpreter = interpret(lenseMachine);
interpreter.start();

const switchState: ISendEvent = (name: string) => {
    interpreter.send(name);
}

const setContextValue: ISetValueEvent = (struc:ISetValue) => {
    interpreter.send(struc);
}

const setContextJob: ISetJobEvent = (struc:ISetJob) => {
    interpreter.send(struc);
}

const qs: URLSearchParams = new URLSearchParams(window.location.search);
const qsJobID: string | null = qs.get("job_id");

ReactDOM.render(
    <div>
        {StateMachineComponent(interpreter,
            {
                "research": ({state}) => <ResearchPick parentCallBack={switchState} setValue={setContextValue} setJob={setContextJob} jobID={state.context.jobID} jobData={state.context.jobData} qsJobID={qsJobID}/>,
                "create": ({state}) => <NewProject  parentCallBack={switchState} setValue={setContextValue} setJob={setContextJob} jobID={state.context.jobID} jobData={state.context.jobData}/>,
                "fetch": ({state}) => <EditProjectBasics parentCallBack={switchState} setValue={setContextValue} setJob={setContextJob} jobID={state.context.jobID} jobData={state.context.jobData}/>,
                "entity": ({state}) => <EntitySelection parentCallBack={switchState} jobData={state.context.jobData} />,
                "datasets" : ({state}) => <PickDataSets parentCallBack={switchState} jobData={state.context.jobData} />,
                "": ({state}) => <div>The GUI for {state.value} is not yet defined</div>
            })}
    </div>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
