<script lang="ts">
	import { base } from "$app/paths";
	import ZettelLink from "$lib/components/ZettelLink.svelte";

	const wikiLinks = [
		{ label: "GSoC 2026", slug: "gsoc-2026", href: "https://summerofcode.withgoogle.com/programs/2026/organizations/dbpedia" },
		{ label: "DBpedia", slug: "dbpedia", href: "https://www.dbpedia.org/" },
		{ label: "Amharic DBpedia Chapter", slug: "amharic-dbpedia-chapter", href: "https://drive.google.com/file/d/1_ZjC5mQ7WsquwVaXXjQqeI5zBXxHa4lq/view?usp=sharing" },
		{ label: "Afro-XLM-R", slug: "afro-xlm-r", href: "https://huggingface.co/dice-research/amharic-property-retriever-afro-xlmr-base" },
		{ label: "mBERT", slug: "mbert", href: "https://huggingface.co/dice-research/amharic-property-retriever-mbert" },
		{ label: "XLM-R", slug: "xlm-r", href: "https://huggingface.co/dice-research/amharic-property-retriever-base-xlmr" },
		{ label: "LoRA", slug: "lora", href: "https://arxiv.org/pdf/2106.09685" },
		{ label: "BERT", slug: "bert", href: "https://huggingface.co/blog/bert-101" },
		{ label: "LangGraph", slug: "langgraph" },
		{ label: "benchmarking on Kaggle", slug: "benchmarking-on-kaggle", href: "https://www.kaggle.com/code/natnaelyohanes/am-dbpedia-ontology-alignment" },
		{ label: "DICE-Research", slug: "dice-research", href: "https://dice-research.org/team/" },
		{ label: "Prof. Dr. Ricardo Usbeck", slug: "prof-ricardo-usbeck", href: "https://www.leuphana.de/en/institutes/iis/persons/ricardo-usbeck.html" },
		{ label: "Andargachew", slug: "andargachew", href: "https://contact-andy.github.io/" },
		{ label: "Tilahun", slug: "tilahun", href: "https://www.leuphana.de/en/institutes/iis/persons/tilahun-taffa.html" },
		{ label: "Hizkiel", slug: "hizkiel", href: "https://scholar.google.com/citations?user=mOMRLWEAAAAJ&hl=en" }
	];

	const bodyParagraphs = [
		"This summer I'm working on [[GSoC 2026]] with [[DBpedia]] to extend the [[Amharic DBpedia Chapter]]. The goal is to build an agentic system that maps Amharic text entities to their correct DBpedia ontology classes — a critical step toward making Amharic knowledge accessible in the global knowledge graph.",
		"The project leverages [[Afro-XLM-R]], a multilingual transformer optimized for African languages, fine-tuned and orchestrated through [[LangGraph]].",
		"Had my first onboarding meeting with mentors [[Prof. Dr. Ricardo Usbeck]], [[Andargachew]], [[Tilahun]], and [[Hizkiel]]. We introduced ourselves and locked in weekly sync meetings for Fridays at 2:00 PM. Joined all primary communication channels: Slack, WhatsApp, and Microsoft Teams.",
		"My mentors have rich backgrounds — [[Prof. Dr. Ricardo Usbeck]] leads AI research in Germany at Leuphana University, [[Andargachew]] is a lecturer at Addis Ababa University specializing in knowledge graphs and NLP, [[Tilahun]] is a PhD researcher at Leuphana working on hybrid QA systems for low-resource languages, and [[Hizkiel]] is a PhD candidate at Paderborn University focused on NLP and Digital Humanities.",
		"Conducted a deep-dive revision of the [[Amharic DBpedia Chapter]] paper and analyzed the three property-retriever models by the [[DICE-Research]] team. Refreshed core knowledge of [[BERT]] and efficient fine-tuning like [[LoRA]].",
		"Performed model [[benchmarking on Kaggle]] using GPU to evaluate [[mBERT]], [[XLM-R]], and [[Afro-XLM-R]]. Validated [[Afro-XLM-R]] as the optimal base model for Amharic ontology mapping.",
		"Selected [[LangGraph]] as the primary framework for the agentic orchestration layer — used in production by companies like LinkedIn with strong community support.",
		"Over the rest 12 weeks I will be posting weekly updates. Next up: diving deeper into the Afro-XLM-R fine-tuning pipeline and setting up the LangGraph agent architecture."
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
		{ label: "Amharic", slug: "amharic-dbpedia-chapter", angle: 285 },
		{ label: "LoRA", slug: "lora", angle: 330 },
		{ label: "mBERT", slug: "mbert", angle: 15 },
		{ label: "BERT", slug: "bert", angle: 60 },
		{ label: "LangGraph", slug: "langgraph", angle: 105 },
		{ label: "Afro-XLM-R", slug: "afro-xlm-r", angle: 150 }
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
				class="block rounded-xl bg-cyan/15 px-3 py-2 text-sm font-bold text-cyan"
			>
				Pre-Meeting
			</a>
			<a
				href={`${base}/blog/gsoc/2026/week-0`}
				class="block rounded-xl px-3 py-2 text-sm font-bold text-muted-foreground transition hover:bg-muted hover:text-foreground"
			>
				Week 0
			</a>
		</div>
	</aside>

	<article class="obsidian-panel min-h-[42rem]">
		<div class="border-b border-foreground/10 pb-5">
			<p class="blog-label">gsoc-2026</p>
			<h1 class="mt-3 font-mono text-4xl leading-tight font-black tracking-tight">
				GSoC 2026 Pre-Meeting: Kicking Off with DBpedia
			</h1>
			<p class="mt-5 text-base leading-8 text-muted-foreground">
				Onboarding, model benchmarking, and LangGraph selection for Amharic ontology mapping.
			</p>
			<div class="mt-5 flex flex-wrap gap-2">
				<span class="rounded-full bg-muted px-3 py-1 text-xs font-bold text-muted-foreground">#gsoc-2026</span>
				<span class="rounded-full bg-muted px-3 py-1 text-xs font-bold text-muted-foreground">#pre-meeting</span>
				<span class="rounded-full bg-muted px-3 py-1 text-xs font-bold text-muted-foreground">#nlp</span>
				<span class="rounded-full bg-muted px-3 py-1 text-xs font-bold text-muted-foreground">#knowledge-graphs</span>
				<span class="rounded-full bg-muted px-3 py-1 text-xs font-bold text-muted-foreground">#amharic</span>
				<span class="rounded-full bg-muted px-3 py-1 text-xs font-bold text-muted-foreground">#dbpedia</span>
			</div>
		</div>

		<div class="prose-obsidian mt-8">
			{#each bodyParagraphs as paragraph (paragraph)}
				<p>
					{#each renderParagraph(paragraph) as segment, index (index)}
						{#if segment.link}
							<a
								href={segment.link.startsWith("http") ? segment.link : `${base}/blog/gsoc/2026/pre-meeting#${segment.text.toLowerCase().replaceAll(" ", "-")}`}
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
					href={link.href ?? `${base}/blog/gsoc/2026/pre-meeting#${link.slug}`}
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
						href={`${base}/blog/gsoc/2026/pre-meeting#${node.slug}`}
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
