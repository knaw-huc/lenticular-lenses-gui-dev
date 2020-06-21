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
import {interpret} from "xstate";
import {ISendEvent, ISetID, ISetIDEvent} from "./misc/interfaces";
import * as serviceWorker from './serviceWorker';


const interpreter = interpret(lenseMachine);
interpreter.start();

const switchState: ISendEvent = (name: string) => {
    interpreter.send(name);
}

const setContextID: ISetIDEvent = (struc:ISetID) => {
    interpreter.send(struc);
}


ReactDOM.render(
    <div>
        {StateMachineComponent(interpreter,
            {
                "research": ({state}) => <ResearchPick parentCallBack={switchState} setID={setContextID} jobID={state.context.jobID}/>,
                "create": ({state}) => <NewProject  parentCallBack={switchState} setID={setContextID} jobData={state.context.jobData}/>,
                "fetch": ({state}) => <div/>,
                "": ({state}) => <div>The GUI for {state.value} is not yet defined</div>
            })}
    </div>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
