// src/pages/Login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // 🔐 Import context

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth(); // 🔐 Access login function

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        try {
            const res = await axios.post('http://localhost:5000/api/login', formData);
            setMessage(`✅ ${res.data.message}`);

            login(formData.email); // 🔐 Set user in context
            navigate('/dashboard'); // 🔁 Redirect to dashboard
        } catch (error) {
            const errMsg = error.response?.data?.message || 'Login failed';
            setMessage(`❌ ${errMsg}`);
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Log In</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />
                <button type="submit" style={styles.button}>Login</button>
            </form>
            {message && <p style={styles.message}>{message}</p>}
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '400px',
        margin: '100px auto',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '6px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        textAlign: 'center',
    },
    title: {
        marginBottom: '20px',
        fontWeight: '600',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    input: {
        padding: '10px',
        fontSize: '16px',
    },
    button: {
        padding: '10px',
        backgroundColor: '#333',
        color: '#fff',
        cursor: 'pointer',
        border: 'none',
    },
    message: {
        marginTop: '15px',
        fontWeight: '500',
    }
};

export default Login;
