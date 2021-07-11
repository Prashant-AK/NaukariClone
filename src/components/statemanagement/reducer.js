export const initialState = {
  usertoken: null,
  mode: "",

  userDetails: {
    email: "",
    name: "",
    phone: "",
    mode: "",
    id: "",
  },
};
//selector

const reducer = (state, action) => {
  switch (action.type) {
    case "Set_User":
      return {
        ...state,
        usertoken: action.user,
      };

    case "Set_User_Detail":
      return {
        ...state,
        userDetails: action.userDetails,
      };

    default:
      return state;
  }
};

export default reducer;
