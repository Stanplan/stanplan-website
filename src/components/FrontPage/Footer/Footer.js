import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import logo from 'assets/images/Logo.png';
import styles from './Footer.module.scss';

class Footer extends Component {

  render() {
    return (
      <div className={styles.footer}>
        <Row>
          <Col>
            <Container className={styles.logo}>
              <img src={logo} alt="StanPlan Logo" width="300" height="60"/>
            </Container>
            <p className={styles.copyright}>&copy; 2019. Built in Stanford, CA.</p>
          </Col>
          <Col>
            <p className={styles.header}><strong>SOCIAL</strong></p>
            <Link to="#" className={styles.link}>Facebook</Link>
            <br/>
            <Link to="#" className={styles.link}>Twitter</Link>
            <br/>
            <a href="https://www.youtube.com/channel/UCCuPBFoXBbPR4onedEZPgag" className={styles.link}>YouTube</a>
          </Col>
          <Col>
            <p className={styles.header}><strong>COMPANY</strong></p>
            <Link to="/about" className={styles.link}>About Us</Link>
            <br/>
            <Link to="/about" className={styles.link}>Contact</Link>
            <br/>
            <Link to="/about" className={styles.link}>Jobs</Link>
            <br/>
            <Link to="/help" className={styles.link}>Help Center</Link>
          </Col>
          <Col>
            <p className={styles.header}><strong>LEGAL</strong></p>
            <Link to="/terms" className={styles.link}>Terms of Service</Link>
            <br/>
            <Link to="/privacy" className={styles.link}>Privacy Policy</Link>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Footer;
