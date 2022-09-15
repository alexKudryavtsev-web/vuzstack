import $api, { API_URL } from '../http';

class DirectionService {
  static async readDirections(city) {
    return await $api.get(`${API_URL}/direction?`, {
      method: 'GET',
      params: {
        city,
      },
    });
  }
}

export default DirectionService;
