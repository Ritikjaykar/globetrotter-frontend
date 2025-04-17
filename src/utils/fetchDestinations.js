// frontend/src/utils/fetchDestinations.js
import apiClient from '../axios';

export const fetchRandomDestination = async (usedDestinations) => {
  try {
    const usedQuery = usedDestinations.map(encodeURIComponent).join(',');
    const response = await apiClient.get(`https://globetrotter-backend-chi.vercel.app/api/destinations/random?used=${usedQuery}`);
    console.log(
      "Response from backend:",
      response.data,
    )

    if (response.data.completed) {
      return { completed: true };
    }

    const { destination, options } = response.data;

    if (!destination || !Array.isArray(options)) {
      throw new Error('Invalid data format from backend');
    }

    return { destination, options };
  } catch (error) {
    console.error('Fetch error in fetchRandomDestination:', error);
    throw error;
  }
};
