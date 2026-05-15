<script lang="ts">
	import { base } from "$app/paths";
	import Icon from "@iconify/svelte";
	import Hero from "$lib/components/Hero.svelte";
	import WorkShowcase from "$lib/components/WorkShowcase.svelte";
	import ZettelLink from "$lib/components/ZettelLink.svelte";
	import ScrollReveal from "$lib/components/ScrollReveal.svelte";
	import { allProjects, blogNotes, profile } from "$lib/data/portfolio";

	const portalNotes = blogNotes;
</script>

<Hero />

<section class="mx-auto max-w-7xl px-5 py-16 lg:px-8">
	<ScrollReveal direction="up">
		<div class="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
			<div>
				<p class="section-kicker">Project portals</p>
				<h2 class="section-title">Choose a technical path.</h2>
				<p class="mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">
					Projects are separated into ML, distributed systems/blockchain, computer vision, and system
					design.
				</p>
			</div>
			<a
				href={`${base}/projects`}
				class="secondary-cta transition-all hover:scale-105 hover:bg-foreground hover:text-background"
			>
				All projects
				<Icon icon="iconoir:arrow-right" width="18" />
			</a>
		</div>
	</ScrollReveal>

	<ScrollReveal delay={200} direction="up">
		<WorkShowcase projects={allProjects.slice(0, 5)} compact />
	</ScrollReveal>
</section>

<section class="mx-auto max-w-7xl px-5 py-16 lg:px-8">
	<div class="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
		<ScrollReveal direction="right">
			<p class="section-kicker">Blogs</p>
			<h2 class="section-title">Read my technical notes.</h2>
			<p class="mt-5 text-lg leading-8 text-muted-foreground">
				Technical deep dives, research notes, and architectural breakdowns.
			</p>
		</ScrollReveal>

		<div class="grid gap-4">
			{#each portalNotes as note, index (note.id)}
				<ScrollReveal delay={index * 100} direction="left">
					<div class="transition-transform hover:-translate-x-2">
						<ZettelLink
							href={`${base}/blog/${note.id}`}
							title={note.title}
							reason={note.excerpt}
							tags={note.tags}
						/>
					</div>
				</ScrollReveal>
			{/each}
		</div>
	</div>
</section>

<section class="mx-auto max-w-7xl px-5 py-16 lg:px-8">
	<ScrollReveal delay={100} direction="up">
		<div
			class="group relative grid gap-8 overflow-hidden rounded-[2rem] border border-foreground/10 bg-foreground p-8 text-background md:p-10 lg:grid-cols-[1fr_auto]"
		>
			<div
				class="absolute inset-0 bg-gradient-to-br from-cyan/20 to-violet/20 opacity-0 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-100"
			></div>
			<div class="relative z-10">
				<p class="text-sm font-black tracking-[0.22em] text-background/55 uppercase">Contact</p>
				<h2 class="mt-3 font-display text-4xl font-black">
					Need backend, AI, or DevOps execution?
				</h2>
				<p class="mt-4 max-w-2xl text-background/68">{profile.summary}</p>
			</div>
			<div class="relative z-10 flex flex-wrap items-center gap-3 lg:justify-end">
				<a
					href={`mailto:${profile.email}`}
					class="rounded-full bg-background px-5 py-3 text-sm font-black text-foreground transition-transform hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
				>
					Email Natnael
				</a>
				<a
					href={`${base}/about`}
					class="rounded-full border border-background/20 px-5 py-3 text-sm font-black text-background transition-colors hover:border-background/40 hover:bg-background/10"
				>
					About / Resume
				</a>
			</div>
		</div>
	</ScrollReveal>
</section>