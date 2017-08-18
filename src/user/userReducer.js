import { 
  USER_BAD_REQUEST,
  USER_ADD_PROGRESS, 
  USER_ADD_SUCCESS,
  USER_ADD_CANCEL,
  USER_UPDATE_PROGRESS,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_CANCEL 
} from './userAction';
import { USER_LOGOUT} from 'jazasoft/actions/authActions';
const USER_INITIALIZED = 'USER_INITIALIZED';

const initialState = {
  busy: false,
  adding: false,
  updating: false,
  users: {}
};

const handlers = { 
  [USER_BAD_REQUEST]: (_, action) => ({busy: false}),
  [USER_INITIALIZED]: (_, action) => ({users: action.payload.users}),
  [USER_ADD_PROGRESS]: (_, action) => ({busy: true, adding: true}),
  [USER_ADD_SUCCESS]: (_, action) => {
    let users = {..._.users};
    users[action.payload.id] = action.payload.user;
    return {busy: false, adding: false, users};
  },
  [USER_ADD_CANCEL]: (_, action) => ({busy: false, adding: false}),
  [USER_UPDATE_PROGRESS]: (_, action) => ({busy: true, updating: true}),
  [USER_UPDATE_SUCCESS]: (_, action) => {
    let users = {..._.users};
    users[action.payload.id] = action.payload.user;
    return {busy: false, updating: false, users};
  },
  [USER_UPDATE_CANCEL]: (_, action) => ({busy: false, updating: false}),
  [USER_LOGOUT]: (_, action) => ({users: {}})
};

export default function testReducer (state = initialState, action) {
  let handler = handlers[action.type];
  if (!handler) return state;
  return { ...state, ...handler(state, action) };
}
