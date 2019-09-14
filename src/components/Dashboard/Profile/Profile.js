import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import EditField from './EditField';
import EditArea from './EditArea';
import { getProfilePicture } from 'utils/ImageLoader';
import styles from './Profile.module.scss';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showEditModal: false,
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
      city: null,
      state: null,
      country: null,
      currentResidence: null,
      jobs: [],
      website: null
    }

    this.updateData = this.updateData.bind(this);
    this.updatePicture = this.updatePicture.bind(this);
  }

  componentDidMount() {
    this.updateData().then(() => {
      this.updatePicture();
    });
    this.timerData = setInterval(this.updateData, 1000);
    this.timerPicture = setInterval(this.updatePicture, 60000);
  }

  componentWillUnmount() {
    this.timerData = null;
    this.timerPicture = null;
  }

  async updateData() {
    await fetch(process.env.REACT_APP_SERVER_URL + "/profile", {
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
        city: json.city,
        state: json.state,
        country: json.country,
        currentResidence: json.currentResidence,
        university: json.university,
        classYear: json.classYear,
        majors: json.majors,
        minors: json.minors,
        clubs: json.clubs,
        interests: json.interests,
        jobs: json.jobs,
        website: json.website
      });
    })
    .catch(error => {
      console.log('Error: Request for profile data failed', error);
    });
  }

  updatePicture() {
    if (this.state.id === null) return;
    getProfilePicture(this.state.id).then(picture => {
      this.setState({ picture: picture });
    });
  }

  renderField(icon, text, link=false) {
    return (
      <Row className={styles.field}>
        <Col sm={1}>
          <i className={`material-icons-outlined`}>{icon}</i>
        </Col>
        <Col sm={11}>
          { link ? (<a className={styles.link} href={text}>{text}</a>) : text }
        </Col>
      </Row>
    );
  }

  renderFields() {
    let { university, classYear, majors, minors, clubs, interests, city, state, country, currentResidence, jobs, website } = this.state;
    let fields = [];
    if (city !== null && city !== undefined) {
      let fromField = `From ${city}`;
      if (country === "United States" && state !== null && state !== undefined) {
        fromField += `, ${state}`;
      } else if (country !== null && country !== undefined) {
        fromField += `, ${country}`;
      }
      fields.push(this.renderField('home', fromField));
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

  render() {
    let { showEditModal, name, bio, picture } = this.state;
    let { city, state, country, currentResidence, university, classYear, majors, minors, clubs, interests, jobs, website } = this.state;
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
            this.renderFields()
          }
        </div>
        <Button className={styles.editProfileButton} onClick={() => this.setState({ showEditModal: true })}>Edit profile</Button>

        <Modal show={showEditModal} onHide={() => this.setState({ showEditModal: false })} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Edit profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <EditArea profileField='bio' label='Bio' value={bio}/>
            <p>About me</p>
            <div className={styles.profileFields}>
              <EditField profileField='city' icon='home' label='Home city' value={city}/>
              <EditField profileField='state' icon='home' label='Home state' value={state}/>
              <EditField profileField='country' icon='home' label='Home country' value={country}/>
              <EditField profileField='currentResidence' icon='home' label='Current dorm/apt.' value={currentResidence}/>
              <EditField profileField='classYear' icon='school' label='Class year' value={classYear}/>
            </div>
          </Modal.Body>
        </Modal>
      </Card>
    );
  }
}

export default Profile;
