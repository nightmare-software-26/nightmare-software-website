import Logo from "../../assets/Full-Logo-Light.svg";
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
				baseColor={[0.8, 1, 1.3]}
			/>
			<div
				className="position-absolute d-flex flex-column justify-content-center align-items-center"
				style={{ marginTop: "80vh" }}
			>
				<ShinyText
					text="Scroll to learn more"
					speed={2}
					delay={1}
					color="#b5b5b5"
					shineColor="#ffffff"
					spread={120}
					direction="left"
					yoyo={false}
					pauseOnHover={false}
					disabled={false}
				/>
				<ShinyText
					text={<i className="bi bi-caret-down" style={{ fontSize: "2rem" }} />}
					speed={2}
					delay={1}
					color="#b5b5b5"
					shineColor="#ffffff"
					spread={120}
					direction="left"
					yoyo={false}
					pauseOnHover={false}
					disabled={false}
				/>
			</div>
		</div>
	);
};
