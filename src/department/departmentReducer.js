import { 
  DEPARTMENT_BAD_REQUEST,
  DEPARTMENT_ADD_PROGRESS, 
  DEPARTMENT_ADD_SUCCESS,
  ROLE_ADD_SUCCESS,
  DEPARTMENT_ADD_CANCEL 
} from './departmentAction';
import { USER_LOGOUT} from 'jazasoft/actions/authActions';
const ROLE_INITIALIZED = 'ROLE_INITIALIZED';
const DEPARTMENT_INITIALIZED = 'DEPARTMENT_INITIALIZED';

const initialState = {
  busy: false,
  adding: false,
  departments: {},
  roles: {},
  resources: []
};

const handlers = { 
  [DEPARTMENT_BAD_REQUEST]: (_, action) => ({busy: false}),
  [DEPARTMENT_INITIALIZED]: (_, action) => ({departments: action.payload.departments}),
  [DEPARTMENT_ADD_PROGRESS]: (_, action) => ({busy: true, adding: true}),
  [DEPARTMENT_ADD_SUCCESS]: (_, action) => {
    let departments = {..._.departments};
    departments[action.payload.id] = action.payload.department;
    return {busy: false, adding: false, departments};
  },
  [ROLE_INITIALIZED]: (_, action) => ({roles: action.payload.roles, resources: action.payload.resources}),
  [ROLE_ADD_SUCCESS]: (_, action) => {
    let roles = {..._.roles};
    roles[action.payload.id] = action.payload.role;
    return {busy: false, adding: false, roles};
  },
  [DEPARTMENT_ADD_CANCEL]: (_, action) => ({busy: false, adding: false}),
  [USER_LOGOUT]: (_, action) => ({departments: {}})
};

export default function testReducer (state = initialState, action) {
  let handler = handlers[action.type];
  if (!handler) return state;
  return { ...state, ...handler(state, action) };
}
