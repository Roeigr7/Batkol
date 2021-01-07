import styled from "styled-components";
import Image from "next/image";

const Header = styled.header`
	position: relative;
`;

const ImageBanner = styled(Image)``;

const H1 = styled.h1`
	text-align: center;
`;
const H2 = styled.h2``;
const Div = styled.div`
	position: absolute;
	&.banner-text {
		top: 0;
		z-index: 1;
		padding: 10px;
	}
`;

const Section = styled.section`
	width: 100%;

	background: rgba(148, 3, 3, 0);
	&.services-container {
		background-color: #242222;
		width: 100%;
	}
	&.about-container {
		background-color: #242222;
		width: 100%;
		height: 200px;
	}
`;

const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(6, minmax(170px, auto));
	grid-template-rows: repeat(1, minmax(170px, auto));
	justify-content: center;
`;

export { Header, ImageBanner, H1, H2, Div, Section, Grid };
