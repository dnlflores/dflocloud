import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignUpForm.css';

function SignupForm({ setShowModal, setShowLogin}) {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [profilePicture, setProfilePicture] = useState(null);
    const [errors, setErrors] = useState([]);



    const handlePicture = event => {
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
            setErrors([]);
            return dispatch(sessionActions.signup({ email, username, password, profilePicture }))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                });
        }
        return setErrors(['Confirm Password field must be the same as the Password field']);
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
            {errors.map((error) => <p key={error} className="auth-errors">{error}</p>)}
            <input
                className="auth-input"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Your E-mail"
            />
            <input
                className="auth-input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Your Username"
            />
            <input
                className="auth-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Your Password"
            />
            <input
                className="auth-input"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Confirm Your Password"
            />
            <input 
                type="file" 
                accept="image/jpeg, image/png" 
                onChange={updateFile}
                id="real-file-button"
                hidden
            />
            <div className="fake-file-input fake-auth-input">
                <span id="file-name">No picture chosen!</span>
                <button
                    className="org-btn login-signup-btns fake-file-button fake-auth-button"
                    type="button"
                    onClick={handlePicture}
                >Choose a Picture!</button>
            </div>
            <button className="org-btn login-signup-btns" type="submit">Sign Up</button>
            <p>Have an account already? Log In <span className="auth-switch" onClick={handleSwitch}>Here</span>!</p>
        </form>
    );
}

export default SignupForm;