import { routerRedux } from 'dva/router';

export default {
  namespace: 'global',

  state: {},

  effects: {
    * goToRoute({ payload, callback, loading }, { put }) {
      try {
        if (loading) { loading(true) }
        yield put(routerRedux.push(payload));
        if (loading) { loading(false) }
        if (callback) { callback() }
      } catch (error) {
        console.log(error);
      }
    },
  },

  reducers: {

  },
}
