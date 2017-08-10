import { CREATE, UPDATE } from 'jazasoft/rest/types';
import { CLEAR_ERROR } from 'jazasoft/actions/errActions';
import { SHOW_SNACKBAR } from 'jazasoft/actions/notificationActions';

export const BUYER_BAD_REQUEST = 'BUYER_BAD_REQUEST';

export const BUYER_ADD_PROGRESS = 'BUYER_ADD_PROGRESS';
export const BUYER_ADD_SUCCESS = 'BUYER_ADD_SUCCESS';
export const BUYER_ADD_CANCEL = 'BUYER_ADD_CANCEL';

const resource = 'buyers';

export const addBuyer = (restClient, buyer) => {
  

  return (dispatch) => {
    dispatch({type: BUYER_ADD_PROGRESS});

    let options = { data: buyer };
    restClient(CREATE, resource, options, dispatch)
    .then(response => {
      console.log(response);
      if (response.status == 201 || response.status == 200) {
        dispatch({type: BUYER_ADD_SUCCESS, payload: { id: response.data.id, buyer: response.data}});
        dispatch({type: CLEAR_ERROR});
        dispatch({type: SHOW_SNACKBAR, payload: {snackbar: {message: 'Buyer added Successfully.'}}});
      }
    })
    .catch(error => {
      if (error.response.status == 400) {
        dispatch({type: BUYER_BAD_REQUEST});
      } else {
        dispatch({type: BUYER_ADD_CANCEL});
      }
    });

  };
};
