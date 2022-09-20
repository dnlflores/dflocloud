import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignUpForm.css';

function SignupForm() {
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

    return (
        <form onSubmit={handleSubmit} className="login-signup-form flx-ctr flx-col">
            <h2>Sign Up!</h2>
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <input
                className="input-forms"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Your E-mail"
            />
            <input
                className="input-forms"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Your Username"
            />
            <input
                className="input-forms"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Your Password"
            />
            <input
                className="input-forms"
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
            <div className="fake-file-input">
                <span id="file-name">No picture chosen!</span>
                <button
                    className="org-btn login-signup-btns fake-file-button"
                    type="button"
                    onClick={handlePicture}
                >Choose a Picture!</button>
            </div>
            <button className="org-btn login-signup-btns" type="submit">Sign Up</button>
        </form>
    );
}

export default SignupForm;