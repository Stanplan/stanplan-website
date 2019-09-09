import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { loggedIn } from 'redux/actions';
import Navbar from 'components/FrontPage/Navbar';
import Footer from 'components/FrontPage/Footer';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import styles from './LoginScreen.module.scss';

class LoginScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };
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

  render() {
    return (
      <div className={`container-fluid ${styles.container}`}>
        <Navbar/>
        <Form className={styles.form}>
          <h3 className={styles.heading}>
            Log in
          </h3>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
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
          <Button className={styles.loginButton} onClick={() => this.login()}>Log in</Button>
          <Link to="/forgotpassword" className={styles.forgotMyPassword}>Forgot your password?</Link>
        </Form>
        <Footer/>
      </div>
    );
  }
}

export default LoginScreen;