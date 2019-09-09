import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import styles from './Navbar.module.scss';

const VARIANTS = {
  default: 'default',
  grey: 'grey'
};

class Navbar extends Component {

  constructor (props) {
    super(props);

    let variant = VARIANTS.default;
    if (props.variant === 'grey' || props.variant === 'gray') {
      variant = VARIANTS.grey;
    }

    this.state = {
      variant: variant
    };
  }

  render() {
    let linkStyle = styles.link;
    if (this.state.variant === VARIANTS.grey) {
      linkStyle = styles.linkGrey;
    }

    return (
      <div className={`container-fluid ${styles.container}`}>
        <div className={styles.linkContainer}>
          <Link to="/" className={linkStyle}>StanPlan</Link>
        </div>
        <div className={styles.linkContainer}>
          <Link to="/about" className={linkStyle}>About</Link>
        </div>
        <div className={styles.linkContainer}>
          <Link to="/pricing" className={linkStyle}>Pricing</Link>
        </div>
        <div className={styles.linkContainer}>
          <Link to="/demo" className={linkStyle}>Get a demo</Link>
        </div>
        <div className={styles.linkContainer}>
          <Link to="/help" className={linkStyle}>Help</Link>
        </div>
        <div className={styles.linkContainer}>
          <Link to="/signup" className={linkStyle}>Sign up</Link>
        </div>
        <div className={styles.linkContainer}>
          <Link to="/login" className={linkStyle}>Log in</Link>
        </div>
      </div>
    );
  }
}

export default Navbar;
