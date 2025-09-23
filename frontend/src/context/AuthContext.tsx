import { createContext, useReducer } from "react";
import { removeUserToken } from "../utils/cacheStorage";

export const AuthContext = createContext({
  user: null,
});

export const authReducer = (state: any, action: any) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      removeUserToken();
      return  {
        ...state,
        user: null,
        token: null,
        refreshToken: null,
        company: null,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
