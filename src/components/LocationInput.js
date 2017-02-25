import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateLocation } from '../../actions';

class LocationInput extends React.Component {
  state = {
    value: '',
  }

  handleKeyUp = (event) => {
    event.preventDefault();
    this.setState({ value : event.target.value });
  }

  handleKeyDown = (event) => {
    // if the user presses enter, submit the value
    if (event.keyCode === 13) {
      event.preventDefault();
      this.props.updateLocation(this.state.value);
    }
  }

  handleSubmit = () => this.props.updateLocation(this.state.value);

  render() {
    return (
      <div>
        <input
          onKeyUp={this.handleKeyUp}
          onKeyDown={this.handleKeyDown}
          placeholder="Enter Zipcode"
        />
        <button onClick={this.handleSubmit}>Set Location</button>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  updateLocation,
}, dispatch);

export default connect(null, mapDispatchToProps)(LocationInput);
