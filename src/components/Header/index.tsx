import React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { Layout, Icon, Badge, Menu, Dropdown } from "antd";
import styled from "styled-components";

import { useLayoutState, toggleSidebar } from "../../contexts/LayoutContext";
import { signOut, useUserState } from "../../contexts/UserContext";

interface RouteProps extends RouteComponentProps<any> {}

const Iconic = styled(Icon)`
	font-size: 18px;
	line-height: 64px;
	padding: 0 24px;
	cursor: pointer;
	transition: color 0.3s;
`;

const Notification = styled.div`
	width: 200px;
	float: right;
	padding: 0 10px;
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
`;

const BadgeContainer = styled.div`
	cursor: pointer;
`;

const IconContainer = styled(Icon)`
	font-size: 20px;
`;

const Header: React.FC<RouteProps> = ({ history }) => {
	let { sidebarState, sidebarDispatch } = useLayoutState();
	let userState = useUserState();

	const settings = (
		<Menu>
			<Menu.Item>
				<span>
					<Icon type="user" /> Profile
				</span>
			</Menu.Item>
			<Menu.Item onClick={() => signOut(userState.userDispatch, history)}>
				<span>
					<Icon type="logout" /> Logout
				</span>
			</Menu.Item>
		</Menu>
	);

	return (
		<React.Fragment>
			<Layout.Header style={{ background: "#fff", padding: 0 }}>
				<Iconic
					className="trigger"
					type={
						sidebarState.isSidebarOpened
							? "menu-unfold"
							: "menu-fold"
					}
					onClick={() => toggleSidebar(sidebarDispatch)}
				/>

				<Notification>
					<BadgeContainer>
						<Badge count={5}>
							<IconContainer type="bell" />
						</Badge>
					</BadgeContainer>
					<BadgeContainer>
						<Badge count={0} showZero>
							<IconContainer type="mail" />
						</Badge>
					</BadgeContainer>
					<BadgeContainer>
						<Dropdown overlay={settings} placement="bottomCenter">
							<IconContainer type="setting" />
						</Dropdown>
					</BadgeContainer>
				</Notification>
			</Layout.Header>
		</React.Fragment>
	);
};

export default withRouter(Header);
