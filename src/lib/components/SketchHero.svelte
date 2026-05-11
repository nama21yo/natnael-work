<script lang="ts">
	import { base } from "$app/paths";
	import Icon from "@iconify/svelte";
	import { fade, fly } from "svelte/transition";
	import { onMount } from "svelte";
	import AnimatedPortrait from "$lib/components/AnimatedPortrait.svelte";
	import { profile } from "$lib/data/portfolio";

	let introComplete = $state(false);

	onMount(() => {
		const timeout = window.setTimeout(() => {
			introComplete = true;
		}, 1200);

		return () => window.clearTimeout(timeout);
	});
</script>

<section class="relative isolate overflow-hidden px-5 py-20 lg:px-8 lg:py-28">
	{#if !introComplete}
		<div
			class="fixed inset-0 z-[80] grid place-items-center bg-zinc-950 text-white"
			out:fade={{ duration: 450 }}
			aria-label="Opening animation"
		>
			<div class="space-y-6 text-center">
				<div class="paint-loader mx-auto h-28 w-28 rounded-full border border-cyan/30"></div>
				<div class="space-y-2">
					<p class="font-display text-5xl font-black tracking-tight text-white">natnael.dev</p>
					<p class="text-xs font-black tracking-[0.32em] text-cyan-200 uppercase">opening blogs</p>
				</div>
			</div>
		</div>
	{/if}

	<div class="absolute inset-0 -z-10">
		<div
			class="absolute top-20 left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full border border-cyan/20 bg-[radial-gradient(circle,rgba(34,211,238,0.18),transparent_62%)]"
		></div>
		<div class="sketch-orbit absolute top-24 left-1/2 h-[30rem] w-[30rem] -translate-x-1/2"></div>
		<div class="paint-blob absolute right-12 bottom-16 h-48 w-48"></div>
	</div>

	<div class="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
		<div class="space-y-7" in:fly={{ y: 18, duration: 550, delay: 180 }}>
			<div
				class="inline-flex rounded-full border border-cyan/20 bg-cyan-subtle px-4 py-2 text-sm font-black tracking-[0.2em] text-cyan uppercase"
			>
				Sketch method translated into UI
			</div>

			<div class="space-y-4">
				<h1 class="font-display text-6xl leading-[0.9] font-black tracking-tight md:text-8xl">
					backend AI engineer.
				</h1>
				<p class="max-w-2xl text-xl leading-9 text-muted-foreground">{profile.summary}</p>
			</div>

			<div class="grid gap-3 text-sm leading-6 text-foreground/72 sm:grid-cols-3">
				<div class="sketch-note rotate-[-1deg]">
					<span>01</span>
					<strong>Build</strong>
					<p>ML systems, APIs, distributed infrastructure.</p>
				</div>
				<div class="sketch-note rotate-[1deg]">
					<span>02</span>
					<strong>Explain</strong>
					<p>Blogs connect decisions with [[wikilinks]].</p>
				</div>
				<div class="sketch-note rotate-[-0.5deg]">
					<span>03</span>
					<strong>Navigate</strong>
					<p>Move by concept, project, or mind map.</p>
				</div>
			</div>

			<div class="flex flex-wrap gap-3">
				<a href={`${base}/projects`} class="primary-cta">
					Open projects
					<Icon icon="iconoir:arrow-right" width="18" />
				</a>
				<a href={`${base}/blog`} class="secondary-cta">
					Open blogs
					<Icon icon="iconoir:network" width="18" />
				</a>
			</div>
		</div>

		<div class="relative min-h-[32rem]">
			<AnimatedPortrait />
		</div>
	</div>
</section>
