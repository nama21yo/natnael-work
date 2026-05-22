<script lang="ts">
	import { base } from "$app/paths";
	import ZettelLink from "$lib/components/ZettelLink.svelte";
	import {
		blogNotes,
		getProjectSummary,
		getProjectTags,
		getProjectTitle,
		type BlogNote
	} from "$lib/data/portfolio";

	type Props = {
		activeNote?: BlogNote;
	};

	let { activeNote = blogNotes[0] }: Props = $props();

	function wikiSegments(paragraph: string) {
		const pattern = /\[\[([^\]]+)\]\]/g;
		const segments: { text: string; link?: string }[] = [];
		let cursor = 0;
		let match: RegExpExecArray | null;

		while ((match = pattern.exec(paragraph))) {
			if (match.index > cursor) segments.push({ text: paragraph.slice(cursor, match.index) });
			const label = match[1];
			const wikiEntry = activeNote.wikiLinks.find((item) => item.label === label);
			segments.push({
				text: label,
				link: wikiEntry?.href ?? `#${label.toLowerCase().replaceAll(" ", "-")}`
			});
			cursor = match.index + match[0].length;
		}

		if (cursor < paragraph.length) segments.push({ text: paragraph.slice(cursor) });
		return segments;
	}
</script>

<div class="grid gap-5 lg:grid-cols-[17rem_minmax(0,1fr)_18rem]">
	<aside class="obsidian-panel h-fit lg:sticky lg:top-28">
		<p class="blog-label">Blogs</p>
		<div class="mt-4 space-y-1">
			{#each blogNotes as note (note.id)}
				<a
					href={`${base}/blog/${note.id}`}
					class={`block rounded-xl px-3 py-2 text-sm font-bold transition ${
						note.id === activeNote.id
							? "bg-cyan/15 text-cyan"
							: "text-muted-foreground hover:bg-muted hover:text-foreground"
					}`}
				>
					{note.title}
				</a>
			{/each}
		</div>
	</aside>

	<article class="obsidian-panel min-h-[42rem]">
		<div class="border-b border-foreground/10 pb-5">
			<p class="blog-label">{activeNote.category}</p>
			<h1 class="mt-3 font-mono text-4xl leading-tight font-black tracking-tight">
				{activeNote.title}
			</h1>
			<p class="mt-5 text-base leading-8 text-muted-foreground">{activeNote.excerpt}</p>
			<div class="mt-5 flex flex-wrap gap-2">
				{#each activeNote.tags as tag (tag)}
					<span class="rounded-full bg-muted px-3 py-1 text-xs font-bold">#{tag}</span>
				{/each}
			</div>
		</div>

		<div class="prose-obsidian mt-8">
			{#each activeNote.body as paragraph (paragraph)}
				{#if paragraph.startsWith('IMAGE:')}
					<figure class="my-8 overflow-hidden rounded-2xl border border-foreground/10 bg-muted/20">
						<img src={`${base}${paragraph.replace('IMAGE:', '').trim()}`} alt="Blog Note Visual" class="w-full h-auto object-cover" />
					</figure>
				{:else if paragraph.startsWith('QUOTE:')}
					<blockquote class="my-6 border-l-4 border-cyan pl-6 pr-4 py-3 italic text-muted-foreground bg-cyan/5 rounded-r-xl">
						{#each wikiSegments(paragraph.replace('QUOTE:', '').trim()) as segment, index (index)}
							{#if segment.link}
								<a
									href={segment.link.startsWith("http")
										? segment.link
										: `${base}/blog/${activeNote.id}${segment.link}`}
									target={segment.link.startsWith("http") ? "_blank" : undefined}
									rel={segment.link.startsWith("http") ? "noreferrer" : undefined}
									class="rounded bg-brand-subtle/50 px-1 font-semibold text-brand-muted transition-colors hover:bg-brand hover:text-background"
								>
									{segment.text}
								</a>
							{:else}
								<span>{segment.text}</span>
							{/if}
						{/each}
					</blockquote>
				{:else}
					<p>
						{#each wikiSegments(paragraph) as segment, index (index)}
							{#if segment.link}
								<a
									href={segment.link.startsWith("http")
										? segment.link
										: `${base}/blog/${activeNote.id}${segment.link}`}
									target={segment.link.startsWith("http") ? "_blank" : undefined}
									rel={segment.link.startsWith("http") ? "noreferrer" : undefined}
									class="rounded bg-brand-subtle/50 px-1 font-semibold text-brand-muted transition-colors hover:bg-brand hover:text-background"
								>
									{segment.text}
								</a>
							{:else}
								<span>{segment.text}</span>
							{/if}
						{/each}
					</p>
				{/if}
			{/each}
		</div>
	</article>

	<aside class="obsidian-panel h-fit lg:sticky lg:top-28">
		<p class="blog-label">Backlinks</p>
		<div class="mt-4 space-y-3">
			{#each activeNote.wikiLinks as backlink (backlink.slug)}
				<ZettelLink
					href={backlink.href ?? `${base}/blog/${activeNote.id}#${backlink.slug}`}
					title={backlink.label}
					reason="Concept reference from this note."
					variant="backlink"
				/>
			{/each}
		</div>

		<div class="mt-6 border-t border-foreground/10 pt-6">
			<p class="blog-label">Mind map</p>
			<div class="relative mt-4 h-64 rounded-3xl bg-zinc-950 text-white overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
				<!-- SVG Connectors -->
				<svg class="absolute inset-0 h-full w-full pointer-events-none" viewBox="0 0 260 256" preserveAspectRatio="xMidYMid meet">
					<circle cx="130" cy="128" r="40" fill="none" stroke="rgba(34,211,238,0.2)" stroke-width="1" class="animate-ping" style="animation-duration: 3s;" />
					{#each activeNote.wikiLinks as node, index}
						{@const rad = (index / activeNote.wikiLinks.length) * 2 * Math.PI - Math.PI / 2}
						{@const cx = 130 + 85 * Math.cos(rad)}
						{@const cy = 128 + 85 * Math.sin(rad)}
						<line x1="130" y1="128" x2={cx} y2={cy} stroke="rgba(34,211,238,0.25)" stroke-width="1.5" stroke-dasharray="4 6" class="transition-all duration-700"/>
					{/each}
				</svg>

				<!-- Center Node -->
				<div class="absolute inset-0 flex items-center justify-center pointer-events-none">
					<div class="flex h-16 w-16 items-center justify-center rounded-full border-2 border-cyan/40 bg-zinc-900/80 backdrop-blur-md text-center text-[10px] font-black text-cyan shadow-[0_0_15px_rgba(34,211,238,0.25)]">
						{activeNote.id.split('-')[0].toUpperCase()}
					</div>
				</div>

				<!-- Orbiting Nodes -->
				{#each activeNote.wikiLinks as node, index (node.slug)}
					{@const rad = (index / activeNote.wikiLinks.length) * 2 * Math.PI - Math.PI / 2}
					{@const cx = 130 + 85 * Math.cos(rad)}
					{@const cy = 128 + 85 * Math.sin(rad)}
					<a
						href={`${base}/blog/${activeNote.id}#${node.slug}`}
						class="absolute flex h-[54px] w-[54px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-zinc-900/90 p-1.5 text-center text-[8px] leading-tight font-bold text-white/80 shadow-lg backdrop-blur-sm transition-all duration-300 hover:z-20 hover:scale-125 hover:border-cyan hover:bg-cyan/10 hover:text-cyan hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]"
						style={`left: ${(cx / 260) * 100}%; top: ${(cy / 256) * 100}%;`}
						aria-label={node.label}
						title={node.label}
					>
						<span class="line-clamp-3">{node.label}</span>
					</a>
				{/each}
			</div>
		</div>
	</aside>
</div>
