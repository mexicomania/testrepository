import axios from 'axios';
import { apiUrl,readToken} from '../utilities/utilities';


export function registerUser(user) {
    // `axios` function returns promise, you can use any ajax lib, which can
    // return promise, or wrap in promise ajax call
    return axios({
        method:'POST',
        url:`${apiUrl}/createUser`,
        // headers: {
        //     'Authorization': `Bearer ${readToken()}`,
        // },
        data: user
    });
  };

