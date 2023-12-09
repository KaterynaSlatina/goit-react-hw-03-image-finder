import { fetchImage } from 'components/FetchApi/FetchApi';

export const GetAllImages = async () => {
  const { data } = fetchImage('hits');
  return data;
};
