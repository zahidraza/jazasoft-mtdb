import { 
  ACTIVITY_NAME_BAD_REQUEST,
  ACTIVITY_NAME_ADD_PROGRESS, 
  ACTIVITY_NAME_ADD_SUCCESS,
  ACTIVITY_NAME_ADD_CANCEL 
} from './activityNameAction';
import { USER_LOGOUT} from 'jazasoft/actions/authActions';
const ACTIVITY_NAME_INITIALIZED = 'ACTIVITY_NAME_INITIALIZED';

const initialState = {
  busy: false,
  adding: false,
  activityNames: {}
};

const handlers = { 
  [ACTIVITY_NAME_BAD_REQUEST]: (_, action) => ({busy: false}),
  [ACTIVITY_NAME_INITIALIZED]: (_, action) => ({activityNames: action.payload.activityNames}),
  [ACTIVITY_NAME_ADD_PROGRESS]: (_, action) => ({busy: true, adding: true}),
  [ACTIVITY_NAME_ADD_SUCCESS]: (_, action) => {
    let activityNames = {..._.activityNames};
    activityNames[action.payload.id] = action.payload.activityName;
    return {busy: false, adding: false, activityNames};
  },
  [ACTIVITY_NAME_ADD_CANCEL]: (_, action) => ({busy: false, adding: false}),
  [USER_LOGOUT]: (_, action) => ({activityNames: {}})
};

export default function testReducer (state = initialState, action) {
  let handler = handlers[action.type];
  if (!handler) return state;
  return { ...state, ...handler(state, action) };
}
