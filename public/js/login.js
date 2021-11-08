export const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:3000/api/v1/user/login',
      data: {
        email,
        password
      }
    });

    if (res.data.status === 'success') {
      window.setTimeout(() => {
        location.assign('/api/v1/user/me');
      }, 1000);
    }
  } catch (err) {
    console.log(err.response)
  }
};

// export const logout = async () => {
//   try {
//     const res = await axios({
//       method: 'GET',
//       url: 'http://127.0.0.1:3000/api/v1/user/logout'
//     });
//     if ((res.data.status = 'success')) location.reload(true);
//   } catch (err) {
//     console.log(err.response);
//   }
// };