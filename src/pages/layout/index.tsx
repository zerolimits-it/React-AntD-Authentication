import React, { lazy, Suspense } from "react";
import { Layout as MainLayout } from "antd";
import { Route, Switch } from "react-router-dom";

import { LayoutProvider } from "../../contexts/LayoutContext";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import FullPageSpinner from "../../components/Common/FullPageSpinner";

const Dashboard = lazy(() => import("../dashboard"));
const Projects = lazy(() => import("../projects"));

const routes = [
	{ path: "/app/dashboard", exact: true, component: Dashboard },
	{ path: "/app/projects", exact: true, component: Projects }
];

interface Props {}

const Layout: React.FC<Props> = () => {
	return (
		<LayoutProvider>
			<MainLayout>
				<Sidebar />
				<MainLayout>
					<Header />
					<MainLayout.Content
						style={{
							margin: "24px 16px",
							padding: 24,
							background: "#fff",
							height: "100vh"
						}}
					>
						<Suspense fallback={<FullPageSpinner />}>
							<Switch>
								{routes.map(route => (
									<Route
										key={route.path}
										exact={route.exact}
										path={route.path}
										component={route.component}
									/>
								))}
							</Switch>
						</Suspense>
					</MainLayout.Content>
				</MainLayout>
			</MainLayout>
		</LayoutProvider>
	);
};
export default Layout;
