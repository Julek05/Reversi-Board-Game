import React from 'react'

function Rules() {
    return (
        <><br/>
            <div className="card border-dark mb-3 advicesAndRules">
                <div className="card-header" style={{fontSize: 26}}><b>Zasady gry</b></div>
                <div className="card-body text-dark">
                    <h5>- Reversi jest grą planszową dla dwóch osób, rozgrywka odbywa się na planszy 8 na 8 pól</h5>
                    <br/>
                    <h5>- pola planszy mają kolor zielony oraz mają kształt kwadratów</h5><br/>
                    <h5>- do gry potrzebne są 64 piony (zwane też dyskami), które z jednej strony są koloru
                        czarnego, a z drugiej niebieskiego</h5><br/>
                    <h5>- początkowy stan rozgrywki to 4 pionki ustawione na środkowych polach planszy, 2 czarne po
                        skosie względem siebie i 2 niebieskie również po skosie względem siebie</h5><br/>
                    <h5>- grę rozpoczyna gracz z czarnymi pionkami, potem gracze grają na zmianę</h5><br/>
                    <h5>- gracze stawiają pionki w puste miejsca na planszy, które do końca gry zostają w tych
                        miejscach na planszy, mogą jedynie zostać odwrócone</h5><br/>
                    <h5>- <b>gracz może postawić pionka na danym polu, inaczej wykonać dany ruch wtedy i tylko
                        wtedy, gdy pomiędzy pionem danego gracza, który już jest na planszy, a pionem, który ma
                        zostać postawiony na planszy w linii pionowej, poziomej lub po skosie znajduję się co
                        najmniej jeden pion przeciwnika oraz nie ma żadnego pustego pola</b></h5><br/>
                    <h5>- w momencie, gdy dany gracz nie ma możliwości wykonania żadnego ruchu, jest zmuszony oddać
                        turę przeciwnikowi i sytuacja taka jest powtarzana do momentu, gdy gracz znów będzie mógł
                        wykonać ruch</h5><br/>
                    <h5>- natomiast gdy obaj gracze nie mogą wykonać ruchu następuje koniec gry</h5><br/>
                    <h5>- najczęstszym scenariuszem końca gry jest sytuacja, gdy na planszy nie ma żadnego wolnego
                        pola, ale czasami rozgrywka kończy się, gdy plansza nie jest jeszcze całkowicie zapełniona,
                        jednak żaden z graczy nie może wykonać ruchu</h5><br/>
                    <h5>- <b>grę wygrywa gracz, który zajął swoimi pionkami większą liczbę pól na planszy</b></h5><br/>
                    <h5>- w przypadku równej liczby pionków następuje remis</h5>
                </div>
            </div>
        </>
    )
}

export default Rules