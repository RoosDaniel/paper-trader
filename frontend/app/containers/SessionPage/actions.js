import { 
    GET_SESSION, GET_SESSION_SUCCESS, GET_SESSION_ERROR
} from "./constants";


export const getSession = id => ({
    type: GET_SESSION,
    id
})

export const sessionFetched = session => ({
    type: GET_SESSION_SUCCESS,
    session,
})

export const sessionFetchedError = () => ({
    type: GET_SESSION_ERROR,
})
