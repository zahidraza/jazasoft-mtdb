import { USER_ADD } from './userAction';

const initialState = {
  users: [],
  message: ''
};

const handlers = { 
  [USER_ADD]: (_, action) => ({message: 'Hello'})
};

export default function testReducer (state = initialState, action) {
  let handler = handlers[action.type];
  if (!handler) return state;
  return { ...state, ...handler(state, action) };
}
