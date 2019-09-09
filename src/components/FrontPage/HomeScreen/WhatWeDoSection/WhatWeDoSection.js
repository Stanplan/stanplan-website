import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import courseSelection from 'assets/images/courseSelection.png';
import schedule from 'assets/images/schedule.png';
import majorSelection from 'assets/images/majorSelection.png';
import styles from './WhatWeDoSection.module.scss';

// TODO: Convert all Containers to div classNames with container-fluid (including first one which is WIP)
class WhatWeDoSection extends Component {

  render() {
    return (
      <div className={`container-fluid ${styles.container}`}>
        <Row>
          <Col className={styles.column}>
            <div className={`container-fluid ${styles.image}`}>
              <img src={courseSelection} alt="Course Selection Page" className='img-fluid'/>
            </div>
          </Col>
          <Col className={styles.column}>
            <div className={`container-fluid ${styles.text}`}>
              <h2>
                Course Selection
              </h2>
              <p>
                We present all information about your courses in a clean and
                consolidated interface. We guide you in selecting all your
                courses and ensure that all your requirements are satisfied.
              </p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className={styles.column}>
            <div className={`container-fluid ${styles.text}`}>
              <h2>
                Schedule Generation
              </h2>
              <p>
                We automatically generate a schedule that you can use. We ensure
                that all your prerequisites are satisfied in order and we use
                heuristics and machine learning to predict the years which your
                courses will most likely be offered.
              </p>
            </div>
          </Col>
          <Col className={styles.column}>
            <div className={`container-fluid ${styles.image}`}>
              <img src={schedule} alt="Schedule Page" className='img-fluid'/>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className={styles.column}>
            <div className={`container-fluid ${styles.image}`}>
              <img src={majorSelection} alt="Major Selection Page" className='img-fluid'/>
            </div>
          </Col>
          <Col className={styles.column}>
            <div className={`container-fluid ${styles.text}`}>
              <h2>
                Major Selection
              </h2>
              <p>
                If you are undeclared, we can help you select a major based on
                the courses you have already taken. If you are declared, we help
                you stay on track to graduate on time. If you want to graduate
                within a certain timeframe, we can show you which majors you can
                still satisfy.
              </p>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default WhatWeDoSection;
