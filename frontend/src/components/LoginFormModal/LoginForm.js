import React, { useState } from "react";
import { useDispatch } from "react-redux";
import TextField from '@mui/material/TextField';
import * as sessionActions from "../../store/session";
import './LoginForm.css'

function LoginForm({ setShowModal, setShowSignup}) {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const inputStyle = {
        width: "55%",
        margin: ".5rem",
        '& .MuiInputBase-input': {
            fontSize: "14px",
            fontFamily: "Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif"
        },
        '& .MuiInputLabel-root': {
            fontSize: "14px",
            fontFamily: "Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif"
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});
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
            <p className="auth-errors">{errors.message}</p>
            <br />
            <TextField
                required
                label="E-mail/Username"
                error={errors.message}
                value={credential}
                onChange={(e) => setCredential(e.target.value)}
                size="small"
                sx={inputStyle}
                color="warning"
            />
            {/* <input
                className="auth-input"
                type="text"
                value={credential}
                onChange={(e) => setCredential(e.target.value)}
                // required
                placeholder="Your Username or E-mail"
            />
            <p className="auth-errors">{errors.credential}</p> */}
            <TextField
                required
                type="password"
                label="Password"
                error={errors.message}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                size="small"
                sx={inputStyle}
                color="warning"
            />
            {/* <input
                className="auth-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                // required
                placeholder="Your Password"
            />
            <p className="auth-errors">{errors.password}</p> */}
            <div className="auth-buttons">
                <button className="org-btn login-signup-btns" type="submit">Log In</button>
                <button className="org-btn login-signup-btns" onClick={handleDemo}>Demo</button>
            </div>
            <p>Don't have an account? Sign Up <span className="auth-switch" onClick={handleSwitch}>Here</span>.</p>
        </form>
    );
}

export default LoginForm;