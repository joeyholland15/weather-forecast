import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateLocation } from '../actions';

class LocationInput extends React.Component {
  state = {
    // initialize input value
    value: '',
  }

  handleKeyUp = (event) => {
    event.preventDefault();
    // track input value on key up
    this.setState({ value : event.target.value });
  }

  handleKeyDown = (event) => {
    // allow submission on enter press
    if (event.keyCode === 13) {
      event.preventDefault();
      this.props.updateLocation(this.state.value);
    }
  }

  // dispatch the updateLocation action on input submission
  handleSubmit = () => this.props.updateLocation(this.state.value);

  render() {
    return (
      <div>
        <input
          onKeyUp={this.handleKeyUp}
          onKeyDown={this.handleKeyDown}
          placeholder="Enter zip code..."
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
