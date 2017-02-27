import React from 'react';

const WeatherItem = ({
  item,
  date,
}) => (
  <div className="weather-item">
    <div className="date">{date}</div>
    {item && item.map((weatherObj, idx) => (
      <div key={idx}>{`${weatherObj.time}: ${weatherObj.weather.description}`}</div>
    ))}
  </div>
);

WeatherItem.propTypes = {
  item: React.PropTypes.arrayOf(React.PropTypes.object),
  date: React.PropTypes.string,
};

WeatherItem.defaultProps = {
  item: [],
  date: '',
};

export default WeatherItem;
