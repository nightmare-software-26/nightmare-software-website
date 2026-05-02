import BorderGlow from "../../react-bits/border-glow";
import LetterGlitch from "../../react-bits/code-glitch";
import TextType from "../../react-bits/text-type";

export const HelpWithSection = () => {
	return (
		<div
			className="d-flex justify-content-center align-items-center"
			style={{ height: "100vh", width: "100vw" }}
		>
			<LetterGlitch
				glitchSpeed={300}
				centerVignette={false}
				outerVignette={true}
				smooth={true}
			/>
			<div className="position-absolute w-50 fs-1">
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
					<div className="py-2 px-4 text-center">
						<p className="m-0">Need help with...</p>
						<TextType
							text={[
								"custom software?",
								"IT consulting?",
								"business networks?",
								"IT management?",
								"cybersecurity?",
								"cloud solutions?",
								"data backup?",
								"hardware procurement?",
								"network monitoring?",
								"IT audits and assessments?",
								"software updates and patching?",
								"technology integration?",
								"IT asset management?",
								"technology lifecycle management?",
								"IT risk management?",
							]}
							typingSpeed={75}
							pauseDuration={1500}
							showCursor
							cursorCharacter="_"
							deletingSpeed={50}
							cursorBlinkDuration={0.5}
						/>
					</div>
				</BorderGlow>
			</div>
		</div>
	);
};
