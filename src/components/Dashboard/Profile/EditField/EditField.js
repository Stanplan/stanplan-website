import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import styles from './EditField.module.scss';

class EditField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profileField: this.props.profileField,
      icon: this.props.icon,
      label: this.props.label,
      value: this.props.value,
      isEditing: false,
      edit: this.props.value
    };
  }

  edit(e) {
    if (e.target.value === null) {
      return;
    }
    this.setState({ edit: e.target.value });
  }

  save() {
    let { profileField, edit } = this.state;

    fetch(process.env.REACT_APP_SERVER_URL + "/updateprofile", {
      method: "post",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        field: profileField,
        value: edit
      })
    })
    .catch(error => {
      console.log('Error: Request to save edit to profile field failed', error);
    });

    this.setState({ isEditing: false, value: edit });
  }

  renderColumns() {
    let { icon, label, value, isEditing, edit } = this.state;
    let jsx = [];
    jsx.push((
      <>
        <Col sm={1}>
          <i className={`material-icons-outlined`}>{icon}</i>
        </Col>
        <Col sm={5}>
          <p>{label}</p>
        </Col>
      </>
    ));
    if (isEditing) {
      jsx.push((
        <>
          <Col sm={5}>
            <Form.Group controlId={`edit${label}`}>
              <Form.Control type="text" className={styles.editTextField} value={edit} onChange={(e) => this.edit(e)}/>
            </Form.Group>
          </Col>
          <Col sm={1}>
            <p className={styles.editButton} onClick={() => this.save()}>Done</p>
          </Col>
        </>
      ));
    } else {
      jsx.push((
        <>
          <Col sm={5}>
            <p className={styles.value}>{value}</p>
          </Col>
          <Col sm={1}>
            <p className={styles.editButton} onClick={() => this.setState({ isEditing: true })}>Edit</p>
          </Col>
        </>
      ));
    }
    return jsx;
  }

  render() {
    return (
      <Row className={styles.row}>
        {
          this.renderColumns()
        }
      </Row>
    );
  }
}

export default EditField;
