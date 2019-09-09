import React, { Component } from 'react';
import { loggedIn } from 'redux/actions';
import Navbar from 'components/FrontPage/Navbar';
import Footer from 'components/FrontPage/Footer';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import queryString from 'query-string';
import styles from './VerifiedScreen.module.css';

class VerifiedScreen extends Component {

  componentDidMount() {
    let values = queryString.parse(this.props.location.search);
    let email = values.email;
    let confirmationString = values.confirmationString;

    const { dispatch } = this.props;
    try {
      fetch(process.env.REACT_APP_SERVER_URL + "/verify", {
        method: 'post',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          confirmationString: confirmationString
        })
      })
      .then(response => {
        // TODO: Error handling UI
        if (response.ok === false) {
          throw(new Error('Error: Verification failed'));
        } else {
          dispatch(loggedIn(this.state.email));
        }
      })
      .catch(error => {
        console.log('Error: Request to login failed', error)
      });
    } catch (e) { // TODO: Error handling UI
      console.log("Unable to login.");
    }
  }

  goToDashboard() {
    this.props.history.push('/dashboard');
  }

  // TODO: Display failure screen instead if verification fails
  render() {
    return (
      <div className={`container-fluid ${styles.container}`}>
        <Navbar variant='grey'/>
        <Row className='justify-content-center'>
          <h2 className={styles.header}>
            Congratulations! Your account is now activated.
          </h2>
        </Row>
        <Row className='justify-content-center'>
          <p className={styles.text}>
            Click on the button below to begin using Stanplan.
          </p>
        </Row>
        <Row className='justify-content-center'>
          <Button className={styles.dashboardButton} onClick={ () => this.goToDashboard() }>Dashboard</Button>
        </Row>
        <Footer/>
      </div>
    );
  }
}

export default VerifiedScreen;
