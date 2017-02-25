import React from 'react';
import LocationInput from './LocationInput';
import WeatherForecast from './WeatherForecast';

class App extends React.Component {
  render() {
    return (
      <div className="test">
        <LocationInput />
        <WeatherForecast />
      </div>
    )
  }
}

export default App;
