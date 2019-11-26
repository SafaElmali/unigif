import env from '../config/env';
import axios from 'axios';

const trendURL = `${env.API_URL}?api_key=${env.GIPHY_KEY}&limit=20`;

export const getTrends = () => {
    return axios.get(trendURL).then(res => res.data);
}
