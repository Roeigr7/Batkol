import Layout from "../../components/Layout";
import Head from "next/head";
import axios from "axios";
import styled from "styled-components";
import { listProductsWithCategories } from "../../actions/products";
import ProductItem from "../../components/ProductItem";
import Link from "next/link";
import { useState } from "react";
import { API } from "../../config";
export const alarmcat = "אזעקות";
export const smokecat = "גלאי עשן";
export const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(1, 1fr);
	max-width: 100%;
`;
export const Div = styled.div`
	flex-direction: row;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	background: #e0e0e0;
`;

export const P = styled.p`
	padding: 10px;
	font-size: 1.2em;
	border: none;
	transition: border-width 0.6s ease;
	cursor: pointer;
	&:after {
		content: "";
		display: block;
		width: 0;
		height: 2px;
		background: #940303;
		transition: width 400ms;
	}
	&:hover::after {
		width: 100%;
	}
`;
export const Section = styled.section`
	text-align: center;
	border: 1px solid red;
`;

export const SubGrid = styled.div`
	display: grid;
	grid-template-columns: 25% 25% 25%;
	grid-template-rows: repeat(6, minmax(100px, auto));
	justify-content: center;
	grid-gap: 5px;
`;

const Products = ({ products, categories, size }) => {
	const [s, ss] = useState("");
	const showAllProducts = () => {
		console.log(products);
		return products.map((prod, i) => {
			return (
				<Section key={i}>
					<Link href={`/product/${prod.slug}`}>
						<a>
							<h1>{prod.slug}</h1>
						</a>
					</Link>

					<ProductItem product={prod} />
				</Section>
			);
		});
	};
	const single = e => {
		console.log("sin", e.target.files);
		ss(e.target.files[0]);
	};

	const submit = () => {
		const data = new FormData(); // If file selected
		if (s) {
			data.append("profileImage", s, s.name);
			axios
				.post(`${API}/profile-img-upload`, data, {
					headers: {
						accept: "application/json",
						"Accept-Language": "en-US,en;q=0.8",
						"Content-Type": `multipart/form-data; boundary=${data._boundary}`,
					},
				})
				.then(response => {
					if (200 === response.status) {
						// If file size is larger than expected.
						if (response.data.error) {
							console.log(response.data); // If not the given file type
						} else {
							// Success
							let fileName = response.data;
							console.log("filedata", fileName);
						}
					}
				})
				.catch(error => {
					// If another error
					console.log(error);
				});
		} else {
			// if file not selected throw error
			console.log("successtotalll");
		}
	};

	console.log("ssss", s);
	return (
		<Layout>
			<Grid>
				<div>
					<h1>single uipload</h1>
					<input type="file" onChange={single} />
					<button onClick={submit}>SUBMIT</button>
				</div>

				<h1>המוצרים שלנו</h1>
				<Div>
					<P>{alarmcat}</P>
					<P>{smokecat}</P>
					<P>כריזה</P>
					<P>אינטרקום</P>
					<P>הגברה</P>
					<P>אזעקות</P>
					<P>גילוי אש</P>
				</Div>
				<SubGrid>{showAllProducts()}</SubGrid>
			</Grid>
		</Layout>
	);
};

export default Products;

export const getServerSideProps = async ctx => {
	const res = await listProductsWithCategories();

	return { props: { products: res.products, categories: res.categories, size: res.size } };
};
