import { UPDATE_LOCATION_SUCCESS, UPDATE_LOCATION_FAILURE } from '../actions/types';

const initialState = {
  city: {},
  list: [],
  error: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_LOCATION_SUCCESS:
      // update state with all relevant location/weather information
      return {
        ...state,
        // list will be an array of weather data by time slot over the next 5 days
        list: action.list,
        city: action.city,
        error: false,
      };

    case UPDATE_LOCATION_FAILURE:
      // update error state
      return {
        ...state,
        error: action.error,
      };

    default:
      return state;
  }
}
