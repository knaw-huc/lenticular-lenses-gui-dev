import {assign, Machine} from "xstate";
import { IJob, ILensSpecs, ILinkSetSpecs} from "../misc/apiInterfaces";
import {ISetBufferIndex, ISetJob, ISetValue, ISetValueEvent} from "../misc/interfaces";

export const lenseMachine = Machine<{
    jobData: IJob,
    jobID: string,
    bufferedIndex: number
}, {
    states: {
        idle: {},
        research: {},
        create: {},
        fetch: {},
        entity: {},
        datasets: {},
        dataset_detail: {},
        alignments: {}
    }
}>({
    id: "lenticularLens",
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
        jobID: "",
        bufferedIndex: 0
    },
    on: {
        research: "research",
        entity: "entity",
        create: "create",
        fetch: "fetch",
        datasets: "datasets",
        dataset_detail: "dataset_detail",
        alignments: "alignments"
    },
    states: {
        idle: {},
        research: {
            on: {
                NEW: "create",
                ENTITY: "entity",
                SET_ID: {
                    actions: assign({jobID: (context, event: ISetValue) => event.value})
                },
                SET_JOB: {
                    actions: assign({jobData: (context, event: ISetJob) => event.value})
                }
            }
        },
        create: {
            on: {
                ENTITY: "entity",
                RESEARCH: "research",
                SET_ID: {
                    actions: assign({jobID: (context, event: ISetValue) => event.value}),
                    target: "fetch"
                },
                SET_JOB: {
                    actions: assign({jobData: (context, event: ISetJob) => event.value})
                }
            }
        },
        fetch: {
            on: {
                ENTITY: "entity",
                FETCH: "fetch",
                RESEARCH: "research",
                SET_ID: {
                    actions: assign({jobID: (context, event: ISetValue) => event.value}),
                    target: "fetch"
                },
                SET_JOB: {
                    actions: assign({jobData: (context, event: ISetJob) => event.value})
                }
            }
        },
        entity: {
            on: {
                DATASETS: "datasets",
                DATASET_DETAIL: "dataset_detail",
                ALIGNMENTS: "alignments",
                FETCH: "fetch",
                SET_JOB: {
                    actions: assign({jobData: (context, event: ISetJob) => event.value})
                },
                SET_INDEX: {
                    actions: assign({bufferedIndex: (context, event: ISetBufferIndex) => event.value})
                }
            }
        },
        datasets: {
            on: {
                DATASET_DETAIL: "dataset_detail",
                SET_JOB: {
                    actions: assign({jobData: (context, event: ISetJob) => event.value})
                },
                SET_INDEX: {
                    actions: assign({bufferedIndex: (context, event: ISetBufferIndex) => event.value})
                }
            }
        },
        dataset_detail: {
            on: {
                ENTITY: "entity",
                ALIGNMENTS: "alignments",
                DATASETS: "datasets",
                FETCH: "fetch",
                SET_JOB: {
                    actions: assign({jobData: (context, event: ISetJob) => event.value})
                }
            }
        },
        alignments: {
            on: {
                ENTITY: "entity",
                FETCH: "fetch"
            }
        }
    }
})