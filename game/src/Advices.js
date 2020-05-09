import React from 'react'

function Advices() {
    return (
        <div><br/>
            <div className="card border-dark mb-3 advicesAndRules">
                <div className="card-header" style={{fontSize: 26}}><b>Strategie i porady</b></div>
                <div className="card-body text-dark">
                    <p className="card-text">
                        <h5><b>- gdy tylko to możliwe zajmuj rogi planszy, to bardzo cenne pola, pionki na tych polach
                               są nieodwracalne</b></h5><br/>
                        <h5>- gdy zdobędziesz róg możesz budować stabilne pionki poprzez stawianie ich na polach
                            przylegających do rogu</h5><br/>
                        <h5><b>- unikaj stawiania pionków na pola przylegające do rogów</b></h5><br/>
                        <h5>- z kolei to dobrze gry przeciwnik stawia swoje pionki na pola przylegające do rogów, możesz
                            to wykorzystać i zająć róg</h5><br/>
                        <h5>- staraj się zajmować krawędzie planszy poza polami przylegającymi do rogów, ciężko odwrócić
                            pionki na tych polach</h5><br/>
                        <h5><b>- pamiętaj, że pionki można odwracać w wielu kierunkach naraz</b></h5><br/>
                        <h5><b>- w czasie gry ważniejszy jest układ pionków, a nie ich ilość</b></h5><br/>
                        <h5>- staraj się ograniczać możliwości ruchów przeciwnika</h5><br/>
                        <h5>- na początku i w środku gry nie warto zajmować dużej ilości pól na planszy</h5>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Advices