import axios from 'axios';
import $api, { API_URL } from '../http';

class AuthService {
  static async registration(email, password, agree) {
    return axios.post(`${API_URL}/user`, {
      email,
      password,
      agree,
    });
  }

  static async login(email, password) {
    return $api.post(`session`, { email, password });
  }

  static async logout() {
    return $api.delete('session');
  }

  static async resetPassword(email) {
    return axios.post(`${API_URL}/user/reset-password`, { email });
  }

  static async setNewPassword(password, token) {
    return axios.patch(`${API_URL}/user/update-password/${token}`, {
      password,
    });
  }

  static async activateUser(token) {
    return axios.post(`${API_URL}/user/activate/${token}`);
  }

  static async checkAuth() {
    return axios.patch(`${API_URL}/session`, null, {
      withCredentials: true,
    });
  }
}

export default AuthService;
