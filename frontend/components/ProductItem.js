import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { API } from "../config";
export const H2 = styled.h2`
	margin: 10px;
	font-size: 1.2em;
	font-weight: 300;
`;

const ProductItem = ({ product }) => {
	console.log(`${API}/product/photo`);
	const showProductCategories = prod => {
		return prod.categories.map((cat, i) => (
			<Link key={i} href={`/categories/${cat.slug}`}>
				<a>{cat.name}</a>
			</Link>
		));
	};
	return (
		<>
			<Link href={`/products/${product.slug}`}>
				<H2>
					<a>{product.title}</a>
					{showProductCategories(product)}
					<Image src={`${API}/product/photo/${product.slug}`} alt={product.title} layout="fixed" width={100} height={100} />
				</H2>
			</Link>
			<p>{product.body}</p>
			{/* <p>{product.categories[0]}</p> */}
			{/* <Image src="/r.png" layout="intrinsic" width={"200px"} height={"150px"} /> */}
		</>
	);
};
export default ProductItem;
