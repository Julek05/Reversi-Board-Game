import React, {FormEvent, FunctionComponent, useState} from 'react';
import {PAGE_URLS, API_URLS} from "./constants";
import axios from 'axios';

import {withRouter, RouteComponentProps} from "react-router-dom";
import { Loader } from './Loader';
interface RegisterProps extends RouteComponentProps<any> {}

const Register: FunctionComponent<RegisterProps> = ({history}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);

    function handleChangeEmail(event: FormEvent<HTMLInputElement>): void {
        setEmail(event.currentTarget.value);
    }

    function handleChangePassword(event: FormEvent<HTMLInputElement>): void {
        setPassword(event.currentTarget.value);
    }

    function handleChangeName(event: FormEvent<HTMLInputElement>): void {
        setName(event.currentTarget.value);
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        //TODO WALIDACJA
        setIsLoading(true);
        const registerData: FormData = new FormData();
        registerData.append('name', name);
        registerData.append('email', email);
        registerData.append('password', password);
        registerData.append('password_confirmation', password);

        axios.post(API_URLS.REGISTER, registerData).then(response => {
            localStorage.setItem('token', response.data.access_token);
            history.push(PAGE_URLS.REGISTER);
            setIsRegistered(true);
            setIsLoading(false);
        }).catch(error => {
            setIsLoading(false);
            alert(error);
        })
    }

    return (
        isLoading 
        ? 
            <Loader />
        :
        isRegistered 
        ?
            <div className="alignMiddle">
                <h3>Zajerestrowano pomyślnie!</h3>
                <button className="btn btn-primary greenColor" 
                    onClick={() => history.push(PAGE_URLS.LOGIN)}>
                    Zaloguj się
                </button>
            </div>
        :
            <div className="alignMiddle">
                <form id='nameForm' onSubmit={handleSubmit}><br/><br/>
                    <label className='labelForm'>
                        Imie:<br/>
                        <input className="form-control" name="value" type="text" value={name}
                            id='formInput' onChange={handleChangeName}/>
                    </label><br/>

                    <label className='labelForm'>
                        Email:<br/>
                        <input className="form-control" name="value" type="text" value={email}
                            id='formInput' onChange={handleChangeEmail}/>
                    </label><br/>

                    <label className='labelForm'>
                        Hasło:<br/>
                        <input className="form-control" name="value" type="password" value={password}
                            id='formInput' onChange={handleChangePassword}/>
                    </label><br/>
                    
                    <input className="btn btn-primary" type="submit" value="Zajerestruj się"/>
                </form><br/>
                
                <button className="btn btn-primary alignMiddle greenColor"
                    onClick={() => history.push(PAGE_URLS.LOGIN)}>
                    Zaloguj się
                </button>
            </div>
    );
}

export default withRouter(Register);