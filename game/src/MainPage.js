import React from 'react'

function MainPage() {
    return (
        <div>
            <div className="row" id="subpages">
                <div className="list-group" id="list-tab" role="tablist">
                    <a className="list-group-item list-group-item-action" id="subpagesRow" data-toggle="list"
                       href="/tryb_dla_dwoch_graczy" role="tab" aria-controls="settings">Tryb dla dwóch graczy</a>
                    <a className="list-group-item list-group-item-action" id="subpagesRow" data-toggle="list"
                       href="/gra_z_komputerem" role="tab" aria-controls="messages">Gra z komputerem</a>
                    <a className="list-group-item list-group-item-action" data-toggle="list" id="subpagesRow"
                       href="/samouczek" role="tab" aria-controls="profile">Samouczek</a>
                    <a className="list-group-item list-group-item-action" id="subpagesRow"
                       href="/zasady_gry">Zasady gry</a>
                    <a className="list-group-item list-group-item-action" id="subpagesRow"
                       href="/porady_strategie">Strategie i porady</a>
                    <a className="list-group-item list-group-item-action" id="subpagesRow"
                       href="/ranking">Ranking</a>
                </div>
            </div>
            <div className="row">
                <img src="images/logo.png" className="mainPageImage" alt=""/>
            </div>
            <div className="row">
                <img src="images/main_page.jpg" className="mainPageImage" alt=""/>
            </div>
        </div>
    )
}

export default MainPage