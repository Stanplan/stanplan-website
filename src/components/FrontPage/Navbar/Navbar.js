import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import styles from './Navbar.module.scss';

// Have to name this Navbar_Stanplan internally because Navbar
// is already defined for react-bootstrap
class Navbar_Stanplan extends Component {
  render() {
    return (
      <div className={`container-fluid ${styles.container}`}>
        <Navbar className={styles.navbar}>
          <Link to="/">
            <Navbar.Brand className={styles.brand}>StanPlan</Navbar.Brand>
          </Link>
          <div className='d-flex justify-content-start align-items-center w-100 h-100'>
            <div className={styles.linkContainer}>
              <Link to="/about" className={styles.link}>About</Link>
            </div>
            <div className={styles.linkContainer}>
              <Link to="/pricing" className={styles.link}>Pricing</Link>
            </div>
            <div className={styles.linkContainer}>
              <Link to="/demo" className={styles.link}>Get a Demo</Link>
            </div>
            <div className={styles.linkContainer}>
              <Link to="/help" className={styles.link}>Help</Link>
            </div>
          </div>
        </Navbar>
      </div>
    );
  }
}

export default Navbar_Stanplan;
