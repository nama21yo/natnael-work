<script lang="ts">
	import { Tooltip as TooltipPrimitive, Popover as PopoverPrimitive } from "bits-ui";

	import * as Tooltip from "../tooltip";
	import * as Popover from "../popover";
	import { setContext } from "svelte";

	let {
		open = $bindable(false),
		children,
		...restProps
	}: TooltipPrimitive.RootProps & PopoverPrimitive.RootProps = $props();

	let isTouch = $state(false);

	$effect(() => {
		const touchMediaQuery = window.matchMedia("(hover: none), (pointer: coarse)");

		const compute = () => {
			isTouch = touchMediaQuery.matches || navigator.maxTouchPoints > 0;
		};

		compute();

		const handler = () => compute();
		touchMediaQuery.addEventListener("change", handler);

		return () => touchMediaQuery.removeEventListener("change", handler);
	});

	setContext("dynamic-tooltip:isTouch", () => isTouch);
</script>

{#if isTouch}
	<Popover.Root {open} {...restProps}>
		{@render children?.()}
	</Popover.Root>
{:else}
	<Tooltip.Root {open} {...restProps}>
		{@render children?.()}
	</Tooltip.Root>
{/if}
