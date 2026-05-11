<script lang="ts">
	import { Tooltip as TooltipPrimitive, Popover as PopoverPrimitive } from "bits-ui";

	import * as Tooltip from "../tooltip";
	import * as Popover from "../popover";
	import { getContext } from "svelte";

	let {
		ref = $bindable(null),
		children,
		...restProps
	}: TooltipPrimitive.TriggerProps & PopoverPrimitive.TriggerProps = $props();

	const getIsTouch = getContext<() => boolean>("dynamic-tooltip:isTouch");
	const isTouch = $derived(getIsTouch());
</script>

{#if isTouch}
	<Popover.Trigger bind:ref {...restProps}>
		{@render children?.()}
	</Popover.Trigger>
{:else}
	<Tooltip.Trigger bind:ref {...restProps}>
		{@render children?.()}
	</Tooltip.Trigger>
{/if}
