import { CREATE, UPDATE } from 'jazasoft/rest/types';

export const USER_ADD = 'USER_ADD';

const resource = 'users';

export const addUser = (restClient, user) => {
  const options = { data: user };

  return (dispatch) => {
    //dispatch({type: AUTH_PROGRESS});
    restClient(CREATE, resource, options, dispatch)
    .then(response => {
      console.log(response);
    });
  };
};
