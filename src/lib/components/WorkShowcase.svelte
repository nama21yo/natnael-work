<script lang="ts">
	import { base } from "$app/paths";
	import Icon from "@iconify/svelte";
	import type { PortfolioProject, ProjectCategory } from "$lib/data/portfolio";

	type Props = {
		projects: PortfolioProject[];
		compact?: boolean;
	};

	let { projects, compact = false }: Props = $props();

	const categories: ProjectCategory[] = [
		"ML",
		"Distributed Systems / Blockchain",
		"Computer Vision",
		"System Design"
	];

	let activeCategory = $state<ProjectCategory | "All">("All");
	let activeProjectId = $state("");
	let activeProjectIndex = $state(0);
	let isInteracting = $state(false);
	let showcaseEl: HTMLElement;

	const filteredProjects = $derived(
		activeCategory === "All"
			? projects
			: projects.filter((project) => project.category === activeCategory)
	);

	const activeProject = $derived(
		filteredProjects.find((project) => project.id === activeProjectId) ?? filteredProjects[0]
	);

	const filters = $derived(["All", ...categories] as const);

	function projectYear(period: string) {
		return period.match(/\d{4}(?!.*\d{4})/)?.[0] ?? period;
	}

	function filterCount(filter: ProjectCategory | "All") {
		return filter === "All"
			? projects.length
			: projects.filter((project) => project.category === filter).length;
	}

	function setFilter(filter: ProjectCategory | "All") {
		activeCategory = filter;
		const nextProject =
			filter === "All" ? projects[0] : projects.find((project) => project.category === filter);
		activeProjectId = nextProject?.id ?? "";
		activeProjectIndex = 0;
	}

	function setActive(project: PortfolioProject, index: number) {
		activeProjectId = project.id;
		activeProjectIndex = index;
		isInteracting = true;
	}

	function handlePointerMove(event: PointerEvent) {
		if (!showcaseEl) return;

		const rect = showcaseEl.getBoundingClientRect();
		const x = event.clientX - rect.left;
		const y = event.clientY - rect.top;
		const previewX = x / rect.width - 0.5;
		const previewY = y / rect.height - 0.5;

		showcaseEl.style.setProperty("--cursor-x", `${x}px`);
		showcaseEl.style.setProperty("--cursor-y", `${y}px`);
		showcaseEl.style.setProperty("--preview-tilt-x", `${previewY * -8}deg`);
		showcaseEl.style.setProperty("--preview-tilt-y", `${previewX * 10}deg`);
		showcaseEl.style.setProperty("--preview-shift-x", `${previewX * 18}px`);
		showcaseEl.style.setProperty("--preview-shift-y", `${previewY * 18}px`);
	}

	function visualClass(category: ProjectCategory) {
		if (category === "ML") return "from-cyan/35 via-violet/20 to-amber/25";
		if (category === "Distributed Systems / Blockchain")
			return "from-emerald/35 via-cyan/20 to-foreground/10";
		if (category === "Computer Vision") return "from-brand/30 via-amber/20 to-cyan/20";
		return "from-violet/30 via-sky/20 to-amber/25";
	}
</script>

<section
	bind:this={showcaseEl}
	aria-label="Interactive work showcase"
	class={compact ? "work-showcase work-showcase-compact" : "work-showcase"}
	class:is-interacting={isInteracting}
	onpointermove={handlePointerMove}
	onpointerleave={() => (isInteracting = false)}
>
	<div class="work-toolbar">
		<div class="work-filters" aria-label="Project filters">
			{#each filters as filter (filter)}
				<button
					type="button"
					class:active={activeCategory === filter}
					onclick={() => setFilter(filter)}
				>
					<span>{filter}</span>
					<small>{filterCount(filter)}</small>
				</button>
			{/each}
		</div>

		<a href={`${base}/projects`} class="work-link" class:hidden={compact}>
			<span>Full archive</span>
			<Icon icon="iconoir:arrow-up-right" width="18" />
		</a>
	</div>

	<div class="work-layout">
		<div class="work-table">
			<div class="work-heading" aria-hidden="true">
				<span>Client / Project</span>
				<span>Focus</span>
				<span>Stack</span>
				<span>Year</span>
			</div>

			<div class="work-rows">
				{#each filteredProjects as project, index (project.id)}
					<a
						href={`${base}/projects/${project.id}`}
						class="work-row"
						class:active={isInteracting && activeProject?.id === project.id}
						onpointerenter={() => setActive(project, index)}
						onfocus={() => setActive(project, index)}
						onblur={() => (isInteracting = false)}
					>
						<span class="work-index">{String(index + 1).padStart(2, "0")}</span>
						<span class="work-title">
							<strong>{project.title}</strong>
							<small>{project.description}</small>
						</span>
						<span class="work-focus">{project.category}</span>
						<span class="work-stack">{project.stack.slice(0, 3).join(" / ")}</span>
						<span class="work-year">{projectYear(project.period)}</span>
						<span class="work-arrow">
							<Icon icon="iconoir:arrow-up-right" width="20" />
						</span>
					</a>
				{/each}
			</div>
		</div>

		{#if activeProject}
			<aside class="work-preview" aria-label="Selected project preview">
				<div class={`work-preview-card bg-gradient-to-br ${visualClass(activeProject.category)}`}>
					<div class="preview-grid"></div>
					<div class="preview-depth">
						{#key activeProject.id}
							<div class="preview-window" style={`--preview-index:${activeProjectIndex}`}>
								<div class="preview-topbar">
									<span></span>
									<span></span>
									<span></span>
								</div>
								<div class="preview-body">
									<div class="preview-stat">
										<span>{activeProject.category}</span>
										<strong>{projectYear(activeProject.period)}</strong>
									</div>
									<div class="preview-title">{activeProject.title}</div>
									<div class="preview-lines">
										{#each activeProject.stack.slice(0, 5) as item (item)}
											<span>{item}</span>
										{/each}
									</div>
								</div>
							</div>
						{/key}
					</div>
					<div class="preview-ruler" aria-hidden="true">
						{#each filteredProjects.slice(0, 6) as project, index (project.id)}
							<span class:active={index === activeProjectIndex}></span>
						{/each}
					</div>
				</div>

				<div class="work-preview-meta">
					<p>{activeProject.description}</p>
					<div>
						{#each activeProject.impact.slice(0, 2) as item (item)}
							<span>{item}</span>
						{/each}
					</div>
				</div>
			</aside>
		{/if}
	</div>

	<div class="work-cursor" aria-hidden="true">
		<span>View</span>
	</div>
</section>
