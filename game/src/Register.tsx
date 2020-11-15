import React, {FormEvent, FunctionComponent, useState} from 'react';
import {PAGE_URLS, API_URLS} from "./constants";
import axios from 'axios';

import {withRouter, RouteComponentProps} from "react-router-dom";
import { Loader } from './Loader';
import FormValidator from './FormValidator';
interface RegisterProps extends RouteComponentProps<any> {}

const Register: FunctionComponent<RegisterProps> = ({history}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [name, setName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);

    function handleChangeEmail(event: FormEvent<HTMLInputElement>): void {
        setEmail(event.currentTarget.value);
    }

    function handleChangePassword(event: FormEvent<HTMLInputElement>): void {
        setPassword(event.currentTarget.value);
    }

    function handleChangePasswordConfirmation(event: FormEvent<HTMLInputElement>): void {
        setPasswordConfirmation(event.currentTarget.value);
    }

    function handleChangeName(event: FormEvent<HTMLInputElement>): void {
        setName(event.currentTarget.value);
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();

        const formValidator: FormValidator = new FormValidator(password, passwordConfirmation, name);
        if (!formValidator.validated()) {
            alert('Błąd w formularzu');
            return;
        }
        setIsLoading(true);
        const registerData: FormData = new FormData();
        registerData.append('name', name);
        registerData.append('email', email);
        registerData.append('password', password);

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
                            id='formInput' onChange={handleChangeName} required minLength={3}/>
                    </label><br/>

                    <label className='labelForm'>
                        Email:<br/>
                        <input className="form-control" name="value" type="email" value={email}
                            id='formInput' onChange={handleChangeEmail} required/>
                    </label><br/>

                    <label className='labelForm'>
                        Hasło:<br/>
                        <input className="form-control" name="value" type="password" value={password}
                            id='formInput' onChange={handleChangePassword} required minLength={5}/>
                    </label><br/>
                    <label className='labelForm'>
                        Potwierdź hasło:<br/>
                        <input className="form-control" name="value" type="password" value={passwordConfirmation}
                            id='formInput' onChange={handleChangePasswordConfirmation} required minLength={5}/>
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