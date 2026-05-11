<script lang="ts">
	import { setContext } from "svelte";
	import type { Snippet } from "svelte";
	import { cn } from "$lib/utils";

	export type Variant = "pink" | "mint" | "sky" | "lavender" | "yellow" | "coral" | "white";
	export type Tail =
		| "bottom-left"
		| "bottom-right"
		| "top-left"
		| "top-right"
		| "left"
		| "right"
		| "none";
	export type Type = "speech" | "thought";

	interface Props {
		variant?: Variant;
		tail?: Tail;
		type?: Type;
		class?: string;
		children: Snippet;
	}

	let {
		variant = "pink",
		tail = "bottom-left",
		type = "speech",
		class: className = "",
		children
	}: Props = $props();

	const bubbleStyles: Record<Variant, string> = {
		pink: "bg-[var(--bubble-pink)] text-foreground",
		mint: "bg-[var(--bubble-mint)] text-foreground",
		sky: "bg-[var(--bubble-sky)] text-foreground",
		lavender: "bg-[var(--bubble-lavender)] text-foreground",
		yellow: "bg-[var(--bubble-yellow)] text-foreground",
		coral: "bg-[var(--bubble-coral)] text-foreground",
		white: "bg-[var(--bubble-white)] text-foreground"
	};

	const bgValue: Record<Variant, string> = {
		pink: "var(--bubble-pink)",
		mint: "var(--bubble-mint)",
		sky: "var(--bubble-sky)",
		lavender: "var(--bubble-lavender)",
		yellow: "var(--bubble-yellow)",
		coral: "var(--bubble-coral)",
		white: "var(--bubble-white)"
	};

	type TailClasses = { outerShape: string; outerPos: string; innerShape: string; innerPos: string };

	const tailConfig: Record<Exclude<Tail, "none">, TailClasses> = {
		"bottom-left": {
			outerShape:
				"border-l-[9px] border-r-[9px] border-l-transparent border-r-transparent border-t-[15px]",
			outerPos: "absolute -bottom-[15px] left-5",
			innerShape:
				"border-l-[7px] border-r-[7px] border-l-transparent border-r-transparent border-t-[12px]",
			innerPos: "absolute -bottom-[11px] left-[22px] z-10"
		},
		"bottom-right": {
			outerShape:
				"border-l-[9px] border-r-[9px] border-l-transparent border-r-transparent border-t-[15px]",
			outerPos: "absolute -bottom-[15px] right-5",
			innerShape:
				"border-l-[7px] border-r-[7px] border-l-transparent border-r-transparent border-t-[12px]",
			innerPos: "absolute -bottom-[11px] right-[22px] z-10"
		},
		"top-left": {
			outerShape:
				"border-l-[9px] border-r-[9px] border-l-transparent border-r-transparent border-b-[15px]",
			outerPos: "absolute -top-[15px] left-5",
			innerShape:
				"border-l-[7px] border-r-[7px] border-l-transparent border-r-transparent border-b-[12px]",
			innerPos: "absolute -top-[11px] left-[22px] z-10"
		},
		"top-right": {
			outerShape:
				"border-l-[9px] border-r-[9px] border-l-transparent border-r-transparent border-b-[15px]",
			outerPos: "absolute -top-[15px] right-5",
			innerShape:
				"border-l-[7px] border-r-[7px] border-l-transparent border-r-transparent border-b-[12px]",
			innerPos: "absolute -top-[11px] right-[22px] z-10"
		},
		left: {
			outerShape:
				"border-t-[9px] border-b-[9px] border-t-transparent border-b-transparent border-r-[15px]",
			outerPos: "absolute -left-[15px] top-5",
			innerShape:
				"border-t-[7px] border-b-[7px] border-t-transparent border-b-transparent border-r-[12px]",
			innerPos: "absolute -left-[11px] top-[22px] z-10"
		},
		right: {
			outerShape:
				"border-t-[9px] border-b-[9px] border-t-transparent border-b-transparent border-l-[15px]",
			outerPos: "absolute -right-[15px] top-5",
			innerShape:
				"border-t-[7px] border-b-[7px] border-t-transparent border-b-transparent border-l-[12px]",
			innerPos: "absolute -right-[11px] top-[22px] z-10"
		}
	};

	const outerBorderProp: Record<Exclude<Tail, "none">, string> = {
		"bottom-left": "border-top-color",
		"bottom-right": "border-top-color",
		"top-left": "border-bottom-color",
		"top-right": "border-bottom-color",
		left: "border-right-color",
		right: "border-left-color"
	};

	const innerBorderProp: Record<Exclude<Tail, "none">, string> = {
		"bottom-left": "border-top-color",
		"bottom-right": "border-top-color",
		"top-left": "border-bottom-color",
		"top-right": "border-bottom-color",
		left: "border-right-color",
		right: "border-left-color"
	};

	const thoughtDotColor: Record<Variant, string> = {
		pink: "bg-brand-muted border-brand",
		mint: "bg-emerald-muted border-emerald",
		sky: "bg-sky-muted border-sky",
		lavender: "bg-violet-muted border-violet",
		yellow: "bg-amber-muted border-amber",
		coral: "bg-orange-300 border-orange-500",
		white: "bg-muted border-border"
	};

	const thoughtTrail: Record<Exclude<Tail, "none">, string> = {
		"bottom-left": "absolute -bottom-4 left-4 flex-row",
		"bottom-right": "absolute -bottom-4 right-4 flex-row",
		"top-left": "absolute -top-4 left-4 flex-row-reverse",
		"top-right": "absolute -top-4 right-4 flex-row-reverse",
		left: "absolute top-4 -left-4 flex-col-reverse",
		right: "absolute top-4 -right-4 flex-col"
	};

	setContext("bubble", () => ({ variant }));
</script>

<div
	class={cn(
		"relative inline-flex max-w-sm flex-col gap-0.5 rounded-2xl border-2 border-foreground px-4 py-3",
		"text-base leading-relaxed font-semibold shadow-[3px_3px_0px_var(--foreground)]",
		type === "thought" && "border-dashed shadow-none",
		bubbleStyles[variant],
		className
	)}
>
	{@render children()}

	{#if type === "speech" && tail !== "none"}
		{@const cfg = tailConfig[tail]}
		<span
			class={cn("h-0 w-0", cfg.outerShape, cfg.outerPos)}
			style="{outerBorderProp[tail]}: var(--foreground);"
		></span>
		<span
			class={cn("h-0 w-0", cfg.innerShape, cfg.innerPos)}
			style="{innerBorderProp[tail]}: {bgValue[variant]};"
		></span>
	{/if}

	{#if type === "thought" && tail !== "none"}
		{@const isBottom = tail === "bottom-left" || tail === "bottom-right"}
		{@const isTop = tail === "top-left" || tail === "top-right"}
		{@const isRight = tail === "right"}

		<div class={cn("absolute flex gap-1", thoughtTrail[tail])}>
			<span
				class={cn(
					"h-2.5 w-2.5 shrink-0 rounded-full border-2",
					isBottom && "translate-y-0",
					isTop && "translate-y-0",
					isRight && "translate-x-0",
					"translate-x-0",
					thoughtDotColor[variant]
				)}
			></span>
			<span
				class={cn(
					"h-2 w-2 shrink-0 rounded-full border-2",
					isBottom && "translate-y-1",
					isTop && "-translate-y-1",
					isRight && "translate-x-1",
					thoughtDotColor[variant]
				)}
			></span>
			<span
				class={cn(
					"h-1.5 w-1.5 shrink-0 rounded-full border-2",
					isBottom && "translate-y-2",
					isTop && "-translate-y-2",
					isRight && "translate-x-2",
					thoughtDotColor[variant]
				)}
			></span>
		</div>
	{/if}
</div>
