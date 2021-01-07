import styled from "styled-components";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
const Div = styled.div`
	&.service-grid-item {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		background-color: ${p => (p.color ? p.color : "transparent")};
	}
`;
const H2 = styled.h2`
	&.service-grid-title {
		color: white;
		font-size: 0.9em;
		font-weight: 300;
		margin: 0;
	}
`;

const MainGridItem = ({ title, icon, color }) => {
	return (
		<Div className="service-grid-item">
			<Icon
				style={{
					backgroundColor: "#242222",
					padding: "15px",
					boxShadow: "2px -3px 2px -2px rgba(255,255,255,0.85)",
					color: "red",
					borderRadius: "50%",
					width: "50px",
					height: "50px",
				}}
				icon={icon || null}
			/>
			<H2 className="service-grid-title">{title}</H2>
		</Div>
	);
};
export default MainGridItem;
