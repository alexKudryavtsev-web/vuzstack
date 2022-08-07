import $api from '../http';

class ProfileService {
  static async uploadPassport(formData) {
    return $api.patch(`profile/passport`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
}

export default ProfileService;
