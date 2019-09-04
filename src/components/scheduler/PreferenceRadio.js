import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateSummerPreference, updatePrereqPreference } from 'redux/actions';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import './styles/PreferenceRadio.css';

// Class representing an area in the "Preferences" section of the app where
// the user will choose between yes/no options.
class PreferenceRadio extends Component {

  updatePreferenceTo(preference) {
    const { id, dispatch } = this.props;
    if (id === "summer") {
      dispatch(updateSummerPreference(preference));
    } else if (id === "prereqs") {
      dispatch(updatePrereqPreference(preference));
    }
  }

  render() {
    const { id, scheduleInSummer, considerPrereqs } = this.props;

    return (
      <Container bsPrefix='default' className='container'>
        <Row bsPrefix='default' className='question'>
          {this.props.question}
        </Row>
        <Form.Row>
          <Col>
            <Form.Check
              type="radio"
              name={id}
              label="Yes"
              aria-label="yes"
              onChange={ () => this.updatePreferenceTo(true) }
              checked={ id === "summer" ? scheduleInSummer : considerPrereqs }
            />
          </Col>
          <Col>
            <Form.Check
              type="radio"
              name={id}
              label="No"
              aria-label="no"
              onChange={ (e) => this.updatePreferenceTo(false) }
              checked={ id === "summer" ? !scheduleInSummer : !considerPrereqs }
            />
          </Col>
        </Form.Row>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  const { scheduleInSummer, considerPrereqs } = state;
  return {
    scheduleInSummer,
    considerPrereqs
  };
}

export default connect(mapStateToProps)(PreferenceRadio);
