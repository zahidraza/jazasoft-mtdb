import { 
  ROLE_BAD_REQUEST,
  ROLE_ADD_PROGRESS, 
  ROLE_ADD_SUCCESS,
  ROLE_ADD_CANCEL 
} from './roleAction';
const ROLE_INITIALIZED = 'ROLE_INITIALIZED';

const initialState = {
  busy: false,
  adding: false,
  roles: {}
};

const handlers = { 
  [ROLE_BAD_REQUEST]: (_, action) => ({busy: false}),
  [ROLE_INITIALIZED]: (_, action) => ({roles: action.payload.roles}),
  [ROLE_ADD_PROGRESS]: (_, action) => ({busy: true, adding: true}),
  [ROLE_ADD_SUCCESS]: (_, action) => {
    let roles = {..._.roles};
    roles[action.payload.id] = action.payload.role;
    return {busy: false, adding: false, roles};
  },
  [ROLE_ADD_CANCEL]: (_, action) => ({busy: false, adding: false})
};

export default function testReducer (state = initialState, action) {
  let handler = handlers[action.type];
  if (!handler) return state;
  return { ...state, ...handler(state, action) };
}
