import axios from 'axios';

const API_KEY = '40268074-5c3ececf222fa6778734cace7';

axios.defaults.baseURL = 'https://pixabay.com/api/?';
axios.defaults.params = {
  key: API_KEY,
  image_type: 'photo',
  orientation: 'horizontal',
  safeSearch: 'true',
  per_page: 12,
};

async function fetchImage(inputData, page) {
  try {
    const { data } = await axios(`q=${inputData}&page=${page}`);
    console.log(data);
    return data;
  } catch (error) {}
}

export { fetchImage };
