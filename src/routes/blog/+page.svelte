<script lang="ts">
	import { base } from "$app/paths";
	import Icon from "@iconify/svelte";
	import ScrollReveal from "$lib/components/ScrollReveal.svelte";
	import { blogNotes } from "$lib/data/portfolio";

	const gsocNotes = blogNotes.filter((n) => n.category === "gsoc-2026");
	const otherNotes = blogNotes.filter((n) => n.category !== "gsoc-2026");
</script>

<section class="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
	<ScrollReveal direction="down">
		<div class="max-w-3xl">
			<p class="section-kicker">Technical Writing</p>
			<h1
				class="font-display text-5xl leading-tight font-black tracking-tight transition-colors duration-500 hover:text-amber md:text-7xl"
			>
				Notes & Research
			</h1>
			<p class="mt-6 text-xl leading-9 text-muted-foreground">
				Technical deep dives, research notes, and GSoC weekly progress reports.
			</p>
		</div>
	</ScrollReveal>
</section>

<section class="mx-auto max-w-7xl px-5 pb-20 lg:px-8">
	<ScrollReveal delay={100} direction="up">
		<div class="mb-8 rounded-[2rem] border border-cyan/20 bg-cyan-subtle p-6">
			<div class="flex items-center justify-between">
				<div class="flex items-center gap-4">
					<div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan/20">
						<Icon icon="iconoir:git-branch" class="text-cyan" width="24" />
					</div>
					<div>
						<p class="text-sm font-black tracking-[0.2em] text-cyan uppercase">GSoC 2026</p>
						<h3 class="mt-1 text-lg font-black">Amharic DBpedia Ontology Mapping</h3>
					</div>
				</div>
				<a
					href={`${base}/blog/gsoc/2026`}
					class="flex items-center gap-2 rounded-full bg-cyan px-4 py-2 text-sm font-black text-background transition hover:scale-105"
				>
					View All
					<Icon icon="iconoir:arrow-right" width="16" />
				</a>
			</div>
			<div class="mt-5 flex flex-wrap gap-2">
				{#each gsocNotes as note (note.id)}
					<span class="rounded-full bg-background px-3 py-1 text-xs font-bold text-muted-foreground">
						{note.title}
					</span>
				{/each}
			</div>
		</div>
	</ScrollReveal>

	<div class="mt-4 space-y-4">
		{#each otherNotes as note, i (note.id)}
			<ScrollReveal delay={(i + 1) * 100} direction="up">
				<a
					href={`${base}/blog/${note.id}`}
					class="group flex items-center justify-between rounded-[2rem] border border-foreground/10 bg-background/75 p-6 transition hover:-translate-x-2 hover:border-cyan/30 hover:shadow-xl"
				>
					<div class="flex items-center gap-4">
						<div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted">
							<Icon icon="iconoir:book-bookmark" class="text-muted-foreground" width="22" />
						</div>
						<div>
							<p class="section-kicker">{note.category}</p>
							<h3 class="mt-1 text-lg font-black group-hover:text-cyan">{note.title}</h3>
							<p class="mt-1 text-sm leading-6 text-muted-foreground">{note.excerpt}</p>
						</div>
					</div>
					<Icon
						icon="iconoir:arrow-right"
						class="shrink-0 text-muted-foreground transition group-hover:text-cyan"
						width="22"
					/>
				</a>
			</ScrollReveal>
		{/each}
	</div>
</section>
