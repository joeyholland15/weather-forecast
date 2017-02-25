import React from 'react';

const WeatherItem = ({
  item,
  date,
}) => (
  <div className="weather-item">
    <div>{date}</div>
    {item && item.map((time, idx) => (
      <div key={idx}>{time.description}</div>
    ))}
  </div>
);

WeatherItem.propTypes = {
  item: React.PropTypes.array,
  date: React.PropTypes.string,
};

WeatherItem.defaultProps = {
  item: [],
  date: '',
};

export default WeatherItem;
