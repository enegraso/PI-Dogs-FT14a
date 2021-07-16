// Declaro las acciones a dispatch

export const GET_BREED_DETAIL = "GET_BREED_DETAIL";
export const GET_BREEDS_ALL = "GET_BRREDS_ALL";
export const GET_BREED = "GET_BRRED";
export const GET_TEMPERAMENT = "GET_TEMPERAMENT";
export const SORT_BREED = "SORT_BREED";
export const ASD = 'Breeds-A-Z';
export const DES = 'Breeds-Z-A';

export function getBreedsAll() {
    return function (dispatch){
//        return fetch(`http://localhost:3001/dogs`)
        return fetch(`http://192.168.0.7:3001/dogs`) // Linea para proar front en notebook y back en PC
        .then(response => response.json())
        .then(json => {
            dispatch({type: GET_BREEDS_ALL, payload : json})
        })
    }

}


export function getBreedDetails(razaId) {
	return function (dispatch){
        // return fetch(`http://localhost:3001/dogs/${razaId}`)
        return fetch(`http://192.168.0.7:3001/dogs/${razaId}`) // Linea para proar front en notebook y back en PC
        .then(response => response.json())
        .then(json => {
            dispatch({type: GET_BREED_DETAIL, payload : json})
        })
    }
}

export function getBreed(breedName) {
    return function (dispatch){
//        return fetch(`http://localhost:3001/dogs?name=${breedName}`)
return fetch(`http://192.168.0.7:3001/dogs?name=${breedName}`)
        .then(response => response.json())
        .then(json => {
            dispatch({type: GET_BREED, payload : json})
        })
    }
}



export function getTemperaments() {
    return function (dispatch){
//        return fetch(`http://localhost:3001/temperament`)
        return fetch(`http://192.168.0.7:3001/temperament`)
        .then(response => response.json())
        .then(json => {
            dispatch({type: GET_TEMPERAMENT, payload : json})
        })
    }
}


export function sort(order, breeds){
    let sortBreed = [...breeds]

    sortBreed.sort(function(a,b){
        var nombreA = a.name.toUpperCase();
        var nombreB = b.name.toUpperCase();

        if(order === ASD){
            if(nombreA < nombreB){
                return -1;
            }
            if(nombreA > nombreB){
                return 1
            }
            return 0
        }
        if(order === DES){
            if(nombreA < nombreB){
                return 1;
            }
            if(nombreA > nombreB){
                return -1
            }
            return 0
        }
    })
    return function(dispatch){
        dispatch({type: SORT_BREED, payload: sortBreed})
    }
}

export function filtroTemp(actualBreed, temperament){
    let filtro = [...actualBreed];
    filtro = filtro.filter(actual =>{
        if(actual.temperament){
            let razaTemp = actual.temperament.split(', ')
            return razaTemp.includes(temperament);
        }else{
            return false
        }
    })

    return function(dispatch){
        dispatch({type:SORT_BREED, payload: filtro})
    }
}
