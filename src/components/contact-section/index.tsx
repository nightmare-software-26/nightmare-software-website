import BorderGlow from "../../react-bits/border-glow";
import GridDistortion from "../../react-bits/grid-distortion";

export const ContactSection = () => 	{
	return (
		<div
			className="d-flex justify-content-center align-items-center"
			style={{ height: "100vh", width: "100vw" }}
		>
			<GridDistortion
				imageSrc="https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=3432&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
				grid={10}
				mouse={0.1}
				strength={0.15}
				relaxation={0.9}
				className="custom-class"
			/>
			<div className="position-absolute" style={{ zIndex: 1 }}>
				<BorderGlow
					edgeSensitivity={30}
					glowColor="40 80 80"
					backgroundColor="#060010"
					borderRadius={28}
					glowRadius={40}
					glowIntensity={1}
					coneSpread={35}
					animated={false}
					colors={["#c084fc", "#f472b6", "#38bdf8"]}
				>
					<div className="p-5 d-flex justify-content-center align-items-center flex-column">
						<h2 className="lh-base text-center">Offload your IT woes</h2>
						<a
							href="mailto:hello@nightmare.software"
							className="pt-3 lh-base text-center"
						>
							hello@nightmare.software
						</a>
					</div>
				</BorderGlow>
			</div>
		</div>
	);
}
