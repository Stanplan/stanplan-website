import React, { Component } from 'react';
import Navbar from 'components/FrontPage/Navbar';
import Footer from 'components/FrontPage/Footer';
import Row from 'react-bootstrap/Row';
import styles from './SuccessScreen.module.css';

class SuccessScreen extends Component {

  render() {
    return (
      <div className={`container-fluid ${styles.container}`}>
        <Navbar variant='grey'/>
        <Row className='justify-content-center'>
          <h2 className={styles.header}>
            Success!
          </h2>
        </Row>
        <Row className='justify-content-center'>
          <p className={styles.text}>
            We sent a confirmation email to your email address. You must
            confirm that your email address is correct before you can begin
            using StanPlan.
          </p>
        </Row>
        <Footer/>
      </div>
    );
  }
}

export default SuccessScreen;
