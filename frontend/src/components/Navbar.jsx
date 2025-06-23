// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav style={styles.nav}>
            <div style={styles.logo}>TaskManager</div>
            <ul style={styles.navLinks}>
                <li><Link to="/" style={styles.link}>Home</Link></li>
                <li><Link to="/register" style={styles.link}>Register</Link></li>
                <li><Link to="/login" style={styles.link}>Login</Link></li>
            </ul>
        </nav>
    );
};

const styles = {
    nav: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#333',
        padding: '0.75rem 1.5rem',
    },
    logo: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: '1.2rem',
    },
    navLinks: {
        display: 'flex',
        gap: '1rem',
        listStyle: 'none',
    },
    link: {
        color: '#fff',
        textDecoration: 'none',
        fontWeight: '500',
    }
};

export default Navbar;
