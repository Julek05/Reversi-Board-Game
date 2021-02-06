import React, {FunctionComponent, useState} from 'react'
import {IMAGES_FOLDER_PATH, MAIN_PAGE_IMAGES, PAGE_URLS, SUBPAGES, API_URLS, VISIBILITY_OF_ELEMENT} from "../Common/constants";
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import axios from 'axios';
import { Loader } from '../Common/Loader';
import Utils from "../Common/Utils";

interface MainPageProps extends RouteComponentProps<any> {}

const MainPage: FunctionComponent<MainPageProps> = ({history}) => {
    const [isLoading, setIsLoading] = useState(false);

    function logout(event: any) {
        event.preventDefault();
        const token = Utils.getToken();

        setIsLoading(true);
        //jest problem tylko w przypadku wylogowaniu gdy token przesylany jest headerem, natomiast w url-u jest ok
        axios.post(`${API_URLS.LOGOUT}?token=${token}`).then(response => {
            history.push(PAGE_URLS.LOGIN);
            Utils.clearToken();
            setIsLoading(false);
        }).catch(error => {
            setIsLoading(false);
            alert(error);
        })
    }

    return (
        isLoading
        ?
            <Loader/>
        :
            <>
                <div className="row subpages">
                    <div className="list-group" id="list-tab" role="tablist">
                        <Link className="list-group-item list-group-item-action subpageRow" data-toggle="list"
                            to={PAGE_URLS.TWO_PLAYERS_MODE} role="tab" aria-controls="settings">{SUBPAGES.TWO_PLAYERS_MODE}</Link>
                        <Link className="list-group-item list-group-item-action subpageRow" data-toggle="list"
                            to={PAGE_URLS.COMPUTER_GAME} role="tab" aria-controls="messages">{SUBPAGES.COMPUTER_GAME}</Link>
                        <Link className="list-group-item list-group-item-action subpageRow" data-toggle="list"
                            to={PAGE_URLS.SELF_TEACHING} role="tab" aria-controls="profile">{SUBPAGES.SELF_TEACHING}</Link>
                        <Link className="list-group-item list-group-item-action subpageRow"
                            to={PAGE_URLS.RULES}>{SUBPAGES.RULES}</Link>
                        <Link className="list-group-item list-group-item-action subpageRow"
                            to={PAGE_URLS.ADVICES}>{SUBPAGES.ADVICES}</Link>
                        <Link className="list-group-item list-group-item-action subpageRow"
                            to={PAGE_URLS.RANKING}>{SUBPAGES.RANKING}</Link>
                        <Link className="list-group-item list-group-item-action subpageRow"
                            to={PAGE_URLS.PROFILE}>{SUBPAGES.PROFILE}</Link>
                        <button className="list-group-item list-group-item-action greenColor subpageRow"
                            onClick={logout}>Wyloguj</button>
                    </div>
                </div>
                <div className="row">
                    <img src={`${IMAGES_FOLDER_PATH}/${MAIN_PAGE_IMAGES.LOGO}`} className="mainPageImage" alt=""/>
                </div>
                <div className="row">
                    <img src={`${IMAGES_FOLDER_PATH}/${MAIN_PAGE_IMAGES.MAIN_PAGE}`} className="mainPageImage" alt=""/>
                </div>
            </>
    )
}

export default withRouter(MainPage);