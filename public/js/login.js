import { showAlert } from './alerts.js';

export const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/user/login',
      data: {
        email,
        password,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Logged in successfully!');
      window.setTimeout(() => {
        location.assign('/me');
      }, 1000);
    }
  } catch (err) {
    console.log(err.response);
    showAlert('error', err.response.data.message);
  }
};

export const signup = async (
  name,
  userName,
  email,
  password,
  passwordConfirm
) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/user/signup',
      data: {
        name,
        userName,
        email,
        password,
        passwordConfirm,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Account created successfully!');
      window.setTimeout(() => {
        location.assign('/me');
      }, 1000);
    }
  } catch (err) {
    console.log(err.response);
    showAlert('error', err.response.data.message);
  }
};

export const forgotpassword = async (email) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/user/forgotpassword',
      data:{
        email
      }
    });

    if (res.data.status = 'success') {
      showAlert('success', 'Email sent successfully!');
      document.querySelector('.btn--forgot-password').textContent = 'Send';
    }
  } catch (err) {
    console.log(err.response);
    showAlert('error', err.response.data.message);
  }
};
