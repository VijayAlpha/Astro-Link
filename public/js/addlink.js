export const addLink = async (data) => {
    try {
      const res = await axios({
        method: 'POST',
        url: '/api/v1/link/addLink',
        data
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