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

  export const updateLink = async ( id , data ) => {
    try {
      const res = await axios({
        method: 'PATCH',
        url: `/api/v1/link/${id}`,
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

  export const deleteLink = async (linkId) => {
    try {
      const res = await axios({
        method: 'DELETE',
        url: '/api/v1/link/deleteLink',
        data: {
          linkId
        }
      });

      if (res.status === 204) {
        location.assign('/me');
      }
    } catch (err) {
      console.log(err.response);
    }
  };