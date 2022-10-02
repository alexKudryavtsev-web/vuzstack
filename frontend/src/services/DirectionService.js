import $api, { API_URL } from '../http';

class DirectionService {
  static async readVuzList(text) {
    return await $api.get(`${API_URL}/direction?`, {
      method: 'GET',
      params: {
        text
      }
    });
  }
}

export default DirectionService;
