import "../Nprogress.css";
import App from "next/app";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { motion } from "framer-motion";
const GlobalStyle = createGlobalStyle`
  body {
    direction:rtl;
    overflow-x: hidden;
    margin: 0;
    padding: 0;
	margin: 0px;
	padding: 0px;
color:red;
font-family: 'Heebo', sans-serif; 
/* font-family: 'Rubik', sans-serif; */
font-weight:200;
    box-sizing: border-box;
    font-size:1.2em;
  }
  h1,h2,h3,h4,h5,h6{
	margin: 0;
  }
  h1{
	  font-size:4vw;
	  font-weight:600;
  }
  h2{
	  font-size:2vw;
	  font-weight:300;
  }
  @media (max-width: 768px) {
    font-size:1em;
	}
`;

const theme = {
	colors: {
		primary: "#0070f3",
	},
};

function MyApp({ Component, pageProps, router }) {
	return (
		<>
			<GlobalStyle />
			<ThemeProvider theme={theme}>
				<motion.div
					key={router.route}
					initial="pageInitial"
					animate="pageAnimate"
					variants={{
						pageInitial: {
							opacity: 0,
						},
						pageAnimate: {
							opacity: 1,
						},
					}}
				>
					<Component {...pageProps} />
				</motion.div>
			</ThemeProvider>
		</>
	);
}
MyApp.getInitialProps = async appContext => {
	const appProps = await App.getInitialProps(appContext);
	return { ...appProps };
};

export default MyApp;
