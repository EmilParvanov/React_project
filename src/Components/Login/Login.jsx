import React from 'react';
import {withRouter, useHistory} from 'react-router-dom';

import {AuthContext} from "../../App";

export const Login = () => {
    let history = useHistory()
    const {dispatch} = React.useContext(AuthContext);
    const initialState = {
        username: "",
        password: "",
        isSubmitting: false,
        isAdmin: false,
        errorMessage: null
    };

    const [data, setData] = React.useState(initialState);

    const handleInputChange = event => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        });
    };

    const isButtonDisabled = data.password === "" || data.username === "" ;

    const handleFormSubmit = event => {
        event.preventDefault(History);

        setData({
            ...data,
            isSubmitting: true,
            errorMessage: null
        });
        fetch("http://localhost:9999/auth/signin", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({username: data.username, password: data.password})
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                throw res;
            })
            .then(resJson => {
                console.log(resJson)
                console.log('here')

                dispatch({type: "LOGIN", payload: resJson})

                history.push('/home')

            })
            .catch(error => {
                setData({
                    ...data,
                    isSubmitting: false,
                    errorMessage: error.message || error.statusText
                });
            });
    };

    return (
        <div className="login-container">
            <div className="card">
                <div className="container">
                  
                    <form onSubmit={handleFormSubmit}>
                        
                        {isButtonDisabled ? <h1>Please fill your crendetials</h1>:<h1>Login</h1>}

                        <label htmlFor="username">
                            username
                            <input
                                type="text"
                                value={data.username}
                                onChange={handleInputChange}
                                name="username"
                                id="username"/>
                        </label>

                        <label htmlFor="password">
                            Password
                            <input
                                type="password"
                                value={data.password}
                                onChange={handleInputChange}
                                name="password"
                                id="password"/>
                        </label>

                        {data.errorMessage && (<span className="form-error">{data.errorMessage}</span>)}
      
                        <button disabled={isButtonDisabled}>
                            { ("Login")}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default withRouter(Login);