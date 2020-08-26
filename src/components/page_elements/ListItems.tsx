import React from 'react';
import {HclLIconDataSelection, HclLIconAlignment} from './GoldenAgents';
import {
    AlignmentLinkComparePage,
    IAlignmentList, IClusterList,
    IDoubleList,
    IDsList,
    ILinkList, ISetIndex,
    ITripleList
} from "../../misc/interfaces";


export function HcLlListItemMinimal(props: { title: string }) {

    return (
        <div>
            {props.title}
        </div>


    );
}


export function HcLlListItemMinimal2Fields(props: { fields: IDoubleList, setIndex: string,  parentCallback: ISetIndex }) {
    const active: boolean = props.fields.key == props.setIndex;
    let klasse: string = "";
    if (active) {
        klasse = "hcAlignVerticalActive hcIsLink";
    } else {
        klasse = "hcAlignVertical hcIsLink";
    }



    return (
        <div className={klasse} onClick={() => props.parentCallback(props.fields.key)}>
            <div>
                {props.fields.field1}
                <div className="hcSmallTxt hcClrTxt_Grey">
                    {props.fields.field2}
                </div>
            </div>
        </div>


    );
}


export function HcLlListLabel(props: { title: string }) {

    return (
        <div className="hcLabel">
            {props.title}
        </div>


    );
}


export function HcLlListItemDataSelection(props: { idsList: IDsList }) {

    return (
        <div className="hcListBasicResult">
            <div className="hcListItemLong">
                <strong><HclLIconDataSelection/> {props.idsList.dsName}</strong>
                <div className="hcSmallTxt">
                    {props.idsList.dsDataset}
                </div>
                <div className="hcSmallTxt">
                    {props.idsList.dsProvider}
                </div>
            </div>
            <div><a href="">Show sample</a></div>
            <div><a href="">Duplicate</a></div>
            <div><a href="">Delete</a></div>
        </div>
    );
}


export function HcLlListItemAlignment(props: IAlignmentList) {

    return (
        <div className="hcListBasicResult">
            <div className="hcListItemLong">
                <strong> <HclLIconAlignment/>{props.prName}</strong>
            </div>
            <div className="hcSmallTxt hcTxtRight">
                {props.prSource}
            </div>
            <div className="hcSmallTxt hcTxtRight">
                {props.prSource}
            </div>
            <div className="hcSmallTxt hcTxtRight">
                {props.prTarget}
            </div>
            <div className="hcSmallTxt hcTxtRight">
                {props.prLinks}
            </div>
            <div className="hcSmallTxt hcTxtRight">
                {props.prCusters}
            </div>
            <div className="hcSmallTxt hcTxtRight">
                {props.prStatus}
            </div>
            <div><a href="">Duplicate</a></div>
        </div>


    );
}


export function HcLlListItemAlignmentLinks(props: { links: ILinkList }) {

    return (
        <div className="hcListBasicResult">
            <div className="hcListItemLong">{props.links.strength}</div>
            <div className="hcListItemLong">
                <div className="hcLabel"><HclLIconDataSelection/></div>
                <strong></strong>
                <div className="hcSmallTxt hcClrTxt_Grey hcTextTruncate"></div>
            </div>
            <div className="hcListItemLong">
                <div className="hcLabel"><HclLIconDataSelection/></div>
                <strong></strong>
                <div className="hcSmallTxt hcClrTxt_Grey hcTextTruncate"></div>
            </div>
            <div className="hcListItemLong">
                <button type="button" name="button">Compare</button>
                <button className="bgColorBrand2">Accept</button>
                <button className="hcClrBg_Error">Decline</button>
            </div>
        </div>
    );

}


export function HcLlListItemAlignmentClusters(props: { cluster: IClusterList }) {

    return (
        <div className="hcListBasicResult">
            <div className="hcSmallTxt">391</div>
            <div className="hcSmallTxt">73.642</div>
            <div className="hcListItemLong">
                <div className="hcLabel"><HclLIconDataSelection/> foaf_name</div>
                <strong>Mary Jans</strong>
            </div>
            <div className="hcListItemLong">
                <div className="hcLabel"><HclLIconDataSelection/> Schema_Name</div>
                <strong>Brugge-Antwerpen</strong>
            </div>
            <div className="hcSmallTxt hcTxtCenter"> x</div>
            <div className="hcSmallTxt hcTxtCenter"> x</div>
            <div className="hcSmallTxt"> 2345234542</div>
        </div>
    );
}


export function HcLlListItemAlignmentClusterViewItem(props: ITripleList) {

    return (
        <div>
            <div>
                <div>{props.field1}</div>
                <strong>{props.field2}</strong>
                <div className="hcSmallTxt hcClrTxt_Grey">{props.field3}</div>
            </div>
        </div>

    );
}


export function HcResultListPaging() {

    return (
        <div className="hcPagination">
            {/*<div><a href="#">← Previous</a></div>
            <div><a href="#">1</a></div>
            <div className="bgColorBrand2"><a href="#">2</a></div>
            <div><a href="#">3</a></div>
            <div><a href="#">4</a></div>
            <div><a href="#">5</a></div>
            <div><a href="#">6</a></div>
            <div><a href="#">Next →</a></div>*/}
        </div>
    );
}
