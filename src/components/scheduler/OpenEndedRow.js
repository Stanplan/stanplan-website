import React, { Component } from 'react';
import { addOpenEndedCourse, updateOpenEndedCourse, removeOpenEndedCourse } from 'redux/actions';
import { connect } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

// Class encapsulating all information about a given course.
class OpenEndedRow extends Component {
  constructor(props) {
    super(props);
    const { dispatch, sectionId, subsectionId, rowId, parent, isDefaultRow,
            deleteRowHandler, code, units } = this.props;

    let course = {
      rowId: rowId, // Unique ID for this component (unique among its siblings).
      subsectionId: subsectionId,
      sectionId: sectionId,
      units: units,
      code: code,
      isDefaultRow: isDefaultRow,
      subsection: parent,
      deleteRowHandler: deleteRowHandler
    };

    this.state = {
      units: units, // Units currently entered in this row.
      code: code,
      subsection: parent, // Subsection this row is a part of.
      deleteRowHandler: deleteRowHandler,
      rowId: rowId,
      subsectionId: subsectionId,
      sectionId: sectionId,
      isDefaultRow: isDefaultRow, // If this is a default row, it is not deletable.
      validated: false,
      validatedCode: false,
      validatedUnits: false
    };

    if (isDefaultRow) {
      dispatch(addOpenEndedCourse(course));
    }

    this.codeInput = React.createRef();
    this.unitsInput = React.createRef();
  }

  // Update the unit count.
  updateUnitCount(e) {
    const { dispatch } = this.props;
    let newUnitCount = 0;
    let validated = true;
    let valid = "valid";

    if (e.target.value === "") {
      newUnitCount = 0;
      validated = false;
      valid = ""
    } else {
      newUnitCount = parseInt(e.target.value);
      if (isNaN(newUnitCount) || newUnitCount < 0) {
        newUnitCount = 0;
        valid = "invalid";
      }
    }

    let course = {
      rowId: this.state.rowId,
      subsectionId: this.state.subsectionId,
      sectionId: this.state.sectionId,
      units: newUnitCount,
      code: this.state.code,
      isDefaultRow: this.state.isDefaultRow,
      subsection: this.state.subsection,
      deleteRowHandler: this.state.deleteRowHandler
    };

    this.setState({
      units: newUnitCount,
      validated: validated,
      validatedUnits: valid
    }, () => { dispatch(updateOpenEndedCourse(course)) });
  }

  // Deletes this row from its subsection.
  deleteRow() {
    const { dispatch } = this.props;
    this.state.deleteRowHandler(this.state.subsection, this.state.rowId);

    let course = {
      rowId: this.state.rowId,
      subsectionId: this.state.subsectionId,
      sectionId: this.state.sectionId,
    };

    dispatch(removeOpenEndedCourse(course));
  }

  updateCourseCode(e) {
    const { dispatch } = this.props;

    let course = {
      rowId: this.state.rowId,
      subsectionId: this.state.subsectionId,
      sectionId: this.state.sectionId,
      units: this.state.units,
      code: e.target.value,
      isDefaultRow: this.state.isDefaultRow,
      subsection: this.state.subsection,
      deleteRowHandler: this.state.deleteRowHandler
    };

    let input = e.target.value;
    input = input.split(' ');
    if (input.length === 2 && input[1] !== '') {
      let department = input[0];
      let code = input[1];
      fetch(process.env.REACT_APP_SERVER_URL + "/validator?department=" + department + "&code=" + code, {
        method: 'get',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        if (response.ok === false) {
          console.log('Unable to validate course with the server.');
          return { validated: false };
        }
        return response.json();
      })
      .then((json) => {
        this.setState({
          code: department + ' ' + code,
          validated: true,
          validatedCode: json.validated ? "valid" : "invalid"
        }, () => { dispatch(updateOpenEndedCourse(course)) });
      })
      .catch(error => {
        console.log('Error: Request for validation failed', error)
      });
    } else {
      this.setState({
        code: e.target.value,
        validated: false,
        validatedCode: ""
      }, () => { dispatch(updateOpenEndedCourse(course)) });
    }
  }

  render() {
    const { code, units } = this.props;
    return (
      <Form
        noValidate
      >
      <Row>
        <Col>
          <Form.Group>
            <Form.Control
              placeholder="Course code (e.g. CS 106A)"
              ref={this.codeInput}
              type="text"
              onChange={ (e) => this.updateCourseCode(e) }
              defaultValue={code}
              required
              isValid={this.state.validatedCode === "valid"}
              isInvalid={this.state.validatedCode === "invalid"}
            />
            <Form.Control.Feedback type="invalid">
              Please enter a valid course code.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Control
              placeholder="Units"
              ref={this.unitsInput}
              type="number"
              min="1"
              onChange={ (e) => this.updateUnitCount(e) }
              defaultValue={ units === 0 ? "" : units }
              required
              isValid={this.state.validatedUnits === "valid"}
              isInvalid={this.state.validatedUnits === "invalid"}
            />
            <Form.Control.Feedback type="invalid">
              Please enter a valid unit count.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col xs={0.5}>
          <IconButton
            aria-label="Delete"
            disabled={this.state.isDefaultRow}
            onClick={ () => { this.deleteRow() }}>
            <Icon>delete</Icon>
          </IconButton>
        </Col>
        </Row>
      </Form>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(OpenEndedRow);
