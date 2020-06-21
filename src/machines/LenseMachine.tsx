import {assign, Machine} from "xstate";
import {IEntityTypeSelection, IJob, ILensSpecs, ILinkSetSpecs} from "../misc/apiInterfaces";
import {ISetIDEvent} from "../misc/interfaces";

export const lenseMachine = Machine<{
    jobData:IJob,
    jobID:string
}, {
    states: {
        research: {},
        create: {},
        fetch: {},
        entity: {}
    }
}>({
    id: "lenticularLense",
    initial: "research",
    context: {
        jobData: {
            created_at: "",
            entity_type_selections: [],
            job_description: "",
            job_id: "",
            job_link: "",
            job_title: "",
            lens_specs: [],
            linkset_specs: [],
            updated_at: ""
        },
        jobID: ""
    },
    on: {
        research: "research",
        entity: "entity",
        create: "create",
        fetch: "fetch"
    },
    states: {
        research: {
            on: {
                NEW: "create",
                FETCH: "fetch"
            }
        },
        create: {
            on: {
                ENTITY: "entity",
                RESEARCH: "research",
                SET_ID: {
                    actions: assign({jobID: (context, event: ISetIDEvent) => event.struc.id })
                }
            }
        },
        fetch: {
            on: {
                ENTITY: "entity",
                FETCH: "fetch",
                RESEARCH: "research"
            }
        },
        entity: {}
    }
})