import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import logo from 'assets/images/Logo.png';
import styles from './Page404Screen.module.css';

class Page404Screen extends Component {

  render() {
    return(
      <div className={styles.container}>
        <img src={logo} alt="StanPlan Logo" width="30%" height="20%"/>
        <h2>
          404 - Page Not Found
        </h2>
        <p>
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <Link to='/'>Go to Homepage</Link>
      </div>
    );
  }
}

export default Page404Screen;
