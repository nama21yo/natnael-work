<script lang="ts">
	import { base } from "$app/paths";
	import Icon from "@iconify/svelte";
	import { fly } from "svelte/transition";
	import AnimatedPortrait from "$lib/components/AnimatedPortrait.svelte";
	import bellImage from "$lib/assets/images/bell-4101461_1920.jpg";
	import { profile } from "$lib/data/portfolio";
</script>

<section class="relative isolate overflow-hidden px-5 py-20 lg:px-8 lg:py-28">
	<div class="absolute inset-0 -z-10">
		<img src={bellImage} alt="" class="hero-bell-bg" aria-hidden="true" />
		<div
			class="absolute top-20 left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full border border-cyan/20 bg-[radial-gradient(circle,rgba(34,211,238,0.18),transparent_62%)]"
		></div>
		<div class="sketch-orbit absolute top-24 left-1/2 h-[30rem] w-[30rem] -translate-x-1/2"></div>
		<div class="paint-blob absolute right-12 bottom-16 h-48 w-48"></div>
	</div>

	<div class="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
		<div class="space-y-7" in:fly={{ y: 18, duration: 550, delay: 180 }}>
			<div class="space-y-4">
				<h1 class="font-display text-6xl leading-[0.9] font-black tracking-tight md:text-8xl">
					backend AI engineer.
				</h1>
				<p class="max-w-2xl text-xl leading-9 text-muted-foreground">{profile.summary}</p>
			</div>

			<div class="flex flex-wrap gap-3">
				<a href={`${base}/projects`} class="primary-cta transition-transform hover:scale-105">
					View Work
					<Icon icon="iconoir:arrow-right" width="18" />
				</a>
				<a href={`${base}/blog`} class="secondary-cta transition-transform hover:scale-105 hover:bg-foreground hover:text-background">
					Read Notes
					<Icon icon="iconoir:book-stack" width="18" />
				</a>
			</div>
		</div>

		<div class="relative min-h-[32rem]">
			<AnimatedPortrait />
		</div>
	</div>
</section>
