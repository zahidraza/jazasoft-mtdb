import { 
  USER_GROUP_BAD_REQUEST,
  USER_GROUP_ADD_PROGRESS, 
  USER_GROUP_ADD_SUCCESS,
  USER_GROUP_ADD_CANCEL 
} from './userGroupAction';
import { USER_LOGOUT} from 'jazasoft/actions/authActions';
const USER_GROUP_INITIALIZED = 'USER_GROUP_INITIALIZED';

const initialState = {
  busy: false,
  adding: false,
  userGroups: {}
};

const handlers = { 
  [USER_GROUP_BAD_REQUEST]: (_, action) => ({busy: false}),
  [USER_GROUP_INITIALIZED]: (_, action) => ({userGroups: action.payload.userGroups}),
  [USER_GROUP_ADD_PROGRESS]: (_, action) => ({busy: true, adding: true}),
  [USER_GROUP_ADD_SUCCESS]: (_, action) => {
    let userGroups = {..._.userGroups};
    userGroups[action.payload.id] = action.payload.userGroup;
    return {busy: false, adding: false, userGroups};
  },
  [USER_GROUP_ADD_CANCEL]: (_, action) => ({busy: false, adding: false}),
  [USER_LOGOUT]: (_, action) => ({userGroups: {}})
};

export default function testReducer (state = initialState, action) {
  let handler = handlers[action.type];
  if (!handler) return state;
  return { ...state, ...handler(state, action) };
}
