export interface IJob {
    created_at: string,
    entity_type_selections: IEntityTypeSelection[],
    job_description: string,
    job_id: string,
    job_link: string,
    job_title: string,
    lens_specs: ILensSpecs[],
    linkset_specs: ILinkSetSpecs[],
    updated_at: string
}

export interface IEntityTypeSelection {
    dummy: string;
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
    entity_type_selections?: IEntityTypeSelection[]
    lens_specs?: ILensSpecs[],
    linkset_specs?: ILinkSetSpecs[]
}

