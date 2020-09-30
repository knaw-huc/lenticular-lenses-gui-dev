import React from 'react';
import {IAlignmentListPage, ISendEvent} from "../../misc/interfaces";
import {HcHeaderGoldenAgents} from "../page_elements/GoldenAgents";
import {HcLlLayoutAlignmentOverview} from "../page_elements/PagesAlignments";
import {IJob} from "../../misc/apiInterfaces";

export default function Alignments(props: { goTo: ISendEvent, jobData: IJob }) {
    const pd: IAlignmentListPage = {
        "pageTitle": "",
        "pageNavDs": false,
        "pageNavAl": true,
        "introductionText": "The data selection contains the selections of datasets you will work with. They can be entities with filters on them.",
        "alignmentList": [
            {
                "prName": "Getty & Frick vs NA:: approx Lev 0,7",
                "prSource": "7634",
                "prTarget": "232.113",
                "prLinks": "345",
                "prCusters": "33",
                "prStatus": "Matched-Clustered"
            },
            {
                "prName": "Getty & Frick vs NA:: soundex 0,85",
                "prSource": "2344",
                "prTarget": "32.233",
                "prLinks": "156",
                "prCusters": "11",
                "prStatus": "Matched-Clustered"
            },
            {
                "prName": "Getty vs Frick:: Lev 7",
                "prSource": "7634",
                "prTarget": "32.233",
                "prLinks": "345",
                "prCusters": "",
                "prStatus": "Matched"
            },
            {
                "prName": "Getty vs Frick:: soundex 0,85::",
                "prSource": "7634",
                "prTarget": "232.113",
                "prLinks": "145",
                "prCusters": "15",
                "prStatus": "Matched-Clustered"
            },
            {
                "prName": "Getty vs NA:: Lev 7",
                "prSource": "2455",
                "prTarget": "232.113",
                "prLinks": "145",
                "prCusters": "",
                "prStatus": "Matched"
            },
            {
                "prName": "Getty vs NA:: approx Lev 0,7",
                "prSource": "3765",
                "prTarget": "756",
                "prLinks": "145",
                "prCusters": "125",
                "prStatus": "Matched-Clustered"
            }
        ]
    }

    return (
        <div className="App">
            <HcHeaderGoldenAgents toolName='Lenticular Lenses' projectName={props.jobData.job_title}/>
            <HcLlLayoutAlignmentOverview pageData={pd} goTo={props.goTo}/>
        </div>
    )
}