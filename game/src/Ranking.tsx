import React, {FunctionComponent, useEffect, useState} from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import {API_URLS, LEVELS, PAGE_URLS} from "./constants";
import Utils from "./Utils";
import {Tr} from "./Tr";
import {Loader} from "./Loader";
import {withRouter, RouteComponentProps} from "react-router-dom";
import {Api} from './Api';

interface RankingProps extends RouteComponentProps<any> {}

const Ranking: FunctionComponent<RankingProps> = ({history}) => {
    const [games, setGames] = useState([]);
    const [isLoadingData, setIsLoadingData] = useState(true);

    // eslint-disable-next-line
    useEffect(() => getGames(LEVELS.EASY), []);

    function getGames(level: string): void {
        setIsLoadingData(true);
        Api.get(`api/game/${Utils.deletePolishSigns(level)}`).then(response => {
            setGames(response.data.bestGames);
            setIsLoadingData(false);
            history.push(`${PAGE_URLS.RANKING}/${Utils.deletePolishSigns(level)}`);
        }).catch(error => {
            alert(error);
            // setIsLoadingData(false);
        });
    }

    return (
        isLoadingData
        ?
            <Loader/>
        :
            <div className='ranking'><br/>
                <ButtonGroup>
                    {Object.values(LEVELS).map(level => {
                        return (
                            <Button variant="info" key={level} onClick={() => getGames(level)}>
                                {Utils.upperCaseFirstCharacter(level)}
                            </Button>
                        );
                    })}
                </ButtonGroup><br/><br/>
                <h2 id='headerRanking'>Ranking najlepszych graczy:</h2><br/>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Nick</th>
                        <th>Poziom trudności</th>
                        <th>Punkty gracza</th>
                        <th>Punkty komputera</th>
                        <th>Screen - końcowa<br/>plansza</th>
                        <th>Data</th>
                    </tr>
                    </thead>
                    <tbody>
                        {games && games.map((game, index) =>
                            <Tr game={game} index={index} key={index} />
                        )}
                    </tbody>
                </Table>
            </div>
    );
}

export default withRouter(Ranking);