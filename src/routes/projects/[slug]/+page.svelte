<script lang="ts">
	import { base } from "$app/paths";
	import Icon from "@iconify/svelte";
	import ZettelLink from "$lib/components/ZettelLink.svelte";
	import type { PageData } from "./$types";

	let { data }: { data: PageData } = $props();

	const project = $derived(data.project);
	const title = $derived(project.title);
	const summary = $derived(project.description);
	const stack = $derived(project.stack);
	const externalLinks = $derived(project.links);
	const impact = $derived(project.impact);
</script>

<section class="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
	<a href={`${base}/projects`} class="secondary-cta mb-8">
		<Icon icon="iconoir:arrow-left" width="16" />
		Projects
	</a>

	<div class="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
		<div>
			<p class="section-kicker">{project.category}</p>
			<h1 class="mt-4 font-display text-6xl leading-none font-black tracking-tight md:text-8xl">
				{title}
			</h1>
			<p class="mt-6 max-w-3xl text-xl leading-9 text-muted-foreground">{summary}</p>

			<div class="mt-8 flex flex-wrap gap-3">
				{#each externalLinks as link (link.href)}
					<a href={link.href} target="_blank" rel="noreferrer" class="primary-cta">
						{link.label}
						<Icon icon="iconoir:arrow-up-right" width="18" />
					</a>
				{/each}
			</div>
		</div>

		<aside class="obsidian-panel">
			<p class="blog-label">Stack</p>
			<div class="mt-4 flex flex-wrap gap-2">
				{#each stack as item (item)}
					<span class="rounded-full bg-muted px-3 py-1 text-sm font-bold">{item}</span>
				{/each}
			</div>

			<p class="blog-label mt-8">Tags</p>
			<div class="mt-4 flex flex-wrap gap-2">
				{#each project.tags as tag (tag)}
					<span class="rounded-full bg-cyan-subtle px-3 py-1 text-sm font-bold text-cyan"
						>#{tag}</span
					>
				{/each}
			</div>
		</aside>
	</div>
</section>

<section class="mx-auto max-w-7xl px-5 py-14 lg:px-8">
	<div class="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
		<div>
			<p class="section-kicker">Case-study sketch</p>
			<h2 class="section-title">What this page is proving.</h2>
			<p class="mt-5 text-lg leading-8 text-muted-foreground">
				Each project has its own route, concise impact notes, and links back to related blogs.
			</p>
		</div>

		<div class="space-y-4">
			{#each impact as item (item)}
				<div class="rounded-[1.5rem] border border-foreground/10 bg-background/75 p-5">
					<div class="flex gap-3 text-sm leading-7 text-muted-foreground">
						<Icon icon="iconoir:check-circle" class="mt-1 shrink-0 text-emerald" width="18" />
						<span>{item}</span>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<section class="mx-auto max-w-7xl px-5 py-14 lg:px-8">
	<div class="mb-8">
		<p class="section-kicker">Connected notes</p>
		<h2 class="section-title">Related blogs.</h2>
	</div>

	<div class="grid gap-4 md:grid-cols-2">
		{#each data.notes as note (note.id)}
			<ZettelLink
				href={`${base}/blog/${note.id}`}
				title={note.title}
				reason={note.excerpt}
				tags={note.tags}
				variant="backlink"
			/>
		{/each}
	</div>
</section>
