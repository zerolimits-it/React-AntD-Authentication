import React from "react";
import styled from "styled-components";
import { Spin } from "antd";

interface Props {}
const Container = styled.div`
	text-align: center;
	display: flex;
	justify-content: center;
	align-items: center;
`;
const FullPageSpinner: React.FC<Props> = () => {
	return (
		<Container>
			<Spin size="large" />
		</Container>
	);
};

export default FullPageSpinner;
