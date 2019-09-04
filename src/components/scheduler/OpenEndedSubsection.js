import React, { Component } from 'react';
import { addOpenEndedCourse } from 'redux/actions';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import OpenEndedRow from './OpenEndedRow';
import Button from 'react-bootstrap/Button';
import './styles/OpenEndedSubsection.css';

// Class representing an open ended subsection (i.e. a subsection where users
// enter the course information themselves).
class OpenEndedSubsection extends Component {
  constructor(props) {
    super(props);
    const { id, instructions, numDefaultRows, subsectionId, openEndedCourses } = this.props;

    let openEndedRowComponents = [];
    for (let i = 0; i < openEndedCourses.length; i++) {
      let course = openEndedCourses[i];
      if (course.sectionId === id && course.subsectionId === subsectionId) {
        openEndedRowComponents.push(
          <OpenEndedRow
            parent={course.subsection}
            key={course.rowId}
            rowId={course.rowId}
            subsection={this}
            subsectionId={course.subsectionId}
            sectionId={course.sectionId}
            isDefaultRow={course.isDefaultRow}
            deleteRowHandler={course.deleteRowHandler}
            code={course.code}
            units={course.units}
          />
        );
      }
    }

    if (openEndedRowComponents.length === 0 && numDefaultRows > 0) {
      // Default rows have not yet been added to the list, since this occurs
      // the first time they are rendered.
      for (let i = 0; i < numDefaultRows; i++) {
        openEndedRowComponents.push(
          <OpenEndedRow
            key={i}
            rowId={i}
            parent={undefined}
            subsectionId={subsectionId}
            sectionId={id}
            isDefaultRow={true}
            code={""}
            units={0}
          />
        );
      }
    }

    this.state = {
      id: id,
      subsectionId: subsectionId,
      instructions: instructions, // Instructions for the subsection, if applicable.
      numDefaultRows: numDefaultRows, // Number of undeletable rows present at init
      openEndedRowComponents: openEndedRowComponents,
    };
  }

  // Update subsection state so that it will no longer render the
  // component corresponding to the deleted row.
  deleteRow(subsection, deletedRowId) {
    let rows = subsection.state.openEndedRowComponents.slice();

    let deletedRowIndex = -1;
    for(let i = 0; i < rows.length; i++) {
      if(rows[i].props.rowId === deletedRowId) {
        deletedRowIndex = i;
        break;
      }
    }

    if (deletedRowId === -1) {
      return;
    }

    // Remove the deleted row from the subsection.
    rows.splice(deletedRowIndex, 1);

    subsection.setState ({ openEndedRowComponents: rows });
  }

  // Creates an open ended course row.
  renderOpenEndedRow(subsection, rowId, subsectionId, sectionId, isDefaultRow,
                     deleteRowHandler, code, units) {
    return (
      <OpenEndedRow
        parent={subsection}
        key={rowId}
        rowId={rowId}
        subsectionId={subsectionId}
        sectionId={sectionId}
        isDefaultRow={isDefaultRow}
        deleteRowHandler={deleteRowHandler}
        code={code}
        units={units}
      />
    );
  }

  // Adds a new OpenEndedRow component to the subsection.
  addOpenEndedRow(subsection, deleteRowHandler) {
    const { dispatch } = this.props;

    let rows = this.state.openEndedRowComponents.slice();
    let newRowId = 0;
    if (rows.length > 0) {
      newRowId = rows[rows.length - 1].props.rowId + 1;
      if (newRowId <= rows[rows.length - 1].props.rowId) {
        // Overflowed -> can't add anymore rows
        console.log("Cannot add anymore rows.");
        //TODO: UI error handling
        return;
      }
    }

    let newRow = this.renderOpenEndedRow(subsection,
                                         newRowId,
                                         this.state.subsectionId,
                                         this.state.id,
                                         false,
                                         deleteRowHandler);
    rows.push(newRow);

    let course = {
      rowId: newRowId,
      subsectionId: this.state.subsectionId,
      sectionId: this.state.id,
      units: 0,
      code: "",
      isDefaultRow: false,
      subsection: subsection,
      deleteRowHandler: deleteRowHandler
    };

    this.setState({
      openEndedRowComponents: rows
    }, () => { dispatch(addOpenEndedCourse(course)) });
  }

  // Render open ended rows with updated "parent" props. This is necessary to
  // avoid changing the state of an unmounted subsection component (the rows'
  // previous "parent" props, which are no longer valid since we are rendering
  // a new subsection component).
  renderOpenEndedRowComponents(subsection) {
    let rows = [];
    let oldRows = this.state.openEndedRowComponents;
    for (let i = 0; i < oldRows.length; i++) {
      let oldRow = oldRows[i];
      let newRow = this.renderOpenEndedRow(subsection,
                                           oldRow.props.rowId,
                                           this.state.subsectionId,
                                           this.state.id,
                                           oldRow.props.isDefaultRow,
                                           oldRow.props.deleteRowHandler,
                                           oldRow.props.code,
                                           oldRow.props.units);
      rows.push(newRow);
    }
    return rows;
  }

  render() {
    return (
      <Container bsPrefix='default' className='subsection'>
        <Row bsPrefix='default' className='instructions'>
          <h5>{this.state.instructions}</h5>
        </Row>
        {this.renderOpenEndedRowComponents(this)}
        <Button
          variant='danger'
          className='addCourseButton'
          onClick={ () => this.addOpenEndedRow(this, this.deleteRow) }
        >
        Add a Course
        </Button>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  const { openEndedCourses } = state;
  return {
    openEndedCourses
  };
}

export default connect(mapStateToProps)(OpenEndedSubsection);
