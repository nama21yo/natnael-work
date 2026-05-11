<script lang="ts">
	import { base } from "$app/paths";
	import Icon from "@iconify/svelte";
	import SketchHero from "$lib/components/SketchHero.svelte";
	import WorkShowcase from "$lib/components/WorkShowcase.svelte";
	import ZettelLink from "$lib/components/ZettelLink.svelte";
	import { allProjects, blogNotes, profile } from "$lib/data/portfolio";

	const portalNotes = blogNotes;

	const proof = [
		{ value: "3.93", label: "AAU software engineering GPA" },
		{ value: "800+", label: "Algorithm problems solved" },
		{ value: "34s", label: "Optimized MeTTa-Moses runtime from 2 minutes" },
		{ value: "500+", label: "Students reached as an instructor" }
	];
</script>

<SketchHero />

<section class="mx-auto max-w-7xl px-5 py-14 lg:px-8">
	<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
		{#each proof as item (item.label)}
			<div class="rounded-[1.6rem] border border-foreground/10 bg-background/75 p-5">
				<p class="font-display text-5xl font-black">{item.value}</p>
				<p class="mt-2 text-sm leading-6 text-muted-foreground">{item.label}</p>
			</div>
		{/each}
	</div>
</section>

<section class="mx-auto max-w-7xl px-5 py-16 lg:px-8">
	<div class="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
		<div>
			<p class="section-kicker">Project portals</p>
			<h2 class="section-title">Choose a technical path.</h2>
			<p class="mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">
				Projects are separated into ML, distributed systems/blockchain, computer vision, and system
				design.
			</p>
		</div>
		<a href={`${base}/projects`} class="secondary-cta">
			All projects
			<Icon icon="iconoir:arrow-right" width="18" />
		</a>
	</div>

	<WorkShowcase projects={allProjects.slice(0, 5)} compact />
</section>

<section class="mx-auto max-w-7xl px-5 py-16 lg:px-8">
	<div class="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
		<div>
			<p class="section-kicker">Blogs</p>
			<h2 class="section-title">Open the Kademlia note.</h2>
			<p class="mt-5 text-lg leading-8 text-muted-foreground">
				Obsidian-like markdown, [[wikilinks]], backlinks, and a mind map for distributed systems
				thinking.
			</p>
		</div>

		<div class="grid gap-4">
			{#each portalNotes as note (note.id)}
				<ZettelLink
					href={`${base}/blog/${note.id}`}
					title={note.title}
					reason={note.excerpt}
					tags={note.tags}
				/>
			{/each}
		</div>
	</div>
</section>

<section class="mx-auto max-w-7xl px-5 py-16 lg:px-8">
	<div
		class="grid gap-8 rounded-[2rem] border border-foreground/10 bg-foreground p-8 text-background md:p-10 lg:grid-cols-[1fr_auto]"
	>
		<div>
			<p class="text-sm font-black tracking-[0.22em] text-background/55 uppercase">Contact</p>
			<h2 class="mt-3 font-display text-4xl font-black">Need backend, AI, or DevOps execution?</h2>
			<p class="mt-4 max-w-2xl text-background/68">{profile.summary}</p>
		</div>
		<div class="flex flex-wrap items-center gap-3 lg:justify-end">
			<a
				href={`mailto:${profile.email}`}
				class="rounded-full bg-background px-5 py-3 text-sm font-black text-foreground"
			>
				Email Natnael
			</a>
			<a
				href={`${base}/about`}
				class="rounded-full border border-background/20 px-5 py-3 text-sm font-black text-background"
			>
				About / Resume
			</a>
		</div>
	</div>
</section>
