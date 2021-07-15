import {GET_BREED_DETAIL, GET_BREEDS_ALL, GET_BREED, GET_TEMPERAMENT, SORT_BREED} from '../actions/index'

const initialState = { 
    breeds : [],
    breedDetail : {},
    temperament : [],
   
}

function rootReducer(state = initialState, action){

    if(action.type === GET_BREEDS_ALL) {
        return {
            ...state,
            breeds : action.payload
        }
    }

    if(action.type === GET_BREED_DETAIL) {
        return {
            ...state,
            breedDetail : action.payload
        }
    }

    if(action.type === GET_BREED) {
        return {
            ...state,
            breeds : action.payload
        }
    }



    if(action.type === GET_TEMPERAMENT) {
        return {
            ...state,
            temperament : action.payload
        }
    }


    if(action.type === SORT_BREED) {
        return {
            ...state,
            breeds : action.payload
        }
    }

    return state;
}

export default rootReducer;