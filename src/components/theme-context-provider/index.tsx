/**
 * @author Michael Gamlem III
 * @copyright This file is subject to the terms and conditions defined in file 'LICENSE', which is part of the source code for this project.
 * @format
 */

import type React from "react";
import { createContext, useEffect, useLayoutEffect, useState } from "react";

import { Theme } from "../../enums/theme";
// import { AppSettingsContext } from "../app-settings-provider";

export type ThemeContext = {
	currentTheme: Theme;
	updateTheme: (theme: Theme) => void;
};

export const ThemeContext = createContext<ThemeContext>({
	currentTheme: Theme.Light,
	/* eslint-disable @typescript-eslint/no-empty-function */
	/* eslint-disable no-empty-function */
	// skipqc: JS-0321
	updateTheme: () => {},
	/* eslint-enable no-empty-function */
	/* eslint-enable @typescript-eslint/no-empty-function */
});

export interface IThemeContextProviderProps {
	children: React.ReactNode;
}

export const ThemeContextProvider = ({
	children,
}: IThemeContextProviderProps) => {
	const [currentTheme, setCurrentTheme] = useState<Theme>(() =>
		window.matchMedia("(prefers-color-scheme: dark)").matches
			? Theme.Dark
			: Theme.Light,
	);

	const updateTheme = (theme: Theme): void => {
		switch (theme) {
			case Theme.Light:
				setCurrentTheme(Theme.Light);
				break;
			case Theme.Dark:
				setCurrentTheme(Theme.Dark);
				break;
			case Theme.Auto:
			default:
				setCurrentTheme(Theme.Dark);
				break;
		}

		// if (useCookies) setCookie(cookieName, theme.toString(), false);
	};

	useEffect(() => {
		window
			.matchMedia("(prefers-color-scheme: dark)")
			.addEventListener("change", (event) => {
				event.matches
					? setCurrentTheme(Theme.Dark)
					: setCurrentTheme(Theme.Light);
			});
	}, []);

	useLayoutEffect(() => {
		const elements: HTMLCollectionOf<HTMLElement> =
			document.getElementsByTagName("html");

		if (elements.length === 0) return;

		if (currentTheme === Theme.Light)
			elements[0]?.setAttribute("data-bs-theme", "");
		else if (currentTheme === Theme.Dark) {
			console.log("Setting data-bs-theme to dark");
			elements[0]?.setAttribute("data-bs-theme", "dark");
		}
	}, [currentTheme]);

	return (
		<ThemeContext.Provider
			value={{
				currentTheme,
				updateTheme,
			}}
		>
			{children}
		</ThemeContext.Provider>
	);
};
