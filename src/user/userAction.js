import { CREATE, UPDATE, PATCH } from 'jazasoft/rest/types';
//import { CLEAR_ERROR } from 'jazasoft/actions/errActions';
import { SHOW_SNACKBAR } from 'jazasoft/actions/notificationActions';
import { OPERATION_COMPLETED } from 'jazasoft/actions/formActions';
import {STRING, NUMBER, validate} from 'jazasoft/utils/validator';

import {getRoles, getCollectionData, getCsvFromArray} from 'jazasoft/utils/utility';

const resource1 = 'users';
const resource2 = 'tUsers';

export const USER_BAD_REQUEST = 'USER_BAD_REQUEST';
export const USER_ADD_PROGRESS = 'USER_ADD_PROGRESS';
export const USER_ADD_SUCCESS = 'USER_ADD_SUCCESS';
export const USER_ADD_CANCEL = 'USER_ADD_CANCEL';
export const USER_UPDATE_PROGRESS = 'USER_UPDATE_PROGRESS';
export const USER_UPDATE_SUCCESS = 'USER_UPDATE_SUCCESS';
export const USER_UPDATE_CANCEL = 'USER_UPDATE_CANCEL';
const TUSER_UPDATE_SUCCESS = 'TUSER_UPDATE_SUCCESS';

export const addUser = (restClient, formData) => {

  return (dispatch) => {
    // let data = [
    //   {type: STRING, key: 'name', value: formData.name, min: 3, max: 50, message: 'Full name length must be between 3 to 50 characters'},
    //   {type: STRING, key: 'username', value: formData.username, min: 3, max: 50, message: 'Username length must be between 3 to 50 characters'},
    //   {type: STRING, key: 'email', value: formData.email, min: 3, max: 50, message: 'Incorrect Email id.'},
    //   {type: NUMBER, key: 'mobile', value: formData.mobile, min: 1000000000, max: 9999999999, message: 'mobile number must be 10 digit number.'},
    // ];
    // if (!validate(dispatch, data))  return;

    // let noOfRequest = 0;

    // const collections = getCollectionData(collectionData);
    // let roles;
    let user = {...formData};

    // const role = getRoles();
    // if (role.length == 1 && role.includes('ROLE_MASTER')) {
    //   noOfRequest = 1;
    //   let companyId;
    //   if (formData.companyId == undefined) {
    //     roles = 'MASTER';
    //   } else {
    //     roles = 'ADMIN';
    //     companyId = formData.companyId.value;
    //   }
    //   user = {...user, roles, companyId};
    // }
    
    // let addUserPermission;
    // if (role.length == 1 && role.includes('ROLE_ADMIN')) {
    //   noOfRequest = 2;
    //   roles = formData.groupId.label;

    //   addUserPermission = (dispatch, restClient, userId, formData, collections) => {
    //     let buyerList = [];
    //     if (formData.allBuyer) {
    //       buyerList = buyers.map(e => e.id);
    //     } else if (collections[0]) {
    //       buyerList = collections[0].map(b => b.buyer);
    //     }
    //     const tUser = {groupId: formData.groupId.value, buyerList};
    //     const options = {id: userId, data: tUser};

    //     restClient(UPDATE, resource2, options, dispatch)
    //     .then(response => {
    //       if (response && (response.status == 201 || response.status == 200)) {
    //         dispatch({type: TUSER_UPDATE_SUCCESS, payload: {id: response.data.id, tUser: response.data}});
    //         dispatch({type: SHOW_SNACKBAR, payload: {snackbar: {message: 'User added Successfully.'}}});
    //         dispatch({type: OPERATION_COMPLETED});
    //       }
    //     })
    //     .catch(error => {
    //       if (error.response.status == 400) {
    //         dispatch({type: USER_BAD_REQUEST});
    //       } else {
    //         dispatch({type: USER_ADD_CANCEL});
    //       }
    //     });
    //   }
    // }
    // user = {...user, roles};
    const options = {data: user};

    dispatch({type: USER_ADD_PROGRESS});
    restClient(CREATE, resource1, options, dispatch)
    .then(response => {
      if (response && (response.status == 201 || response.status == 200)) {

        dispatch({type: USER_ADD_SUCCESS, payload: { id: response.data.id, user: response.data}});
        if (noOfRequest == 1) {
          dispatch({type: SHOW_SNACKBAR, payload: {snackbar: {message: 'User added Successfully.'}}});
          dispatch({type: OPERATION_COMPLETED});
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


export const updateUser = (restClient, formData, collectionData) => {
  
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
    
    let updateUserPermission;
    if (role.length == 1 && role.includes('ROLE_ADMIN')) {
      noOfRequest = 2;
      roles = formData.groupId.label;

      updateUserPermission = () => {
        const buyerList = collections[0].map(b => b.buyer);
        const tUser = {groupId: formData.groupId.value, buyerList};
        const options = {id: user.id, data: tUser};

        restClient(UPDATE, resource2, options, dispatch)
        .then(response => {
          if (response && response.status == 200) {
            dispatch({type: TUSER_UPDATE_SUCCESS, payload: {id: response.data.id, tUser: response.data}});
            dispatch({type: SHOW_SNACKBAR, payload: {snackbar: {message: 'User updated Successfully.'}}});
            dispatch({type: OPERATION_COMPLETED});
          }
        })
        .catch(error => {
          if (error.response.status == 400) {
            dispatch({type: USER_BAD_REQUEST});
          } else {
            dispatch({type: USER_UPDATE_CANCEL});
          }
        });
      }
    }
    user = {...user, roles};
    const options = {data: user, id: user.id};

    dispatch({type: USER_UPDATE_PROGRESS});
    restClient(PATCH, resource1, options, dispatch)
    .then(response => {
      if (response && response.status == 200) {

        dispatch({type: USER_UPDATE_SUCCESS, payload: { id: response.data.id, user: response.data}});
        if (noOfRequest == 1) {
          dispatch({type: SHOW_SNACKBAR, payload: {snackbar: {message: 'User updated Successfully.'}}});
          dispatch({type: OPERATION_COMPLETED});
        } else if (noOfRequest == 2) {
          updateUserPermission(dispatch, restClient, response.data.id, formData, collections);
        }
      }
    })
    .catch(error => {
      console.log(error);
      if (error.response.status == 400) {
        dispatch({type: USER_BAD_REQUEST});
      } else {
        dispatch({type: USER_UPDATE_CANCEL});
      }
    });
  };
};
  
