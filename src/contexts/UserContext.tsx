import React from "react";
import { History } from "history";

interface UserState {
	user: {};
	isAuthenticated: boolean;
}

interface UserActions {
	type: "LOGIN_SUCCESS" | "SIGN_OUT_SUCCESS" | "LOGIN_FAILURE";
}

interface ContextProps {
	userState: UserState;
	userDispatch: React.Dispatch<UserActions>;
}

interface MyProps {}

let UserStateContext = React.createContext({} as ContextProps);

function userReducer(state: UserState, action: UserActions) {
	switch (action.type) {
		case "LOGIN_SUCCESS":
			return {
				...state,
				isAuthenticated: true,
				user: JSON.stringify(localStorage.getItem("user_token"))
			};
		case "SIGN_OUT_SUCCESS":
			return { ...state, isAuthenticated: false, user: {} };
		case "LOGIN_FAILURE":
			return { ...state, isAuthenticated: false };
		default: {
			throw new Error(`Unhandled action type: ${action.type}`);
		}
	}
}

function UserProvider(props: React.PropsWithChildren<MyProps>) {
	var [userState, userDispatch] = React.useReducer(userReducer, {
		isAuthenticated: !!localStorage.getItem("user_token"),

		user: JSON.stringify(localStorage.getItem("user_token"))
	});

	const value = { userState, userDispatch };

	return (
		<UserStateContext.Provider value={value}>
			{props.children}
		</UserStateContext.Provider>
	);
}

function useUserState() {
	var context = React.useContext(UserStateContext);

	if (context === undefined) {
		throw new Error("useUserState must be used within a UserProvider");
	}
	return context;
}

export { UserProvider, useUserState, loginUser, signOut };

function loginUser(
	dispatch: React.Dispatch<UserActions>,
	email: String,
	password: String,
	history: History,
	setLoading: Function,
	setError: Function
) {
	setError(false);
	setLoading(true);

	/** You can modify  and send request to the backend */
	if (!!email && !!password) {
		setTimeout(() => {
			localStorage.setItem("user_token", "Jade");
			setError(false);
			setLoading(false);
			dispatch({ type: "LOGIN_SUCCESS" });

			history.push("/app/dashboard");
		}, 2000);
	} else {
		dispatch({ type: "LOGIN_FAILURE" });
		setError(true);
		setLoading(false);
	}
}

function signOut(dispatch: React.Dispatch<UserActions>, history: History) {
	localStorage.removeItem("user_token");
	dispatch({ type: "SIGN_OUT_SUCCESS" });
	history.push("/login");
}
