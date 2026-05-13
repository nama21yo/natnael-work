<script lang="ts">
	import BlogWorkspace from "$lib/components/BlogWorkspace.svelte";
	import ScrollReveal from "$lib/components/ScrollReveal.svelte";
	import { blogNotes } from "$lib/data/portfolio";
</script>

<section class="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
	<ScrollReveal direction="down">
		<div class="max-w-3xl">
			<p class="section-kicker">Blogs</p>
			<h1
				class="font-display text-5xl leading-tight font-black tracking-tight transition-colors duration-500 hover:text-amber md:text-7xl"
			>
				Technical notes and research.
			</h1>
			<p class="mt-6 text-xl leading-9 text-muted-foreground">
				Deep dives into system design, machine learning, and software architecture.
			</p>
		</div>
	</ScrollReveal>
</section>

<section class="mx-auto max-w-7xl px-5 pb-20 lg:px-8">
	<ScrollReveal delay={200} direction="up">
		<BlogWorkspace activeNote={blogNotes[0]} />
	</ScrollReveal>
</section>
