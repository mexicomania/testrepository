import axios from 'axios';
import { apiUrl} from '../utilities/utilities';
import { readToken } from '../utilities/utilities';

export function Login(user) {
    // `axios` function returns promise, you can use any ajax lib, which can
    // return promise, or wrap in promise ajax call
    return axios({
        method:'POST',
        url:`${apiUrl}/login`,
        // headers: {
        // 'Content-Type': 'application/json',
        // },
        data: user
    });
  };

export function LogOut(token) {
    // `axios` function returns promise, you can use any ajax lib, which can
    // return promise, or wrap in promise ajax call
    return axios({
        method:'GET',
        url:`${apiUrl}/auth/logout`,
        headers: {
            'Authorization': `Bearer ${readToken()}`,
        }
    });
  };

  export function getCurrentUser() {
    // `axios` function returns promise, you can use any ajax lib, which can
    // return promise, or wrap in promise ajax call
    return axios({
        method:'GET',
        url:`${apiUrl}/auth/user`,
        headers: {
            'Authorization': `Bearer ${readToken()}`,
        }
    });
  };