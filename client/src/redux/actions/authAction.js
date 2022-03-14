import { postDataAPI } from '../../utils';
import { GLOBAL_TYPES } from './globalTypes';

export const login = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: GLOBAL_TYPES.ALERT, payload: { loading: true } });
      const res = await postDataAPI('/auth/login', data);
      localStorage.setItem('firstLogin', true);
      dispatch({
        type: GLOBAL_TYPES.AUTH,
        payload: {
          token: res.data.access_token,
          user: res.data.user,
        },
      });
      dispatch({ type: GLOBAL_TYPES.ALERT, payload: { success: res.data.msg } });
    } catch (error) {
      dispatch({ type: GLOBAL_TYPES.ALERT, payload: { error: error.response?.data.msg } });
    }
  };
};

export const refreshToken = () => async (dispatch) => {
  const firstLogin = localStorage.getItem('firstLogin');

  if (firstLogin) {
    try {
      dispatch({
        type: GLOBAL_TYPES.ALERT,
        payload: { loading: true },
      });
      const res = await postDataAPI('/auth/refresh_token');
      dispatch({
        type: GLOBAL_TYPES.AUTH,
        payload: {
          token: res.data.access_token,
          user: res.data.user,
        },
      });
      dispatch({ type: GLOBAL_TYPES.ALERT, payload: {} });
    } catch (error) {
      dispatch({ type: GLOBAL_TYPES.ALERT, payload: { error: error.response?.data.msg } });
    }
  }
};
