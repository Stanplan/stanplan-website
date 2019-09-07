import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loggedIn } from 'redux/actions';
import { withRouter } from "react-router-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import logo from 'assets/images/Logo.png';
import styles from './IntroSection.module.scss';

class IntroSection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showLoginModal: false,
      email: '',
      password: ''
    };
  }

  closeLoginModal() {
    this.setState({ showLoginModal: false });
  }

  openLoginModal() {
    this.setState({ showLoginModal: true });
  }

  async login() {
    const { dispatch } = this.props;
    try {
      var response = await fetch(process.env.REACT_APP_SERVER_URL + "/login", {
        method: 'post',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password
        })
      })
      .catch(error => {
        console.log('Error: Request to login failed', error)
      });

      // TODO: Error handling UI
      if (response.ok === false) {
        response = await response.json();
        console.log('Error: ' + response.errors);
      } else {
        dispatch(loggedIn(this.state.email));
        this.closeLoginModal();
        this.props.history.push('/dashboard');
      }
    } catch (e) { // TODO: Error handling UI
      console.log("Unable to login.");
    }
  }

  updateEmail(e) {
    if (e.target.value === null) {
      return;
    }
    this.setState({ email: e.target.value });
  }

  updatePassword(e) {
    if (e.target.value === null) {
      return;
    }
    this.setState({ password: e.target.value });
  }

  goToSignupScreen() {
    this.props.history.push('/signup');
  }

  render() {
    return (
      <div className={`container-fluid ${styles.container}`}>
        <Row>
          <Col>
            <div className={styles.leftColumn}>
              <div className={`container-fluid ${styles.logo}`}>
                <img src={logo} alt="StanPlan Logo" width="70%" height="70%"/>
              </div>
              <p className={styles.heading}>
                The smart college planner
              </p>
              <p className={styles.subheading}>
                StanPlan turns course selection into a smooth and easy experience.
              </p>
              <Button className={styles.signupButton} onClick={() => this.goToSignupScreen()}>Get Started</Button>
              <p className={styles.aboutButton}>
                Already have an account? <button className={styles.loginButton} onClick={() => this.openLoginModal()}>Log in!</button>
              </p>
              <p className={styles.aboutButton}>
                <Link to="/about" className={styles.link}>About the StanPlan team</Link>
              </p>
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

        <Modal show={this.state.showLoginModal} onHide={() => this.closeLoginModal()}>
          <Modal.Header closeButton>
            <Modal.Title>Log In</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email"
                  onChange={ (e) => this.updateEmail(e) }
                />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password"
                  onChange={ (e) => this.updatePassword(e) }
                />
              </Form.Group>
              <Form.Group controlId="rememberMe">
                <Form.Check type="checkbox" label="Keep me logged in" />
              </Form.Group>
            </Form>
            <Form inline>
              <Button variant="primary" onClick={() => this.login()}>Log In</Button>
              <Link to="/forgotpassword" className={styles.forgotMyPasswordLink}>Forgot my Password</Link>
            </Form>
          </Modal.Body>
        </Modal>
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
