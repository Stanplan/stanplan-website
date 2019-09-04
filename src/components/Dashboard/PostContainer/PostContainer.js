import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Post from './Post';
import styles from './PostContainer.module.scss';

class PostContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      picture: "",
      posts: []
    };

    this.getPosts = this.getPosts.bind(this);
  }

  getPosts() {
    fetch(process.env.REACT_APP_SERVER_URL + "/posts", {
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
        firstName: json.firstName,
        lastName: json.lastName,
        picture: json.picture,
        posts: json.posts
      });
    })
    .catch(error => {
      console.log('Error: Request for posts failed', error)
    });
  }

  componentDidMount() {
    this.getPosts();
    this.timer = setInterval(this.getPosts, 1000);
  }

  componentWillUnmount() {
    this.timer = null;
  }

  renderPost(id, name, picture, text, time) {
    return (
      <Row className={styles.postRow}>
        <Col>
          <Post id={id} person={name} picture={picture} text={text} time={time}/>
        </Col>
      </Row>
    );
  }

  renderPosts() {
    let posts = [];
    for (let i = this.state.posts.length - 1; i >= 0; i--) { // Reverse order so newer posts render at top
      let id = this.state.id;
      let name = this.state.firstName + " " + this.state.lastName;
      let picture = this.state.picture;
      let text = this.state.posts[i].text;
      let date = new Date(this.state.posts[i].timestamp);

      let now = new Date();
      let timeElapsed = now - date;
      if (timeElapsed < 1000 * 60 * 60) { // Less than one hour passed
        let minutesElapsed = Math.floor(timeElapsed / (1000 * 60));
        if (minutesElapsed <= 1) {
          date = `1 minute ago`;
        } else {
          date = `${minutesElapsed} minutes ago`;
        }
      } else if (timeElapsed < 1000 * 60 * 60 * 24) { // Less than one day passed
        let hoursElapsed = Math.floor(timeElapsed / (1000 * 60 * 60));
        if (hoursElapsed === 1) {
          date = `1 hour ago`;
        } else {
          date = `${hoursElapsed} hours ago`;
        }
      } else {
        let dateOptions = { day: "numeric", month: "long", year: "numeric" };
        date = date.toLocaleDateString('en-US', dateOptions);
      }

      posts.push(this.renderPost(id, name, picture, text, date));
    }
    return posts;
  }

  render() {
    return (
      <div className={`container ${styles.postContainer}`}>
        {
          this.renderPosts()
        }
      </div>
    );
  }
}

export default PostContainer;
