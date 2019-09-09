import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import Navbar from 'components/FrontPage/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import styles from './IntroSection.module.scss';

class IntroSection extends Component {

  goToSignupScreen() {
    this.props.history.push('/signup');
  }

  goToDemoScreen() {
    this.props.history.push('/demo');
  }

  render() {
    return (
      <div className={`container-fluid ${styles.container}`}>
        <div className={styles.background}></div>
        <Navbar/>
        <Row>
          <Col>
            <div className={styles.leftColumn}>
              <p className={styles.heading}>
                The smart college planner
              </p>
              <p className={styles.subheading}>
                Select your courses through a modern web interface,
                automatically generate your optimal course schedule and export
                your schedule to Microsoft Excel or Google Sheets.
              </p>
              <div>
                <Button className={styles.signupButton} onClick={() => this.goToSignupScreen()}>Sign up</Button>
                <Button className={styles.signupButton} onClick={() => this.goToDemoScreen()}>Get a demo</Button>
              </div>
            </div>
          </Col>
          <Col>
            <div className={styles.rightColumn}>
              <div className="embed-responsive embed-responsive-16by9">
                <iframe title='StanPlan Intro Video' className='embed-responsive-item' src="https://www.youtube.com/embed/VDgTEW3TOT8" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    email: state.authState.email
  };
}

export default withRouter(connect(mapStateToProps)(IntroSection));
