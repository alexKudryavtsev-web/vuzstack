import $api from '../http';

class MarkService {
  static async createMark(exam, result) {
    return await $api.post('mark', { exam, result });
  }
}

export default MarkService;
