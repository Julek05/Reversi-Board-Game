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

class App extends React.Component {
    static mainMenu() {
        if (window.location.href.includes('tryb_dla_dwoch_graczy') || window.location.href.includes('gra_z_komputerem')
            || window.location.href.includes('samouczek')) {
            if (window.confirm("Czy na pewno chcesz przejść do głównego menu?")) {
                window.location.href = '/';
            }
        } else {
            window.location.href = '/';
        }
    }

    render() {
        return <Router>
            <div className="row" id="subpages">
                <div className="list-group" id="list-tab" role="tablist">
                    <div>
                        <button className="list-group-item list-group-item-action" data-toggle="list" id="subpagesRow"
                                role="tab" aria-controls="profile" style={{backgroundColor: "coral"}}
                                onClick={App.mainMenu}>Strona główna
                        </button>
                    </div>
                </div>
            </div>
            <Route exact path="/" component={MainPage}/>
            <Route path="/tryb_dla_dwoch_graczy" component={PlayerGame}/>
            <Route path="/gra_z_komputerem" component={ComputerGame}/>
            <Route path="/samouczek" component={SelfTeaching}/>
            <Route path="/zasady_gry" component={Rules}/>
            <Route path="/porady_strategie" component={Advices}/>
        </Router>
    }
}

export default App;
