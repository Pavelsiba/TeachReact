import { usersAPI } from "./../api/api";

const SET_USER_DATA = "SET_USER_DATA";

const initialState = {
  id: null,
  login: null,
  email: null,
  isAuth: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.data,
        isAuth: true,
      };
    default:
      return state;
  }
};

export const setAuthUserData = (id, login, email) => ({
  type: SET_USER_DATA,
  data: { id, login, email },
});

export const authUser = () => (dispatch) => {
    usersAPI.authUser().then((response) => {
      if (response.data.resultCode === 0) {
        let { id, login, email } = response.data.data;
        dispatch(setAuthUserData(id, login, email));
      }
    });
  };

export default authReducer;
