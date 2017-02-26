import React from 'react';
import { connect } from 'react-redux';
import WeatherItem from './WeatherItem';

class WeatherForecast extends React.Component {
  formatTime = (timeString) => {
    const timeMap = {
      '00:00:00': '12am',
      '03:00:00': '3am',
      '06:00:00': '6am',
      '09:00:00': '9am',
      '12:00:00': '12pm',
      '15:00:00': '3pm',
      '18:00:00': '6pm',
      '21:00:00': '9pm',
    }
    return timeMap[timeString];
  }

  render() {
    const {
      list,
      cityName,
      error,
    } = this.props;

    // render nothing if there is no forecast to render
    if (!list || !list.length && !error) {
      return null;
    }

    const weatherByDate = list && list.reduce((weatherMap, item) => {
      const nextWeatherMap = { ...weatherMap };

      // extract the date, time, and weather description for each grouping
      const dateInformation = item && item.dt_txt && item.dt_txt.split(' ');
      const dateString = dateInformation && dateInformation[0];
      const timeString = dateInformation && dateInformation[1];
      const weather = item && item.weather && item.weather[0];
      const time = this.formatTime(timeString);

      if (!nextWeatherMap.hasOwnProperty(dateString)) {
        nextWeatherMap[dateString] = [{ weather, time }];
        return nextWeatherMap;
      }

      nextWeatherMap[dateString] = [...nextWeatherMap[dateString], { weather, time }];
      return nextWeatherMap;
    }, {});

    return (
      <div>
        {cityName && !error && <h1>{`Weather for ${cityName}`}</h1>}
        {error && <div className="error">Sorry, there was an error. Please enter a different zip code</div>}
        <div className="forecast-container">
          {/* format date to exclude the year for miproved readability */}
          {!error && weatherByDate && Object.keys(weatherByDate).map((date, idx) => (
            <WeatherItem key={idx} item={weatherByDate[date]} date={date && date.split('-').slice(1).join('-')} />
          ))}
        </div>
      </div>
    );
  }
}

WeatherForecast.propTypes = {
  list: React.PropTypes.arrayOf(React.PropTypes.object),
  cityName: React.PropTypes.string,
  error: React.PropTypes.bool,
};

WeatherForecast.defaultProps = {
  list: [],
  cityName: '',
  error: false,
};

const mapStateToProps = (state) => {
  const cityName = state.weather.city && state.weather.city.name;

  return {
    list: state.weather.list,
    cityName,
    error: state.weather.error,
  };
};

export default connect(mapStateToProps)(WeatherForecast);
