import React, {FunctionComponent, useState, useEffect} from "react";
import {Api} from './Api';
import { BASE_AUTH_URL } from "./constants";
import { Loader } from "./Loader";

export const Profile: FunctionComponent = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => getUserData(), []);

    function getUserData(): void {
        setIsLoading(true);
        Api.get(`${BASE_AUTH_URL}/profile`).then(response => {
            setName(response.data.name);
            setEmail(response.data.email);
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
            <ul>
                <li>
                    {name}
                </li>
                <li>
                    {email}
                </li>
                <li>
                </li>
            </ul>
    );
}
