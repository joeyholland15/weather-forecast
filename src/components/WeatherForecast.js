import React from 'react';
import { connect } from 'react-redux';
import WeatherItem from './WeatherItem';

class WeatherForecast extends React.Component {
  render() {
    const {
      list,
      cityName,
    } = this.props;

    const weatherByDate = list && list.reduce((weatherMap, item) => {
      const nextWeatherMap = { ...weatherMap };
      // extract the date and weather description for each grouping
      const dateString = item && item.dt_txt && item.dt_txt.split(' ')[0];
      const weather = item && item.weather && item.weather[0];

      if (!nextWeatherMap.hasOwnProperty(dateString)) {
        nextWeatherMap[dateString] = [weather];
        return nextWeatherMap;
      }

      return { ...nextWeatherMap, dateString: [...nextWeatherMap[dateString], weather] };
    }, {});

    return (
      <div>
        {cityName && <h1>{`Weather for ${cityName}`}</h1>}
        {weatherByDate && Object.keys(weatherByDate).map((date, idx) => (
          <WeatherItem key={idx} item={weatherByDate[date]} date={date} />
        ))}
      </div>
    );
  }
}

WeatherForecast.propTypes = {
  list: React.PropTypes.array,
  cityName: React.PropTypes.string,
};

WeatherForecast.defaultProps = {
  list: [],
  cityName: '',
};

const mapStateToProps = (state) => {
  const cityName = state.weather.city && state.weather.city.name;

  return {
    list: state.weather.list,
    cityName,
  };
};

export default connect(mapStateToProps)(WeatherForecast);
