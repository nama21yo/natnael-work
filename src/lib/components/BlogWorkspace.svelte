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
			segments.push({
				text: label,
				link:
					activeNote.wikiLinks.find((item) => item.label === label)?.href ??
					`${base}/blog/${activeNote.id}#${label.toLowerCase().replaceAll(" ", "-")}`
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
				<p>
					{#each wikiSegments(paragraph) as segment}
						{#if segment.link}
							<a
								class="wiki-token"
								href={segment.link}
								target={segment.link.startsWith("http") ? "_blank" : undefined}
								rel="noreferrer"
							>
								[[{segment.text}]]
							</a>
						{:else}
							{segment.text}
						{/if}
					{/each}
				</p>
			{/each}
		</div>

		<div class="mt-10 grid gap-4 md:grid-cols-2">
			{#each activeNote.linkedProjects as projectId (projectId)}
				<ZettelLink
					href={`${base}/projects/${projectId}`}
					title={getProjectTitle(projectId)}
					reason={getProjectSummary(projectId)}
					tags={getProjectTags(projectId)}
					variant="project"
				/>
			{/each}
		</div>

		<div class="mt-10 border-t border-foreground/10 pt-8">
			<p class="blog-label">Referenced concepts</p>
			<div class="mt-4 grid gap-3 md:grid-cols-2">
				{#each activeNote.wikiLinks as link (link.slug)}
					<section id={link.slug} class="rounded-2xl border border-foreground/10 bg-muted/35 p-4">
						<p class="font-mono text-sm font-black text-cyan">[[{link.label}]]</p>
						<p class="mt-2 text-sm leading-6 text-muted-foreground">
							Concept node linked from the Kademlia note.
						</p>
					</section>
				{/each}
			</div>
		</div>
	</article>

	<aside class="obsidian-panel h-fit lg:sticky lg:top-28">
		<p class="blog-label">Backlinks</p>
		<div class="mt-4 space-y-3">
			{#each activeNote.wikiLinks as backlink (backlink.slug)}
				<ZettelLink
					href={backlink.href ?? `${base}/blog/${activeNote.id}#${backlink.slug}`}
					title={backlink.label}
					reason="Reference website for this concept."
					variant="backlink"
				/>
			{/each}
		</div>

		<div class="mt-6 border-t border-foreground/10 pt-6">
			<p class="blog-label">Mind map</p>
			<div class="relative mt-4 h-64 rounded-3xl bg-zinc-950 text-white">
				<div
					class="absolute top-[96px] left-[88px] z-10 grid h-20 w-20 place-items-center rounded-full border border-cyan bg-cyan text-center text-[10px] font-black text-zinc-950"
				>
					Kademlia
				</div>
				{#each activeNote.wikiLinks as node, index (node.slug)}
					<a
						href={`${base}/blog/${activeNote.id}#${node.slug}`}
						class="absolute z-10 grid h-14 w-14 place-items-center rounded-full border border-white/15 bg-white/10 p-2 text-center text-[9px] font-black text-white/75 transition hover:scale-110 hover:border-cyan hover:text-cyan"
						style={`left:${20 + ((index * 89) % 180)}px; top:${18 + ((index * 53) % 180)}px`}
						aria-label={node.label}
					>
						{node.label}
					</a>
				{/each}
				<svg class="absolute inset-0 h-full w-full text-cyan/25" viewBox="0 0 260 256">
					<path
						d="M128 132 L48 44 M128 132 L188 70 M128 132 L218 162 M128 132 L72 200 M128 132 L170 218"
						stroke="currentColor"
						fill="none"
						stroke-dasharray="6 7"
					/>
				</svg>
			</div>
		</div>
	</aside>
</div>
