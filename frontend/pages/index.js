import Layout from "../components/Layout";
import MainGridItem from "../components/MainGridItem";
import { Header, ImageBanner, H1, H2, Div, Section, Grid } from "../styles/indexPage";

import { bannertit, bannerdesc, servicestit, firetit, intercomtit, cameratit, smoketit, phonetit, speakertit } from "../texts/index";
import { faFire, faBell, faVideo, faSmog, faPhoneVolume, faVolumeUp } from "@fortawesome/free-solid-svg-icons";

const Index = () => {
	return (
		<Layout>
			<Header>
				<ImageBanner src="/2.jpg" layout="responsive" width={3} height={1} quality={100} alt="Batkol Logo" />

				<Div className="banner-text">
					<H1>{bannertit}</H1>
					<H2>{bannerdesc}</H2>
					<H2>{bannerdesc}</H2>
					<H2>{bannerdesc}</H2>
				</Div>
			</Header>
			<Section className="services-container">
				<H1 className="services-title">{servicestit}</H1>
				<Grid className="services-grid">
					<MainGridItem color="#979494" icon={faFire} title={firetit} />
					<MainGridItem color="#e70000" icon={faBell} title={intercomtit} />
					<MainGridItem color="#b9b9b9" icon={faVideo} title={cameratit} />
					<MainGridItem color="#d4d0d0" icon={faSmog} title={smoketit} />
					<MainGridItem color="#940303" icon={faPhoneVolume} title={phonetit} />
					<MainGridItem color="#242222" icon={faVolumeUp} title={speakertit} />
				</Grid>
			</Section>
			<Section className="about-container">
				<H1 className="about-title">מי אנחנו</H1>
				<p>
					לדחילחילחיחילחיחילחיחילחיחילחי חילחיחילחיחילחיח ילחיחילחי לחיחי חילחיח ילחיח יחילחי ילחיחילחי ילחיחיל חי
					חיחילחיחילחיחילחיחילחיחילחיחילחיחיחילחי חילחיחילחיחילחיח ילחיחילח ילחי
				</p>
			</Section>
		</Layout>
	);
};

export default Index;
