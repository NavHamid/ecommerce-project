import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? 'https://ecommerce-project-6bdg.onrender.com';

axios.defaults.baseURL = apiBaseUrl;
