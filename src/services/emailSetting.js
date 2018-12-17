import axios from 'axios';
import { apiUrl,readToken} from '../utilities/utilities';


export function addEmailSettingsService(data) {
    // `axios` function returns promise, you can use any ajax lib, which can
    // return promise, or wrap in promise ajax call
    return axios({
        method:'POST',
        url:`${apiUrl}/admin/email-setting`,
        headers: {
            'Authorization': `Bearer ${readToken()}`,
        },
        data: data
    });
  };

export function updateEmailSettingsService(id,data) {
    // `axios` function returns promise, you can use any ajax lib, which can
    // return promise, or wrap in promise ajax call
    return axios({
        method:'PUT',
        url:`${apiUrl}/admin/email-setting/${id}`,
        headers: {
            'Authorization': `Bearer ${readToken()}`,
        },
        data: data
    });
  };

export function getEmailSettingsService() {
    // `axios` function returns promise, you can use any ajax lib, which can
    // return promise, or wrap in promise ajax call
    return axios({
        method:'GET',
        url:`${apiUrl}/admin/email-setting`,
        headers: {
            'Authorization': `Bearer ${readToken()}`,
        }
    });
  };