import { error } from "@sveltejs/kit";
import { blogNotes } from "$lib/data/portfolio";

export function entries() {
	return blogNotes.map((note) => ({ slug: note.id }));
}

export function load({ params }) {
	const note = blogNotes.find((item) => item.id === params.slug);

	if (!note) error(404, { message: "Note not found", errorId: "note-not-found" });

	return { note };
}
