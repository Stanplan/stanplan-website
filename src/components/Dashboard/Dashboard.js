import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from './Navbar';
import Profile from './Profile';
import CourseRecs from './CourseRecs';
import CreatePost from './CreatePost';
import PostContainer from './PostContainer';
import styles from './Dashboard.module.scss';

class Dashboard extends Component {
  render() {
    return (
      <div className={`container-fluid ${styles.container}`}>
        <Navbar/>
        <Row className={styles.body}>
          <Col xs={2} className={styles.column}>
          </Col>
          <Col xs={3} className={styles.leftColumn}>
            <Profile/>
            <CourseRecs/>
          </Col>
          <Col xs={5} className={styles.column}>
            <CreatePost/>
            <PostContainer/>
          </Col>
          <Col xs={2} className={styles.column}>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Dashboard;
