import env from '../config/env';
import axios from 'axios';

export const trendURL = `${env.API_URL}?api_key=${env.GIPHY_KEY}&limit=20`;
export const searchURL = `https://api.giphy.com/v1/gifs/search?api_key=${env.GIPHY_KEY}&limit=20`;

export const getTrends = () => axios.get(trendURL).then(res => res.data)
