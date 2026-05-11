<script lang="ts">
	import "./layout.css";

	import { page } from "$app/state";
	import { base } from "$app/paths";
	import { ModeWatcher } from "mode-watcher";
	import { mode, toggleMode } from "mode-watcher";
	import Icon from "@iconify/svelte";

	import favicon from "$lib/assets/favicon.svg";
	import { profile } from "$lib/data/portfolio";

	let { children } = $props();

	const navItems = [
		{ href: `${base}/`, path: "/", label: "Home", icon: "iconoir:home" },
		{ href: `${base}/projects`, path: "/projects", label: "Projects", icon: "iconoir:database-script" },
		{ href: `${base}/blog`, path: "/blog", label: "Blogs", icon: "iconoir:book-stack" },
		{ href: `${base}/about`, path: "/about", label: "About", icon: "iconoir:user-star" }
	];

	const socials = [
		{ href: `mailto:${profile.email}`, icon: "iconoir:mail", label: "Email" },
		{ href: profile.linkedin, icon: "iconoir:linkedin", label: "LinkedIn" },
		{ href: profile.github, icon: "iconoir:github", label: "GitHub" },
		{ href: profile.x, icon: "simple-icons:x", label: "X" },
		{ href: profile.telegram, icon: "simple-icons:telegram", label: "Telegram" },
		{ href: profile.whatsapp, icon: "simple-icons:whatsapp", label: "WhatsApp" }
	];

	function isActive(path: string) {
		const pathname = base && page.url.pathname.startsWith(base)
			? page.url.pathname.slice(base.length) || "/"
			: page.url.pathname;
		if (path === "/") return pathname === "/";
		return pathname.startsWith(path);
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>{profile.name} | Backend AI Engineer</title>
	<meta
		name="description"
		content="Natnael Yohanes portfolio: Backend AI Engineer focused on ML systems, system design, distributed systems, and blockchain infrastructure."
	/>

	<meta property="og:title" content="{profile.name} | Backend AI Engineer" />
	<meta property="og:description" content={profile.summary} />
	<meta property="og:url" content={page.url.href} />
	<meta property="og:type" content="website" />

	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<ModeWatcher />

<div class="min-h-screen overflow-hidden bg-background text-foreground">
	<div class="pointer-events-none fixed inset-0 -z-10">
		<div
			class="absolute top-[-12rem] left-[-10rem] h-96 w-96 rounded-full bg-cyan/20 blur-3xl"
		></div>
		<div
			class="absolute top-24 right-[-8rem] h-[28rem] w-[28rem] rounded-full bg-amber/20 blur-3xl"
		></div>
		<div
			class="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.045)_1px,transparent_1px)] bg-[size:44px_44px] dark:bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)]"
		></div>
	</div>

	<header class="sticky top-0 z-50 px-4 pt-4">
		<nav
			class="mx-auto flex max-w-7xl items-center justify-between gap-5 rounded-[1.4rem] border border-foreground/10 bg-background/78 px-4 py-3 shadow-[0_18px_70px_rgba(15,23,42,0.08)] backdrop-blur-xl lg:px-5"
		>
			<a href={`${base}/`} class="group flex items-center gap-3">
				<span
					class="grid h-11 w-11 place-items-center rounded-2xl bg-foreground font-black text-background shadow-[6px_6px_0_var(--cyan)] transition group-hover:-translate-y-0.5 group-hover:rotate-3"
				>
					NY
				</span>
				<span class="hidden sm:block">
					<span class="block font-mono text-lg font-black tracking-tight">Natnael Yohanes</span>
					<span class="block text-xs font-bold tracking-[0.22em] text-muted-foreground uppercase">
						Backend AI
					</span>
				</span>
			</a>

			<div
				class="hidden items-center gap-1 rounded-[1.2rem] border border-foreground/10 bg-muted/50 p-1 md:flex"
			>
				{#each navItems as item (item.href)}
					<a
						href={item.href}
						aria-current={isActive(item.path) ? "page" : undefined}
						class={`group inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-black tracking-[0.12em] uppercase transition ${
							isActive(item.path)
								? "bg-foreground text-background shadow-[0_10px_30px_rgba(15,23,42,0.16)]"
								: "text-muted-foreground hover:-translate-y-0.5 hover:bg-background hover:text-foreground"
						}`}
					>
						<Icon icon={item.icon} width="16" />
						{item.label}
					</a>
				{/each}
			</div>

			<div class="flex items-center gap-2">
				{#each socials.slice(0, 3) as social (social.label)}
					<a
						href={social.href}
						target={social.href.startsWith("mailto") ? undefined : "_blank"}
						rel="noreferrer"
						class="hidden h-10 w-10 place-items-center rounded-full border border-foreground/10 transition hover:-translate-y-0.5 hover:border-foreground hover:bg-foreground hover:text-background sm:grid"
						aria-label={social.label}
					>
						<Icon icon={social.icon} width="17" />
					</a>
				{/each}
				<button
					onclick={toggleMode}
					class="grid h-10 w-10 place-items-center rounded-full border border-foreground/10 transition hover:border-foreground hover:bg-muted"
					aria-label="Toggle theme"
				>
					{#if mode.current === "dark"}
						<Icon icon="iconoir:sun-light" width="18" />
					{:else}
						<Icon icon="iconoir:half-moon" width="18" />
					{/if}
				</button>
			</div>
		</nav>

		<div class="flex gap-1.5 overflow-x-auto px-3 pb-4 md:hidden">
			{#each navItems as item (item.href)}
				<a
					href={item.href}
					class={`shrink-0 rounded-full px-3 py-2 text-[0.68rem] font-black tracking-[0.14em] uppercase ${
						isActive(item.path) ? "bg-foreground text-background" : "bg-muted text-muted-foreground"
					}`}
				>
					<Icon icon={item.icon} width="14" />
					{item.label}
				</a>
			{/each}
		</div>
	</header>

	<main>
		{@render children()}
	</main>

	<footer class="border-t border-foreground/10">
		<div class="mx-auto grid max-w-7xl gap-8 px-5 py-10 lg:grid-cols-[1fr_auto] lg:px-8">
			<div>
				<p class="font-display text-2xl font-black">{profile.name}</p>
				<p class="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">{profile.summary}</p>
			</div>
			<div class="flex flex-wrap items-center gap-3">
				{#each socials as social (social.label)}
					<a
						class="footer-link grid h-11 w-11 place-items-center px-0!"
						href={social.href}
						target={social.href.startsWith("mailto") ? undefined : "_blank"}
						rel="noreferrer"
						aria-label={social.label}
					>
						<Icon icon={social.icon} width="18" />
					</a>
				{/each}
				<a class="footer-link" href={`${base}${profile.resume}`} target="_blank" rel="noreferrer"
					>CV</a
				>
			</div>
		</div>
	</footer>
</div>
