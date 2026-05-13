<script lang="ts">
	import Icon from "@iconify/svelte";
	import { cn } from "$lib/utils";
	import ScrollReveal from "./ScrollReveal.svelte";

	let { resumeUrl = "", class: className = "" } = $props<{
		resumeUrl?: string;
		class?: string;
	}>();

	let isHovered = $state(false);
</script>

<ScrollReveal delay={200} class={cn("group relative mx-auto w-full max-w-4xl", className)}>
	<!-- Glow effect behind -->
	<div
		class="absolute -inset-1 rounded-[2.5rem] bg-gradient-to-r from-cyan/30 via-violet/30 to-amber/30 opacity-50 blur-2xl transition duration-1000 group-hover:opacity-100 group-hover:duration-200"
	></div>

	<!-- Mac-like Window -->
	<div
		role="region"
		aria-label="Resume Preview Container"
		class="relative flex flex-col overflow-hidden rounded-[2rem] border border-foreground/10 bg-background/90 shadow-2xl backdrop-blur-xl transition-all duration-500 ease-out hover:scale-[1.02]"
		onmouseenter={() => (isHovered = true)}
		onmouseleave={() => (isHovered = false)}
	>
		<!-- Window Header -->
		<div
			class="flex items-center justify-between border-b border-foreground/5 bg-muted/30 px-6 py-4"
		>
			<div class="flex items-center gap-2">
				<div class="h-3 w-3 rounded-full bg-destructive/70 shadow-sm"></div>
				<div class="h-3 w-3 rounded-full bg-amber/70 shadow-sm"></div>
				<div class="h-3 w-3 rounded-full bg-emerald/70 shadow-sm"></div>
			</div>

			<div class="flex items-center gap-4">
				<span class="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
					Resume Preview
				</span>

				<a
					href={resumeUrl}
					target="_blank"
					rel="noreferrer"
					class="flex items-center gap-2 rounded-full bg-foreground px-4 py-1.5 text-xs font-black text-background transition-colors hover:bg-foreground/80"
				>
					<Icon icon="iconoir:download" width="14" />
					Download PDF
				</a>
			</div>
		</div>

		<!-- PDF Container -->
		<div class="relative h-[600px] w-full bg-muted/10 p-4 md:p-8">
			<!-- A little overlay when not hovered for visual effect -->
			<div
				class="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-background/40 backdrop-blur-[2px] transition-opacity duration-500"
				class:opacity-0={isHovered}
			>
				<div
					class="rounded-full bg-background px-6 py-3 font-display font-black text-foreground shadow-xl"
				>
					Interact to view
				</div>
			</div>

			<object
				data={resumeUrl}
				type="application/pdf"
				title="Interactive Resume Document"
				class="h-full w-full rounded-xl shadow-inner"
			>
				<div class="flex h-full flex-col items-center justify-center space-y-4">
					<Icon icon="iconoir:page" class="text-muted-foreground" width="48" />
					<p class="text-muted-foreground">PDF viewer not available.</p>
					<a href={resumeUrl} class="text-brand underline hover:text-brand-subtle">
						Download instead
					</a>
				</div>
			</object>
		</div>
	</div>
</ScrollReveal>
