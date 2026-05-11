<script lang="ts">
	import { base } from "$app/paths";
	import Icon from "@iconify/svelte";
	import AnimatedPortrait from "$lib/components/AnimatedPortrait.svelte";
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
	<div>
		<p class="section-kicker">About and contact</p>
		<h1 class="font-display text-5xl leading-tight font-black tracking-tight md:text-7xl">
			Backend AI Engineer.
		</h1>
		<p class="mt-6 text-xl leading-9 text-muted-foreground">{profile.summary}</p>

		<div class="mt-8 flex flex-wrap gap-3">
			<a href={`mailto:${profile.email}`} class="social-cta" aria-label="Email">
				<Icon icon="iconoir:mail" width="18" />
			</a>
			<a
				href={profile.linkedin}
				target="_blank"
				rel="noreferrer"
				class="social-cta"
				aria-label="LinkedIn"
			>
				<Icon icon="iconoir:linkedin" width="18" />
			</a>
			<a
				href={profile.github}
				target="_blank"
				rel="noreferrer"
				class="social-cta"
				aria-label="GitHub"
			>
				<Icon icon="iconoir:github" width="18" />
			</a>
			<a href={profile.x} target="_blank" rel="noreferrer" class="social-cta" aria-label="X">
				<Icon icon="simple-icons:x" width="17" />
			</a>
			<a
				href={profile.telegram}
				target="_blank"
				rel="noreferrer"
				class="social-cta"
				aria-label="Telegram"
			>
				<Icon icon="simple-icons:telegram" width="18" />
			</a>
		</div>
	</div>

	<aside class="space-y-5">
		<AnimatedPortrait compact />

		<div
			class="rounded-[2rem] border border-foreground/10 bg-background/75 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)]"
		>
			<p class="section-kicker">Contact</p>
			<div class="mt-5 grid grid-cols-4 gap-3">
				<a class="contact-icon" href={`mailto:${profile.email}`} aria-label="Email">
					<Icon icon="iconoir:mail" width="22" />
				</a>
				<a
					class="contact-icon"
					href={profile.whatsapp}
					target="_blank"
					rel="noreferrer"
					aria-label="WhatsApp"
				>
					<Icon icon="simple-icons:whatsapp" width="22" />
				</a>
				<a
					class="contact-icon"
					href={profile.telegram}
					target="_blank"
					rel="noreferrer"
					aria-label="Telegram"
				>
					<Icon icon="simple-icons:telegram" width="22" />
				</a>
				<a
					class="contact-icon"
					href={`${base}${profile.resume}`}
					target="_blank"
					rel="noreferrer"
					aria-label="Resume"
				>
					<Icon icon="iconoir:page" width="22" />
				</a>
			</div>
		</div>
	</aside>
</section>

<section class="mx-auto max-w-7xl px-5 py-16 lg:px-8">
	<div class="mb-8">
		<p class="section-kicker">Education</p>
		<h2 class="section-title">Academic and training foundation.</h2>
	</div>

	<div class="timeline">
		{#each education as item, index (item.school)}
			<article class={`timeline-card ${index % 2 === 1 ? "md:ml-auto" : ""}`}>
				<div class="timeline-dot"></div>
				<p class="text-sm font-black tracking-[0.2em] text-cyan uppercase">{item.period}</p>
				<h3 class="mt-3 text-2xl font-black">{item.school}</h3>
				<p class="mt-1 font-bold text-amber">{item.program}</p>
				<p class="mt-4 text-sm leading-6 text-muted-foreground">{item.detail}</p>
			</article>
		{/each}
	</div>
</section>

<section class="mx-auto max-w-7xl px-5 py-16 lg:px-8">
	<div class="mb-8">
		<p class="section-kicker">Experience</p>
		<h2 class="section-title">Practical work with measurable outcomes.</h2>
	</div>

	<div class="timeline">
		{#each experience as item, index (item.org)}
			<article class={`timeline-card ${index % 2 === 1 ? "md:ml-auto" : ""}`}>
				<div class="timeline-dot"></div>
				<div class="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
					<div>
						<h3 class="text-2xl font-black">{item.org}</h3>
						<p class="mt-1 font-bold text-cyan">{item.role}</p>
					</div>
					<p class="text-sm font-bold text-muted-foreground">{item.period}</p>
				</div>
				<ul class="mt-5 grid gap-3">
					{#each item.highlights as highlight (highlight)}
						<li class="flex gap-3 text-sm leading-6 text-muted-foreground">
							<Icon icon="iconoir:check-circle" class="mt-1 shrink-0 text-emerald" width="16" />
							<span>{highlight}</span>
						</li>
					{/each}
				</ul>
			</article>
		{/each}
	</div>
</section>

<section class="mx-auto grid max-w-7xl gap-6 px-5 py-16 lg:grid-cols-2 lg:px-8">
	<div class="rounded-[2rem] border border-foreground/10 bg-background/75 p-6">
		<p class="section-kicker">Achievements</p>
		<ul class="mt-5 space-y-3">
			{#each achievements as item (item)}
				<li class="flex gap-3 text-sm leading-6 text-muted-foreground">
					<Icon icon="iconoir:medal" class="mt-1 shrink-0 text-amber" width="16" />
					<span>{item}</span>
				</li>
			{/each}
		</ul>
	</div>

	<div class="rounded-[2rem] border border-foreground/10 bg-background/75 p-6">
		<p class="section-kicker">Certifications</p>
		<div class="mt-5 flex flex-wrap gap-2">
			{#each certifications as item (item)}
				<a
					href={item.href}
					target="_blank"
					rel="noreferrer"
					class="rounded-full bg-muted px-3 py-1 text-sm font-bold transition hover:bg-foreground hover:text-background"
				>
					{item.label}
				</a>
			{/each}
		</div>
	</div>
</section>

<section class="mx-auto max-w-7xl px-5 py-16 lg:px-8">
	<div class="mb-8">
		<p class="section-kicker">Skills</p>
		<h2 class="section-title">Tooling grouped by how it ships value.</h2>
	</div>

	<div class="grid gap-5 md:grid-cols-2">
		{#each skillGroups as group (group.label)}
			<div class="rounded-[1.5rem] border border-foreground/10 bg-background/75 p-6">
				<h3 class="text-xl font-black">{group.label}</h3>
				<div class="mt-4 flex flex-wrap gap-2">
					{#each group.items as item (item)}
						<span class="rounded-full bg-muted px-3 py-1 text-sm font-bold">{item}</span>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</section>
