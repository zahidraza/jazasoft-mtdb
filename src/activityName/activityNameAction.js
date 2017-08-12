import { CREATE, UPDATE } from 'jazasoft/rest/types';
import { CLEAR_ERROR } from 'jazasoft/actions/errActions';
import { SHOW_SNACKBAR } from 'jazasoft/actions/notificationActions';

import { getCollectionData } from 'jazasoft/utils/utility';
export const ACTIVITY_NAME_BAD_REQUEST = 'ACTIVITY_NAME_BAD_REQUEST';

export const ACTIVITY_NAME_ADD_PROGRESS = 'ACTIVITY_NAME_ADD_PROGRESS';
export const ACTIVITY_NAME_ADD_SUCCESS = 'ACTIVITY_NAME_ADD_SUCCESS';
export const ACTIVITY_NAME_ADD_CANCEL = 'ACTIVITY_NAME_ADD_CANCEL';

const resource = 'activityNames';

export const addActivityName = (restClient, formData, collectionData) => {
  
  let groupList;
  if (collectionData[0] != undefined) {
    const collections = getCollectionData(collectionData);
    groupList = collections[0].map(ug => ug.id);
  } 

  const activityName = {...formData, groupList};

  return (dispatch) => {
    dispatch({type: ACTIVITY_NAME_ADD_PROGRESS});

    let options = { data: activityName };
    restClient(CREATE, resource, options, dispatch)
    .then(response => {
      console.log(response);
      if (response.status == 201 || response.status == 200) {
        dispatch({type: ACTIVITY_NAME_ADD_SUCCESS, payload: { id: response.data.id, activityName: response.data}});
        dispatch({type: CLEAR_ERROR});
        dispatch({type: SHOW_SNACKBAR, payload: {snackbar: {message: 'ActivityName added Successfully.'}}});
      }
    })
    .catch(error => {
      if (error.response.status == 400) {
        dispatch({type: ACTIVITY_NAME_BAD_REQUEST});
      } else {
        dispatch({type: ACTIVITY_NAME_ADD_CANCEL});
      }
    });

  };
};
