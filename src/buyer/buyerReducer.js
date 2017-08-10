import { 
  BUYER_BAD_REQUEST,
  BUYER_ADD_PROGRESS, 
  BUYER_ADD_SUCCESS,
  BUYER_ADD_CANCEL 
} from './buyerAction';
import { USER_LOGOUT} from 'jazasoft/actions/authActions';
const BUYER_INITIALIZED = 'BUYER_INITIALIZED';

const initialState = {
  busy: false,
  adding: false,
  buyers: {},
  resources: []
};

const handlers = { 
  [BUYER_BAD_REQUEST]: (_, action) => ({busy: false}),
  [BUYER_INITIALIZED]: (_, action) => ({buyers: action.payload.buyers, resources: action.payload.resources}),
  [BUYER_ADD_PROGRESS]: (_, action) => ({busy: true, adding: true}),
  [BUYER_ADD_SUCCESS]: (_, action) => {
    let buyers = {..._.buyers};
    buyers[action.payload.id] = action.payload.buyer;
    return {busy: false, adding: false, buyers};
  },
  [BUYER_ADD_CANCEL]: (_, action) => ({busy: false, adding: false}),
  [USER_LOGOUT]: (_, action) => ({buyers: {}, resources: []})
};

export default function testReducer (state = initialState, action) {
  let handler = handlers[action.type];
  if (!handler) return state;
  return { ...state, ...handler(state, action) };
}
