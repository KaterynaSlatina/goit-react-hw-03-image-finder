import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '40268074-5c3ececf222fa6778734cace7';

async function fetchImage(inputData, page) {
  const params = {
    key: API_KEY,
    q: inputData,
    image_type: 'photo',
    orientation: 'horizontal',
    safeSearch: 'true',
    per_page: 12,
    page,
  };

  try {
    const { data } = await axios(`${BASE_URL}, ${params}`);
    return data;
  } catch (error) {}
}

export { fetchImage };

// export const fetchImage = axios.create({
//   baseURL: 'https://pixabay.com/api/',
// });
