import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import { getProfilePicture } from 'utils/ImageLoader';
import styles from './Profile.module.scss';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      name: null,
      bio: null,
      picture: null
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
        bio: bio
      });

      getProfilePicture(this.state.id).then(picture => {
        this.setState({ picture: picture });
      });
    })
    .catch(error => {
      console.log('Error: Request for posts failed', error);
    });
  }

  render() {
    let { name, bio, picture } = this.state;
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
