import axios from 'axios';


const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SERVER_HOST}/api`,
});


export default instance;
