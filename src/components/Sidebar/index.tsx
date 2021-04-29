import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Layout, Menu, Icon } from "antd";
import { useLayoutState } from "../../contexts/LayoutContext";
import styled from "styled-components";

const { Sider } = Layout;

interface Props {}

const LogoContainer = styled.div`
	height: 32px;
	background: rgba(255, 255, 255, 0.2);
	margin: 16px;
`;

const Sidebar: React.FC<Props> = () => {
	let { sidebarState } = useLayoutState();
	let location = useLocation();

	return (
		<React.Fragment>
			<Sider
				trigger={null}
				collapsible
				collapsed={sidebarState.isSidebarOpened}
				style={{ width: 256 }}
			>
				<LogoContainer />
				<Menu
					theme="dark"
					mode="inline"
					defaultSelectedKeys={[location.pathname]}
				>
					<Menu.Item key="/app/dashboard">
						<Link to="/app/dashboard">
							<Icon type="user" />
							<span>Dashboard</span>
						</Link>
					</Menu.Item>
					<Menu.Item key="/app/projects">
						<Link to="/app/projects">
							<Icon type="video-camera" />
							<span>Projects</span>
						</Link>
					</Menu.Item>
					<Menu.Item key="upload">
						<Icon type="upload" />
						<span>nav 3</span>
					</Menu.Item>
				</Menu>
			</Sider>
		</React.Fragment>
	);
};

export default Sidebar;
