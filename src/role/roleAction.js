import { CREATE, UPDATE } from 'jazasoft/rest/types';
import { CLEAR_ERROR } from 'jazasoft/actions/errActions';
import { SHOW_SNACKBAR } from 'jazasoft/actions/notificationActions';

export const ROLE_BAD_REQUEST = 'ROLE_BAD_REQUEST';

export const ROLE_ADD_PROGRESS = 'ROLE_ADD_PROGRESS';
export const ROLE_ADD_SUCCESS = 'ROLE_ADD_SUCCESS';
export const ROLE_ADD_CANCEL = 'ROLE_ADD_CANCEL';

const resource = 'roles';

export const addRole = (restClient, role) => {
  const options = { data: role };

  return (dispatch) => {
    dispatch({type: ROLE_ADD_PROGRESS});
    restClient(CREATE, resource, options, dispatch)
    .then(response => {
      console.log(response);
      if (response.status == 201 || response.status == 200) {
        dispatch({type: SHOW_SNACKBAR, payload: {snackbar: {message: 'Role added Successfully.'}}});
        dispatch({type: ROLE_ADD_SUCCESS, payload: { id: response.data.id, role: response.data}});
        dispatch({type: CLEAR_ERROR});
      }
    })
    .catch(error => {
      if (error.response.status == 400) {
        dispatch({type: ROLE_BAD_REQUEST});
      } else {
        dispatch({type: ROLE_ADD_CANCEL});
      }
    });
  };
};
