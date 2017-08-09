import { CREATE, UPDATE } from 'jazasoft/rest/types';
import { CLEAR_ERROR } from 'jazasoft/actions/errActions';
import { SHOW_SNACKBAR } from 'jazasoft/actions/notificationActions';

export const USER_GROUP_BAD_REQUEST = 'USER_GROUP_BAD_REQUEST';

export const USER_GROUP_ADD_PROGRESS = 'USER_GROUP_ADD_PROGRESS';
export const USER_GROUP_ADD_SUCCESS = 'USER_GROUP_ADD_SUCCESS';
export const USER_GROUP_ADD_CANCEL = 'USER_GROUP_ADD_CANCEL';

const resource = 'groups';

export const addUserGroup = (restClient, userGroup) => {
  

  return (dispatch) => {
    dispatch({type: USER_GROUP_ADD_PROGRESS});

    let options = { data: userGroup };
    restClient(CREATE, resource, options, dispatch)
    .then(response => {
      if (response.status == 201 || response.status == 200) {
        
        dispatch({type: USER_GROUP_ADD_SUCCESS, payload: { id: response.data.id, userGroup: response.data}});
        dispatch({type: CLEAR_ERROR});
        dispatch({type: SHOW_SNACKBAR, payload: {snackbar: {message: 'UserGroup added Successfully.'}}});
      }
    })
    .catch(error => {
      if (error.response.status == 400) {
        dispatch({type: USER_GROUP_BAD_REQUEST});
      } else {
        dispatch({type: USER_GROUP_ADD_CANCEL});
      }
    });
  };
};
