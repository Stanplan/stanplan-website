import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ricky from 'assets/images/profiles/ricky.jpg';
import julia from 'assets/images/profiles/julia.jpg';
import adam from 'assets/images/profiles/adam.svg';
import styles from './TeamSection.module.css';

class TeamSection extends Component {

  render() {
    return (
      <div className={`container ${styles.container}`}>
        <h4>
          Our Team
        </h4>
        <Row className={styles.cardContainer}>
          <Col>
            <Card>
              <Card.Img variant="top" src={ricky} height='280'/>
              <Card.Body>
                <Card.Title>Ricky Grannis-Vu</Card.Title>
                <Card.Text>
                  Founder
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Img variant="top" src={adam} height='280'/>
              <Card.Body>
                <Card.Title>Adam Keppler</Card.Title>
                <Card.Text>
                  Founder
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Img variant="top" src={julia} height='280'/>
              <Card.Body>
                <Card.Title>Julia Truitt</Card.Title>
                <Card.Text>
                  Founder
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default TeamSection;
