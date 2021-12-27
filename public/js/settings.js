import { showAlert } from './alerts.js';

export const userSettings = async (data, type) => {
  try {
    const url =
      type === 'password'
        ? '/api/v1/user/updateMyPassword'
        : '/api/v1/user/updateMe';

    if (type === 'social') {
      data = {
        socialLinks: data,
      };
    }

    const res = await axios({
      method: 'PATCH',
      url,
      data,
    });

    //afterward change to show alert as data saved
    if (res.data.status === 'success') {
      showAlert('success', 'Profile Updated Successfully!');
      window.setTimeout(() => {
        location.assign('/me');
      }, 500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
    console.log(err.response);
  }
};
