import {assign, Machine} from "xstate";

const lenseMachine = Machine<{
    job: string
}, {
    states: {
        research: {
            states: {
                create: {},
                fetch: {}
            }
        },
        entity: {}
    }
}>({
    id: "lenticularLense",
    initial: "research",
    context: {
        job: ""
    },
    states: {
        research: {
            on: {
                NEW: "create",
                FETCH: "fetch"
            },
            states: {
                create: {
                    on: {
                        ENTITY: "entity"
                    }
                },
                fetch: {
                    on: {
                        ENTITY: "entity",
                        FETCH: "fetch"
                    }
                }
            }
        },
        entity: {}
    }

})