import { CREATE, UPDATE } from 'jazasoft/rest/types';
import { CLEAR_ERROR } from 'jazasoft/actions/errActions';
import { SHOW_SNACKBAR } from 'jazasoft/actions/notificationActions';

import {getRoles, getCollectionData, getCsvFromArray} from 'jazasoft/utils/utility';

const resource1 = 'users';
const resource2 = 'tUsers';

export const USER_BAD_REQUEST = 'USER_BAD_REQUEST';

export const USER_ADD_PROGRESS = 'USER_ADD_PROGRESS';
export const USER_ADD_SUCCESS = 'USER_ADD_SUCCESS';
export const USER_ADD_CANCEL = 'USER_ADD_CANCEL';

export const addUser = (restClient, formData, collectionData) => {

  return (dispatch) => {
    let noOfRequest = 0;

    const collections = getCollectionData(collectionData);
    let roles;
    let user = {...formData};

    const role = getRoles();
    if (role.length == 1 && role.includes('ROLE_MASTER')) {
      noOfRequest = 1;
      let companyId;
      if (formData.companyId == undefined) {
        roles = 'MASTER';
      } else {
        roles = 'ADMIN';
        companyId = formData.companyId.value;
      }
      user = {...user, roles, companyId};
    }
    
    let addUserPermission;
    if (role.length == 1 && role.includes('ROLE_ADMIN')) {
      noOfRequest = 2;
      roles = formData.groupId.label;

      addUserPermission = (dispatch, restClient, userId, formData, collections) => {
        const buyerList = collections[0].map(b => b.id);
        const tUser = {groupId: formData.groupId.value, buyerList};
        const options = {id: userId, data: tUser};

        restClient(UPDATE, resource2, options, dispatch)
        .then(response => {
          if (response && (response.status == 201 || response.status == 200)) {
            dispatch({type: SHOW_SNACKBAR, payload: {snackbar: {message: 'User added Successfully.'}}});
            dispatch({type: CLEAR_ERROR});
          }
        })
        .catch(error => {
          if (error.response.status == 400) {
            dispatch({type: USER_BAD_REQUEST});
          } else {
            dispatch({type: USER_ADD_CANCEL});
          }
        });
      }
    }
    user = {...user, roles};
    const options = {data: user};

    dispatch({type: USER_ADD_PROGRESS});
    restClient(CREATE, resource1, options, dispatch)
    .then(response => {
      if (response && (response.status == 201 || response.status == 200)) {

        dispatch({type: USER_ADD_SUCCESS, payload: { id: response.data.id, user: response.data}});
        dispatch({type: CLEAR_ERROR});
        if (noOfRequest == 1) {
          dispatch({type: SHOW_SNACKBAR, payload: {snackbar: {message: 'User added Successfully.'}}});
        } else if (noOfRequest == 2) {
          addUserPermission(dispatch, restClient, response.data.id, formData, collections);
        }
      }
    })
    .catch(error => {
      console.log(error);
      if (error.response.status == 400) {
        dispatch({type: USER_BAD_REQUEST});
      } else {
        dispatch({type: USER_ADD_CANCEL});
      }
    });
  };
};
