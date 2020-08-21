import React from 'react'
import {IMAGES_FOLDER_PATH, MAIN_PAGE_IMAGES, PAGE_URLS, SUBPAGES} from "./constans";
import { Link } from 'react-router-dom';

function MainPage() {
    return (
        <div>
            <div className="row" id="subpages">
                <div className="list-group" id="list-tab" role="tablist">
                    <Link className="list-group-item list-group-item-action" id="subpagesRow" data-toggle="list"
                        to={PAGE_URLS.TWO_PLAYERS_MODE} role="tab" aria-controls="settings">{SUBPAGES.TWO_PLAYERS_MODE}</Link>
                    <Link className="list-group-item list-group-item-action" id="subpagesRow" data-toggle="list"
                       to={PAGE_URLS.COMPUTER_GAME} role="tab" aria-controls="messages">{SUBPAGES.COMPUTER_GAME}</Link>
                    <Link className="list-group-item list-group-item-action" data-toggle="list" id="subpagesRow"
                       to={PAGE_URLS.SELF_TEACHING} role="tab" aria-controls="profile">{SUBPAGES.SELF_TEACHING}</Link>
                    <Link className="list-group-item list-group-item-action" id="subpagesRow"
                       to={PAGE_URLS.RULES}>{SUBPAGES.RULES}</Link>
                    <Link className="list-group-item list-group-item-action" id="subpagesRow"
                       to={PAGE_URLS.ADVICES}>{SUBPAGES.ADVICES}</Link>
                    <Link className="list-group-item list-group-item-action" id="subpagesRow"
                       to={PAGE_URLS.RANKING}>{SUBPAGES.RANKING}</Link>
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