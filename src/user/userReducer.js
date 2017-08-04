import { USER_CREATE } from './userAction';

const initialState = {
  users: []
};

const handlers = { 
  [USER_CREATE]: (_, action) => ({})
};

export default function testReducer (state = initialState, action) {
  let handler = handlers[action.type];
  if (!handler) return state;
  return { ...state, ...handler(state, action) };
}
