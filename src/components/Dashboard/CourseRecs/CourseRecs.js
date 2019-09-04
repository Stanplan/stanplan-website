import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import styles from './CourseRecs.module.scss';

class CourseRecs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recommendations: [
        {
          code: "ECON 1",
          title: "Principles of Economics",
          friends: ["Ricky", "Adam", "Julia", "Monica", "Sam"]
        },
        {
          code: "PSYCH 103",
          title: "Intergroup Communication",
          friends: ["Ricky", "Giovanni", "Silei"]
        },
        {
          code: "TAPS 103",
          title: "Beginning Improvising",
          friends: ["Adam", "Julia"]
        },
        {
          code: "MATH 104",
          title: "Applied Matrix Theory",
          friends: ["Max", "Sam", "Monica", "Silei"]
        }
      ]
    };
  }

  renderFriendsText(rec) {
    if (rec.friends.length > 3) {
      return (
        <p className={styles.friends}>Taken by <span>{rec.friends[0]}</span>, <span>{rec.friends[1]}</span> and <span>{(rec.friends.length - 2)}</span> more friends</p>
      );
    } else if (rec.friends.length === 3) {
      return (
        <p className={styles.friends}>Taken by <span>{rec.friends[0]}</span>, <span>{rec.friends[1]}</span> and <span>{1}</span> more friend</p>
      );
    } else if (rec.friends.length === 2) {
      return (
        <p className={styles.friends}>Taken by <span>{rec.friends[0]}</span> and <span>{rec.friends[1]}</span></p>
      );
    } else if (rec.friends.length === 1) {
      return (
        <p className={styles.friends}>Taken by <span >{rec.friends[0]}</span></p>
      );
    } else {
      return (
        <p className={styles.friends}>None of your friends have taken this course yet</p>
      );
    }
  }

  renderRecommendation(rec) {
    return (
      <ListGroup.Item className={styles.course}>
        <p><span>{rec.code}: {rec.title}</span></p>
        {
          this.renderFriendsText(rec)
        }
      </ListGroup.Item>
    );
  }

  renderRecommendations() {
    let recommendations = [];
    for (let i = 0; i < this.state.recommendations.length; i++) {
      recommendations.push(this.renderRecommendation(this.state.recommendations[i]));
    }
    return recommendations;
  }

  render() {
    return (
      <Card className={styles.card}>
        <Card.Header className={styles.header}>
          Popular among friends
        </Card.Header>
        <ListGroup variant="flush">
          {
            this.renderRecommendations()
          }
        </ListGroup>
      </Card>
    );
  }
}

export default CourseRecs;
