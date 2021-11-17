export const userSettings = async (name, userName, userBio , email) => {
    try {
      const res = await axios({
        method: 'PATCH',
        url: 'http://127.0.0.1:3000/api/v1/user/updateMe',
        data: {
            name,
            userName,
            userBio,
           // email
        }
      });
  
      if (res.data.status === 'success') {
        window.setTimeout(() => {
          location.assign('/me');
        }, 1000);
      }
    } catch (err) {
      console.log(err.response)
    }
  };