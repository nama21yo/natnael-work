<script lang="ts">
	import { base } from "$app/paths";
	import ZettelLink from "$lib/components/ZettelLink.svelte";

	const wikiLinks = [
		{ label: "GSoC 2026", slug: "gsoc-2026", href: "https://summerofcode.withgoogle.com/programs/2026/organizations/dbpedia" },
		{ label: "DBpedia", slug: "dbpedia", href: "https://www.dbpedia.org/" },
		{ label: "DBpedia Paper 1", slug: "dbpedia-paper-1", href: "https://journals.sagepub.com/doi/epdf/10.3233/SW-140134" },
		{ label: "DBpedia Paper 2", slug: "dbpedia-paper-2", href: "https://link.springer.com/chapter/10.1007/978-3-540-76298-0_52" },
		{ label: "XLM-R Paper", slug: "xlm-r-paper", href: "https://arxiv.org/pdf/1911.02116" },
		{ label: "Afro-XLM-R Paper", slug: "afro-xlm-r-paper", href: "https://arxiv.org/pdf/2204.06487" },
		{ label: "BERT Paper", slug: "bert-paper", href: "https://arxiv.org/pdf/1810.04805" },
		{ label: "Amharic DBpedia Chapter Repo", slug: "amharic-dbpedia-chapter-repo", href: "https://github.com/Amharic-DBpedia/AmharicDBpediaChapter" },
		{ label: "Typescript", slug: "typescript", href: "https://www.typescriptlang.org/" }
	];

	const bodyParagraphs = [
		"Read two papers shared by Hizkeal on DBpedia ([[DBpedia Paper 1]], [[DBpedia Paper 2]]).",
		"Read the three papers on XLM-R, Afro-XLM-R, and BERT ([[XLM-R Paper]], [[Afro-XLM-R Paper]], and [[BERT Paper]]).",
		"Started refactoring the Amharic DBpedia Website locally with vanilla [[Typescript]] ([[Amharic DBpedia Chapter Repo]]).",
		"Participated in the DBpedia [[GSoC 2026]] meeting on May 22, 2026.",
		"Although the session was shorter than anticipated, the mentors were highly collaborative and provided clear, direct insights.",
		"Gained a comprehensive understanding of the other contributors' project scopes."
	];

	function renderParagraph(paragraph: string) {
		const segments: { text: string; link?: string }[] = [];
		let cursor = 0;
		let match: RegExpExecArray | null;
		const wikiPattern = /\[\[([^\]]+)\]\]/g;
		while ((match = wikiPattern.exec(paragraph))) {
			if (match.index > cursor) {
				segments.push({ text: paragraph.slice(cursor, match.index) });
			}
			const label = match[1];
			const wikiEntry = wikiLinks.find((item) => item.label === label);
			segments.push({
				text: label,
				link: wikiEntry?.href
			});
			cursor = match.index + match[0].length;
		}
		if (cursor < paragraph.length) {
			segments.push({ text: paragraph.slice(cursor) });
		}
		return segments;
	}

	const mindMapNodes = [
		{ label: "DBpedia Papers", slug: "dbpedia-paper-1", angle: 285 },
		{ label: "GSoC 2026", slug: "gsoc-2026", angle: 330 },
		{ label: "Afro-XLM-R Paper", slug: "afro-xlm-r-paper", angle: 15 },
		{ label: "BERT Paper", slug: "bert-paper", angle: 60 },
		{ label: "Typescript", slug: "typescript", angle: 105 },
		{ label: "XLM-R Paper", slug: "xlm-r-paper", angle: 150 }
	];
</script>

<div class="grid gap-5 lg:grid-cols-[17rem_minmax(0,1fr)_18rem]">
	<aside class="obsidian-panel h-fit lg:sticky lg:top-28">
		<p class="blog-label">GSoC 2026</p>
		<div class="mt-4 space-y-1">
			<a
				href={`${base}/blog/gsoc/2026`}
				class="block rounded-xl px-3 py-2 text-sm font-bold text-muted-foreground transition hover:bg-muted hover:text-foreground"
			>
				Overview
			</a>
			<a
				href={`${base}/blog/gsoc/2026/pre-meeting`}
				class="block rounded-xl px-3 py-2 text-sm font-bold text-muted-foreground transition hover:bg-muted hover:text-foreground"
			>
				Pre-Meeting
			</a>
			<a
				href={`${base}/blog/gsoc/2026/week-0`}
				class="block rounded-xl bg-cyan/15 px-3 py-2 text-sm font-bold text-cyan"
			>
				Week 0
			</a>
		</div>
	</aside>

	<article class="obsidian-panel min-h-[42rem]">
		<div class="border-b border-foreground/10 pb-5">
			<p class="blog-label">gsoc-2026</p>
			<h1 class="mt-3 font-mono text-4xl leading-tight font-black tracking-tight">
				GSoC 2026 Week 0: Literature Review & Refactoring
			</h1>
			<p class="mt-5 text-base leading-8 text-muted-foreground">
				Reading up on DBpedia and XLM-R models, refactoring the Amharic DBpedia website, and joining the kickoff meeting.
			</p>
			<div class="mt-5 flex flex-wrap gap-2">
				<span class="rounded-full bg-muted px-3 py-1 text-xs font-bold text-muted-foreground">#gsoc-2026</span>
				<span class="rounded-full bg-muted px-3 py-1 text-xs font-bold text-muted-foreground">#week-0</span>
				<span class="rounded-full bg-muted px-3 py-1 text-xs font-bold text-muted-foreground">#nlp</span>
				<span class="rounded-full bg-muted px-3 py-1 text-xs font-bold text-muted-foreground">#dbpedia</span>
			</div>
		</div>

		<div class="prose-obsidian mt-8">
			{#each bodyParagraphs as paragraph (paragraph)}
				<p>
					{#each renderParagraph(paragraph) as segment, index (index)}
						{#if segment.link}
							<a
								href={segment.link.startsWith("http") ? segment.link : `${base}/blog/gsoc/2026/week-0#${segment.text.toLowerCase().replaceAll(" ", "-")}`}
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
			{/each}
		</div>
	</article>

	<aside class="obsidian-panel h-fit lg:sticky lg:top-28">
		<p class="blog-label">Backlinks</p>
		<div class="mt-4 space-y-3">
			{#each wikiLinks as link (link.slug)}
				<ZettelLink
					href={link.href ?? `${base}/blog/gsoc/2026/week-0#${link.slug}`}
					title={link.label}
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
					{#each mindMapNodes as node}
						{@const rad = (node.angle * Math.PI) / 180}
						{@const cx = 130 + 85 * Math.cos(rad)}
						{@const cy = 128 + 85 * Math.sin(rad)}
						<line x1="130" y1="128" x2={cx} y2={cy} stroke="rgba(34,211,238,0.25)" stroke-width="1.5" stroke-dasharray="4 6" class="transition-all duration-700"/>
					{/each}
				</svg>

				<!-- Center Node -->
				<div class="absolute inset-0 flex items-center justify-center pointer-events-none">
					<div class="flex h-16 w-16 items-center justify-center rounded-full border-2 border-cyan/40 bg-zinc-900/80 backdrop-blur-md text-center text-[10px] font-black text-cyan shadow-[0_0_15px_rgba(34,211,238,0.25)]">
						DBPEDIA
					</div>
				</div>

				<!-- Orbiting Nodes -->
				{#each mindMapNodes as node}
					{@const rad = (node.angle * Math.PI) / 180}
					{@const cx = 130 + 85 * Math.cos(rad)}
					{@const cy = 128 + 85 * Math.sin(rad)}
					<a
						href={`${base}/blog/gsoc/2026/week-0#${node.slug}`}
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
