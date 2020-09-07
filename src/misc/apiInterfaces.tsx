export interface IJob {
    created_at?: string,
    entity_type_selections: IJobDataSet[],
    job_description: string,
    job_id: string,
    job_link: string,
    job_title: string,
    lens_specs: ILensSpecs[],
    linkset_specs: ILinkSetSpecs[],
    updated_at?: string
}


export interface IJobDataSet {
    dataset: IEtsDataSet,
    id: number,
    label: string,
    description: string,
    filter: IFilter,
    limit: number,
    properties: string[],
    random: boolean,
    related: string[],
    related_array: boolean
}

export interface IEtsDataSet {
    collection_id: string,
    dataset_id: string,
    published: boolean | null,
    timbuctoo_graphql: string | null,
    timbuctoo_hsid: string | null
}

export interface ICondition {
    property: string[],
    type?: string,
    value?: string,
    format?: string
}

export interface IFilter {
    conditions: ICondition[],
    type: string
}



export interface ILensSpecs {
    dummy: string;
}

export interface ILinkSetSpecs {
    dummy: string;
}

export interface IContext {
    job: string,
    jobData: IJob
}

export interface IJobBasic {
    job_title: string,
    job_description: string,
    job_link: string
}

export interface IUpdateJob {
    job_id: string,
    job_title: string,
    job_description: string,
    job_link: string,
    entity_type_selections?: IJobDataSet[]
    lens_specs?: ILensSpecs[],
    linkset_specs?: ILinkSetSpecs[]
}

