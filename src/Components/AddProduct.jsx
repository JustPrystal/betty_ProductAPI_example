import ProductAPI from "../FirebaseAPI/ProductAPI";
import { useMutation, useQueryClient } from "react-query";
import { useState } from "react";

const AddProduct = () => {
	const queryClient = useQueryClient();

	const [Data, setData] = useState(DefaultProject);

	console.log(Data)

	const AddProduct = async () =>{
		const {image, ...DataToUpload} = Data
		await ProductAPI.addProduct(
			DataToUpload,
			image
		);
	}
		

	const { mutate } = useMutation(AddProduct, {
		onSuccess: () => {
			setData(DefaultProject);
			queryClient.invalidateQueries("products");
		},
	});
	const UpdateValue = (e) => setData({ ...Data, [e.target.name]: e.target.value });

	return (
		<div className="AddProduct">
			<div className="AddProduct-wrapper">
				<input
					onChange={UpdateValue}
					type="text"
					name="heading"
					value={Data.heading}
					placeholder="Product Heading"
				/>
				<input
					onChange={UpdateValue}
					type="text"
					name="subHeading"
					value={Data.subHeading}
					placeholder="Product SubHeading"
				/>
				<input
					onChange={UpdateValue}
					type="text"
					name="shortDescription"
					value={Data.shortDescription}
					placeholder="Product ShortDescription"
				/>
				<input
					onChange={UpdateValue}
					type="text"
					name="serving"
					value={Data.serving}
					placeholder="Product Serving"
				/>
				<input
					onChange={UpdateValue}
					type="text"
					name="time"
					value={Data.time}
					placeholder="Product Time"
				/>
				<input
					onChange={UpdateValue}
					type="text"
					name="calories"
					value={Data.calories}
					placeholder="Product Calories"
				/>
				<div className="mying">
					{Data.ingredients.map(x => {
						return <div className="ing">
							<div className="title">{x.title}</div>
							<div className="desc">{x.desc}</div>
						</div>
					})}
				</div>
				<Ingredients addIng={(newData) => setData({ ...Data, ingredients: [...Data.ingredients, newData] })}/>
				<input
					type="file"
					onChange={
						({ target }) => setData({ ...Data, image: target.files[0] })
					}
				/>
				<div className="categories">
					<button onClick={() => setData({...Data, category: "breakfast"})}>Breakfast</button>
					<button onClick={() => setData({...Data, category: "lunch"})}>Lunch</button>
					<button onClick={() => setData({...Data, category: "dinner"})}>Dinner</button>
				</div>
				<button onClick={mutate}>Add product</button>
			</div>
		</div>
	);
};

const Ingredients = ({ addIng }) => {
	const [SingleIng, setSingleIng] = useState({title: "", desc: ""})
	const UpdateValue = (e) => setSingleIng({ ...SingleIng, [e.target.name]: e.target.value });
	const submit = () => {
		addIng(SingleIng)
		setSingleIng({title: "", desc: ""})
	}
	return <div className="ING">
		<input type="text" name="title" value={SingleIng.title}  onChange={UpdateValue} placeholder="Ingredients Title"/>
		{/* <input type="text" name="desc" value={SingleIng.desc} onChange={UpdateValue} /> */}
		<textarea name="desc" rows={4} cols={30} value={SingleIng.desc} onChange={UpdateValue} placeholder="Ingredients Desc"/>
		<button onClick={submit}>Add Ingredients</button>
	</div>
}

const DefaultProject = {
	heading: "",
	subHeading: "",
	shortDescription: "",
	ingredients: [],
	serving: "",
	time: "",
	calories: "",
	image: "",
	category: "",
};

export default AddProduct;
