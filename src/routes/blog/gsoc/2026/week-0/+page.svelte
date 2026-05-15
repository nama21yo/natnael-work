<script lang="ts">
	import { base } from "$app/paths";
	import Icon from "@iconify/svelte";
	import ScrollReveal from "$lib/components/ScrollReveal.svelte";

	const sections = [
		{
			title: "Mentorship & Communication",
			icon: "iconoir:messages-bubble",
			items: [
				"Had my first onboarding meeting with mentors <strong>Ricardo Usbeck</strong>, <strong>Andargachew</strong>, <strong>Tilahun</strong>, and <strong>Hizkiel</strong>.",
				"Scheduled weekly sync meetings for <strong>Fridays at 2:00 PM</strong>.",
				"Joined all primary communication channels: <strong>Slack</strong>, <strong>WhatsApp</strong>, and <strong>Microsoft Teams</strong>."
			]
		},
		{
			title: "Research & Literature Review",
			icon: "iconoir:book-bookmark",
			items: [
				"Conducted a deep-dive revision of the <a href='https://drive.google.com/file/d/1_ZjC5mQ7WsquwVaXXjQqeI5zBXxHa4lq/view?usp=sharing' target='_blank' rel='noreferrer' class='underline hover:text-cyan'>Amharic DBpedia Chapter</a> research paper.",
				"Analyzed the three property-retriever models developed by the <a href='https://dice-research.org/team/' target='_blank' rel='noreferrer' class='underline hover:text-cyan'>DICE-Research team</a>.",
				"Refreshed core knowledge of <a href='https://huggingface.co/blog/bert-101' target='_blank' rel='noreferrer' class='underline hover:text-cyan'>Transformers and BERT</a> and efficient fine-tuning methods like <a href='https://arxiv.org/pdf/2106.09685' target='_blank' rel='noreferrer' class='underline hover:text-cyan'>LoRA</a>."
			]
		},
		{
			title: "Technical Exploration",
			icon: "iconoir:code",
			items: [
				"Performed model benchmarking on Kaggle using GPU access to evaluate <a href='https://huggingface.co/dice-research/amharic-property-retriever-mbert' target='_blank' rel='noreferrer' class='underline hover:text-cyan'>mBERT</a>, <a href='https://huggingface.co/dice-research/amharic-property-retriever-base-xlmr' target='_blank' rel='noreferrer' class='underline hover:text-cyan'>XLM-R</a>, and <a href='https://huggingface.co/dice-research/amharic-property-retriever-afro-xlmr-base' target='_blank' rel='noreferrer' class='underline hover:text-cyan'>Afro-XLM-R</a>.",
				"Validated <strong>Afro-XLM-R</strong> as the optimal base model for Amharic ontology mapping.",
				"Selected <strong>LangGraph</strong> as the primary framework for the agentic orchestration layer — used in production by companies like LinkedIn with strong community support across Python and JavaScript."
			]
		},
		{
			title: "Documentation & Branding",
			icon: "iconoir:portfolio",
			items: [
				"Developed and launched a personal <a href='https://nama21yo.github.io/natnael-work/' target='_blank' rel='noreferrer' class='underline hover:text-cyan'>portfolio website</a>.",
				"Started writing weekly GSoC progress blog posts (this being Week 0!).",
				"Prepared a technical reference document for mentors outlining the proposed development roadmap."
			]
		}
	];

	const resources = [
		{ label: "Amharic DBpedia Chapter Paper", href: "https://drive.google.com/file/d/1_ZjC5mQ7WsquwVaXXjQqeI5zBXxHa4lq/view?usp=sharing" },
		{ label: "Afro-XLM-R Model", href: "https://huggingface.co/dice-research/amharic-property-retriever-afro-xlmr-base" },
		{ label: "LoRA Paper", href: "https://arxiv.org/pdf/2106.09685" },
		{ label: "BERT Blog", href: "https://huggingface.co/blog/bert-101" },
		{ label: "mBERT Model", href: "https://huggingface.co/dice-research/amharic-property-retriever-mbert" },
		{ label: "XLM-R Model", href: "https://huggingface.co/dice-research/amharic-property-retriever-base-xlmr" },
		{ label: "DICE-Research Team", href: "https://dice-research.org/team/" },
		{ label: "GSoC 2026 DBpedia", href: "https://summerofcode.withgoogle.com/programs/2026/organizations/dbpedia" }
	];
</script>

<section class="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
	<ScrollReveal direction="down">
		<div>
			<a
				href={`${base}/blog/gsoc/2026`}
				class="inline-flex items-center gap-1.5 text-sm font-bold text-muted-foreground transition hover:text-foreground"
			>
				<Icon icon="iconoir:arrow-left" width="16" />
				GSoC 2026 @ DBpedia
			</a>
			<div class="mt-6 flex items-center gap-3">
				<span
					class="inline-flex items-center gap-1 rounded-full bg-emerald/20 px-3 py-1 text-xs font-black text-emerald uppercase"
				>
					Week 0
				</span>
				<span class="text-sm font-bold text-muted-foreground">2026-05-07 — 2026-05-15</span>
			</div>
			<h1
				class="mt-4 font-display text-5xl leading-tight font-black tracking-tight transition-colors duration-500 md:text-6xl"
			>
				Kicking off GSoC 2026: Onboarding & Model Benchmarking
			</h1>
			<p class="mt-6 text-xl leading-9 text-muted-foreground">
				Week 0 was all about onboarding, research orientation, and model benchmarking. Here's a
				detailed breakdown of everything I worked on.
			</p>
		</div>
	</ScrollReveal>
</section>

<section class="mx-auto max-w-7xl px-5 pb-20 lg:px-8">
	<div class="grid gap-8 lg:grid-cols-[1fr_22rem]">
		<div class="space-y-8">
			{#each sections as section, i (section.title)}
				<ScrollReveal delay={i * 100} direction="up">
					<div class="rounded-[2rem] border border-foreground/10 bg-background/75 p-6">
						<div class="flex items-center gap-3">
							<div class="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan/10">
								<Icon icon={section.icon} class="text-cyan" width="20" />
							</div>
							<h2 class="text-xl font-black">{section.title}</h2>
						</div>
						<ul class="mt-5 space-y-3">
							{#each section.items as item (item)}
								<li class="flex gap-3 text-sm leading-7 text-muted-foreground">
									<Icon
										icon="iconoir:check-circle"
										class="mt-1.5 shrink-0 rounded-full bg-emerald/20 p-0.5 text-emerald"
										width="16"
									/>
									<span>{@html item}</span>
								</li>
							{/each}
						</ul>
					</div>
				</ScrollReveal>
			{/each}
		</div>

		<aside class="space-y-6">
			<ScrollReveal delay={150} direction="left">
				<div class="rounded-[2rem] border border-foreground/10 bg-background/75 p-6">
					<p class="section-kicker">Referenced Resources</p>
					<div class="mt-4 space-y-2">
						{#each resources as resource (resource.label)}
							<a
								href={resource.href}
								target="_blank"
								rel="noreferrer"
								class="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold text-muted-foreground transition hover:-translate-x-1 hover:bg-muted hover:text-foreground"
							>
								<Icon icon="iconoir:link" class="shrink-0 text-cyan" width="14" />
								{resource.label}
							</a>
						{/each}
					</div>
				</div>
			</ScrollReveal>

			<ScrollReveal delay={250} direction="left">
				<div class="rounded-[2rem] border border-foreground/10 bg-background/75 p-6">
					<p class="section-kicker">Key Findings</p>
					<div class="mt-4 space-y-3">
						<div class="rounded-xl border border-foreground/10 bg-muted/35 p-3">
							<p class="text-sm font-black text-cyan">Best Base Model</p>
							<p class="mt-1 text-sm text-muted-foreground">
								Afro-XLM-R outperforms mBERT and XLM-R on Amharic ontology tasks.
							</p>
						</div>
						<div class="rounded-xl border border-foreground/10 bg-muted/35 p-3">
							<p class="text-sm font-black text-cyan">Orchestration</p>
							<p class="mt-1 text-sm text-muted-foreground">
								LangGraph chosen for production-readiness and multi-language SDK support.
							</p>
						</div>
						<div class="rounded-xl border border-foreground/10 bg-muted/35 p-3">
							<p class="text-sm font-black text-cyan">Fine-tuning</p>
							<p class="mt-1 text-sm text-muted-foreground">
								LoRA enables efficient adaptation without full model retraining.
							</p>
						</div>
					</div>
				</div>
			</ScrollReveal>
		</aside>
	</div>
</section>
