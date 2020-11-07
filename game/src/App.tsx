import 'bootstrap/dist/css/bootstrap.css';
import React, {FunctionComponent} from 'react'
import './style.css'
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import {PlayerGame} from './PlayerGame'
import {MainPage} from './MainPage'
import Rules from './Rules'
import {Advices} from './Advices'
import {SelfTeaching} from './SelfTeaching'
import {ComputerGame} from './ComputerGame'
import Ranking from "./Ranking";
import {PAGE_URLS, SUBPAGES} from "./constants";
import Login from './Login';
import Register from './Register';

export const App: FunctionComponent = () => {
    return (
        <Router>
            <div className="row" id="subpages">
                <div className="list-group" id="list-tab" role="tablist">
                    <div>
                        <Link className="list-group-item list-group-item-action" data-toggle="list" id="subpagesRow"
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
        </Router>
    );
}
