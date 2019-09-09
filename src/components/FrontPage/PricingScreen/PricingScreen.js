import React, { Component } from 'react';
import Navbar from 'components/FrontPage/Navbar';
import Footer from 'components/FrontPage/Footer';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import styles from './PricingScreen.module.scss';

class PricingScreen extends Component {

  // TODO: Add pricing details to replace placeholder text
  render() {
    return (
      <div className={`container-fluid ${styles.container}`}>
        <div className={styles.background}></div>
        <Navbar/>
        <h2 className={styles.header}>
          Pricing
        </h2>
        <Row className={styles.cards}>
          <Col></Col>
          <Col className={styles.cardColumn}>
            <Card className={styles.card} style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title className={styles.cardTitle}>Basic</Card.Title>
                <Card.Subtitle className={styles.cardPrice}>{`$2.99 / student`}</Card.Subtitle>
                <ListGroup variant="flush">
                  <ListGroup.Item>Cras justo odio</ListGroup.Item>
                  <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                  <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                </ListGroup>
              </Card.Body>
              <Card.Footer className={styles.purchaseButton}>
                Purchase
              </Card.Footer>
            </Card>
          </Col>
          <Col className={styles.cardColumn}>
            <Card className={styles.card} style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title className={styles.cardTitle}>Premium</Card.Title>
                <Card.Subtitle className={styles.cardPrice}>{`$4.99 / student`}</Card.Subtitle>
                <ListGroup variant="flush">
                  <ListGroup.Item>Cras justo odio</ListGroup.Item>
                  <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                  <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                </ListGroup>
              </Card.Body>
              <Card.Footer className={styles.purchaseButton}>
                Purchase
              </Card.Footer>
            </Card>
          </Col>
          <Col className={styles.cardColumn}>
            <Card className={`${styles.card} ${styles.institution}`} style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title className={styles.cardTitle}>Institution</Card.Title>
                <Card.Subtitle className={styles.cardPrice}>{`Contact sales`}</Card.Subtitle>
                <ListGroup variant="flush">
                  <ListGroup.Item className={styles.institution}>Cras justo odio</ListGroup.Item>
                  <ListGroup.Item className={styles.institution}>Dapibus ac facilisis in</ListGroup.Item>
                  <ListGroup.Item className={styles.institution}>Vestibulum at eros</ListGroup.Item>
                </ListGroup>
              </Card.Body>
              <Card.Footer className={styles.purchaseButton}>
                Contact
              </Card.Footer>
            </Card>
          </Col>
          <Col></Col>
        </Row>
        <Footer/>
      </div>
    );
  }
}

export default PricingScreen;
