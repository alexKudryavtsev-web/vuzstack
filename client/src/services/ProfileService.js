import $api from '../http';

class ProfileService {
  static async uploadPassport(formData) {
    return $api.patch(`profile/passport`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  static async acceptWithCookie() {
    return $api.post('profile/accept-with-cookie');
  }

  static async uploadMarks() {
    return $api.post('profile/marks');
  }
}

export default ProfileService;
