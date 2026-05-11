<script lang="ts">
	import { base } from "$app/paths";
	import Icon from "@iconify/svelte";
	import type { PortfolioProject } from "$lib/data/portfolio";

	type Props = {
		projects: PortfolioProject[];
	};

	let { projects }: Props = $props();
</script>

<div class="columns-1 gap-5 md:columns-2 xl:columns-3">
	{#each projects as project, index (project.id)}
		<a
			href={`${base}/projects/${project.id}`}
			class={`group mb-5 block break-inside-avoid overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950 text-white shadow-[0_24px_80px_rgba(15,23,42,0.2)] transition duration-300 hover:-translate-y-1 hover:border-cyan/50 ${
				index % 3 === 0 ? "min-h-96" : index % 3 === 1 ? "min-h-72" : "min-h-80"
			}`}
		>
			<div class="relative flex min-h-[inherit] flex-col justify-between p-6">
				<div
					class="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.25),transparent_36%),radial-gradient(circle_at_80%_10%,rgba(251,191,36,0.2),transparent_32%)] opacity-75 transition group-hover:opacity-100"
				></div>
				<div class="relative">
					<div class="flex items-center justify-between gap-4">
						<span class="text-xs font-black tracking-[0.22em] text-cyan-200 uppercase">
							{project.category}
						</span>
						<Icon
							icon="iconoir:arrow-up-right"
							class="transition group-hover:translate-x-1 group-hover:-translate-y-1"
						/>
					</div>
					<h3 class="mt-8 font-display text-4xl leading-none font-black">{project.title}</h3>
					<p class="mt-5 line-clamp-4 text-sm leading-7 text-white/64">{project.description}</p>
				</div>
				<div class="relative mt-8 flex flex-wrap gap-2">
					{#each project.stack.slice(0, 4) as tag (tag)}
						<span
							class="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-bold text-white/75"
						>
							{tag}
						</span>
					{/each}
				</div>
			</div>
		</a>
	{/each}
</div>
