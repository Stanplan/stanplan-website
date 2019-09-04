import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import styles from './Navbar.module.scss';

// Have to name this Navbar_Dashboard internally because Navbar
// is already defined for react-bootstrap
class Navbar_Dashboard extends Component {
  render() {
    return (
      <div className={`container-fluid ${styles.container}`}>
        <Row>
          <Col xs={2} className={styles.column}>
          </Col>
          <Col xs={5} className={styles.column}>
            <div className='d-flex justify-content-start align-items-center w-100 h-100'>
              <Link to="/dashboard">
                <Navbar.Brand className={styles.brand}>StanPlan</Navbar.Brand>
              </Link>
              <div className={styles.linkContainer}>
                <Link to="/classes" className={styles.link}>Classes</Link>
              </div>
              <div className={styles.linkContainer}>
                <Link to="/schedules" className={styles.link}>Schedules</Link>
              </div>
              <div className={styles.linkContainer}>
                <Link to="/friends" className={styles.link}>Friends</Link>
              </div>
              <div className={styles.linkContainer}>
                <Link to="/notifications" className={styles.link}>Notifications</Link>
              </div>
            </div>
          </Col>
          <Col xs={3} className={styles.column}>
            <Form inline className={styles.searchForm}>
              <FormControl type="text" placeholder="Search" className={styles.searchBar}/>
            </Form>
          </Col>
          <Col xs={2} className={styles.column}>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Navbar_Dashboard;
