import ProductAPI from "../FirebaseAPI/ProductAPI";
import { useMutation, useQueryClient } from "react-query";
import { useState } from "react";

const AddProduct = () => {
	const queryClient = useQueryClient();

	const [Data, setData] = useState(DefaultProject);

	const AddProduct = async () =>
		await ProductAPI.addProduct(
			{ name: Data.name, description: Data.description, price: Data.price },
			Data.image
		);

	const { mutate } = useMutation(AddProduct, {
		onSuccess: () => {
			setData(DefaultProject);
			queryClient.invalidateQueries("products");
		},
	});
	const UpdateValue = (e) =>
		setData({ ...Data, [e.target.name]: e.target.value });

	return (
		<div className="AddProduct">
			<div className="AddProduct-wrapper">
				<input
					onChange={UpdateValue}
					type="text"
					name="name"
					value={Data.name}
					placeholder="Product name"
				/>
				<textarea
					onChange={UpdateValue}
					type="text"
					name="description"
					value={Data.description}
					placeholder="description"
				/>
				<input
					type="file"
					onChange={
						({ target }) => setData({ ...Data, image: target.files[0] })
					}
				/>
				<input
					onChange={UpdateValue}
					type="number"
					placeholder="price"
					name="price"
					value={Data.price}
				/>
				<button onClick={mutate}>add product</button>
			</div>
		</div>
	);
};

const DefaultProject = { name: "", description: "", price: 0, image: "" };

export default AddProduct;
