import axios from 'axios';

const API_URL = 'https://rickandmortyapi.com/api/character';

export const getCharacters = async (page = 1, name = '') => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        page,
        name,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching characters:", error);
    throw error;
  }
};

export const getCharacterDetail = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching character details:", error);
    throw error;
  }
};
