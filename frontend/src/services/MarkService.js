import $api, { API_URL } from '../http';

class MarkService {
  static async readExamsList() {
    return await fetch(`${API_URL}/mark`, {
      method: 'GET',
    });
  }

  static async createMark(exam, result) {
    return await $api.post('mark', { exam, result });
  }
}

export default MarkService;
