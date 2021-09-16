const { localStorage } = window;


export const setJWT = response => {
    localStorage.setItem('JWT', response.token);
    localStorage.setItem('JWTExpiration', response.tokenExpiration);
};

export const getJWT = () => localStorage.getItem('JWT');

export const removeJWT = () => {
    localStorage.removeItem('JWT');
    localStorage.removeItem('JWTExpiration');
}
