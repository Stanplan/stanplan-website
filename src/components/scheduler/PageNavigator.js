import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import './styles/PageNavigator.css';

// Class representing navigator between pages
class PageNavigator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sections: React.Children.toArray(props.children),
      index: 0
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.children === this.props.children) {
      return;
    }
    this.setState({ sections: React.Children.toArray(this.props.children) });
  }

  navigateLeft() {
    if (this.state.index === 0) {
      return;
    }
    this.setState({ index: (this.state.index - 1) });
    window.scrollTo(0,0);
  }

  navigateRight() {
    if (this.state.index === this.state.sections.length - 1) {
      return;
    }
    this.setState({ index: (this.state.index + 1) });
    window.scrollTo(0,0);
  }

  renderProgressDots() {
    const { sections, index } = this.state;
    let progressDots = [];
    for (let i = 0; i < sections.length; i++) {
      if (i === index) {
        progressDots.push(
          <span className='activeDot' key={i}/>
        );
      } else {
        progressDots.push(
          <span className='inactiveDot' key={i}/>
        );
      }
    }
    return progressDots;
  }

  render() {
    return (
      <Container>
        <div>
          {this.state.sections[this.state.index]}
        </div>
        <Row className='container'>
          <Col>
            <IconButton
              aria-label="Left"
              onClick={ () => { this.navigateLeft() }}
              disabled={ this.state.index === 0 }
            >
              <Icon>keyboard_arrow_left</Icon>
            </IconButton>
          </Col>
          <Col className='containerDots'>
            {this.renderProgressDots()}
          </Col>
          <Col>
            <IconButton
              aria-label="Right"
              onClick={ () => { this.navigateRight() }}
              disabled={ this.state.index === this.state.sections.length - 1 }
              className='rightFloat'
            >
              <Icon>keyboard_arrow_right</Icon>
            </IconButton>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default PageNavigator;
