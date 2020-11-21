import request from '../utils/request';

export function POST_Login(payload) {
  return request.post('/User/UserLogin', payload);
}

export function POST_Register(payload) {
  return request.post('/User/Register', payload);
}
