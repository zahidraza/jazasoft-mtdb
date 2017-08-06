import { CREATE, UPDATE } from 'jazasoft/rest/types';
import { CLEAR_ERROR } from 'jazasoft/actions/errActions';
import { SHOW_SNACKBAR } from 'jazasoft/actions/notificationActions';

const resource = 'users';

export const USER_BAD_REQUEST = 'USER_BAD_REQUEST';

export const USER_ADD_PROGRESS = 'USER_ADD_PROGRESS';
export const USER_ADD_SUCCESS = 'USER_ADD_SUCCESS';
export const USER_ADD_CANCEL = 'USER_ADD_CANCEL';

export const addUser = (restClient, user) => {
  const options = { data: user };

  return (dispatch) => {
    dispatch({type: USER_ADD_PROGRESS});
    restClient(CREATE, resource, options, dispatch)
    .then(response => {
      if (response && (response.status == 201 || response.status == 200)) {
        dispatch({type: SHOW_SNACKBAR, payload: {snackbar: {message: 'User added Successfully.'}}});
        dispatch({type: USER_ADD_SUCCESS, payload: { id: response.data.id, user: response.data}});
        dispatch({type: CLEAR_ERROR});
        
      }
    })
    .catch(error => {
      if (error.response.status == 400) {
        dispatch({type: USER_BAD_REQUEST});
      }
    });
  };
};
