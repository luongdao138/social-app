import { GLOBAL_TYPES } from './globalTypes';

export const resetAlert = () => ({
  type: GLOBAL_TYPES.ALERT,
  payload: {},
});
