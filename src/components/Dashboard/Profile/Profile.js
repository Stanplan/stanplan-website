import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import styles from './Profile.module.scss';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: null,
      bio: null,
      profile: null
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
      this.setState({
        name: json.name,
        bio: json.bio,
        picture: json.picture
      });
    })
    .catch(error => {
      console.log('Error: Request for posts failed', error);
    });
  }

  render() {
    let { name, bio, picture } = this.state;
    if (bio === null) bio = '';
    return (
      <Card className={styles.card}>
        <div className={styles.topArea}>
          <Image roundedCircle src={picture} className={styles.picture}/>
        </div>
        <div className={styles.text}>
          <p className={styles.name}><strong>{name}</strong></p>
          <p className={styles.bio}>{bio}</p>
        </div>
      </Card>
    );
  }
}

export default Profile;
