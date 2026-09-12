import { useMemo } from "react";

export const Footer = () => {
	const year = useMemo(() => new Date().getFullYear(), []);

	return (
		<footer
			className="d-flex justify-content-center py-5"
			style={{ backgroundColor: "#060010" }}
		>
			<span className="mx-2 text-center">
				Copyright © {year} Nightmare Software LLC.
				<br className="d-block d-md-none" /> All rights reserved.
			</span>
		</footer>
	);
};
