import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import styles from './Post.module.scss';

class Post extends Component {
  constructor(props) {
    super(props);
  }

  like() {

  }

  render() {
    return (
      <Card className={styles.post}>
        <Card.Body>
          <Image roundedCircle src={this.props.picture} className={styles.picture}/>
          <div className={styles.headerText}>
            <p className={styles.name}>{this.props.person}</p>
            <p className={styles.time}>{this.props.time}</p>
          </div>
          <p className={styles.text}>{this.props.text}</p>
        </Card.Body>
        <Card.Footer className={styles.footer}>
          <ButtonGroup className={styles.engageButtonGroup}>
            <Button className={styles.engageButton}>Like</Button>
            <Button className={styles.engageButton}>Comment</Button>
            <Button className={styles.engageButton}>Share</Button>
            <Button className={styles.engageButton}>Save</Button>
          </ButtonGroup>
        </Card.Footer>
      </Card>
    );
  }
}

export default Post;
