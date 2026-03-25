import Logo from "../../assets/Full Logo Light.svg";
import DarkVeil from "../../react-bits/dark-veil";
import ShinyText from "../../react-bits/shiny-text";

export const Hero = () => {
	return (
		<div
			style={{ width: "100vw", height: "100vh" }}
			className="d-flex justify-content-center"
		>
			<img src={Logo} alt="Logo" className="position-absolute w-50 h-100" />
			<DarkVeil
				hueShift={0}
				noiseIntensity={0}
				scanlineIntensity={0}
				speed={1}
				scanlineFrequency={0.5}
				warpAmount={2.5}
			/>
		</div>
	);
};
