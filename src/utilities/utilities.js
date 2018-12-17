
export const apiUrl = 'https://visaapp1.herokuapp.com/api';

export const readToken = () => JSON.parse(localStorage.getItem('token'));

export const writeToken = (token) => localStorage.setItem('token',token);

export const deleteToken = () => localStorage.removeItem('token');