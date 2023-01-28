import axios from 'axios';

let baseURL = '';

if (window.location.hostname === '192.168.1.130' || window.location.hostname === 'localhost') {
  baseURL = 'http://localhost:5000/v1';
} else if (window.location.hostname === 'articl-vue-2022.herokuapp.com') {
  baseURL = 'https://articl-restful-api.herokuapp.com/v1';
}
export default axios.create({
  baseURL,
});
