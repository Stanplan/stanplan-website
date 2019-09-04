import React, { Component } from 'react';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import './styles/Section.css';

// Class representing a requirements section (e.g. Science requirement).
class Section extends Component {
  render() {
    const { id, title, instructions, selectedCourses, openEndedCourses } = this.props;

    let totalUnitsSelected = 0;
    console.log(selectedCourses);
    for (let i = 0; i < selectedCourses.length; i++) {
      if (selectedCourses[i].id === id) {
        totalUnitsSelected += selectedCourses[i].units;
      }
    }
    for (let i = 0; i < openEndedCourses.length; i++) {
      if (openEndedCourses[i].sectionId === id) {
        let units = openEndedCourses[i].units === undefined ? 0 : openEndedCourses[i].units;
        totalUnitsSelected += units;
      }
    }

    return (
      <Container>
        <Row className='title'>
          <h1>{title}</h1>
        </Row>
        <Row className='instructions'>
          <h4>{instructions}</h4>
        </Row>
        <div>
          {this.props.children}
        </div>
        <Row>
          <div className='horizontalDivider'></div>
        </Row>
        <Row>
          <h2>Total Units Selected: {totalUnitsSelected}</h2>
        </Row>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  const { selectedCourses, openEndedCourses } = state;
  return {
    selectedCourses,
    openEndedCourses
  };
}

export default connect(mapStateToProps)(Section);
