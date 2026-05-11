<script lang="ts">
	import BlogWorkspace from "$lib/components/BlogWorkspace.svelte";
	import type { PageData } from "./$types";

	let { data }: { data: PageData } = $props();
</script>

<section class="mx-auto max-w-7xl px-5 py-10 lg:px-8 lg:py-16">
	<BlogWorkspace activeNote={data.note} />
</section>
