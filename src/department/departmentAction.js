import { CREATE, UPDATE } from 'jazasoft/rest/types';
import { CLEAR_ERROR } from 'jazasoft/actions/errActions';
import { SHOW_SNACKBAR } from 'jazasoft/actions/notificationActions';
import { getCollectionData } from 'jazasoft/utils/utility';

export const DEPARTMENT_BAD_REQUEST = 'DEPARTMENT_BAD_REQUEST';
export const DEPARTMENT_ADD_PROGRESS = 'DEPARTMENT_ADD_PROGRESS';
export const DEPARTMENT_ADD_SUCCESS = 'DEPARTMENT_ADD_SUCCESS';
export const ROLE_ADD_SUCCESS = 'ROLE_ADD_SUCCESS';
export const DEPARTMENT_ADD_CANCEL = 'DEPARTMENT_ADD_CANCEL';

const resource1 = 'roles';
const resource2 = 'interceptors';
const resource3 = 'groups';


export const addDepartment = (restClient, formData, collectionData) => {

  const collections = getCollectionData(collectionData);
  const collection = collections[0];
  let role = {...formData};
  let activities;
  if (collections[1] != undefined) {
    activities = collections[1].map(c => c.activity);
  }
  const department = {...formData, activities};

  return (dispatch) => {
    dispatch({type: DEPARTMENT_ADD_PROGRESS});
    let noOfRequests = 0;

    //Role Request
    let options = { data: role };
    restClient(CREATE, resource1, options, dispatch)
    .then(response => {
      if (response.status == 201 || response.status == 200) {
        
        dispatch({type: ROLE_ADD_SUCCESS, payload: { id: response.data.id, role: response.data}});
        dispatch({type: CLEAR_ERROR});
        noOfRequests++;
        if (noOfRequests == 3) {
          dispatch({type: SHOW_SNACKBAR, payload: {snackbar: {message: 'Department added Successfully.'}}});
        }
      }
    })
    .catch(error => {

    });

    let data = [];
    collection.forEach(p => {
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
    //Interceptor Request
    options = {data};
    restClient(CREATE, resource2, options, dispatch)
    .then(response => {
      console.log(response);
      if (response.status == 201 || response.status == 200) {
        console.log(response.data);
        dispatch({type: CLEAR_ERROR});
        noOfRequests++;
        if (noOfRequests == 3) {
          dispatch({type: SHOW_SNACKBAR, payload: {snackbar: {message: 'Department added Successfully.'}}});
        }
      }
    })
    .catch(error => {

    });
    //Department Request
    options = { data: department };
    restClient(CREATE, resource3, options, dispatch)
    .then(response => {
      if (response.status == 201 || response.status == 200) {
        dispatch({type: DEPARTMENT_ADD_SUCCESS, payload: { id: response.data.id, department: response.data}});
        dispatch({type: CLEAR_ERROR});
        noOfRequests++;
        if (noOfRequests == 3) {
          dispatch({type: SHOW_SNACKBAR, payload: {snackbar: {message: 'Department added Successfully.'}}});
        }
      }
    })
    .catch(error => {
      if (error.response.status == 400) {
        dispatch({type: DEPARTMENT_BAD_REQUEST});
      } else {
        dispatch({type: DEPARTMENT_ADD_CANCEL});
      }
    });
  };
};
