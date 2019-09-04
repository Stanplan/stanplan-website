import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import styles from './CreatePost.module.scss';

class CreatePost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: ''
    };
  }

  updateText(e) {
    if (e.target.value === null) {
      return;
    }
    this.setState({ text: e.target.value });
  }

  clearText() {
    this.setState({ text: "" });
  }

  async post() {
    this.clearText();

    fetch(process.env.REACT_APP_SERVER_URL + "/post", {
      method: 'post',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: this.state.text
      })
    })
    .catch(error => {
      console.log('Error: Request to post failed', error)
    });
  }

  render() {
    return (
      <Card className={styles.card}>
        <Card.Header className={styles.header}>
          New Post
        </Card.Header>
        <Form.Group controlId="newPost" className={styles.body}>
          <Form.Control
            as="textarea"
            rows="6"
            placeholder="What's new?"
            className={styles.textArea}
            onChange={(e) => this.updateText(e)}
            value={this.state.text}
          />
        </Form.Group>
        <Card.Footer className={styles.footer}>
          <Button className={styles.attachmentButton}>Add Photo/Video</Button>
          <Button className={styles.attachmentButton}>Add GIF</Button>
          <Button className={styles.attachmentButton}>Add Poll</Button>
          <Button className={styles.attachmentButton}>Add Emoji</Button>
          <Button className={styles.postButton} onClick={() => this.post()}>Post</Button>
        </Card.Footer>
      </Card>
    );
  }
}

export default CreatePost;
