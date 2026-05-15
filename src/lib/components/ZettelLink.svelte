<script lang="ts">
	import Icon from "@iconify/svelte";

	type Props = {
		href: string;
		title: string;
		reason?: string;
		tags?: string[];
		variant?: "note" | "project" | "backlink";
	};

	let { href, title, reason, tags = [], variant = "note" }: Props = $props();

	const tone = $derived(
		variant === "project"
			? "border-amber-border bg-amber-subtle text-amber"
			: variant === "backlink"
				? "border-emerald-border bg-emerald-subtle text-emerald"
				: "border-cyan-border bg-cyan-subtle text-cyan"
	);

	const isWikiLink = $derived(title.startsWith("[[") && title.endsWith("]]"));
	const displayTitle = $derived(isWikiLink ? title.slice(2, -2) : title);
</script>

<a
	{href}
	class={`group block rounded-2xl border p-4 transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_40px_rgba(15,23,42,0.12)] ${tone}`}
>
	<div class="flex items-start justify-between gap-4">
		<div>
			<p class="text-xs font-black tracking-[0.22em] uppercase">
				{variant === "project"
					? "Linked project"
					: variant === "backlink"
						? "Backlink"
						: "Wikilink"}
			</p>
			<h3 class="mt-2 font-mono text-lg font-black text-foreground">{displayTitle}</h3>
		</div>
		<Icon
			icon="iconoir:arrow-up-right"
			width="18"
			class="mt-1 shrink-0 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
		/>
	</div>

	{#if reason}
		<p class="mt-3 text-sm leading-6 text-foreground/70">{reason}</p>
	{/if}

	{#if tags.length}
		<div class="mt-4 flex flex-wrap gap-2">
			{#each tags as tag (tag)}
				<span
					class="rounded-full bg-background/70 px-2.5 py-1 text-xs font-bold text-foreground/70"
				>
					#{tag}
				</span>
			{/each}
		</div>
	{/if}
</a>
