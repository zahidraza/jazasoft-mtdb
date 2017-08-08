import { CREATE, UPDATE } from 'jazasoft/rest/types';
import { CLEAR_ERROR } from 'jazasoft/actions/errActions';
import { SHOW_SNACKBAR } from 'jazasoft/actions/notificationActions';

export const ROLE_BAD_REQUEST = 'ROLE_BAD_REQUEST';

export const ROLE_ADD_PROGRESS = 'ROLE_ADD_PROGRESS';
export const ROLE_ADD_SUCCESS = 'ROLE_ADD_SUCCESS';
export const ROLE_ADD_CANCEL = 'ROLE_ADD_CANCEL';

const resource1 = 'roles';
const resource2 = 'interceptors';

export const addRole = (restClient, role, permissions) => {
  

  return (dispatch) => {
    dispatch({type: ROLE_ADD_PROGRESS});
    let noOfRequests = 0;

    let options = { data: role };
    restClient(CREATE, resource1, options, dispatch)
    .then(response => {
      console.log(response);
      if (response.status == 201 || response.status == 200) {
        
        dispatch({type: ROLE_ADD_SUCCESS, payload: { id: response.data.id, role: response.data}});
        dispatch({type: CLEAR_ERROR});
        noOfRequests++;
        if (noOfRequests == 2) {
          dispatch({type: SHOW_SNACKBAR, payload: {snackbar: {message: 'Role added Successfully.'}}});
        }
      }
    })
    .catch(error => {
      if (error.response.status == 400) {
        dispatch({type: ROLE_BAD_REQUEST});
      } else {
        dispatch({type: ROLE_ADD_CANCEL});
      }
    });

    let data = [];
    permissions.forEach(p => {
      if (p.readOnly) {
        p.api.forEach(a => {
          data.push({url: a, httpMethod: 'GET', access: 'ROLE_' + role.name});
          data.push({url: a + '/{\\d+}', httpMethod: 'GET', access: 'ROLE_' + role.name});
        })
      } else {
        p.api.forEach(a => {
          data.push({url: a, httpMethod: 'GET', access: 'ROLE_' + role.name});
          data.push({url: a + '/{\\d+}', httpMethod: 'GET', access: 'ROLE_' + role.name});
          data.push({url: a, httpMethod: 'POST', access: 'ROLE_' + role.name});
          data.push({url: a + '/{\\d+}', httpMethod: 'POST', access: 'ROLE_' + role.name});
          data.push({url: a, httpMethod: 'PUT', access: 'ROLE_' + role.name});
          data.push({url: a + '/{\\d+}', httpMethod: 'PUT', access: 'ROLE_' + role.name});
          data.push({url: a, httpMethod: 'PATCH', access: 'ROLE_' + role.name});
          data.push({url: a + '/{\\d+}', httpMethod: 'PATCH', access: 'ROLE_' + role.name});
          data.push({url: a, httpMethod: 'DELETE', access: 'ROLE_' + role.name});
          data.push({url: a + '/{\\d+}', httpMethod: 'DELETE', access: 'ROLE_' + role.name});
        })
      }
    })
    console.log(data);

    options = {data};
    restClient(CREATE, resource2, options, dispatch)
    .then(response => {
      console.log(response);
      if (response.status == 201 || response.status == 200) {
        console.log(response.data);
        dispatch({type: CLEAR_ERROR});
        noOfRequests++;
        if (noOfRequests == 2) {
          dispatch({type: SHOW_SNACKBAR, payload: {snackbar: {message: 'Role added Successfully.'}}});
        }
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
