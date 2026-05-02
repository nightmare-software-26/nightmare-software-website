import { ContactSection } from "./components/contact-section";
import { Footer } from "./components/footer";
import { HelpWithSection } from "./components/help-with-section";
import { Hero } from "./components/hero";

function App() {
	return (
		<>
			<Hero />
			<HelpWithSection />
			<ContactSection />
			<Footer />
		</>
	);
}

export default App;
