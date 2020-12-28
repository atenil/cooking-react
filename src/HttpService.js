import axios from 'axios';


const HttpService = axios.create({
  baseURL: 'https://api.spoonacular.com',
  params: { /*'apiKey': '7391c2236ab74799bec048a8e5fc0e87' */}, // do not remove this, its added to add params later in the config,

});

HttpService.interceptors.request.use((request) => {
  request.params['apiKey'] = '7391c2236ab74799bec048a8e5fc0e87';
  return request;
});

HttpService.interceptors.response.use((response) => {
  return response;
}, error => {
  if(error.response.status === 402){
    alert('La clé d\'Api est vide');
  }
  return Promise.reject({...error});
});

export default HttpService