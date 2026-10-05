/**
 * This component is taken and modified from code provided by React Bits, a collection of reusable React components.
 * Learn more at: https://www.reactbits.dev/
 */

import { useCallback, useEffect, useRef } from "react";

const LetterGlitch = ({
	glitchColors = ["#2b4539", "#61dca3", "#61b3dc"],
	glitchSpeed = 50,
	centerVignette = false,
	outerVignette = true,
	smooth = true,
	characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$&*()-_+=/[]{};:<>.,0123456789~?®©¢≤≥∑∞%¶Ω",
}: {
	glitchColors?: string[];
	glitchSpeed: number;
	centerVignette?: boolean;
	outerVignette?: boolean;
	smooth: boolean;
	characters?: string;
}) => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const animationRef = useRef<number | null>(null);
	const letters = useRef<
		{
			char: string;
			color: string;
			targetColor: string;
			colorProgress: number;
		}[]
	>([]);
	const grid = useRef({ columns: 0, rows: 0 });
	const context = useRef<CanvasRenderingContext2D | null>(null);
	const lastGlitchTime = useRef(Date.now());

	const lettersAndSymbols = Array.from(characters);

	const fontSize = 16;
	const charWidth = 10;
	const charHeight = 20;

	const getRandomChar = useCallback(() => {
		return lettersAndSymbols[
			Math.floor(Math.random() * lettersAndSymbols.length)
		];
	}, [lettersAndSymbols]);

	const getRandomCharExcluding = useCallback(
		(excludedChars: string[]) => {
			const availableChars = lettersAndSymbols.filter(
				(char) => !excludedChars.includes(char),
			);
			if (availableChars.length === 0) {
				// Fallback if all characters are excluded
				return lettersAndSymbols[
					Math.floor(Math.random() * lettersAndSymbols.length)
				];
			}
			return availableChars[Math.floor(Math.random() * availableChars.length)];
		},
		[lettersAndSymbols],
	);

	const getAdjacentChars = useCallback((index: number) => {
		const { columns, rows } = grid.current;
		const row = Math.floor(index / columns);
		const col = index % columns;
		const adjacentChars: string[] = [];

		// North
		if (row > 0) {
			const northIndex = (row - 1) * columns + col;
			if (letters.current[northIndex]) {
				adjacentChars.push(letters.current[northIndex].char);
			}
		}

		// South
		if (row < rows - 1) {
			const southIndex = (row + 1) * columns + col;
			if (letters.current[southIndex]) {
				adjacentChars.push(letters.current[southIndex].char);
			}
		}

		// East
		if (col < columns - 1) {
			const eastIndex = row * columns + (col + 1);
			if (letters.current[eastIndex]) {
				adjacentChars.push(letters.current[eastIndex].char);
			}
		}

		// West
		if (col > 0) {
			const westIndex = row * columns + (col - 1);
			if (letters.current[westIndex]) {
				adjacentChars.push(letters.current[westIndex].char);
			}
		}

		return adjacentChars;
	}, []);

	const getRandomColor = useCallback(() => {
		return glitchColors[Math.floor(Math.random() * glitchColors.length)];
	}, [glitchColors]);

	const hexToRgb = useCallback((hex: string) => {
		const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
		hex = hex.replace(shorthandRegex, (_m, r, g, b) => {
			return r + r + g + g + b + b;
		});

		const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return result
			? {
					r: parseInt(result[1], 16),
					g: parseInt(result[2], 16),
					b: parseInt(result[3], 16),
				}
			: null;
	}, []);

	const interpolateColor = useCallback(
		(
			start: { r: number; g: number; b: number },
			end: { r: number; g: number; b: number },
			factor: number,
		) => {
			const result = {
				r: Math.round(start.r + (end.r - start.r) * factor),
				g: Math.round(start.g + (end.g - start.g) * factor),
				b: Math.round(start.b + (end.b - start.b) * factor),
			};
			return `rgb(${result.r}, ${result.g}, ${result.b})`;
		},
		[],
	);

	const calculateGrid = useCallback((width: number, height: number) => {
		const columns = Math.ceil(width / charWidth);
		const rows = Math.ceil(height / charHeight);
		return { columns, rows };
	}, []);

	const initializeLetters = useCallback(
		(columns: number, rows: number) => {
			grid.current = { columns, rows };
			const totalLetters = columns * rows;
			letters.current = Array.from({ length: totalLetters }, () => ({
				char: getRandomChar(),
				color: getRandomColor(),
				targetColor: getRandomColor(),
				colorProgress: 1,
			}));
		},
		[getRandomChar, getRandomColor],
	);

	const drawLetters = useCallback(() => {
		if (!context.current || letters.current.length === 0) return;
		const ctx = context.current;
		// biome-ignore lint/style/noNonNullAssertion: from example code
		const { width, height } = canvasRef.current!.getBoundingClientRect();
		ctx.clearRect(0, 0, width, height);
		ctx.font = `${fontSize}px monospace`;
		ctx.textBaseline = "top";

		letters.current.forEach((letter, index) => {
			const x = (index % grid.current.columns) * charWidth;
			const y = Math.floor(index / grid.current.columns) * charHeight;
			ctx.fillStyle = letter.color;
			ctx.fillText(letter.char, x, y);
		});
	}, []);

	const resizeCanvas = useCallback(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const parent = canvas.parentElement;
		if (!parent) return;

		const dpr = window.devicePixelRatio || 1;
		const rect = parent.getBoundingClientRect();

		canvas.width = rect.width * dpr;
		canvas.height = rect.height * dpr;

		canvas.style.width = `${rect.width}px`;
		canvas.style.height = `${rect.height}px`;

		if (context.current) {
			context.current.setTransform(dpr, 0, 0, dpr, 0, 0);
		}

		const { columns, rows } = calculateGrid(rect.width, rect.height);
		initializeLetters(columns, rows);
		drawLetters();
	}, [calculateGrid, drawLetters, initializeLetters]);

	const updateLetters = useCallback(() => {
		if (!letters.current || letters.current.length === 0) return;

		const updateCount = Math.max(1, Math.floor(letters.current.length * 0.05));

		for (let i = 0; i < updateCount; i++) {
			const index = Math.floor(Math.random() * letters.current.length);
			if (!letters.current[index]) continue;

			const adjacentChars = getAdjacentChars(index);
			letters.current[index].char = getRandomCharExcluding(adjacentChars);
			letters.current[index].targetColor = getRandomColor();

			if (!smooth) {
				letters.current[index].color = letters.current[index].targetColor;
				letters.current[index].colorProgress = 1;
			} else {
				letters.current[index].colorProgress = 0;
			}
		}
	}, [getRandomCharExcluding, getRandomColor, getAdjacentChars, smooth]);

	const handleSmoothTransitions = useCallback(() => {
		let needsRedraw = false;
		letters.current.forEach((letter) => {
			if (letter.colorProgress < 1) {
				letter.colorProgress += 0.05;
				if (letter.colorProgress > 1) letter.colorProgress = 1;

				const startRgb = hexToRgb(letter.color);
				const endRgb = hexToRgb(letter.targetColor);
				if (startRgb && endRgb) {
					letter.color = interpolateColor(
						startRgb,
						endRgb,
						letter.colorProgress,
					);
					needsRedraw = true;
				}
			}
		});

		if (needsRedraw) {
			drawLetters();
		}
	}, [drawLetters, hexToRgb, interpolateColor]);

	const animate = useCallback(() => {
		const now = Date.now();
		if (now - lastGlitchTime.current >= glitchSpeed) {
			updateLetters();
			drawLetters();
			lastGlitchTime.current = now;
		}

		if (smooth) {
			handleSmoothTransitions();
		}

		animationRef.current = requestAnimationFrame(animate);
	}, [
		drawLetters,
		glitchSpeed,
		handleSmoothTransitions,
		smooth,
		updateLetters,
	]);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		context.current = canvas.getContext("2d");
		resizeCanvas();
		animate();

		let resizeTimeout: ReturnType<typeof setTimeout>;

		const handleResize = () => {
			clearTimeout(resizeTimeout);
			resizeTimeout = setTimeout(() => {
				cancelAnimationFrame(animationRef.current as number);
				resizeCanvas();
				animate();
			}, 100);
		};

		window.addEventListener("resize", handleResize);

		return () => {
			// biome-ignore lint/style/noNonNullAssertion: from example code
			cancelAnimationFrame(animationRef.current!);
			window.removeEventListener("resize", handleResize);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [animate, resizeCanvas]);

	useEffect(() => {
		const prefersReducedMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;

		if (prefersReducedMotion) {
			glitchSpeed = 0;
		}
	});

	const containerStyle = {
		position: "relative",
		width: "100%",
		height: "100%",
		backgroundColor: "#000000",
		overflow: "hidden",
	};

	const canvasStyle = {
		display: "block",
		width: "100%",
		height: "100%",
	};

	const backgroundVignetteStyle = {
		position: "absolute",
		top: 0,
		left: 0,
		width: "100%",
		height: "100%",
		pointerEvents: "none",
		background: "rgba(0, 0, 0, 0.45)",
	};

	const outerVignetteStyle = {
		position: "absolute",
		top: 0,
		left: 0,
		width: "100%",
		height: "100%",
		pointerEvents: "none",
		background:
			"radial-gradient(circle, rgba(0,0,0,0) 60%, rgba(0,0,0,1) 100%)",
	};

	const centerVignetteStyle = {
		position: "absolute",
		top: 0,
		left: 0,
		width: "100%",
		height: "100%",
		pointerEvents: "none",
		background:
			"radial-gradient(circle, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 60%)",
	};

	return (
		<div style={containerStyle as React.CSSProperties}>
			<canvas ref={canvasRef} style={canvasStyle} />
			{outerVignette && (
				<div style={outerVignetteStyle as React.CSSProperties}></div>
			)}
			{centerVignette && (
				<div style={centerVignetteStyle as React.CSSProperties}></div>
			)}
			<div style={backgroundVignetteStyle as React.CSSProperties}></div>
		</div>
	);
};

export default LetterGlitch;
