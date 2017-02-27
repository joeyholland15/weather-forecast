import axios from 'axios';
import * as actions from './types';
import { baseURL, openWeatherMapKey } from '../constants';

export function updateLocationSuccess(list, city) {
  // dispatch success action to update store with weather/location information
  return {
    type: actions.UPDATE_LOCATION_SUCCESS,
    list,
    city,
  };
}

export function updateLocationFailure(error) {
  // if fetch to external API failed, update error state
  return {
    type: actions.UPDATE_LOCATION_FAILURE,
    error,
  };
}

export function updateLocation(zip) {
  return (dispatch) => {
    // dispatch action to update location
    dispatch({
      type: actions.UDPATE_LOCATION,
      zip,
    });
    return axios.get(`${baseURL}${zip},us&APPID=${openWeatherMapKey}`).then((resp) => {
      // TODO: improve error handling and create more specific error messages/edge cases
      // it looks like the API corrects many strings/invalid codes, often to Washington, D.C.
      if (resp.error || resp.data.message === 'Error') { // handle error if necessary
        return dispatch(updateLocationFailure(true));
      }
      const { city, list } = resp.data;
      // if external fetch to weather API successful, dispatch success action
      return dispatch(updateLocationSuccess(list, city));
    });
  };
}
