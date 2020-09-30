import React from 'react';
import {assign, Machine} from "xstate";
import {useState, useEffect} from "react";
import {IJob} from "../../misc/apiInterfaces";
import {HcHeaderGoldenAgents} from "../page_elements/GoldenAgents";
import {HcModal} from "../page_elements/Utils"
import {HcLlDataSelectionDetail} from "../page_elements/PagesDataSelection";
import {HcLlSelectDataset} from "../page_elements/PagesDataSelection";
import {
    ISendEvent,
    IModalSelectDatasetPage,
    ISingleList,
    IDoubleList,
    IDataSet,
    IDataSets,
    ISetIndex, ISetJobEvent
} from "../../misc/interfaces";
import {API_LOCATION, appName, GOLDEN_AGENTS_REPOSITORY} from "../../misc/config";

export function PickDataSets(props: { parentCallBack: ISendEvent, jobData: IJob, setJob: ISetJobEvent, dsIndex: number, hsid: string | null }) {
    const [loading, setLoading] = useState(true);
    const [refreshToggle, setRefreshToggle] = useState(true);
    const url = API_LOCATION + GOLDEN_AGENTS_REPOSITORY;
    let options: any = {}
    if (props.hsid !== null) {
        options = {
            headers: {
                authorization: props.hsid
            }
        }
    }

    let pd: IModalSelectDatasetPage = {
        pageTitle: "Modal select dataset",
        pageNavDs: true,
        pageNavAl: false,
        datasetList: [],
        detailInfoEntities: [],
        detailInfoName: "",
        detailInfoProvider: "",
        detailInfodescription: "",
        setIndex: ""
    }

    const [pageData, setPageData] = useState<IModalSelectDatasetPage>(pd);
    const [dataSets, setDataSets] = useState<IDataSets | any>();

    async function fetchDataSets() {
        console.log(url);
        const response = await fetch(url, options);
        const json = await response.json();
        const obj = Object.keys(json);
        const g: string = obj[0].toString();
        pd.setIndex = g;
        pd.datasetList = setDataSetList(json);
        pd.detailInfoEntities = setDetailInfoEntities(json, g);
        pd.detailInfoName = json[g].title;
        setPageData(pd);
        setDataSets(json);
        setLoading(false);
    }

    const setIndex: ISetIndex = (index: string) => {
        let pd:IModalSelectDatasetPage = pageData;
        pd.detailInfoEntities = setDetailInfoEntities(dataSets, index);
        pd.detailInfoName = dataSets[index].title;
        pd.setIndex = index;
        setPageData(pd);
        setRefreshToggle((!refreshToggle));
    }

    function setDataSetList(json: any):IDoubleList[] {
        let retList: IDoubleList[] = [];
        const obj = Object.keys(json);
        obj.map((item) => {
            const list: IDoubleList = {
                field1: json[item].title,
                field2: json[item].description,
                key: item
            };
            retList.push(list);
        });
        return retList;
    }

    function setDetailInfoEntities(json: any, index: string):ISingleList[] {
        let retList: ISingleList[] = [];
        const obj = Object.keys(json);
        const entities = Object.keys(json[index].collections);
        entities.map((item) => {
            const list: ISingleList = {
                field: item
            }
            retList.push(list);
        });
        return retList;
    }

    useEffect(() => {
        fetchDataSets();
    }, []);

    return (
        <div className="App">
            <HcHeaderGoldenAgents toolName={appName}
                                  projectName={props.jobData.job_title}/>
            {!loading ? (<HcModal parentCallBack={props.parentCallBack} modalName='Select dataset'>
                    <HcLlSelectDataset pageData={pageData} parentCallback={setIndex} jobData={props.jobData} switchState={props.parentCallBack} setJob={props.setJob} dsIndex={props.dsIndex}/>
                </HcModal>) :
                (<div className="loadClass">Loading...</div>)}
        </div>
    );
}