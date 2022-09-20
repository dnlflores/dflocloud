import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import './LoginForm.css'

function LoginForm() {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential, password })).catch(
            async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            }
        );
    };

    const handleDemo = (e) => {
        e.preventDefault();
        dispatch(sessionActions.login({credential: "Demo-lition", password: "password"}))
    }; 

    return (
        <form onSubmit={handleSubmit} className="login-signup-form flx-ctr flx-col">
            <h2>Login!</h2>
            <ul>
                {errors.map((error, idx) => (
                    <li key={idx}>{error}</li>
                ))}
            </ul>
            <input
                className="input-forms"
                type="text"
                value={credential}
                onChange={(e) => setCredential(e.target.value)}
                required
                placeholder="Your Username or E-mail"
            />
            <input
                className="input-forms"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Your Password"
            />
            <button className="org-btn login-signup-btns" type="submit">Log In</button>
            <button className="org-btn login-signup-btns" onClick={handleDemo}>Demo</button>
        </form>
    );
}

export default LoginForm;