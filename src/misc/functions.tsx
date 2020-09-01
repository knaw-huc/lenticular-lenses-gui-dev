import {ICondition, IFilter, IJobDataSet} from "./apiInterfaces";
import {AUTH_SERVER} from "./config";

export function defaultIJobDataSet() {
    const ds: IJobDataSet = {
        dataset: {
            collection_id: "",
            dataset_id: "",
            published: null,
            timbuctoo_graphql: AUTH_SERVER,
            timbuctoo_hsid: null
        },
        id: -1,
        label: "New data selection",
        filter: {
            conditions: [{
                property: []
            }],
            type: "AND"
        },
        limit: -1,
        properties: [],
        random: false,
        related: [],
        related_array: false
    }
    return ds;
}