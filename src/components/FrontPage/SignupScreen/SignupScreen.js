import React, { Component } from 'react';
import Navbar from 'components/FrontPage/Navbar';
import Footer from 'components/FrontPage/Footer';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import styles from './SignupScreen.module.scss';

class SignupScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      repeatPassword: '',
      firstName: '',
      lastName: '',
      gender: '',
      university: '',
      phone: '',
      tosAgree: false
    };
  }

  async createAccount() {
    if (this.state.password !== this.state.repeatPassword) {
      return;
    }
    if (!this.state.tosAgree) {
      return;
    }
    
    try {
      var response = await fetch(process.env.REACT_APP_SERVER_URL + "/signup", {
        method: 'post',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          gender: this.state.gender,
          phone: this.state.phone,
          university: this.state.university
        })
      })
      .catch(error => {
        console.log('Error: Request to create account failed', error)
      });

      // TODO: Error handling UI
      if (response.ok === false) {
        response = await response.json();
        console.log('Error: ' + response.errors);
      }
      this.props.history.push('/success');
    } catch (e) { // TODO: Error handling UI
      console.log('Unable to create account.');
    }
  }

  updateFirstName(e) {
    if (e.target.value === null) {
      return;
    }
    this.setState({ firstName: e.target.value });
  }

  updateLastName(e) {
    if (e.target.value === null) {
      return;
    }
    this.setState({ lastName: e.target.value });
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

  updateRepeatPassword(e) {
    if (e.target.value === null) {
      return;
    }
    this.setState({ repeatPassword: e.target.value });
  }

  updateGender(e) {
    if (e.target.value === null) {
      return;
    }
    this.setState({ gender: e.target.value });
  }

  updatePhone(e) {
    if (e.target.value === null) {
      return;
    }
    this.setState({ phone: e.target.value });
  }

  updateUniversity(e) {
    if (e.target.value === null) {
      return;
    }
    this.setState({ university: e.target.value });
  }

  toggleTosCheckbox() {
    this.setState({ tosAgree: !this.state.tosAgree });
  }

  render() {
    return (
      <div className={`container-fluid ${styles.container}`}>
        <Navbar/>
        <Row>
          <Col>
            <div className={styles.infoBox}>
              <p className={styles.infoHeadingLarge}>
                {`You're almost there!`}<br/>
              </p>
              <p className={styles.infoHeading}>
                Check out what our customers love about StanPlan...
              </p>
              <Row>
                <Col sm={2}>
                  <i className={`material-icons ${styles.infoIcon}`}>calendar_today</i>
                </Col>
                <Col sm={10}>
                  <p className={styles.infoSubheading}>
                    Scheduling
                  </p>
                  <p className={styles.infoText}>
                    Select courses through an easy interface. Our algorithm will automatically generate your optimal schedule.
                  </p>
                </Col>
              </Row>
              <Row>
                <Col sm={2}>
                  <i className={`material-icons ${styles.infoIcon}`}>search</i>
                </Col>
                <Col sm={10}>
                  <p className={styles.infoSubheading}>
                    Recommendations
                  </p>
                  <p className={styles.infoText}>
                    Receive personalized course recommendations and guidance in selecting a major.
                  </p>
                </Col>
              </Row>
              <Row>
                <Col sm={2}>
                  <i className={`material-icons ${styles.infoIcon}`}>group</i>
                </Col>
                <Col sm={10}>
                  <p className={styles.infoSubheading}>
                    Friends
                  </p>
                  <p className={styles.infoText}>
                    Connect with your friends and see what courses they enrolled in.
                  </p>
                </Col>
              </Row>
              <Row>
                <Col sm={2}>
                  <i className={`material-icons ${styles.infoIcon}`}>save_alt</i>
                </Col>
                <Col sm={10}>
                  <p className={styles.infoSubheading}>
                    Importing / Exporting
                  </p>
                  <p className={styles.infoText}>
                    Import your course list from your transcript. Export your schedule to Microsoft Excel, Google Sheets or as a CSV file.
                  </p>
                </Col>
              </Row>
            </div>
          </Col>
          <Col>
            <Form className={styles.form}>
              <h3 className={styles.heading}>
                Create an account
              </h3>
              <Form.Group controlid="university">
                <Form.Label>University</Form.Label>
                <Form.Control as="select"
                  onChange={ (e) => this.updateUniversity(e) }
                >
                  <option disabled selected>I go to...</option>
                  <option>Stanford University</option>
                </Form.Control>
              </Form.Group>
              <Form.Row>
                <Form.Label className={styles.nameLabel}>Name</Form.Label>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="firstname">
                  <Form.Control type="text" placeholder="First"
                    onChange={ (e) => this.updateFirstName(e) }
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="lastname">
                  <Form.Control type="text" placeholder="Last"
                    onChange={ (e) => this.updateLastName(e) }
                  />
                </Form.Group>
              </Form.Row>
              <Form.Group controlid="gender">
                <Form.Label>Gender</Form.Label>
                <Form.Control as="select"
                  onChange={ (e) => this.updateGender(e) }
                >
                  <option disabled selected>I am...</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Non-binary</option>
                  <option>Other</option>
                  <option>Prefer not to say</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email"
                  onChange={ (e) => this.updateEmail(e) }
                />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Create a password</Form.Label>
                <Form.Control type="password"
                  onChange={ (e) => this.updatePassword(e) }
                />
              </Form.Group>
              <Form.Group controlId="repeatPassword">
                <Form.Label>Confirm your password</Form.Label>
                <Form.Control type="password"
                  onChange={ (e) => this.updateRepeatPassword(e) }
                />
              </Form.Group>
              <Form.Group controlid="phone">
                <Form.Label>Mobile phone (Optional)</Form.Label>
                <Form.Control type='tel'
                  onChange={ (e) => this.updatePhone(e) }
                />
              </Form.Group>
              <Form.Row>
                <Col sm={1}>
                  <Form.Group controlId="tosCheckbox">
                    <Form.Check type="checkbox" onClick={ () => this.toggleTosCheckbox() }/>
                  </Form.Group>
                </Col>
                <Col sm={11}>
                  <p> Click here to indicate that you have read and agree to the terms outlined in the <span className={styles.tosLink}>StanPlan Terms of Service</span>.</p>
                </Col>
              </Form.Row>
              <Button className={styles.finishButton} onClick={ () => this.createAccount() }>Finish</Button>
            </Form>
          </Col>
        </Row>
        <Footer/>
      </div>
    );
  }
}

export default SignupScreen;
