import axios from 'axios';
import * as actions from './types';

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
    return axios.get(`http://api.openweathermap.org/data/2.5/forecast?zip=${zip},us&APPID=776946775253cb31e619a017dc5e05fa`).then((resp) => {
      if (resp.error) { // handle error if necessary
        return dispatch(updateLocationFailure(resp.error));
      }
      const { city, list } = resp.data;
      return dispatch(updateLocationSuccess(list, city));
    });
  };
}
