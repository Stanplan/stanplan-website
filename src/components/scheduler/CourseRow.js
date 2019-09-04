import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addCourse, removeCourse, optOutOfCourse } from 'redux/actions';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import './styles/CourseRow.css';

// Class encapsulating all information about a given course.
class CourseRow extends Component {
  constructor(props) {
    super(props);
    const { dispatch, id, code, title, units, description, required, type } = this.props;
    let course = {
      id: id,
      code: code,
      title: title,
      units: units,
      description: description
    };

    if (required && type !== "radio" && !this.isOptedOut()) {
      dispatch(addCourse(course))
    }
  }

  componentDidMount() {
    const { dispatch, id, code, title, units, description } = this.props;
    let course = {
      id: id,
      code: code,
      title: title,
      units: units,
      description: description
    };

    if (this.isSelected()) {
      dispatch(removeCourse(course));
      dispatch(addCourse(course));
    }
  }

  toggleSelection() {
    const { dispatch, id, code, title, units, description, required, type, courseOptions } = this.props;
    let course = {
      id: id,
      code: code,
      title: title,
      units: units,
      description: description
    };

    if (type === "radio") {
      for (let j = 0; j < courseOptions.length; j++) {
        dispatch(removeCourse(courseOptions[j]));
      }
    }

    let selected = !this.isSelected()
    if (selected) {
      dispatch(addCourse(course));
    } else {
      dispatch(removeCourse(course));
      if (required && type !== "radio") {
        dispatch(optOutOfCourse(course));
      }
    }
    this.setState({ selected: selected });
  }

  isSelected() {
    const { code, selectedCourses } = this.props;

    for (let i = 0; i < selectedCourses.length; i++) {
      if (code === selectedCourses[i].code) {
        return true;
      }
    }
    return false;
  }

  isOptedOut() {
    const { code, optedOutCourses } = this.props;

    for (let i = 0; i < optedOutCourses.length; i++) {
      if (code === optedOutCourses[i].code) {
        return true;
      }
    }
    return false;
  }

  renderCheckboxes() {
    const { type } = this.props;

    if (type === "radio") {
      return (
        <Form.Check
          type={type}
          name="group"
          onClick={ (e) => { e.stopPropagation() } }
          onChange={ () => { this.toggleSelection() } }
          checked = { this.isSelected() }
          aria-label="Select this course."
        />
      );
    } else {
      return (
        <Form.Check
          type={type}
          onClick={ (e) => { e.stopPropagation() } }
          onChange={ () => { this.toggleSelection() } }
          checked={ this.isSelected() }
          aria-label="Select this course."
        />
      );
    }
  }

  render() {
    const { required, code, title, units, description } = this.props;
    let requiredIndicatorText = required ? "*" : "";

    return (
      <ExpansionPanel >
        <ExpansionPanelSummary expandIcon={<Icon>expand_more</Icon>}>
          <Row bsPrefix='default' className='courseRow'>
            <Col xs={1}>
              {this.renderCheckboxes()}
            </Col>
            <Col xs={3}>
              {code}
              <span className='required'>{requiredIndicatorText}</span>
            </Col>
            <Col xs={6}>{title}</Col>
            <Col xs={5}>{units + ' Units'}</Col>
          </Row>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>{description}</Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

function mapStateToProps(state) {
  const { selectedCourses, optedOutCourses } = state;
  return {
    selectedCourses,
    optedOutCourses
  };
}

export default connect(mapStateToProps)(CourseRow);
