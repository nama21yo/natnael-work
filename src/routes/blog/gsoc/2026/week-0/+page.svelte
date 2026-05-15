<script lang="ts">
	import { base } from "\$app/paths";
	import Icon from "@iconify/svelte";
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
		{ label: "DICE-Research", slug: "dice-research", href: "https://dice-research.org/team/" },
		{ label: "Prof. Dr. Ricardo Usbeck", slug: "prof-ricardo-usbeck", href: "https://www.leuphana.de/en/institutes/iis/persons/ricardo-usbeck.html" },
		{ label: "Andargachew", slug: "andargachew", href: "https://contact-andy.github.io/" },
		{ label: "Tilahun", slug: "tilahun", href: "https://www.leuphana.de/en/institutes/iis/persons/tilahun-taffa.html" },
		{ label: "Hizkiel", slug: "hizkiel", href: "https://scholar.google.com/citations?user=mOMRLWEAAAAJ&hl=en" }
	];

	const bodyParagraphs = [
		"## Week 0: Kicking off GSoC 2026",
		"This summer I'm working on [[GSoC 2026]] with [[DBpedia]] to extend the [[Amharic DBpedia Chapter]]. The goal is to build an agentic system that maps Amharic text entities to their correct DBpedia ontology classes — a critical step toward making Amharic knowledge accessible in the global knowledge graph.",
		"The project leverages [[Afro-XLM-R]], a multilingual transformer optimized for African languages, fine-tuned with [[LoRA]] and orchestrated through [[LangGraph]].",
		"## Mentorship & Communication",
		"Had my first onboarding meeting with mentors [[Prof. Dr. Ricardo Usbeck]], [[Andargachew]], [[Tilahun]], and [[Hizkiel]]. We introduced ourselves and locked in weekly sync meetings for Fridays at 2:00 PM. Joined all primary communication channels: Slack, WhatsApp, and Microsoft Teams.",
		"My mentors have rich backgrounds — [[Prof. Dr. Ricardo Usbeck]] leads AI research in Germany at Leuphana University, [[Andargachew]] is a lecturer at Addis Ababa University specializing in knowledge graphs and NLP, [[Tilahun]] is a PhD researcher at Leuphana working on hybrid QA systems for low-resource languages, and [[Hizkiel]] is a PhD candidate at Paderborn University focused on NLP and Digital Humanities.",
		"## Research & Literature Review",
		"Conducted a deep-dive revision of the [[Amharic DBpedia Chapter]] paper and analyzed the three property-retriever models by the [[DICE-Research]] team. Refreshed core knowledge of [[BERT]], [[Transformers]], and efficient fine-tuning like [[LoRA]].",
		"## Technical Exploration",
		"Performed model benchmarking on Kaggle using GPU to evaluate [[mBERT]], [[XLM-R]], and [[Afro-XLM-R]]. Validated [[Afro-XLM-R]] as the optimal base model for Amharic ontology mapping.",
		"Selected [[LangGraph]] as the primary framework for the agentic orchestration layer — used in production by companies like LinkedIn with strong community support.",
		"## Looking Ahead",
		"Over the next 11 weeks I will be posting weekly updates. Next up: diving deeper into the Afro-XLM-R fine-tuning pipeline and setting up the LangGraph agent architecture."
	];

	function wikiSegments(paragraph: string) {
		const pattern = /\[\[([^\]]+)\]\]/g;
		const segments: { text: string; link?: string }[] = [];
		let cursor = 0;
		let match: RegExpExecArray | null;

		while ((match = pattern.exec(paragraph))) {
			if (match.index > cursor) segments.push({ text: paragraph.slice(cursor, match.index) });
			const label = match[1];
			const wikiEntry = wikiLinks.find((item) => item.label === label);
			segments.push({
				text: label,
				link: wikiEntry?.href ?? `#${label.toLowerCase().replaceAll(" ", "-")}`
			});
			cursor = match.index + match[0].length;
		}

		if (cursor < paragraph.length) segments.push({ text: paragraph.slice(cursor) });
		return segments;
	}

	const mindMapNodes = [
		{ label: "DBpedia", slug: "dbpedia" },
		{ label: "Amharic", slug: "amharic-dbpedia-chapter" },
		{ label: "Afro-XLM-R", slug: "afro-xlm-r" },
		{ label: "LoRA", slug: "lora" },
		{ label: "mBERT", slug: "mbert" },
		{ label: "LangGraph", slug: "langgraph" },
		{ label: "BERT", slug: "bert" }
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
				GSoC 2026 Week 0: Kicking Off with DBpedia
			</h1>
			<p class="mt-5 text-base leading-8 text-muted-foreground">
				Onboarding, model benchmarking, and LangGraph selection for Amharic ontology mapping.
			</p>
			<div class="mt-5 flex flex-wrap gap-2">
				<span class="rounded-full bg-muted px-3 py-1 text-xs font-bold text-muted-foreground">#gsoc-2026</span>
				<span class="rounded-full bg-muted px-3 py-1 text-xs font-bold text-muted-foreground">#week-0</span>
				<span class="rounded-full bg-muted px-3 py-1 text-xs font-bold text-muted-foreground">#nlp</span>
				<span class="rounded-full bg-muted px-3 py-1 text-xs font-bold text-muted-foreground">#knowledge-graphs</span>
				<span class="rounded-full bg-muted px-3 py-1 text-xs font-bold text-muted-foreground">#amharic</span>
				<span class="rounded-full bg-muted px-3 py-1 text-xs font-bold text-muted-foreground">#dbpedia</span>
			</div>
		</div>

		<div class="prose-obsidian mt-8">
			{#each bodyParagraphs as paragraph (paragraph)}
				<p>
					{#each wikiSegments(paragraph) as segment, index (index)}
						{#if segment.link}
							<a
								href={segment.link.startsWith("http")
									? segment.link
									: `${base}/blog/gsoc/2026/week-0${segment.link}`}
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
			<div class="relative mt-4 h-64 rounded-3xl bg-zinc-950 text-white overflow-hidden">
				<svg class="absolute inset-0 h-full w-full" viewBox="0 0 260 256" preserveAspectRatio="xMidYMid meet">
					<path
						d="M128 132 L48 44 M128 132 L188 70 M128 132 L218 162 M128 132 L72 200 M128 132 L170 218 M128 132 L30 140 M128 132 L228 130"
						stroke="rgba(34,211,238,0.25)"
						fill="none"
						stroke-dasharray="6 7"
					/>
				</svg>
				<div class="relative z-10 flex h-full flex-col items-center justify-center">
					<div class="grid h-16 w-16 place-items-center rounded-full border border-cyan bg-cyan text-center text-[9px] font-black text-zinc-950">
						DBpedia
					</div>
					<div class="mt-6 flex flex-wrap justify-center gap-2 px-4">
						{#each mindMapNodes as node, i}
							{#if node.slug !== "dbpedia"}
								<a
									href={`${base}/blog/gsoc/2026/week-0#${node.slug}`}
									class="grid h-14 w-14 place-items-center rounded-full border border-white/15 bg-white/10 p-2 text-center text-[8px] font-black text-white/75 transition hover:scale-110 hover:border-cyan hover:text-cyan"
								>
									{node.label}
								</a>
							{/if}
						{/each}
					</div>
				</div>
			</div>
		</div>
	</aside>
</div>
