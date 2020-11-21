import request from '../utils/request';

export function GET_Data() {
  return request.get('/data');
}

export function POST_Data(payload) {
  return request.post('/data', payload);
}

export function PUT_Data(payload) {
  return request.put('/data', payload);
}

export function DELETE_Data(id) {
  return request.delete(`/data?id=${id}`);
}
