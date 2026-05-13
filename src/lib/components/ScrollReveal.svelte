<script lang="ts">
	import { inview } from "svelte-inview";
	import { cn } from "$lib/utils.js";
	import type { Snippet } from "svelte";

	type Direction = "up" | "down" | "left" | "right" | "none";

	let {
		children,
		class: className = "",
		delay = 0,
		direction = "up",
		duration = 800
	} = $props<{
		children: Snippet;
		class?: string;
		delay?: number;
		direction?: Direction;
		duration?: number;
	}>();

	let isInView = $state(false);

	const directionClasses: Record<Direction, string> = {
		up: "translate-y-12",
		down: "-translate-y-12",
		left: "translate-x-12",
		right: "-translate-x-12",
		none: "translate-y-0 translate-x-0"
	};
</script>

<div
	use:inview={{
		unobserveOnEnter: true,
		rootMargin: "-50px"
	}}
	onchange={(e) => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore - Svelte types event as Event, but svelte-inview fires CustomEvent
		if (e.detail?.inView) {
			isInView = true;
		}
	}}
	class={cn(
		"opacity-0 transition-all",
		directionClasses[direction as Direction],
		isInView && "translate-x-0 translate-y-0 opacity-100",
		className
	)}
	style="transition-duration: {duration}ms; transition-delay: {delay}ms; transition-timing-function: cubic-bezier(0.25, 1, 0.5, 1);"
>
	{@render children()}
</div>
