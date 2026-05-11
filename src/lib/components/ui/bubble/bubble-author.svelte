<script lang="ts">
	import { getContext } from "svelte";
	import { cn } from "$lib/utils";

	interface Props {
		class?: string;
		children: import("svelte").Snippet;
	}

	let { class: className = "", children }: Props = $props();

	type Variant = "pink" | "mint" | "sky" | "lavender" | "yellow" | "coral" | "white";

	const ctx = getContext<() => { variant: Variant }>("bubble");

	const authorStyles: Record<Variant, string> = {
		pink: "text-brand",
		mint: "text-emerald",
		sky: "text-sky",
		lavender: "text-violet",
		yellow: "text-amber",
		coral: "text-orange-400",
		white: "text-muted-foreground"
	};
</script>

<span
	class={cn(
		"text-[0.6rem] font-black tracking-widest uppercase opacity-70",
		authorStyles[ctx?.()?.variant ?? "pink"],
		className
	)}
>
	{@render children()}
</span>
