import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import CourseRow from './CourseRow';
import Form from 'react-bootstrap/Form';
import './styles/Subsection.css';

// Class representing a subsection (i.e. a group of classes from which a certain
// number or a certain number of units must be selected).
class Subsection extends Component {
  constructor(props) {
    super(props);
    const { id, courseOptions, instructions } = this.props;

    let showRequiredCourseLegend = false;
    for (let i = 0; i < courseOptions.length; i++) {
      if (courseOptions[i].required) {
        showRequiredCourseLegend = true;
        break;
      }
    }

    this.state = {
      id: id,
      instructions: instructions,
      courseOptions: courseOptions,
      showRequiredCourseLegend: showRequiredCourseLegend
    };
  }

  renderCourseRow(courseOptions, i, type, id) {
    return (
      <CourseRow
        code={courseOptions[i].code}
        title={courseOptions[i].title}
        units={courseOptions[i].units}
        description={courseOptions[i].description}
        required={courseOptions[i].required}
        key={i} // Helps React track which items have changed.
        type={type}
        courseOptions={courseOptions}
        id={id}
      />
    );
  }

  createCourseRows(renderCourseRow, courseOptions, type, id) {
    let courseRowComponents = [];
    for (let i = 0; i < courseOptions.length; i++) {
      courseRowComponents.push(renderCourseRow(courseOptions, i, type, id));
    }
    return courseRowComponents;
  }

  renderRequiredCourseLegend() {
    if (this.state.showRequiredCourseLegend) {
      return (
        <h6><span className='required'>* </span>required course</h6>
      );
    }
    return null;
  }

  render() {
    const { instructions, courseOptions, id } = this.state;

    // Note: passing in arguments to "createCourseRows()" because "this" means
    // something else besides the Subsection instance when used in
    // "createCourseRows()".
    return (
      <Container bsPrefix='default' className='subsection'>
        <Row bsPrefix='default' className='instructions'>
          <h5>{instructions}</h5>
        </Row>
        <Form>
          <fieldset>
            <Form.Group>
              {this.createCourseRows(
                this.renderCourseRow,
                courseOptions,
                this.props.type,
                id
              )}
            </Form.Group>
          </fieldset>
        </Form>
        {this.renderRequiredCourseLegend()}
      </Container>
    );
  }
}

export default Subsection;
