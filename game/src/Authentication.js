import React, {useState} from 'react';
import {PAGE_URLS} from "./constans";

function Authentication() {
    const [name, setName] = useState('');

    function handleChange(event) {
        setName(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        localStorage.setItem("player_name", name);
        redirectToMainPage();
    }

    function redirectToMainPage() {
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

export default Authentication