import { CREATE, UPDATE } from 'jazasoft/rest/types';
import { SHOW_SNACKBAR } from 'jazasoft/actions/notificationActions';
import { OPERATION_COMPLETED } from 'jazasoft/actions/formActions';
import {STRING, validate} from 'jazasoft/utils/validator';

export const TENANT_BAD_REQUEST = 'TENANT_BAD_REQUEST';

export const TENANT_ADD_PROGRESS = 'TENANT_ADD_PROGRESS';
export const TENANT_ADD_SUCCESS = 'TENANT_ADD_SUCCESS';
export const TENANT_ADD_CANCEL = 'TENANT_ADD_CANCEL';

const resource = 'companies';

export const addTenant = (restClient, formData) => {
  const options = { data: formData };

  return (dispatch) => {
    //Validate data
    let data = [
      {type: STRING, key: 'name', value: formData.name, min: 3, max: 50, message: 'Tenant name length must be between 3 to 50 characters'},
      {type: STRING, key: 'address', value: formData.address, min: 3, max: 50, message: 'Tenant address length must be between 3 to 50 characters'},
      {type: STRING, key: 'dbName', value: formData.dbName, min: 3, max: 50, message: 'Database name for tenant length must be between 3 and 50 characters.'}
    ];
    if (!validate(dispatch, data))  return;

    dispatch({type: TENANT_ADD_PROGRESS});
    restClient(CREATE, resource, options, dispatch)
    .then(response => {
      if (response.status == 201 || response.status == 200) {
        dispatch({type: SHOW_SNACKBAR, payload: {snackbar: {message: 'Tenant added Successfully.'}}});
        dispatch({type: TENANT_ADD_SUCCESS, payload: { id: response.data.id, tenant: response.data}});
        dispatch({type: OPERATION_COMPLETED});
      }
    })
    .catch(error => {
      if (error.response.status == 400) {
        dispatch({type: TENANT_BAD_REQUEST});
      } else {
        dispatch({type: ROLE_ADD_CANCEL});
      }
    });
  };
};
