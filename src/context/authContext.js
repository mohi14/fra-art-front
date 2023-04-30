import axios from "axios";
import React, { createContext, useEffect, useReducer, useState } from "react";
import Querystring from "query-string";

/**
 * Context
 */

export const AuthStateContext = createContext();
const AuthDispatchContext = createContext();

export function useAuthState() {
  const context = React.useContext(AuthStateContext);
  if (context === undefined) {
    throw new Error("useAuthState must be used within a AuthProvider");
  }
  return context;
}
export function useAuthDispatch() {
  const context = React.useContext(AuthDispatchContext);
  if (context === undefined) {
    throw new Error("useAuthDispatch must be used within a AuthProvider");
  }
  return context;
}

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState("");

  if (userId.length > 0) {
    localStorage.setItem("params", userId);
  }

  const [active, setActive] = useState("");

  const [authTkn, setAuthTkn] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [userInfo, setUserInfo] = useState("");

  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (item) => {
    console.log("item length", cartItems);
    const newItems = [...cartItems, item];
    const newitmms = JSON.stringify(newItems);
    localStorage.setItem("fraCart", newitmms);
    setCartItems(newItems);
  };



  useEffect(() => {
    const itms = JSON.parse(localStorage.getItem("fraCart"));
    if (itms) {
      setCartItems(itms);
    }
  }, []);

  // const paramsInfo = { userId, setUserId, active, setActive };
  const [user, dispatch] = useReducer(AuthReducer, initialState);
  const info = {
    user,
    userId,
    setUserId,
    active,
    setActive,
    authTkn,
    setAuthTkn,
    userAddress,
    setUserAddress,
    cartItems,
    setCartItems,
    handleAddToCart,
  };

  return (
    <AuthStateContext.Provider value={info}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};

/**
 *  Actions
 */
export async function getUser(dispatch, address) {
  axios
    .get(`/api/user/${address}`)
    .then(async (res) => {
      dispatch({ type: "FETCH_USER_SUCCESS", payload: res.data.user });
    })
    .catch((err) => {
      dispatch({ type: "FETCH_USER_SUCCESS", payload: null });
    });
}

export async function loginUser(dispatch, account, nonce, signer) {
  try {
    dispatch({ type: "REQUEST_LOGIN" });
    try {
      const { data } = await axios.post(
        `/api/login`,
        Querystring.stringify({ address: account })
      );
      const token = data.token;
      if (token) {
        localStorage.setItem("Token", token);
        dispatch({ type: "LOGIN_SUCCESS", payload: token });
        await getUser(dispatch, account);
        return token;
      }
    } catch (err) {
      dispatch({ type: "LOGIN_ERROR", error: err });
      console.log(err);
    }
  } catch (error) {
    dispatch({ type: "LOGIN_ERROR", error: error });
    console.log(error);
  }
}

export async function logout(dispatch) {
  dispatch({ type: "LOGOUT" });
  localStorage.removeItem("token");
}
/**
 * Reducers
 */
let token = localStorage.getItem("Token") ? localStorage.getItem("Token") : "";
export const initialState = {
  user: "",
  token: "" || token,
  loading: false,
  errorMessage: null,
};

export const AuthReducer = (initialState, action) => {
  switch (action.type) {
    case "FETCH_USER_SUCCESS":
      return {
        ...initialState,
        user: action.payload,
        loading: false,
      };
    case "REQUEST_LOGIN":
      return {
        ...initialState,
        loading: true,
      };
    case "LOGIN_SUCCESS":
      return {
        ...initialState,
        token: action.payload,
        loading: false,
      };
    case "LOGOUT":
      return {
        ...initialState,
        user: "",
        token: "",
      };

    case "LOGIN_ERROR":
      return {
        ...initialState,
        loading: false,
        errorMessage: action.error,
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
