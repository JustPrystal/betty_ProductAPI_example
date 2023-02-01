import { QueryClient, QueryClientProvider } from "react-query";
import AddProduct from "./Components/AddProduct";
import AllProducts from "./Components/AllProducts";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<div className="APP">
				<div className="APP-wrapper">
					<AddProduct />
					<AllProducts />
				</div>
			</div>
			<ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
		</QueryClientProvider>
	);
};

export default App;
