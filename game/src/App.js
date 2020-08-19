import 'bootstrap/dist/css/bootstrap.css';
import React from 'react'
import './style.css'
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';
import PlayerGame from './PlayerGame'
import MainPage from './MainPage'
import Rules from './Rules'
import Advices from './Advices'
import SelfTeaching from './SelfTeaching'
import ComputerGame from './ComputerGame'
import Authentication from "./Authentication";
import Ranking from "./Ranking";
import {PAGE_URLS, SUBPAGES} from "./constans";
import Engine from "./Engine";
// import Screen from "./Screen";

function App() {
    const engine = new Engine();
    function mainMenu() {
        if (isInGameSite()) {
            if (window.confirm("Czy na pewno chcesz przejść do głównego menu?")) {
                window.location.href = PAGE_URLS.MAIN_PAGE;
            }
        }
        window.location.href = PAGE_URLS.MAIN_PAGE;
    }

    function isInGameSite() {
        return actualUrlInclude(PAGE_URLS.TWO_PLAYERS_MODE) || actualUrlInclude(PAGE_URLS.COMPUTER_GAME)
            || actualUrlInclude(PAGE_URLS.SELF_TEACHING);
    }

    function actualUrlInclude(pattern) {
        return window.location.href.includes(pattern);
    }

    return (
        <Router>
            <div className="row" id="subpages">
                <div className="list-group" id="list-tab" role="tablist">
                    <div>
                        <button className="list-group-item list-group-item-action" data-toggle="list" id="subpagesRow"
                                role="tab" aria-controls="profile" style={{backgroundColor: "coral"}}
                                onClick={mainMenu}>{engine.upperCaseFirstCharacter(SUBPAGES.MAIN_PAGE)}
                        </button>
                    </div>
                </div>
            </div>

            <Route exact path="/" component={Authentication}/>
            <Route exact path={`/${PAGE_URLS.MAIN_PAGE}`} component={MainPage}/>
            <Route path={`/${PAGE_URLS.TWO_PLAYERS_MODE}`} component={PlayerGame}/>
            <Route path={`/${PAGE_URLS.COMPUTER_GAME}`} component={ComputerGame}/>
            <Route path={`/${PAGE_URLS.SELF_TEACHING}`} component={SelfTeaching}/>
            <Route path={`/${PAGE_URLS.RULES}`} component={Rules}/>
            <Route path={`/${PAGE_URLS.ADVICES}`} component={Advices}/>
            <Route path={`/${PAGE_URLS.RANKING}`} component={Ranking}/>

            {/*<Route path="/screen/:imagePath" component={Screen} />*/}
        </Router>
    );
}

export default App;
