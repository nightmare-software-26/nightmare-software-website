import { useMemo } from "react";

export const Footer = () => {
	const year = useMemo(() => new Date().getFullYear(), []);

	return (
		<footer
			className="d-flex justify-content-center py-5"
			style={{ backgroundColor: "#060010" }}
		>
			<span>
				Copyright © {year} Nightmare Software LLC. All rights reserved.
			</span>
		</footer>
	);
};
