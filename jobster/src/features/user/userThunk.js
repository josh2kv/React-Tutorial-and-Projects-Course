import customFetch from '../../utils/axios';
import { logoutUser } from './userSlice';

export const registerUserThunk = async (url, user, thunkAPI) => {
  try {
    const res = await customFetch.post(url, user);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const loginUserThunk = async (url, user, thunkAPI) => {
  try {
    const res = await customFetch.post(url, user);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const updateUserThunk = async (url, user, thunkAPI) => {
  try {
    // Bearer: token type 중 하나
    // headers의 authorization에 token type과 token을 담아 request
    const res = await customFetch.patch(url, user, {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    });
    return res.data;
  } catch (error) {
    if (error.response.status === 401) {
      // 따로 logoutUser를 import 하지 않았는데 사용 가능!?
      thunkAPI.dispatch(logoutUser());
      return thunkAPI.rejectWithValue('Unauthorized! Logging Out...');
    }
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
