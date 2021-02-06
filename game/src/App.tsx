import 'bootstrap/dist/css/bootstrap.css';
import React, {FunctionComponent} from 'react'
import './style.css'
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import {PlayerGame} from './Subpages/PlayerGame'
import MainPage from './Subpages/MainPage'
import Rules from './Subpages/Rules'
import {Advices} from './Advices'
import {SelfTeaching} from './Subpages/SelfTeaching'
import {ComputerGame} from './Subpages/ComputerGame'
import Ranking from "./Ranking/Ranking";
import {PAGE_URLS, SUBPAGES} from "./Common/constants";
import Login from './User/Login';
import Register from './User/Register';
import { Profile } from './User/Profile';

export const App: FunctionComponent = () => {
    return (
        <Router>
            <div id="mainPageButton" className="row subpages">
                <div className="list-group" id="list-tab" role="tablist">
                    <div>
                        <Link className="list-group-item list-group-item-action subpageRow" data-toggle="list"
                            style={{backgroundColor: "coral"}} to={PAGE_URLS.MAIN_PAGE} role="tab" aria-controls="profile">
                            {SUBPAGES.MAIN_PAGE}
                        </Link>
                    </div>
                </div>
            </div>
             
            <Route exact path="/" component={Login}/>
            <Route path={PAGE_URLS.REGISTER} component={Register}/>
            <Route path={PAGE_URLS.MAIN_PAGE} component={MainPage}/>
            <Route path={PAGE_URLS.TWO_PLAYERS_MODE} component={PlayerGame}/>
            <Route path={PAGE_URLS.COMPUTER_GAME} component={ComputerGame}/>
            <Route path={PAGE_URLS.SELF_TEACHING} component={SelfTeaching}/>
            <Route path={PAGE_URLS.RULES} component={Rules}/>
            <Route path={PAGE_URLS.ADVICES} component={Advices}/>
            <Route path={PAGE_URLS.RANKING} component={Ranking}/>
            <Route path={PAGE_URLS.PROFILE} component={Profile}/>
        </Router>
    );
}
