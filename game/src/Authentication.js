import React from 'react';
// import axios from 'axios';

class Authentication extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        // axios.post('/api/name', this.state.value).then(response => {
        //     this.redirect();
        // }).then(error => {
        //     console.log(error);
        // });
        localStorage.setItem("player_name", this.state.value);
        this.redirectToMainPage();
        // localStorage = this.state.value;
    }

    redirectToMainPage() {
        window.location.replace("/strona_glowna");
    }
    render() {

        return (
            <form id='nameForm' onSubmit={this.handleSubmit}>
                <label>
                    Wpisz swoje imię:
                    <input className="form-control" name="value" type="text" value={this.state.value} id='formInput' onChange={this.handleChange}/>
                </label>
                <input className="btn btn-primary" type="submit" value="Submit"/>
            </form>
        );
    }
}

export default Authentication