import { CREATE, UPDATE } from 'jazasoft/rest/types';

export const TENANT_ADD_PROGRESS = 'TENANT_ADD_PROGRESS';
export const TENANT_ADD_SUCCESS = 'TENANT_ADD_SUCCESS';
export const TENANT_ADD_CANCEL = 'TENANT_ADD_CANCEL';

const resource = 'companies';

export const addTenant = (restClient, tenant) => {
  const options = { data: tenant };

  return (dispatch) => {
    dispatch({type: TENANT_ADD_PROGRESS});
    restClient(CREATE, resource, options, dispatch)
    .then(response => {
      console.log(response);
      if (response.status == 201 || response.status == 200) {
        dispatch({type: TENANT_ADD_SUCCESS, payload: { id: response.data.id, tenant: response.data}});
      }
    });
  };
};
