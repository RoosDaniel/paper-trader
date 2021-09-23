const { localStorage } = window;


export const setJWT = response => {
    localStorage.setItem('JWT', response.token);

    const JWTExpiration = new Date(Number(new Date())+response.tokenExpiration*1000);

    localStorage.setItem('JWTExpiration', Number(JWTExpiration));
};

export const getJWT = () => localStorage.getItem('JWT');

export const getJWTExpiration = () => new Date(localStorage.getItem('JWTExpiration'));

export const removeJWT = () => {
    localStorage.removeItem('JWT');
    localStorage.removeItem('JWTExpiration');
}
