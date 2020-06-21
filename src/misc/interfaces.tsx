export interface IHeaderData {
    "toolName": string,
    "projectName": string
}

export interface IHomePage {
    "pageTitle": string,
    "projectList": IProjectList[];
}

export interface IProjectList {
    "prName": string,
    "prDescription": string
}

export interface IDataSelectionListPage {
    "pageTitle": string,
    "pageNavDs": boolean,
    "pageNavAl": boolean,
    "introductionText": string,
    "dsList": IDsList[]
}

export interface IDsList {
    "dsName": string,
    "dsDataset": string,
    "dsProvider": string
}

export interface IModalSelectDatasetPage {
    "pageTitle": string,
    "pageNavDs": boolean,
    "pageNavAl": boolean,
    "datasetList": IDoubleList[],
    "detailInfoName": string,
    "detailInfoProvider": string,
    "detailInfodescription": string,
    "detailInfoEntities": ISingleList[]
}

export interface ISingleList {
    "field": string
}

export interface IDoubleList {
    "field1": string,
    "field2": string
}

export interface IAlignmentListPage {
    "pageTitle": string,
    "pageNavDs": boolean,
    "pageNavAl": boolean,
    "introductionText": string,
    "alignmentList": IAlignmentList[]
}

export interface IAlignmentList {
    "prName": string,
    "prSource": string,
    "prTarget": string,
    "prLinks": string,
    "prCusters": string,
    "prStatus": string
}

export interface IAlignmentDetailPage {
    "pageTitle": string,
    "pageNavDs": boolean,
    "pageNavAl": boolean,
    "infoLinks": number,
    "infoClusters": number,
    "infoSources": number,
    "infoTargets": number,
    "matchSetSrc": string[],
    "matchSetTrg": string[],
    "links": ILinkList[],
    "clusters": IClusterList[]
}

export interface ILinkList {
    "sEntity": string,
    "sName": string,
    "sUri": string,
    "strength": number,
    "tEntity": string,
    "tName": string,
    "tUri": string
}

export interface IClusterList {
    "size": number,
    "links": number,
    "sEntity": string,
    "sName": string,
    "tEntity": string,
    "tName": string,
    "ext": string,
    "reconc": string,
    "id": string
}

export interface AlignmentLinkComparePage {
    "pageTitle": string,
    "pageNavDs": boolean,
    "pageNavAl": boolean,
    "nr": number,
    "strength": number,
    "sUri": string,
    "sourceItems": ICompareItemList[],
    "tUri": string,
    "targetItems": ICompareItemList[]
}

export interface ICompareItemList {
    "label": string,
    "content": string
}

export interface IClusterViewPage {
    "pageTitle": string,
    "sourceList": ITripleList[],
    "targetList": ITripleList[]
}

export interface ITripleList {
    "field1": string,
    "field2": string,
    "field3": string
}

export interface IDataSelectionDetailPage {
    "pageTitle": string,
    "pageNavDs": boolean,
    "pageNavAl": boolean,
    "filters": IFilterList[]
}

export interface IFilterList {
    "filterNr": number,
    "filterSetting": string,
    "filterRows": IFilterRows[],
    "condition": string
}

export interface IFilterRows{
    "entities": string[]
}

export interface ISendEvent {
    (name: string): void
}

export interface ISetID {
    type: "SET_ID",
    id: string
}

export interface ISetIDEvent {
    (struc: ISetID): void
}







