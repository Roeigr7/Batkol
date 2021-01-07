import fetch from "isomorphic-fetch";
import cookie, { remove } from "js-cookie";
import { API } from "../config";

//////////////////////////////////////GET ALL PRODUCTS/////////////////////////////////////////////////////////////////////////
export const listProductsWithCategories = () => {
	return fetch(`${API}/products-categories`, {
		method: "POST",
		headers: {
			Accept: "application/json",
		},
	})
		.then(response => {
			return response.json();
		})
		.catch(err => console.log("err", err));
};
