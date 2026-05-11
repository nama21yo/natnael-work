<script lang="ts">
	import { cn } from "$lib/utils";
	import type { Snippet } from "svelte";

	interface Props {
		class?: string;
		children: Snippet;
	}

	let { class: className = "", children }: Props = $props();
</script>

<p class={cn("text-base leading-relaxed font-semibold", className)}>
	{@render children()}
</p>
