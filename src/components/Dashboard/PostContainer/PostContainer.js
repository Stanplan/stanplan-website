import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Post from './Post';
import { getProfilePicture } from 'utils/ImageLoader';
import styles from './PostContainer.module.scss';

class PostContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      lastDownloadTime: null
    };

    this.getPosts = this.getPosts.bind(this);
  }

  async addProfilePictures(posts) {
    for (let i = 0; i < posts.length; i++) {
      posts[i].picture = await getProfilePicture(posts[i].owner);
    }
    return posts;
  }

  getPosts() {
    let downloadTime = new Date();

    fetch(process.env.REACT_APP_SERVER_URL + "/posts?lastDownloadTime=" + this.state.lastDownloadTime, {
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
      if (json.posts.length > 0) {
        let posts = this.state.posts;
        this.addProfilePictures(json.posts)
        .then(newPosts => {
          for (let i = 0; i < newPosts.length; i++) {
            posts.push(newPosts[i]);
          }
          this.setState({ posts: posts, lastDownloadTime: downloadTime });
        });
      } else {
        this.setState({ lastDownloadTime: downloadTime });
      }
    })
    .catch(error => {
      console.log('Error: Request for posts failed', error);
    });
  }

  componentDidMount() {
    this.getPosts();
    this.timer = setInterval(this.getPosts, 1000);
  }

  componentWillUnmount() {
    this.timer = null;
  }

  renderPost(id, owner, name, picture, text, time) {
    return (
      <Row className={styles.postRow}>
        <Col>
          <Post id={id} owner={owner} person={name} picture={picture} text={text} time={time}/>
        </Col>
      </Row>
    );
  }

  renderPosts() {
    let { posts } = this.state;
    let postComponents = [];
    for (let i = posts.length - 1; i >= 0; i--) { // Reverse order so newer posts render at top
      let id = posts[i].id;
      let owner = posts[i].owner;
      let name = posts[i].firstName + " " + posts[i].lastName;
      let picture = posts[i].picture;
      let text = posts[i].text;
      let date = new Date(posts[i].timestamp);

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

      postComponents.push(this.renderPost(id, owner, name, picture, text, date));
    }
    return postComponents;
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
