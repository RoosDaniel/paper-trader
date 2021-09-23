import { 
    CHANGE_CREATE_SESSION_FORM,
    CREATE_SESSION, CREATE_SESSION_SUCCESS, CREATE_SESSION_ERROR,
} from "./constants";


export const changeCreateSessionForm = (key, value) => ({
    type: CHANGE_CREATE_SESSION_FORM,
    key,
    value,
});

export const createSession = () => ({
    type: CREATE_SESSION
})

export const sessionCreated = () => ({
    type: CREATE_SESSION_SUCCESS,
})

export const sessionCreatedError = () => ({
    type: CREATE_SESSION_ERROR,
})
