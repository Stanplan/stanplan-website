import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateMaxUnits, updateMinUnits } from 'redux/actions';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import './styles/PreferenceRow.css';

// Class representing a row in the "Preferences" section of the app where
// the user is expected to enter a unit count.
class PreferenceRow extends Component {
  constructor(props) {
    super(props);

    const { id } = this.props
    this.formRef = React.createRef();

    this.state = {
      validated: false,
      id: id
    }
  }

  // Verify that the number of units entered is a valid number.
  verifyInput (e) {
    const { id, dispatch } = this.props;

    this.setState( { validated: true } );
    let units = parseInt(e.target.value);
    if (isNaN(units)) {
      return;
    }

    if (this.formRef.current.checkValidity()) {
      if (id === "min") {
        dispatch(updateMinUnits(units));
      } else {
        dispatch(updateMaxUnits(units));
      }
    }
  }

  getValue() {
    const { id, maxUnitsPerQuarter, minUnitsPerQuarter, didEditMaxUnits, didEditMinUnits } = this.props;
    if (id === "max" && didEditMaxUnits) {
      return maxUnitsPerQuarter === 0 ? undefined : maxUnitsPerQuarter;
    } else if (id === "min" && didEditMinUnits) {
      return minUnitsPerQuarter === 0 ? undefined : minUnitsPerQuarter;
    }
    return undefined;
  }

  render() {
    const { id, maxUnitsPerQuarter, minUnitsPerQuarter } = this.props;
    return (
      <Form
        bsPrefix='default'
        className='container'
        noValidate
        validated={this.state.validated}
        ref={this.formRef}
      >
        <Row>
          <Col>
            {this.props.title}
          </Col>
          <Col>
            <Form.Group>
              <Form.Control
                placeholder="Units"
                onChange={ (e) => this.verifyInput(e) }
                type="number"
                min={ id === "min" ? 0 : minUnitsPerQuarter }
                max={ id === "max" ? 25 : maxUnitsPerQuarter }
                defaultValue={ this.getValue() }
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid unit count.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
      </Form>
    );
  }
}

function mapStateToProps(state) {
  const { maxUnitsPerQuarter, minUnitsPerQuarter, didEditMaxUnits, didEditMinUnits } = state;
  return {
    maxUnitsPerQuarter,
    minUnitsPerQuarter,
    didEditMaxUnits,
    didEditMinUnits
  };
}

export default connect(mapStateToProps)(PreferenceRow);
