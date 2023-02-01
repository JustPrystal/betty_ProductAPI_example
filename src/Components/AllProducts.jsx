import { useMutation, useQuery, useQueryClient } from "react-query";
import ProductAPI from "../FirebaseAPI/ProductAPI";

const AllProducts = () => {
	const { data, status, isFetching } = useQuery(
		"products",
		ProductAPI.getProducts
	);
	const queryClient = useQueryClient();

	const DeleteProduct = (id) => {
		return ProductAPI.deleteProduct(id);
	};

	const { mutate } = useMutation(DeleteProduct, {
		onSuccess: () => {
			queryClient.invalidateQueries("products");
		},
	});

	if (status === "loading") {
		return <>Loading Products</>;
	}
	if (status === "error") {
		return <>Error Loading Products</>;
	}
	return (
		<div className="AllProducts">
			{isFetching && <div>Fetching</div>}
			<div className="AllProducts-wrapper">
				{data.map((x) => (
					<div key={x.id} className="product">
						<div className="product-wrapper">
							<div className="image">
								<img src={x.image} alt="PRODUCT_IMAGE" />
							</div>
							<div className="content">
								<div className="name">{x.name}</div>
								<div className="price">price: {x.price}</div>
								<div className="description">{x.description}</div>
								<div className="actions">
									<button onClick={() => mutate(x.id)}>delete</button>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default AllProducts;
