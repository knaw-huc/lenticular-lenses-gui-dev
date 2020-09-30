import React from 'react';
import {ISendEvent} from "../../misc/interfaces";

export function HcLlSubNavigation(props: { pageTitle: string, isDs: boolean, isAl: boolean, goTo: ISendEvent }) {
    return (
        <div className="hcContentContainer hcMarginBottom4">
            <div className="hcRowJustifyTop">
                <div className="hcBasicSideMargin">
                    <h3>{props.pageTitle}</h3>
                </div>
                <div className="hcBasicSideMargin hcAlignRight hcGaTabsLoudness1">
                    <div className="hcTopMenu" onClick={() => {props.goTo("FETCH")}}>Edit research</div>
                    <div className={(props.isDs ? 'hcSelected' : 'hcTopMenu')} onClick={() => props.goTo("ENTITY")}>Data Selection</div>
                    <div className={(props.isAl ? 'hcSelected' : 'hcTopMenu')} onClick={() => props.goTo("ALIGNMENTS")}>Alignment</div>
                </div>
            </div>
        </div>
    );
}


export function HcModal(props: { parentCallBack: ISendEvent, modalName: string, children: object }) {
    return (
        <div className="hcModal">
            <div className="hcContentContainer">
                <div className="hcModelContentWrap">

                    <div className="hcBasicSideMargin hc2columns hcMarginBottom2 hcMarginTop2">
                        <h3>{props.modalName}</h3>
                        <div className="hcTxtRight hcIsLink" onClick={() => props.parentCallBack("ENTITY")}>Close</div>
                    </div>
                    {props.children}
                </div>
            </div>
        </div>
    );
}


export function HcLlCompareItem(props: { label: string, content: string }) {
    return (
        <React.Fragment>
            <div>
                <div className="hcLabel">{props.label}</div>
                <div className="hcMarginBottom1 hcSmallTxt">{props.content}</div>
            </div>
        </ React.Fragment>
    );
}


export function HcLlAlignmantInfoBar(props: { infoSources: number, infoTargets: number, infoLinks: number, infoClusters: number }) {
    return (
        <div className="hcContentContainer hcMarginBottom3">
            <div className="hcRowJustify hcStickOutBox hcRoundedCorners">
                <div className="hc4columns">
                    <div className="hcBasicSideMargin">
                        Sources: <strong>{props.infoSources}</strong>
                    </div>
                    <div className="hcBasicSideMargin">
                        Targets: <strong>{props.infoTargets}</strong>
                    </div>
                    <div className="hcBasicSideMargin">
                        Links <strong>{props.infoLinks}</strong>
                    </div>
                    <div className="hcBasicSideMargin">
                        Clusters: <strong>{props.infoClusters}</strong>
                    </div>
                </div>
                <div className="hcBasicSideMargin">
                    <button type="button" name="button">Reconcile</button>
                </div>
            </div>
        </div>
    );
}
