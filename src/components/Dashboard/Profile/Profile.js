import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import styles from './Profile.module.scss';
import ricky from 'assets/images/profiles/ricky.jpg';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "Ricky Grannis-Vu",
      bio: "Student at Stanford University majoring in Computer Science. Founder of StanPlan. CEO of Bolt Chat (coming soon)."
    }
  }

  render() {
    return (
      <Card className={styles.card}>
        <div className={styles.topArea}>
          <Image roundedCircle src={ricky} className={styles.picture}/>
        </div>
        <div className={styles.text}>
          <p className={styles.name}><strong>{this.state.name}</strong></p>
          <p className={styles.bio}>{this.state.bio}</p>
        </div>
      </Card>
    );
  }
}

export default Profile;
