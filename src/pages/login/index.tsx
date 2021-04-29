import React, { useState } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Row, Col, Button, Form, Input, Icon, Alert } from "antd";
import styled from "styled-components";
import { loginUser, useUserState } from "../../contexts/UserContext";

const Container = styled.div`
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	height: 100vh;
	flex-direction: column;
`;

const InnerContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: white;
	width: 300px;
	height: 300px;
	border: 1px solid black;
	border-radius: 10px;
`;

interface MyComponentProps extends RouteComponentProps<any> {}

const Login: React.FC<MyComponentProps> = ({ history }) => {
	let { userDispatch } = useUserState();

	let [isLoading, setLoading] = useState(false);
	let [error, setError] = useState(false);
	let [emailValue, setEmailValue] = useState("");
	let [passwordValue, setPasswordValue] = useState("");

	return (
		<Row
			type="flex"
			justify="center"
			style={{ backgroundColor: "#001529" }}
		>
			<Col xs={{ span: 6 }} lg={{ span: 8 }}></Col>
			<Col xs={{ span: 12 }} lg={{ span: 8 }}>
				<Container>
					{error ? (
						<Alert
							message="Error"
							description="Wrong email or password"
							type="error"
							showIcon
						/>
					) : (
						""
					)}
					<InnerContainer>
						<Form className="login-form">
							<Form.Item
								hasFeedback
								validateStatus={error ? "error" : ""}
							>
								<Input
									prefix={
										<Icon
											type="user"
											style={{ color: "rgba(0,0,0,.25)" }}
										/>
									}
									onChange={e =>
										setEmailValue(e.target.value)
									}
									placeholder="Email"
								/>
							</Form.Item>
							<Form.Item
								hasFeedback
								validateStatus={error ? "error" : ""}
							>
								<Input
									prefix={
										<Icon
											type="lock"
											style={{ color: "rgba(0,0,0,.25)" }}
										/>
									}
									type="password"
									onChange={e =>
										setPasswordValue(e.target.value)
									}
									placeholder="Password"
								/>
							</Form.Item>
							<Form.Item>
								<Button
									type="primary"
									htmlType="submit"
									block
									loading={isLoading}
									onClick={() =>
										loginUser(
											userDispatch,
											emailValue,
											passwordValue,
											history,
											setLoading,
											setError
										)
									}
								>
									Login
								</Button>
							</Form.Item>
						</Form>
					</InnerContainer>
				</Container>
			</Col>
			<Col xs={{ span: 6 }} lg={{ span: 8 }}></Col>
		</Row>
	);
};

export default withRouter(Login);
