import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from './TeamSection.module.css';

import ricky from 'assets/images/profiles/ricky.jpg';
import julia from 'assets/images/profiles/julia.jpg';
import adam from 'assets/images/profiles/adam.svg';

const ROW_LENGTH = 4;

class TeamSection extends Component {

  constructor(props) {
    super(props);

    this.state = {
      team: [
        {
          name: "Ricky Grannis-Vu",
          title: "Founder",
          email: "ricky@stanplan.com",
          image: ricky
        },
        {
          name: "Julia Truitt",
          title: "Founder",
          email: "julia@stanplan.com",
          image: julia
        },
        {
          name: "Adam Keppler",
          title: "Founder",
          email: "adam@stanplan.com",
          image: adam
        }
      ]
    };
  }

  renderCard(cellIndex) {
    let name = this.state.team[cellIndex].name;
    let title = this.state.team[cellIndex].title;
    let email = this.state.team[cellIndex].email;
    let image = this.state.team[cellIndex].image;
    return (
      <Col>
        <Card>
          <Card.Img variant="top" src={image} height='280'/>
          <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Card.Text>
              {title}
            </Card.Text>
            <Card.Text>
              {`Email: ${email}`}
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    );
  }

  renderRow(rowIndex) {
    let jsx = [];
    for (let j = 0; j < ROW_LENGTH; j++) {
      if (rowIndex + j < this.state.team.length) {
        jsx.push(this.renderCard(rowIndex + j));
      } else {
        jsx.push(<Col></Col>);
      }
    }
    return jsx;
  }

  renderCards() {
    let jsx = [];
    for (let i = 0; i < this.state.team.length; i += ROW_LENGTH) {
      jsx.push(
        <Row className={styles.cardContainer}>
        {
          this.renderRow(i)
        }
        </Row>
      );
    }
    return jsx;
  }

  render() {
    return (
      <div className={`container ${styles.container}`}>
        <h4>
          Our Team
        </h4>
        {
          this.renderCards()
        }
      </div>
    );
  }
}

export default TeamSection;
