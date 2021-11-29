export const userSettings = async (data , type ) => {
    try {
     
      const url =
      type === 'password'
        ? '/api/v1/user/updateMyPassword'
        : '/api/v1/user/updateMe';
     
      const res = await axios({
        method: 'PATCH',
        url,
        data
      });
  
      // afterward change to show alert as data saved
      if (res.data.status === 'success') {
        window.setTimeout(() => {
          location.assign('/me');
        }, 500);
      }
    } catch (err) {
      console.log(err.response)
    }
  };