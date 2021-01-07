import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import { motion } from "framer-motion";
const NavHeader = styled(motion.header)`
	background-color: transparent;
	min-height: 60px;
`;
const MainNav = styled(motion.nav)`
	padding-left: 0;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	align-items: stretch;
	justify-content: space-around;
	min-height: 60px;
	z-index: 10;
	width: 100%;
	position: fixed;
	background-color: #fff;
	@media (max-width: 768px) {
		flex-direction: column;
		background-color: #fff;
		min-height: 30px;
		height: 40px;
	}
`;
const Logo = styled(Image)`
	box-sizing: border-box;
`;

const LogoContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	box-sizing: border-box;
	@media (max-width: 768px) {
		display: none;
	}
`;

const NavBarUl = styled.ul`
	overflow-x: hidden;
	max-width: 100%;
	margin: 0;
	z-index: 1;
	display: flex;
	justify-content: center;
	flex-direction: row;
	padding: 0;
	margin-top: 0;
	margin-bottom: 0;
	padding-left: 0;
	@media (max-width: 768px) {
		min-height: 20vh;
		flex-direction: column;
		justify-content: flex-start;
		background-color: #282222;
		width: 100%;
		position: absolute;
		left: ${p => (p.open ? "0px" : "100%")};
		opacity: ${p => (p.open ? "1" : "0.3")};
		transition: all 0.3s ease-out;
		top: 40px;
	}
`;

const SubUl = styled.ul`
	display: block;
	flex-direction: column;
	align-items: stretch;
	background-color: #282222;
	position: absolute;
	top: 60px;
	margin-right: 102px;
	padding: 0;
	margin-top: 0;
	margin-bottom: 0;

	@media (max-width: 768px) {
		display: none;
	}
`;

const Li = styled.li`
	display: flex;
	align-items: center;
	justify-content: center;
	min-width: 100px;
	padding-left: 0;
	color: #282222;
	padding: 0;
	margin: 0;
	box-sizing: border-box;
	margin-top: 0;
	margin-bottom: 0;
	cursor: pointer;
	list-style-type: none;
	text-align: center;
	transition: background-color 0.3s ease;

	@media (max-width: 768px) {
		background-color: #282222;
		padding: 5px;
		flex-direction: column;
	}
	&:hover {
		background-color: #b9b9b9;
		color: #282222;
		border-bottom: 1px solid #940303;
	}
`;
const SubLi = styled(Li)`
	display: none;
	padding: 8px;
	font-size: 0.8em;
	text-align: right;
	transition: background-color 0.3s ease;
	background-color: #282222;
	border-bottom: 0.5px solid rgba(185, 185, 185, 0.1);
	&:hover {
		background-color: #b9b9b9;
		color: #282222;
	}
	${Li}:hover & {
		display: flex;
	}
	@media (max-width: 768px) {
		background-color: #282222;
	}
`;
const NavLink = styled(Link)``;

const A = styled.a``;

const HamburgerContainer = styled.div`
	display: none;
	box-sizing: border-box;
	height: 60px;

	@media (max-width: 768px) {
		display: block;
	}
`;

export { NavHeader, MainNav, Logo, LogoContainer, NavBarUl, SubUl, Li, SubLi, NavLink, HamburgerContainer, A };
