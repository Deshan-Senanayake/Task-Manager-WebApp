import React from 'react';
import './Register.css'; // create this CSS file

function Register() {
    return (
        <div className="register-container">
            <form className="register-form">
                <h2>Create an Account</h2>
                <input type="text" placeholder="Username" />
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <input type="password" placeholder="Confirm Password" />
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Register;
