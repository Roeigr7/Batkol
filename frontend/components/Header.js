import { useState, useEffect } from "react";
import NProgress from "nprogress";
import Router from "next/router";
import { NavHeader, MainNav, Logo, LogoContainer, NavBarUl, SubUl, Li, SubLi, NavLink, HamburgerContainer, A } from "../styles/header";
import { Spin as Hamburger } from "hamburger-react";

import { homePageTitle, aboutTitle, servicesTitle, contactTitle, locationTitle } from "../texts/header";
Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();
const variants = {
	expand: { height: 60 },
	shrink: { height: 60 },
};
const Header = () => {
	const [hamburgerClick, setHamburgerClick] = useState(false);
	const [scrollTop, setScrollTop] = useState(false);
	const handleClick = () => setHamburgerClick(!hamburgerClick);
	const closeMobileMenu = () => setHamburgerClick(false);
	useEffect(() => {
		window.addEventListener("scroll", scrollHandler);
		return () => {
			window.removeEventListener("scroll", scrollHandler);
		};
	}, []);
	const scrollHandler = () => {
		window.scrollY === 0 ? setScrollTop(true) : setScrollTop(false);
	};
	return (
		<NavHeader initial={false} transition={{ duration: 0.4 }} animate={scrollTop ? "expand" : "shrink"} variants={variants}>
			<MainNav initial={false} transition={{ duration: 0.4 }} animate={scrollTop ? "expand" : "shrink"} variants={variants}>
				<HamburgerContainer>
					<Hamburger size={28} color="#940303" onToggle={handleClick} direction="right" />
				</HamburgerContainer>

				<NavBarUl open={hamburgerClick}>
					<Li>
						<NavLink href="/signup" onClick={closeMobileMenu}>
							<A>{homePageTitle}</A>
						</NavLink>
					</Li>
					<Li>
						<NavLink href="/" onClick={closeMobileMenu}>
							<A>{aboutTitle}</A>
						</NavLink>
					</Li>
					<Li subMenu>
						<NavLink href="/products" onClick={closeMobileMenu}>
							<A className={hamburgerClick ? "nav-links-mobile" : "nav-links"}>{servicesTitle}</A>
						</NavLink>

						<SubUl>
							{/* ////////////////////////////////////////////////////////////SUB DROP DOWN//////////////////////////////////////////////////////*/}
							<SubLi>
								<NavLink href="/" onClick={closeMobileMenu}>
									<A className={hamburgerClick ? "nav-sub-links-mobile" : "nav-sub-link"}>מרכזיות טלפון ופקסמיליה</A>
								</NavLink>
							</SubLi>
							<SubLi>
								<NavLink href="/" onClick={closeMobileMenu}>
									<A className={hamburgerClick ? "nav-sub-links-mobile" : "nav-sub-link"}>מצלמות במעגל סגור</A>
								</NavLink>
							</SubLi>
							<SubLi>
								<NavLink href="/" onClick={closeMobileMenu}>
									<A className={hamburgerClick ? "nav-sub-links-mobile" : "nav-sub-link"}>מערכות הגברה בידוריות וקריוקי</A>
								</NavLink>
							</SubLi>
							<SubLi>
								<NavLink href="/" onClick={closeMobileMenu}>
									<A className={hamburgerClick ? "nav-sub-links-mobile" : "nav-sub-link"}>מערכות אזעקה</A>
								</NavLink>
							</SubLi>
							<SubLi>
								<NavLink href="/" onClick={closeMobileMenu}>
									<A className={hamburgerClick ? "nav-sub-links-mobile" : "nav-sub-link"}>מערכות גילוי אש</A>
								</NavLink>
							</SubLi>
							<SubLi>
								<NavLink href="/" onClick={closeMobileMenu}>
									<A className={hamburgerClick ? "nav-sub-links-mobile" : "nav-sub-link"}>רכזת שחרור עשן</A>
								</NavLink>
							</SubLi>
							<SubLi>
								<NavLink href="/" onClick={closeMobileMenu}>
									<A className={hamburgerClick ? "nav-sub-links-mobile" : "nav-sub-link"}>מערכות אינטרקום</A>
								</NavLink>
							</SubLi>
							<SubLi>
								<NavLink href="/" onClick={closeMobileMenu}>
									<A className={hamburgerClick ? "nav-sub-links-mobile" : "nav-sub-link"}>מערכות כריזה מקצועיות</A>
								</NavLink>
							</SubLi>
							<SubLi>
								<NavLink href="/" onClick={closeMobileMenu}>
									<A className={hamburgerClick ? "nav-sub-links-mobile" : "nav-sub-link"}>מערכות הגברה</A>
								</NavLink>
							</SubLi>
						</SubUl>
					</Li>

					<Li>
						<NavLink href="/" onClick={closeMobileMenu}>
							<A className={hamburgerClick ? "nav-links-mobile" : "nav-links"}>{locationTitle}</A>
						</NavLink>
					</Li>
					<Li className="nav-item">
						<NavLink href="/" onClick={closeMobileMenu}>
							<A className={hamburgerClick ? "nav-links-mobile" : "nav-links"}>{contactTitle}</A>
						</NavLink>
					</Li>
				</NavBarUl>
				<LogoContainer>
					<Logo src="/batKolLogo.png" layout="fixed" width={180} height={60} alt="BatKol Logo" />
				</LogoContainer>
			</MainNav>
		</NavHeader>
	);
};

export default Header;
