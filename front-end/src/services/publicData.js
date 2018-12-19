import axios from 'axios';

const api = 'https://visaapp1.herokuapp.com/api';

export function getPublicData(token) {
    // `axios` function returns promise, you can use any ajax lib, which can
    // return promise, or wrap in promise ajax call
    return axios({
        method:'GET',
        url:`${api}/admin/public-data`,
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
  };

export function createPublicData(data,token) {
    console.log(data)
    // `axios` function returns promise, you can use any ajax lib, which can
    // return promise, or wrap in promise ajax call
    return axios({
        method:'POST',
        url:`${api}/admin/public-data/create`,
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        data:data
    });
  };

export function updatePublicData(id,data,token) {
    console.log(data)
    // `axios` function returns promise, you can use any ajax lib, which can
    // return promise, or wrap in promise ajax call
    return axios({
        method:'PUT',
        url:`${api}/admin/public-data/update/${id}`,
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        data:data
    });
  };

export function deletePublicData(id,token) {
    console.log(id)
    // `axios` function returns promise, you can use any ajax lib, which can
    // return promise, or wrap in promise ajax call
    return axios({
        method:'DELETE',
        url:`${api}/admin/public-data/${id}`,
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });
  };