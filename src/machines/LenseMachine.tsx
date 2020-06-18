import {assign, Machine} from "xstate";
import {IEntityTypeSelection, IJob, ILensSpecs, ILinkSetSpecs} from "../misc/apiInterfaces";

export const lenseMachine = Machine<{
    jobData: IJob

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
        }
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
                RESEARCH: "research"
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