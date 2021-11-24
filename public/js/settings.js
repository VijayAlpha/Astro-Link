export const userSettings = async (data) => {
    try {
      const res = await axios({
        method: 'PATCH',
        url: '/api/v1/user/updateMe',
        data
      });
  
      if (res.data.status === 'success') {
        window.setTimeout(() => {
          location.assign('/me');
        }, 500);
      }
    } catch (err) {
      console.log(err.response)
    }
  };