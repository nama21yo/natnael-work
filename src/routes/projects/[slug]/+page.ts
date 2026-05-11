import { error } from "@sveltejs/kit";
import { allProjects, getBlogsForProject } from "$lib/data/portfolio";

export function entries() {
	return allProjects.map((project) => ({ slug: project.id }));
}

export function load({ params }) {
	const project = allProjects.find((item) => item.id === params.slug);

	if (!project) error(404, { message: "Project not found", errorId: "project-not-found" });

	return {
		project,
		notes: getBlogsForProject(project.id)
	};
}
