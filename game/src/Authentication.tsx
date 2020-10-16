import React, {FormEvent, FunctionComponent, useState} from 'react';
import {PAGE_URLS} from "./constants";

export const Authentication: FunctionComponent = () => {
    const [name, setName] = useState('');

    function handleChange(event: FormEvent<HTMLInputElement>): void {
        setName(event.currentTarget.value);
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        localStorage.setItem("player_name", name);
        redirectToMainPage();
    }

    function redirectToMainPage(): void {
        window.location.replace(PAGE_URLS.MAIN_PAGE);
    }

    return (
        <form id='nameForm' onSubmit={handleSubmit}><br/><br/>
            <label id='labelForm'>
                Wpisz swoje imię:<br/><br/>
                <input className="form-control" name="value" type="text" value={name} id='formInput' onChange={handleChange}/>
            </label>
            <input className="btn btn-primary" type="submit" value="Submit"/>
        </form>
    );
}
