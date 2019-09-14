import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { getProfilePicture } from 'utils/ImageLoader';
import styles from './Profile.module.scss';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showEditProfileModal: false,
      id: null,
      name: null,
      bio: null,
      picture: null,
      university: null,
      classYear: null,
      majors: [],
      minors: [],
      clubs: [],
      interests: [],
      hometown: null,
      currentResidence: null,
      jobs: [],
      website: null
    }
  }

  componentDidMount() {
    this.getProfileData();
  }

  getProfileData() {
    fetch(process.env.REACT_APP_SERVER_URL + "/profile", {
      method: "get",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      return response.json();
    })
    .then(json => {
      let bio = json.bio;
      if (bio === null) bio = '';
      this.setState({
        id: json.id,
        name: json.name,
        bio: bio,
        university: json.university,
        classYear: json.classYear,
        majors: json.majors,
        minors: json.minors,
        clubs: json.clubs,
        interests: json.interests,
        hometown: json.hometown,
        currentResidence: json.currentResidence,
        jobs: json.jobs,
        website: json.website
      });

      getProfilePicture(this.state.id).then(picture => {
        this.setState({ picture: picture });
      });
    })
    .catch(error => {
      console.log('Error: Request for posts failed', error);
    });
  }

  renderText(text, link=false) {
    if (link) {
      return (
        <a className={styles.link} href={text}>{text}</a>
      );
    }
    return text;
  }

  renderField(icon, text, link=false) {
    return (
      <Row className={styles.field}>
        <Col sm={1}>
          <i className={`material-icons-outlined`}>{icon}</i>
        </Col>
        <Col sm={11}>
          {
            this.renderText(text, link)
          }
        </Col>
      </Row>
    );
  }

  renderProfileFields() {
    let { university, classYear, majors, minors, clubs, interests, hometown, currentResidence, jobs, website } = this.state;
    let fields = [];
    if (hometown !== null && hometown !== undefined) {
      fields.push(this.renderField('home', `From ${hometown}`));
    }
    if (currentResidence !== null && currentResidence !== undefined) {
      fields.push(this.renderField('home', `Currently lives in ${currentResidence}`));
    }
    if (university !== null) {
      if (classYear !== null && classYear !== undefined) {
        fields.push(this.renderField('school', `Attends ${university}, Class of ${classYear}`));
      } else {
        fields.push(this.renderField('school', `Attends ${university}`));
      }
    }
    if (majors.length > 0) {
      let studyingField = `Studying ${majors[0]}`;
      for (let i = 1; i < majors.length - 1; i++) {
        studyingField += `, ${majors[i]}`;
      }
      if (majors.length > 1) {
        studyingField += ` and ${majors[majors.length - 1]}`;
      }

      if (minors.length > 0) {
        if (minors.length === 1) {
          studyingField += `with a minor in ${minors[0]}`;
        } else {
          studyingField += `with minors in ${minors[0]}`;
          for (let j = 1; j < minors.length - 1; j++) {
            studyingField += `, ${minors[j]}`;
          }
          studyingField += ` and ${minors[minors.length - 1]}`;
        }
      }

      fields.push(this.renderField('school', studyingField));
    }
    if (clubs.length > 0) {
      fields.push(this.renderField('group', `Involved in ${clubs.join(', ')}`));
    }
    if (interests.length > 0) {
      fields.push(this.renderField('favorite_border', `Interested in ${interests.join(', ')}`));
    }
    if (jobs.length > 0) {
      fields.push(this.renderField('work_outline', `Works as ${jobs.join(', ')}`));
    }
    if (website !== null && website !== undefined) {
      fields.push(this.renderField('share', website, true));
    }
    return fields;
  }

  showEditProfileModal() {
    this.setState({ showEditProfileModal: true });
  }

  hideEditProfileModal() {
    this.setState({ showEditProfileModal: false });
  }

  updateField(field, e) {
    if (e.target.value === null) {
      return;
    }
    this.setState({ [field]: e.target.value });

    fetch(process.env.REACT_APP_SERVER_URL + "/updateprofile", {
      method: "post",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        field: field,
        value: e.target.value
      })
    })
    .catch(error => {
      console.log('Error: Request to update profile field failed', error);
    });
  }

  renderSingleEditField(icon, label, field) {
    return (
      <Row className={styles.field}>
        <Col sm={1}>
          <i className={`material-icons-outlined`}>{icon}</i>
        </Col>
        <Col sm={10}>
          <p>{label} <span className={styles.fieldEdit}>{field}</span></p>
        </Col>
        <Col sm={1}>
          <p className={styles.editFieldButton}>Edit</p>
        </Col>
      </Row>
    );
  }

  render() {
    let { showEditProfileModal, name, bio, picture, university, classYear, majors, minors, clubs, interests, hometown, currentResidence, jobs, website } = this.state;
    return (
      <Card className={styles.card}>
        <div className={styles.topArea}>
          <Image roundedCircle src={picture} className={styles.picture}/>
        </div>
        <div className={styles.text}>
          <p className={styles.name}><strong>{name}</strong></p>
          <p className={styles.bio}>{bio}</p>
        </div>
        <div className={styles.profileFields}>
          {
            this.renderProfileFields()
          }
        </div>
        <Button className={styles.editProfileButton} onClick={() => this.showEditProfileModal()}>Edit profile</Button>

        <Modal show={showEditProfileModal} onHide={() => this.hideEditProfileModal()} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Edit profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="bio">
              <Form.Label>Bio</Form.Label>
              <Form.Control as="textarea" rows="4" className={styles.bioEditField} value={bio} onChange={(e) => this.updateField('bio', e)}/>
            </Form.Group>
            <p>About me</p>
            <div className={styles.profileFields}>
              { this.renderSingleEditField('home', 'Hometown', hometown) }
              { this.renderSingleEditField('home', 'Current residence', currentResidence) }
              { this.renderSingleEditField('school', 'University', university) }
              { this.renderSingleEditField('school', 'Class year', classYear) }
            </div>
          </Modal.Body>
        </Modal>
      </Card>
    );
  }
}

export default Profile;
