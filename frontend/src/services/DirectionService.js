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

  static async selectDirection(directionId) {
    return await $api.post(`${API_URL}/direction`, { directionId });
  }

  static async deselectDirection(directionId) {
    return await $api.delete(`${API_URL}/direction/${directionId}`);
  }

  static async updatePriority(directionId, priority) {
    return await $api.patch(`${API_URL}/direction`, { directionId, priority });
  }
}

export default DirectionService;
