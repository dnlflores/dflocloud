import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import './LoginForm.css'

function LoginForm({ setShowModal, setShowSignup}) {
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

    const handleSwitch = () => {
        setShowSignup(true)
        setShowModal(false)
    };

    return (
        <form onSubmit={handleSubmit} className="login-form flx-ctr flx-col">
            <h2>Welcome back to DFloCloud!</h2>
            <p>Use your e-mail/username to log in below.</p>
            {errors.map(error => (
                <p key={error} className="auth-errors">{error}</p>
            ))}
            <input
                className="auth-input"
                type="text"
                value={credential}
                onChange={(e) => setCredential(e.target.value)}
                // required
                placeholder="Your Username or E-mail"
            />
            <input
                className="auth-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                // required
                placeholder="Your Password"
            />
            <div className="auth-buttons">
                <button className="org-btn login-signup-btns" type="submit">Log In</button>
                <button className="org-btn login-signup-btns" onClick={handleDemo}>Demo</button>
            </div>
            <p>Don't have an account? Sign Up <span className="auth-switch" onClick={handleSwitch}>Here</span>!</p>
        </form>
    );
}

export default LoginForm;