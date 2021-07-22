import {
  GET_BREED_DETAIL,
  GET_BREEDS_ALL,
  GET_BREED,
  GET_TEMPERAMENT,
  SORT_BREED,
  SORT_WEIGHT,
  CLEAR_DETAIL
} from "../actions/index";

const initialState = {
  breeds: [],
  breedDetail: {},
  temperament: [],
  auxBreeds: []
};

function rootReducer(state = initialState, action) {
  if (action.type === GET_BREEDS_ALL) {
    return {
      ...state,
      breeds: action.payload,
      auxBreeds: action.payload
    };
  }

  if (action.type === GET_BREED_DETAIL) {
    return {
      ...state,
      breedDetail: action.payload,
    };
  }

  if (action.type === GET_BREED) {
    return {
      ...state,
      breeds: action.payload,
    };
  }

  if (action.type === GET_TEMPERAMENT) {
    return {
      ...state,
      temperament: action.payload,
    };
  }

  if (action.type === SORT_BREED) {
    return {
      ...state,
      breeds: action.payload,
    };
  }

  if (action.type === SORT_WEIGHT) {
    return {
      ...state,
      breeds: action.payload,
    };
  }

  if (action.type === CLEAR_DETAIL) {
    return {
      ...state,
      breedDetail: action.payload,
    };
  }

  return state;
}

export default rootReducer;
