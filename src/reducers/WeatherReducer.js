import { UPDATE_LOCATION_SUCCESS, UPDATE_LOCATION_FAILURE } from '../../actions/types';

const initialState = {
  city: {},
  list: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_LOCATION_SUCCESS:
      return {
        ...state,
        list: action.list,
        city: action.city,
      };

    case UPDATE_LOCATION_FAILURE:
      return {
        ...state,
        error: action.error,
      };

    default:
      return state;
  }
}
