import type { HandleClientError } from "@sveltejs/kit";

export const handleError: HandleClientError = async ({ message }) => {
	const errorId = crypto.randomUUID();

	if (message.includes("Failed to fetch dynamically imported module")) {
		window.location.reload();
	}

	return {
		message,
		errorId
	};
};
