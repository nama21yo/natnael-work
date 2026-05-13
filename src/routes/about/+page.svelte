<script lang="ts">
	import { base } from "$app/paths";
	import Icon from "@iconify/svelte";
	import AnimatedPortrait from "$lib/components/AnimatedPortrait.svelte";
	import ScrollReveal from "$lib/components/ScrollReveal.svelte";
	import ResumePreview from "$lib/components/ResumePreview.svelte";
	import {
		achievements,
		certifications,
		education,
		experience,
		profile,
		skillGroups
	} from "$lib/data/portfolio";
</script>

<section
	class="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[0.85fr_1.15fr] lg:px-8 lg:py-24"
>
	<ScrollReveal delay={100} direction="up">
		<p class="section-kicker">About and contact</p>
		<h1 class="font-display text-5xl leading-tight font-black tracking-tight md:text-7xl">
			Backend AI Engineer.
		</h1>
		<p class="mt-6 text-xl leading-9 text-muted-foreground">{profile.summary}</p>

		<div class="mt-8 flex flex-wrap gap-3">
			<a
				href={`mailto:${profile.email}`}
				class="social-cta transition-all hover:scale-110 hover:shadow-lg"
				aria-label="Email"
			>
				<Icon icon="iconoir:mail" width="18" />
			</a>
			<a
				href={profile.linkedin}
				target="_blank"
				rel="noreferrer"
				class="social-cta transition-all hover:scale-110 hover:shadow-lg"
				aria-label="LinkedIn"
			>
				<Icon icon="iconoir:linkedin" width="18" />
			</a>
			<a
				href={profile.github}
				target="_blank"
				rel="noreferrer"
				class="social-cta transition-all hover:scale-110 hover:shadow-lg"
				aria-label="GitHub"
			>
				<Icon icon="iconoir:github" width="18" />
			</a>
			<a
				href={profile.x}
				target="_blank"
				rel="noreferrer"
				class="social-cta transition-all hover:scale-110 hover:shadow-lg"
				aria-label="X"
			>
				<Icon icon="simple-icons:x" width="17" />
			</a>
			<a
				href={profile.telegram}
				target="_blank"
				rel="noreferrer"
				class="social-cta transition-all hover:scale-110 hover:shadow-lg"
				aria-label="Telegram"
			>
				<Icon icon="simple-icons:telegram" width="18" />
			</a>
		</div>
	</ScrollReveal>

	<aside class="space-y-5">
		<ScrollReveal delay={200} direction="left">
			<AnimatedPortrait compact />
		</ScrollReveal>

		<ScrollReveal delay={300} direction="left">
			<div
				class="rounded-[2rem] border border-foreground/10 bg-background/75 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-md transition-transform hover:scale-[1.02]"
			>
				<p class="section-kicker">Contact</p>
				<div class="mt-5 grid grid-cols-4 gap-3">
					<a
						class="contact-icon transition-colors hover:bg-foreground hover:text-background"
						href={`mailto:${profile.email}`}
						aria-label="Email"
					>
						<Icon icon="iconoir:mail" width="22" />
					</a>
					<a
						class="contact-icon transition-colors hover:bg-foreground hover:text-background"
						href={profile.whatsapp}
						target="_blank"
						rel="noreferrer"
						aria-label="WhatsApp"
					>
						<Icon icon="simple-icons:whatsapp" width="22" />
					</a>
					<a
						class="contact-icon transition-colors hover:bg-foreground hover:text-background"
						href={profile.telegram}
						target="_blank"
						rel="noreferrer"
						aria-label="Telegram"
					>
						<Icon icon="simple-icons:telegram" width="22" />
					</a>
					<a
						class="contact-icon transition-colors hover:bg-foreground hover:text-background"
						href={`${base}${profile.resume}`}
						target="_blank"
						rel="noreferrer"
						aria-label="Resume"
					>
						<Icon icon="iconoir:page" width="22" />
					</a>
				</div>
			</div>
		</ScrollReveal>
	</aside>
</section>

<section class="mx-auto max-w-7xl px-5 py-16 lg:px-8">
	<ScrollReveal>
		<div class="mb-12 flex flex-col items-center text-center">
			<p class="section-kicker">Interactive Resume</p>
			<h2 class="section-title">A glance at my background.</h2>
			<p class="mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">
				Explore the detailed trajectory of my work, or grab a copy for yourself.
			</p>
		</div>
		<ResumePreview resumeUrl={`${base}${profile.resume}`} />
	</ScrollReveal>
</section>

<section class="mx-auto max-w-7xl px-5 py-16 lg:px-8">
	<ScrollReveal>
		<div class="mb-8">
			<p class="section-kicker">Education</p>
			<h2 class="section-title">Academic and training foundation.</h2>
		</div>
	</ScrollReveal>

	<div class="timeline">
		{#each education as item, index (item.school)}
			<ScrollReveal delay={index * 150} direction={index % 2 === 0 ? "right" : "left"}>
				<article
					class={`timeline-card group transition-all hover:-translate-y-1 hover:shadow-xl ${index % 2 === 1 ? "md:ml-auto" : ""}`}
				>
					<div
						class="timeline-dot transition-transform group-hover:scale-125 group-hover:bg-cyan"
					></div>
					<p class="text-sm font-black tracking-[0.2em] text-cyan uppercase">{item.period}</p>
					<h3 class="mt-3 text-2xl font-black">{item.school}</h3>
					<p class="mt-1 font-bold text-amber">{item.program}</p>
					<p class="mt-4 text-sm leading-6 text-muted-foreground">{item.detail}</p>
				</article>
			</ScrollReveal>
		{/each}
	</div>
</section>

<section class="mx-auto max-w-7xl px-5 py-16 lg:px-8">
	<ScrollReveal>
		<div class="mb-8">
			<p class="section-kicker">Experience</p>
			<h2 class="section-title">Practical work with measurable outcomes.</h2>
		</div>
	</ScrollReveal>

	<div class="timeline">
		{#each experience as item, index (item.org)}
			<ScrollReveal delay={index * 150} direction={index % 2 === 0 ? "right" : "left"}>
				<article
					class={`timeline-card group transition-all hover:-translate-y-1 hover:shadow-xl ${index % 2 === 1 ? "md:ml-auto" : ""}`}
				>
					<div
						class="timeline-dot transition-transform group-hover:scale-125 group-hover:bg-cyan"
					></div>
					<div class="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
						<div>
							<h3 class="text-2xl font-black">{item.org}</h3>
							<p class="mt-1 font-bold text-cyan">{item.role}</p>
						</div>
						<p class="text-sm font-bold text-muted-foreground">{item.period}</p>
					</div>
					<ul class="mt-5 grid gap-3">
						{#each item.highlights as highlight (highlight)}
							<li
								class="flex gap-3 text-sm leading-6 text-muted-foreground transition-colors group-hover:text-foreground"
							>
								<Icon icon="iconoir:check-circle" class="mt-1 shrink-0 text-emerald" width="16" />
								<span>{highlight}</span>
							</li>
						{/each}
					</ul>
				</article>
			</ScrollReveal>
		{/each}
	</div>
</section>

<section class="mx-auto grid max-w-7xl gap-6 px-5 py-16 lg:grid-cols-2 lg:px-8">
	<ScrollReveal delay={100} direction="right">
		<div
			class="h-full rounded-[2rem] border border-foreground/10 bg-background/75 p-6 backdrop-blur-sm transition-shadow hover:shadow-lg"
		>
			<p class="section-kicker">Achievements</p>
			<ul class="mt-5 space-y-3">
				{#each achievements as item (item)}
					<li
						class="flex gap-3 text-sm leading-6 text-muted-foreground transition-colors hover:text-foreground"
					>
						<Icon icon="iconoir:medal" class="mt-1 shrink-0 text-amber" width="16" />
						<span>{item}</span>
					</li>
				{/each}
			</ul>
		</div>
	</ScrollReveal>

	<ScrollReveal delay={200} direction="left">
		<div
			class="h-full rounded-[2rem] border border-foreground/10 bg-background/75 p-6 backdrop-blur-sm transition-shadow hover:shadow-lg"
		>
			<p class="section-kicker">Certifications</p>
			<div class="mt-5 flex flex-wrap gap-2">
				{#each certifications as item (item)}
					<a
						href={item.href}
						target="_blank"
						rel="noreferrer"
						class="rounded-full bg-muted px-3 py-1 text-sm font-bold transition-all hover:scale-105 hover:bg-foreground hover:text-background hover:shadow-md"
					>
						{item.label}
					</a>
				{/each}
			</div>
		</div>
	</ScrollReveal>
</section>

<section class="mx-auto max-w-7xl px-5 py-16 lg:px-8">
	<ScrollReveal>
		<div class="mb-8">
			<p class="section-kicker">Skills</p>
			<h2 class="section-title">Tooling grouped by how it ships value.</h2>
		</div>
	</ScrollReveal>

	<div class="grid gap-5 md:grid-cols-2">
		{#each skillGroups as group, index (group.label)}
			<ScrollReveal delay={index * 100} direction="up">
				<div
					class="rounded-[1.5rem] border border-foreground/10 bg-background/75 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
				>
					<h3 class="text-xl font-black transition-colors group-hover:text-cyan">{group.label}</h3>
					<div class="mt-4 flex flex-wrap gap-2">
						{#each group.items as item (item)}
							<span
								class="cursor-default rounded-full bg-muted px-3 py-1 text-sm font-bold transition-colors hover:bg-foreground hover:text-background"
								>{item}</span
							>
						{/each}
					</div>
				</div>
			</ScrollReveal>
		{/each}
	</div>
</section>
