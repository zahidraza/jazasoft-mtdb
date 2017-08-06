import { 
  TENANT_BAD_REQUEST,
  TENANT_ADD_PROGRESS, 
  TENANT_ADD_SUCCESS,
  TENANT_ADD_CANCEL 
} from './tenantAction';

const initialState = {
  busy: false,
  adding: false,
  tenants: {}
};

const handlers = { 
  [TENANT_BAD_REQUEST]: (_, action) => ({busy: false}),
  [TENANT_ADD_PROGRESS]: (_, action) => ({busy: true, adding: true}),
  [TENANT_ADD_SUCCESS]: (_, action) => {
    let tenants = {..._.tenants};
    tenants[action.payload.id] = action.payload.tenant;
    return {busy: false, adding: false, tenants};
  },
  [TENANT_ADD_CANCEL]: (_, action) => ({busy: false, adding: false})
};

export default function testReducer (state = initialState, action) {
  let handler = handlers[action.type];
  if (!handler) return state;
  return { ...state, ...handler(state, action) };
}
