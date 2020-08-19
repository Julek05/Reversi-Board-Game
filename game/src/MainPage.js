import React from 'react'
import {IMAGES_FOLDER_PATH, MAIN_PAGE_IMAGES, PAGE_URLS, SUBPAGES} from "./constans";

function MainPage() {
    return (
        <div>
            <div className="row" id="subpages">
                <div className="list-group" id="list-tab" role="tablist">
                    <a className="list-group-item list-group-item-action" id="subpagesRow" data-toggle="list"
                       href={PAGE_URLS.TWO_PLAYERS_MODE} role="tab" aria-controls="settings">{SUBPAGES.TWO_PLAYERS_MODE}</a>
                    <a className="list-group-item list-group-item-action" id="subpagesRow" data-toggle="list"
                       href={PAGE_URLS.COMPUTER_GAME} role="tab" aria-controls="messages">{SUBPAGES.COMPUTER_GAME}</a>
                    <a className="list-group-item list-group-item-action" data-toggle="list" id="subpagesRow"
                       href={PAGE_URLS.SELF_TEACHING} role="tab" aria-controls="profile">{SUBPAGES.SELF_TEACHING}</a>
                    <a className="list-group-item list-group-item-action" id="subpagesRow"
                       href={PAGE_URLS.RULES}>{SUBPAGES.RULES}</a>
                    <a className="list-group-item list-group-item-action" id="subpagesRow"
                       href={PAGE_URLS.ADVICES}>{SUBPAGES.ADVICES}</a>
                    <a className="list-group-item list-group-item-action" id="subpagesRow"
                       href={PAGE_URLS.RANKING}>{SUBPAGES.RANKING}</a>
                </div>
            </div>
            <div className="row">
                <img src={`${IMAGES_FOLDER_PATH}/${MAIN_PAGE_IMAGES.LOGO}`} className="mainPageImage" alt=""/>
            </div>
            <div className="row">
                <img src={`${IMAGES_FOLDER_PATH}/${MAIN_PAGE_IMAGES.MAIN_PAGE}`} className="mainPageImage" alt=""/>
            </div>
        </div>
    )
}

export default MainPage