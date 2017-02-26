import axios from 'axios';
import * as actions from './types';
import { baseURL, openWeatherMapKey } from '../src/constants';

export function updateLocationSuccess(list, city) {
  return {
    type: actions.UPDATE_LOCATION_SUCCESS,
    list,
    city,
  };
}

export function updateLocationFailure(error) {
  return {
    type: actions.UPDATE_LOCATION_FAILURE,
    error,
  };
}

export function updateLocation(zip) {
  return (dispatch) => {
    dispatch({
      type: actions.UDPATE_LOCATION,
      zip,
    });
    return axios.get(`${baseURL}${zip},us&APPID=${openWeatherMapKey}`).then((resp) => {
      if (resp.error || resp.data.message === 'Error') { // handle error if necessary
        return dispatch(updateLocationFailure(true));
      }
      const { city, list } = resp.data;
      return dispatch(updateLocationSuccess(list, city));
    });
  };
}
