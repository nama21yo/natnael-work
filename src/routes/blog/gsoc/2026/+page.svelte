<script lang="ts">
	import { base } from "$app/paths";
	import Icon from "@iconify/svelte";
	import ScrollReveal from "$lib/components/ScrollReveal.svelte";

	const gsocWeeks = [
		{ id: "week-0", title: "Week 0", date: "2026-05-22", status: "completed", excerpt: "Reading DBpedia and XLM-R models, refactoring the Amharic DBpedia website." },
		{ id: "pre-meeting", title: "Pre-Meeting", date: "2026-05-07", status: "completed", excerpt: "GSoC Kickoff: onboarding, model benchmarking, and LangGraph selection." }
	];

	const mentors = [
		{
			name: "Prof. Dr. Ricardo Usbeck",
			role: "Project Mentor & Professor of Information Systems (AI & Explainability), Leuphana University",
			href: "https://www.leuphana.de/en/institutes/iis/persons/ricardo-usbeck.html",
			bio: "Leads national and international research on knowledge graphs, LLMs, chatbots, and AI for social purposes. Bridges research and application."
		},
		{
			name: "Andargachew Tibebe Merso",
			role: "Co-Mentor & Lecturer, Addis Ababa University",
			href: "https://contact-andy.github.io/",
			bio: "Holds an MSc in Computer Science from University of Gondar. Interested in knowledge graphs and NLP."
		},
		{
			name: "Tilahun Abedissa Taffa",
			role: "Co-Mentor & PhD Researcher, Leuphana University",
			href: "https://www.leuphana.de/en/institutes/iis/persons/tilahun-taffa.html",
			bio: "Specializes in hybrid QA systems for low-resource languages like Amharic. Research associate at AI & Explainability group."
		},
		{
			name: "Hizkiel Mitiku Alemayehu",
			role: "Co-Mentor & PhD Candidate, Paderborn University",
			href: "https://scholar.google.com/citations?user=mOMRLWEAAAAJ&hl=en",
			bio: "Research focuses on NLP and Digital Humanities. Research assistant at Paderborn University, Germany."
		}
	];
</script>

<section class="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
	<ScrollReveal direction="down">
		<div class="max-w-3xl">
			<p class="section-kicker">GSoC 2026 @ DBpedia</p>
			<h1
				class="font-display text-5xl leading-tight font-black tracking-tight transition-colors duration-500 hover:text-cyan md:text-7xl"
			>
				Amharic DBpedia Ontology Mapping
			</h1>
			<p class="mt-6 text-xl leading-9 text-muted-foreground">
				Building an agentic pipeline to map Amharic text entities to DBpedia ontology classes using
				Afro-XLM-R and LangGraph. Weekly progress from Week 0 through Week 12.
			</p>
		</div>
	</ScrollReveal>
</section>

<section class="mx-auto max-w-7xl px-5 pb-20 lg:px-8">
	<div class="grid gap-8 lg:grid-cols-[1fr_1.5fr]">
		<div class="space-y-6">
			<ScrollReveal direction="right">
				<div class="rounded-[2rem] border border-foreground/10 bg-background/75 p-6">
					<p class="section-kicker">Weekly Updates</p>
					<div class="mt-4 space-y-2">
						{#each gsocWeeks as week (week.id)}
							<a
								href={`${base}/blog/gsoc/2026/${week.id}`}
								class="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-bold transition hover:bg-muted hover:text-foreground"
							>
								<div class="flex items-center gap-2">
									<div
										class="h-2 w-2 rounded-full {week.status === 'completed'
											? 'bg-emerald'
											: 'bg-amber'}"
									></div>
									<span>{week.title}</span>
								</div>
								<span class="text-xs font-normal text-muted-foreground">{week.date}</span>
							</a>
						{/each}
					</div>
				</div>
			</ScrollReveal>

			<ScrollReveal delay={100} direction="right">
				<div class="rounded-[2rem] border border-foreground/10 bg-background/75 p-6">
					<p class="section-kicker">Project Details</p>
					<div class="mt-4 space-y-3 text-sm">
						<div class="flex items-start gap-2">
							<Icon icon="iconoir:network" class="mt-0.5 shrink-0 text-cyan" width="16" />
							<span class="text-muted-foreground">Organization:</span>
							<a
								href="https://summerofcode.withgoogle.com/programs/2026/organizations/dbpedia"
								target="_blank"
								rel="noreferrer"
								class="font-bold hover:text-cyan"
							>
								DBpedia
							</a>
						</div>
						<div class="flex items-start gap-2">
							<Icon icon="iconoir:calendar" class="mt-0.5 shrink-0 text-cyan" width="16" />
							<span class="text-muted-foreground">Timeline:</span>
							<span class="font-bold">May 2026 – August 2026</span>
						</div>
						<div class="flex items-start gap-2">
							<Icon icon="iconoir:git-branch" class="mt-0.5 shrink-0 text-cyan" width="16" />
							<span class="text-muted-foreground">Duration:</span>
							<span class="font-bold">12 Weeks</span>
						</div>
					</div>
				</div>
			</ScrollReveal>

			<ScrollReveal delay={200} direction="right">
				<div class="rounded-[2rem] border border-foreground/10 bg-background/75 p-6">
					<p class="section-kicker">Tech Stack</p>
					<div class="mt-4 flex flex-wrap gap-2">
						{#each ["Afro-XLM-R", "LoRA", "LangGraph", "Python", "Transformers", "BERT"] as tech}
							<span class="rounded-full bg-muted px-3 py-1 text-sm font-bold">{tech}</span>
						{/each}
					</div>
				</div>
			</ScrollReveal>
		</div>

		<ScrollReveal delay={150} direction="left">
			<div class="rounded-[2rem] border border-foreground/10 bg-background/75 p-6">
				<p class="section-kicker">Mentors</p>
				<div class="mt-5 space-y-4">
					{#each mentors as mentor (mentor.name)}
						<a
							href={mentor.href}
							target="_blank"
							rel="noreferrer"
							class="group block rounded-2xl border border-foreground/10 bg-muted/35 p-4 transition hover:-translate-y-1 hover:border-cyan/30 hover:shadow-lg"
						>
							<div class="flex items-start justify-between">
								<div>
									<h3 class="font-black group-hover:text-cyan">{mentor.name}</h3>
									<p class="mt-0.5 text-xs font-bold text-cyan">{mentor.role}</p>
								</div>
								<Icon
									icon="iconoir:arrow-up-right"
									class="shrink-0 text-muted-foreground transition group-hover:text-cyan"
									width="16"
								/>
							</div>
							<p class="mt-2 text-sm leading-6 text-muted-foreground">{mentor.bio}</p>
						</a>
					{/each}
				</div>
			</div>
		</ScrollReveal>
	</div>
</section>
