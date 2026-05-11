<script lang="ts">
	import { Tooltip as TooltipPrimitive } from "bits-ui";

	import { cn } from "$lib/utils.js";

	import TooltipPortal from "./tooltip-portal.svelte";
	import TooltipArrow from "./tooltip-arrow.svelte";

	import type { ComponentProps } from "svelte";
	import type { WithoutChildrenOrChild } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		sideOffset = 0,
		side = "top",
		children,
		arrowClass,
		portalProps,
		...restProps
	}: TooltipPrimitive.ContentProps & {
		arrowClass?: TooltipPrimitive.ArrowProps["class"];
		portalProps?: WithoutChildrenOrChild<ComponentProps<typeof TooltipPortal>>;
	} = $props();
</script>

<TooltipPortal {...portalProps}>
	<TooltipPrimitive.Content
		bind:ref
		data-slot="tooltip-content"
		{sideOffset}
		{side}
		class={cn(
			"z-50 w-fit origin-(--bits-tooltip-content-transform-origin) animate-in rounded-md bg-foreground px-3 py-1.5 text-base  text-balance text-background fade-in-0 zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-end-2 data-[side=right]:slide-in-from-start-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
			className
		)}
		{...restProps}
	>
		{@render children?.()}

		<TooltipArrow class={arrowClass} />
	</TooltipPrimitive.Content>
</TooltipPortal>
