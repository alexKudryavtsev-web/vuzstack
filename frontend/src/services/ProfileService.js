import $api from '../http';

class ProfileService {
  static async uploadPassport(formData) {
    return $api.patch(`profile/passport`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  static async uploadUserInfo(data) {
    return $api.post('profile/user-info', data)
  }

  static async acceptWithCookie() {
    return $api.post('profile/accept-with-cookie');
  }

  static async uploadMarks() {
    return $api.post('profile/marks');
  }

  static async uploadDirections() {
    return $api.post('profile/directions');
  }

  static async setReady() {
    return $api.post('profile/ready');
  }
}

export default ProfileService;
