<script lang="ts">
	import { Tooltip as TooltipPrimitive, Popover as PopoverPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	import * as Tooltip from "../tooltip";
	import * as Popover from "../popover";
	import { getContext } from "svelte";

	let {
		ref = $bindable(null),
		class: className,
		sideOffset = 0,
		side = "top",
		children,
		arrowClass,
		...restProps
	}: TooltipPrimitive.ContentProps &
		PopoverPrimitive.ContentProps & {
			arrowClass?: TooltipPrimitive.ArrowProps["class"];
		} = $props();

	const contentClass = $derived(
		cn(
			"bg-foreground border-none text-background animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-end-2 data-[side=right]:slide-in-from-start-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--bits-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-base  text-balance",
			className
		)
	);

	const getIsTouch = getContext<() => boolean>("dynamic-tooltip:isTouch");
	const isTouch = $derived(getIsTouch());
</script>

{#if isTouch}
	<Popover.Content bind:ref class={contentClass} {sideOffset} {side} {...restProps}>
		{@render children?.()}
		<Tooltip.Arrow class={arrowClass} />
	</Popover.Content>
{:else}
	<Tooltip.Content bind:ref class={contentClass} {sideOffset} {side} {...restProps}>
		{@render children?.()}
	</Tooltip.Content>
{/if}
