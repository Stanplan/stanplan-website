import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import styles from './EditArea.module.scss';

class EditArea extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profileField: this.props.profileField,
      label: this.props.label,
      value: this.props.value
    };
  }

  edit(e) {
    if (e.target.value === null) {
      return;
    }
    this.setState({ value: e.target.value });
  }

  save(e) {
    let { profileField, value } = this.state;

    this.edit(e);

    fetch(process.env.REACT_APP_SERVER_URL + "/updateprofile", {
      method: "post",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        field: profileField,
        value: e.target.value
      })
    })
    .catch(error => {
      console.log('Error: Request to save edit to profile area failed', error);
    });
  }

  render() {
    let { label, value } = this.state;
    return (
      <Form.Group controlId={`edit${label}`}>
        <Form.Label>{label}</Form.Label>
        <Form.Control as="textarea" rows="4" className={styles.editArea} value={value} onChange={(e) => this.save(e)}/>
      </Form.Group>
    );
  }
}

export default EditArea;
