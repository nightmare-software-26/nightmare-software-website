import { Button } from "react-bootstrap";
import { Hero } from "./components/hero";

function App() {
	return (
		<>
			<Hero />
			<div>
				<p>Below the fold</p>
				<Button>Do thing</Button>
			</div>
		</>
	);
}

export default App;
