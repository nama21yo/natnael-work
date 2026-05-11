<script lang="ts">
	import BlogWorkspace from "$lib/components/BlogWorkspace.svelte";
	import { blogNotes } from "$lib/data/portfolio";
</script>

<section class="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
	<div class="max-w-3xl">
		<p class="section-kicker">Blogs</p>
		<h1 class="font-display text-5xl leading-tight font-black tracking-tight md:text-7xl">
			Obsidian-style technical notes.
		</h1>
		<p class="mt-6 text-xl leading-9 text-muted-foreground">
			Concise blogs with [[wikilinks]], backlinks, and a mind map. Current focus: Kademlia.
		</p>
	</div>
</section>

<section class="mx-auto max-w-7xl px-5 pb-20 lg:px-8">
	<BlogWorkspace activeNote={blogNotes[0]} />
</section>
