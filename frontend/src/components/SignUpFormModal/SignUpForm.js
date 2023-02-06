import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import TextField from '@mui/material/TextField';
import * as sessionActions from "../../store/session";
import './SignUpForm.css';

function SignupForm({ setShowModal, setShowLogin }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [profilePicture, setProfilePicture] = useState(null);
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
        },
        '& .MuiFormHelperText-root': {
            fontSize: "11px",
            fontFamily: "Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif"
        }
    };

    const handlePicture = () => {
        const realBtn = document.getElementById('real-file-button');
        const fileName = document.getElementById('file-name');
        realBtn.click();

        realBtn.addEventListener('change', () => {

            if (realBtn.value) {
                const name = realBtn.value.split("\\")[2];
                fileName.innerHTML = name;
            }
            else fileName.innerHTML = 'No picture chosen!"'
        });
    };

    if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors({});
            return dispatch(sessionActions.signup({ email, username, password, profilePicture }))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                });
        }
        setErrors({ conf: 'Confirm Password field must be the same as the Password field' });
    };

    const updateFile = (e) => {
        const file = e.target.files[0];
        if (file) setProfilePicture(file);
    };

    const handleSwitch = () => {
        setShowLogin(true)
        setShowModal(false)
    };

    return (
        <form onSubmit={handleSubmit} className="signup-form flx-ctr flx-col">
            <h2>Welcome to DFloCloud!</h2>
            <p>Start by filling out your details below.</p>
            <TextField
                required
                label="E-mail"
                helperText={errors.email}
                error={errors.email}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                size="small"
                sx={inputStyle}
                color="warning"
            />
            {/* <input
                className="auth-input"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Your E-mail"
            />
            <p className="auth-errors">{errors.email}</p> */}
            <TextField
                required
                label="Username"
                helperText={errors.username}
                error={errors.username}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                size="small"
                sx={inputStyle}
                color="warning"
            />
            {/* <input
                className="auth-input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Your Username"
            />
            <p className="auth-errors">{errors.username}</p> */}
            <TextField
                required
                label="Password"
                helperText={errors.password}
                error={errors.password}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                size="small"
                sx={inputStyle}
                type="password"
                color="warning"
            />
            {/* <input
                className="auth-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Your Password"
            />
            <p className="auth-errors">{errors.password}</p> */}
            <TextField
                required
                label="Confirm Password"
                helperText={errors.conf}
                error={errors.conf}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                size="small"
                sx={inputStyle}
                type="password"
                color="warning"
            />
            {/* <input
                className="auth-input"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Confirm Your Password"
            />
            <p className="auth-errors">{errors.conf}</p> */}
            <input
                type="file"
                accept="image/jpeg, image/png"
                onChange={updateFile}
                id="real-file-button"
                hidden
            />
            <div className="fake-file-input fake-auth-input">
                <span id="file-name">No picture chosen.</span>
                <button
                    className="org-btn login-signup-btns fake-file-button fake-auth-button"
                    type="button"
                    onClick={handlePicture}
                >Choose a Picture</button>
            </div>
            <button className="org-btn login-signup-btns" type="submit">Sign Up</button>
            <p>Have an account already? Log In <span className="auth-switch" onClick={handleSwitch}>Here</span>.</p>
        </form>
    );
}

export default SignupForm;