import React from "react";
import { Route, Switch, Redirect, RouteComponentProps } from "react-router-dom";

import { useUserState } from "./contexts/UserContext";
import "./App.css";
import Login from "./pages/login";

import Layout from "./pages/layout";

interface IProps {
	component?:
		| React.ComponentType<RouteComponentProps<any>>
		| React.ComponentType<any>;
	exact?: boolean;
	path?: string | string[];
	render?: (props: RouteComponentProps<any>) => React.ReactNode;
}

const App: React.FC = () => {
	return (
		<Switch>
			<Route
				exact
				path="/"
				render={() => <Redirect to="/app/dashboard" />}
			/>
			<Route
				exact
				path="/app"
				render={() => <Redirect to="/app/dashboard" />}
			/>
			<PublicRoute path="/login" component={Login} />
			<PrivateRoute path="/app/" component={Layout} />
		</Switch>
	);
};

const PrivateRoute = ({ component: Component, ...rest }: IProps) => {
	const { userState } = useUserState();
	if (!Component) return null;
	console.log(userState.user);
	return (
		<Route
			{...rest}
			render={props =>
				userState.isAuthenticated ? (
					<Component {...props} />
				) : (
					<Redirect
						to={{
							pathname: "/login"
						}}
					/>
				)
			}
		/>
	);
};

const PublicRoute = ({ component: Component, ...rest }: IProps) => {
	const { userState } = useUserState();

	if (!Component) return null;
	return (
		<Route
			{...rest}
			render={props =>
				userState.isAuthenticated ? (
					<Redirect
						to={{
							pathname: "/"
						}}
					/>
				) : (
					<Component {...props} />
				)
			}
		/>
	);
};

export default App;
