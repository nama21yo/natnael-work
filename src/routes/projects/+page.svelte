<script lang="ts">
	import WorkShowcase from "$lib/components/WorkShowcase.svelte";
	import { allProjects } from "$lib/data/portfolio";
</script>

<section class="mx-auto max-w-7xl px-5 pt-14 pb-10 lg:px-8 lg:pt-24">
	<div class="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
		<div>
			<p class="section-kicker">Work</p>
			<h1 class="font-display text-5xl leading-none font-black tracking-tight md:text-7xl lg:text-8xl">
				Creating reliable AI and backend systems.
			</h1>
		</div>
		<p class="max-w-2xl text-lg leading-8 text-muted-foreground lg:justify-self-end">
			A selected project index across ML systems, distributed infrastructure, computer vision, and
			product-grade backend design. Hover or focus each row to inspect the work before opening the
			case-study page.
		</p>
	</div>
</section>

<div class="mx-auto max-w-7xl px-5 pb-20 lg:px-8">
	<WorkShowcase projects={allProjects} />
</div>
