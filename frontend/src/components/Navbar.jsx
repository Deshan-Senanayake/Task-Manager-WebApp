// src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav style={styles.nav}>
            <div style={styles.logo}>TaskManager</div>
            <div style={styles.links}>
                <Link to="/" style={styles.link}>Home</Link>
                {user ? (
                    <>
                        <span style={styles.user}>Welcome, {user.email}</span>
                        <button onClick={handleLogout} style={styles.button}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/register" style={styles.link}>Register</Link>
                        <Link to="/login" style={styles.link}>Login</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

const styles = {
    nav: {
        backgroundColor: '#333',
        color: '#fff',
        padding: '10px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logo: {
        fontWeight: 'bold',
        fontSize: '20px',
    },
    links: {
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
    },
    link: {
        color: 'white',
        textDecoration: 'none',
    },
    user: {
        color: '#ccc',
    },
    button: {
        backgroundColor: '#555',
        color: '#fff',
        border: 'none',
        padding: '5px 10px',
        cursor: 'pointer',
    }
};

export default Navbar;
