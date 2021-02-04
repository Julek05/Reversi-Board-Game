import React, {FunctionComponent, useState, useEffect} from "react";
import {Api} from './Api';
import { BASE_AUTH_URL } from "./constants";
import { Loader } from "./Loader";
import {Tr} from "./Tr";
import Table from "react-bootstrap/Table";

export const Profile: FunctionComponent = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [games, setGames] = useState([]);

    useEffect(() => getUserData(), []);

    function getUserData(): void {
        setIsLoading(true);
        Api.get(`${BASE_AUTH_URL}/profile`).then(response => {
            setName(response.data.user.name);
            setEmail(response.data.user.email);
            setGames(response.data.games);
            setIsLoading(false);
        }).catch(error => {
            setIsLoading(false);
            alert(error);            
        });
    }
    
    
    return (
        isLoading 
        ?
            <Loader/>
        :
            <>
                <ul>
                    <li>
                        {name}
                    </li>
                    <li>
                        {email}
                    </li>
                </ul>

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
            </>
    );
}
