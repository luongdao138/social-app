import { postDataAPI } from '../../utils';
import { NOTIFY_TYPES } from './notifyAction';

export const AUTH_TYPES = {
  AUTH: 'AUTH',
};

export const login = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: NOTIFY_TYPES.NOTIFY, payload: { loading: true } });
      const res = await postDataAPI('/auth/login', data);
      localStorage.setItem('firstLogin', true);
      dispatch({
        type: AUTH_TYPES.AUTH,
        payload: {
          token: res.data.accessToken,
          user: res.data.user,
        },
      });
      dispatch({ type: NOTIFY_TYPES.NOTIFY, payload: { success: res.data.msg } });
    } catch (error) {
      dispatch({ type: NOTIFY_TYPES.NOTIFY, payload: { error: error.response?.data.msg } });
    }
  };
};
