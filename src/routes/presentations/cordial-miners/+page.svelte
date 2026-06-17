<script lang="ts">
	import { onMount } from "svelte";
	import { base } from "$app/paths";
	import Icon from "@iconify/svelte";
	import { profile } from "$lib/data/portfolio";

	const slideCount = 3;
	const slideNumbers = Array.from({ length: slideCount }, (_, index) => index);
	let activeSlide = 0;
	let deckElement: HTMLElement;

	function goToSlide(index: number) {
		activeSlide = Math.max(0, Math.min(slideCount - 1, index));
	}

	function toggleFullscreen() {
		if (!document.fullscreenElement) {
			deckElement?.requestFullscreen();
			return;
		}

		document.exitFullscreen();
	}

	onMount(() => {
		const handleKeydown = (event: KeyboardEvent) => {
			if (event.key === "ArrowRight" || event.key === " " || event.key === "PageDown") {
				event.preventDefault();
				goToSlide(activeSlide + 1);
			}

			if (event.key === "ArrowLeft" || event.key === "PageUp") {
				event.preventDefault();
				goToSlide(activeSlide - 1);
			}

			if (event.key === "Home") {
				event.preventDefault();
				goToSlide(0);
			}

			if (event.key === "End") {
				event.preventDefault();
				goToSlide(slideCount - 1);
			}
		};

		window.addEventListener("keydown", handleKeydown);
		return () => window.removeEventListener("keydown", handleKeydown);
	});
</script>

<svelte:head>
	<title>Cordial Miners Quarter Report | {profile.name}</title>
	<meta
		name="description"
		content="An interactive presentation about Cordial Miners and its integration with f1r3node."
	/>
</svelte:head>

<section class="presentation-shell mx-auto max-w-[96rem] px-3 py-8 md:px-6 md:py-12">
	<div class="mb-4 flex flex-wrap items-center justify-between gap-3 px-2">
		<a
			href={`${base}/presentations`}
			class="inline-flex items-center gap-2 text-xs font-black tracking-[0.16em] text-muted-foreground uppercase transition hover:text-foreground"
		>
			<Icon icon="iconoir:arrow-left" width="16" />
			All presentations
		</a>
		<div class="flex items-center gap-2">
			<span class="hidden text-xs font-bold text-muted-foreground sm:inline">
				Use ← → or space
			</span>
			<button
				type="button"
				class="deck-icon-button"
				onclick={toggleFullscreen}
				aria-label="Toggle fullscreen"
			>
				<Icon icon="iconoir:expand" width="17" />
			</button>
		</div>
	</div>

	<div class="deck" bind:this={deckElement}>
		<div class="deck-progress" aria-hidden="true">
			<span style={`width:${((activeSlide + 1) / slideCount) * 100}%`}></span>
		</div>

		<div class="deck-track" style={`transform:translateX(-${activeSlide * 100}%)`}>
			<section class="slide slide-cover" aria-hidden={activeSlide !== 0}>
				<div class="cover-grid" aria-hidden="true"></div>
				<div class="cover-orbit cover-orbit-one" aria-hidden="true"></div>
				<div class="cover-orbit cover-orbit-two" aria-hidden="true"></div>

				<div class="cover-copy">
					<div class="deck-kicker">
						<span></span>
						Quarter One · Engineering Report
					</div>
					<h1>
						Cordial Miners
						<strong>Quarter Report</strong>
					</h1>
					<p>
						From protocol research to a non-breaking consensus prototype inside the f1r3node
						ecosystem.
					</p>
				</div>

				<div class="cover-footer">
					<div>
						<span>Presented by</span>
						<strong>{profile.name}</strong>
						<small>{profile.role} · Addis Ababa, Ethiopia</small>
					</div>
					<div class="cover-mark" aria-hidden="true">
						<span>τ</span>
						<small>blocklace → order</small>
					</div>
				</div>
			</section>

			<section class="slide slide-protocol" aria-hidden={activeSlide !== 1}>
				<div class="slide-heading">
					<div>
						<p class="deck-kicker"><span></span> The protocol</p>
						<h2>Consensus grows from a <em>blocklace.</em></h2>
					</div>
					<p>
						Cordial Miners is a family of Byzantine Atomic Broadcast protocols. Instead of forcing
						every event into one chain, miners cooperatively build a DAG and derive the same safe
						order locally.
					</p>
				</div>

				<div class="protocol-layout">
					<div class="blocklace-panel">
						<div class="blocklace-label">
							<span>Local partial view</span>
							<strong>One DAG, many parents</strong>
						</div>
						<svg
							class="blocklace-svg"
							viewBox="0 0 640 350"
							role="img"
							aria-label="Animated blocklace DAG"
						>
							<defs>
								<linearGradient id="pathGradient" x1="0" x2="1">
									<stop offset="0" stop-color="#68dce6" />
									<stop offset="1" stop-color="#a68cff" />
								</linearGradient>
							</defs>
							<g class="dag-paths">
								<path d="M98 70 L220 70 L340 70 L466 70" />
								<path d="M98 145 L220 145 L340 145 L466 145" />
								<path d="M98 220 L220 220 L340 220 L466 220" />
								<path d="M98 295 L220 295 L340 295 L466 295" />
								<path d="M98 70 L220 145 M98 145 L220 70 M98 220 L220 145 M98 295 L220 220" />
								<path d="M220 70 L340 145 M220 145 L340 220 M220 220 L340 295 M220 295 L340 220" />
								<path d="M340 70 L466 145 M340 145 L466 70 M340 220 L466 145 M340 295 L466 220" />
								<path class="equivocation-path" d="M220 145 L335 118 M220 145 L335 172" />
								<path
									class="tau-path"
									d="M466 70 C530 70 522 145 570 145 C522 145 530 220 466 220"
								/>
							</g>
							<g class="round-labels">
								<text x="82" y="330">r</text>
								<text x="198" y="330">r + 1</text>
								<text x="318" y="330">r + 2</text>
								<text x="444" y="330">r + 3</text>
								<text x="555" y="330">τ</text>
							</g>
							<g class="dag-nodes">
								{#each [[98, 70, "cyan"], [98, 145, "amber"], [98, 220, "violet"], [98, 295, "emerald"], [220, 70, "cyan"], [220, 145, "amber"], [220, 220, "violet"], [220, 295, "emerald"], [340, 70, "cyan"], [340, 220, "violet"], [340, 295, "emerald"], [466, 70, "cyan"], [466, 145, "amber"], [466, 220, "violet"], [466, 295, "emerald"]] as node, index (index)}
									<circle
										class={`dag-node node-${node[2]}`}
										cx={node[0]}
										cy={node[1]}
										r="13"
										style={`--node-delay:${index * -110}ms`}
									/>
								{/each}
								<circle class="dag-node node-equivocation" cx="340" cy="118" r="13" />
								<circle class="dag-node node-equivocation" cx="340" cy="172" r="13" />
								<circle class="tau-node" cx="570" cy="145" r="25" />
								<text class="tau-symbol" x="570" y="153" text-anchor="middle">τ</text>
							</g>
						</svg>
						<div class="blocklace-note">
							<span class="note-dot"></span>
							Blocks may reference several predecessors; each node can hold a different partial view.
						</div>
					</div>

					<div class="protocol-pillars">
						<article class="pillar pillar-dissemination">
							<span class="pillar-number">01</span>
							<div>
								<h3>Dissemination</h3>
								<p>
									Send new blocks directly. Their pointers reveal what a peer knows, so missing
									history can be repaired.
								</p>
							</div>
							<Icon class="pillar-icon" icon="iconoir:network-right" width="26" />
						</article>
						<article class="pillar pillar-equivocation">
							<span class="pillar-number">02</span>
							<div>
								<h3>Equivocation exclusion</h3>
								<p>
									Conflicting blocks may exist in the DAG, but approval rules keep tainted branches
									out of final output.
								</p>
							</div>
							<Icon class="pillar-icon" icon="iconoir:warning-triangle" width="26" />
						</article>
						<article class="pillar pillar-ordering">
							<span class="pillar-number">03</span>
							<div>
								<h3>Ordering</h3>
								<p>
									Final leaders anchor τ, which topologically converts eligible DAG history into a
									stable local sequence.
								</p>
							</div>
							<Icon class="pillar-icon" icon="iconoir:sort-down" width="26" />
						</article>
					</div>
				</div>
			</section>

			<section class="slide slide-stack" aria-hidden={activeSlide !== 2}>
				<div class="shard-sky" aria-hidden="true">
					<div class="shard-node shard-rchain"><span>RChain</span></div>
					<div class="shard-node shard-asi"><span>ASIChain</span></div>
					<div class="shard-node shard-domain"><span>Your domain</span></div>
					<div class="shard-hub">
						<span>f1r3</span>
						<small>node</small>
					</div>
				</div>

				<div class="stack-layout">
					<div class="stack-copy">
						<p class="deck-kicker"><span></span> The host stack</p>
						<h2>f1r3node is not <em>one blockchain.</em></h2>
						<p class="stack-lead">
							It is a reusable node stack for quickly building the shard that best fits a domain.
						</p>
						<p>
							A domain chain can reuse networking, APIs, execution, storage, and validator
							infrastructure while selecting the consensus path and policies it needs. Cordial
							Miners proves that boundary by running as an explicit prototype mode alongside CBC
							Casper.
						</p>
						<div class="stack-callout">
							<Icon class="callout-icon" icon="iconoir:git-branch" width="22" />
							<span><strong>Same host capabilities.</strong> Different purpose-built shards.</span>
						</div>
					</div>

					<div class="stack-diagram">
						<div class="stack-layer layer-domain">
							<span class="layer-index">05</span>
							<div>
								<small>Domain shard</small>
								<strong>RChain · ASIChain · your chain</strong>
							</div>
							<Icon class="layer-icon" icon="iconoir:community" width="24" />
						</div>
						<div class="stack-layer layer-api">
							<span class="layer-index">04</span>
							<div>
								<small>Node-facing services</small>
								<strong>gRPC · HTTP · config · queries</strong>
							</div>
							<Icon class="layer-icon" icon="iconoir:server" width="24" />
						</div>
						<div class="stack-layer layer-runtime">
							<span class="layer-index">03</span>
							<div>
								<small>Execution and state</small>
								<strong>Rholang · RuntimeManager · RSpace</strong>
							</div>
							<Icon class="layer-icon" icon="iconoir:code-brackets" width="24" />
						</div>
						<div class="stack-layer layer-consensus">
							<span class="layer-index">02</span>
							<div>
								<small>Selectable consensus</small>
								<strong>CBC Casper <b>or</b> Cordial Miners</strong>
							</div>
							<Icon class="layer-icon" icon="iconoir:git-merge" width="24" />
						</div>
						<div class="stack-layer layer-infra">
							<span class="layer-index">01</span>
							<div>
								<small>Node infrastructure</small>
								<strong>Transport · persistence · validator identity</strong>
							</div>
							<Icon class="layer-icon" icon="iconoir:database" width="24" />
						</div>
					</div>
				</div>
			</section>
		</div>

		<div class="deck-controls">
			<button
				type="button"
				onclick={() => goToSlide(activeSlide - 1)}
				disabled={activeSlide === 0}
				aria-label="Previous slide"
			>
				<Icon icon="iconoir:arrow-left" width="19" />
			</button>

			<div class="deck-dots" aria-label="Choose slide">
				{#each slideNumbers as index (index)}
					<button
						type="button"
						class:active={activeSlide === index}
						onclick={() => goToSlide(index)}
						aria-label={`Go to slide ${index + 1}`}
						aria-current={activeSlide === index ? "step" : undefined}
					></button>
				{/each}
			</div>

			<span class="deck-counter">{String(activeSlide + 1).padStart(2, "0")} / 03</span>

			<button
				type="button"
				onclick={() => goToSlide(activeSlide + 1)}
				disabled={activeSlide === slideCount - 1}
				aria-label="Next slide"
			>
				<Icon icon="iconoir:arrow-right" width="19" />
			</button>
		</div>
	</div>
</section>

<style>
	.presentation-shell {
		--deck-ink: #f4f7fb;
		--deck-muted: rgba(244, 247, 251, 0.62);
		--deck-line: rgba(255, 255, 255, 0.12);
		--deck-cyan: #6fe5ec;
		--deck-amber: #f6c96b;
		--deck-violet: #a594ff;
		--deck-emerald: #75dfa8;
	}

	.deck {
		position: relative;
		overflow: hidden;
		min-height: min(79vh, 780px);
		border: 1px solid rgba(255, 255, 255, 0.12);
		border-radius: 2rem;
		background: #11141c;
		color: var(--deck-ink);
		box-shadow: 0 40px 140px rgba(15, 23, 42, 0.28);
		isolation: isolate;
	}

	.deck:fullscreen {
		width: 100vw;
		height: 100vh;
		min-height: 100vh;
		border: 0;
		border-radius: 0;
	}

	.deck-progress {
		position: absolute;
		top: 0;
		right: 0;
		left: 0;
		z-index: 20;
		height: 4px;
		background: rgba(255, 255, 255, 0.08);
	}

	.deck-progress span {
		display: block;
		height: 100%;
		background: linear-gradient(90deg, var(--deck-cyan), var(--deck-violet));
		transition: width 500ms cubic-bezier(0.22, 1, 0.36, 1);
	}

	.deck-track {
		display: flex;
		min-height: inherit;
		transition: transform 650ms cubic-bezier(0.22, 1, 0.36, 1);
	}

	.slide {
		position: relative;
		flex: 0 0 100%;
		width: 100%;
		min-height: inherit;
		overflow: hidden;
		padding: clamp(2rem, 5vw, 5.4rem);
		padding-bottom: clamp(6rem, 8vw, 7rem);
	}

	.slide-cover {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		background:
			radial-gradient(circle at 82% 20%, rgba(111, 229, 236, 0.2), transparent 30%),
			radial-gradient(circle at 12% 88%, rgba(165, 148, 255, 0.17), transparent 34%), #10131a;
	}

	.cover-grid {
		position: absolute;
		inset: 0;
		opacity: 0.2;
		background-image:
			linear-gradient(rgba(255, 255, 255, 0.12) 1px, transparent 1px),
			linear-gradient(90deg, rgba(255, 255, 255, 0.12) 1px, transparent 1px);
		background-size: 54px 54px;
		mask-image: radial-gradient(circle at 70% 40%, black, transparent 72%);
	}

	.cover-orbit {
		position: absolute;
		right: -7rem;
		top: 50%;
		border: 1px dashed rgba(255, 255, 255, 0.2);
		border-radius: 50%;
		animation: coverOrbit 22s linear infinite;
	}

	.cover-orbit::before,
	.cover-orbit::after {
		content: "";
		position: absolute;
		width: 1rem;
		height: 1rem;
		border-radius: 50%;
		background: var(--deck-cyan);
		box-shadow: 0 0 28px var(--deck-cyan);
	}

	.cover-orbit::before {
		top: 8%;
		left: 23%;
	}

	.cover-orbit::after {
		right: 7%;
		bottom: 25%;
		background: var(--deck-violet);
		box-shadow: 0 0 28px var(--deck-violet);
	}

	.cover-orbit-one {
		width: 36rem;
		height: 36rem;
	}

	.cover-orbit-two {
		right: 1rem;
		width: 25rem;
		height: 25rem;
		animation-direction: reverse;
		animation-duration: 16s;
	}

	.cover-copy,
	.cover-footer {
		position: relative;
		z-index: 3;
	}

	.deck-kicker {
		display: flex;
		align-items: center;
		gap: 0.65rem;
		color: var(--deck-cyan);
		font-size: 0.72rem;
		font-weight: 900;
		letter-spacing: 0.2em;
		text-transform: uppercase;
	}

	.deck-kicker span {
		width: 1.8rem;
		height: 2px;
		background: currentColor;
	}

	.cover-copy h1 {
		max-width: 58rem;
		margin-top: 1.8rem;
		font-family: var(--font-display);
		font-size: clamp(4rem, 8.8vw, 9rem);
		font-weight: 900;
		letter-spacing: -0.07em;
		line-height: 0.79;
	}

	.cover-copy h1 strong {
		display: block;
		color: transparent;
		-webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.65);
	}

	.cover-copy p {
		max-width: 43rem;
		margin-top: 2rem;
		color: var(--deck-muted);
		font-size: clamp(1rem, 1.5vw, 1.3rem);
		line-height: 1.7;
	}

	.cover-footer {
		display: flex;
		align-items: end;
		justify-content: space-between;
		gap: 2rem;
	}

	.cover-footer > div:first-child {
		display: grid;
		gap: 0.2rem;
	}

	.cover-footer span,
	.cover-footer small {
		color: var(--deck-muted);
		font-size: 0.69rem;
		font-weight: 800;
		letter-spacing: 0.16em;
		text-transform: uppercase;
	}

	.cover-footer strong {
		font-size: 1.2rem;
	}

	.cover-mark {
		display: grid;
		min-width: 9rem;
		place-items: center;
		border: 1px solid var(--deck-line);
		border-radius: 1.4rem;
		background: rgba(255, 255, 255, 0.055);
		padding: 1rem 1.4rem;
		backdrop-filter: blur(12px);
		rotate: -3deg;
		animation: markFloat 4s ease-in-out infinite;
	}

	.cover-mark span {
		color: var(--deck-ink);
		font-family: var(--font-display);
		font-size: 3rem;
		line-height: 1;
	}

	.slide-protocol {
		background:
			radial-gradient(circle at 15% 20%, rgba(111, 229, 236, 0.12), transparent 28%), #11141c;
	}

	.slide-heading {
		position: relative;
		z-index: 2;
		display: grid;
		gap: 1.5rem;
		margin-bottom: 2.2rem;
	}

	.slide-heading h2,
	.stack-copy h2 {
		max-width: 48rem;
		margin-top: 0.8rem;
		font-family: var(--font-display);
		font-size: clamp(2.65rem, 5vw, 5.1rem);
		font-weight: 900;
		letter-spacing: -0.05em;
		line-height: 0.95;
	}

	.slide-heading h2 em,
	.stack-copy h2 em {
		color: var(--deck-cyan);
		font-style: normal;
	}

	.slide-heading > p {
		max-width: 42rem;
		align-self: end;
		color: var(--deck-muted);
		font-size: 0.96rem;
		line-height: 1.7;
	}

	.protocol-layout {
		position: relative;
		z-index: 2;
		display: grid;
		gap: 1.2rem;
	}

	.blocklace-panel {
		position: relative;
		overflow: hidden;
		min-height: 26rem;
		border: 1px solid var(--deck-line);
		border-radius: 1.7rem;
		background:
			linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),
			linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
			rgba(255, 255, 255, 0.025);
		background-size: 32px 32px;
	}

	.blocklace-label {
		position: absolute;
		top: 1.1rem;
		left: 1.2rem;
		z-index: 2;
		display: grid;
	}

	.blocklace-label span {
		color: var(--deck-cyan);
		font-size: 0.62rem;
		font-weight: 900;
		letter-spacing: 0.17em;
		text-transform: uppercase;
	}

	.blocklace-label strong {
		margin-top: 0.25rem;
		font-size: 0.92rem;
	}

	.blocklace-svg {
		width: 100%;
		height: 100%;
		min-height: 25rem;
		padding: 2rem 0.8rem 0.3rem;
	}

	.dag-paths path {
		fill: none;
		stroke: url("#pathGradient");
		stroke-dasharray: 8 8;
		stroke-width: 2;
		opacity: 0.45;
		animation: pathMove 4s linear infinite;
	}

	.dag-paths .equivocation-path {
		stroke: #ff7e8c;
		opacity: 0.8;
	}

	.dag-paths .tau-path {
		stroke: var(--deck-amber);
		stroke-width: 3;
	}

	.round-labels {
		fill: rgba(255, 255, 255, 0.4);
		font-size: 12px;
		font-weight: 800;
	}

	.dag-node {
		stroke: rgba(255, 255, 255, 0.25);
		stroke-width: 6;
		transform-box: fill-box;
		transform-origin: center;
		animation: dagPulse 2.7s ease-in-out infinite;
		animation-delay: var(--node-delay);
	}

	.node-cyan {
		fill: var(--deck-cyan);
	}

	.node-amber {
		fill: var(--deck-amber);
	}

	.node-violet {
		fill: var(--deck-violet);
	}

	.node-emerald {
		fill: var(--deck-emerald);
	}

	.node-equivocation {
		fill: #ff7e8c;
		stroke: rgba(255, 126, 140, 0.25);
		stroke-width: 9;
		animation: equivocationPulse 1.5s ease-in-out infinite;
	}

	.tau-node {
		fill: var(--deck-amber);
		stroke: rgba(246, 201, 107, 0.2);
		stroke-width: 10;
		animation: tauPulse 2s ease-in-out infinite;
	}

	.tau-symbol {
		fill: #11141c;
		font-family: var(--font-display);
		font-size: 27px;
		font-weight: 900;
	}

	.blocklace-note {
		position: absolute;
		right: 1rem;
		bottom: 1rem;
		left: 1rem;
		display: flex;
		align-items: center;
		gap: 0.6rem;
		border: 1px solid var(--deck-line);
		border-radius: 999px;
		background: rgba(17, 20, 28, 0.82);
		padding: 0.65rem 0.9rem;
		color: var(--deck-muted);
		font-size: 0.7rem;
		font-weight: 700;
		backdrop-filter: blur(12px);
	}

	.note-dot {
		width: 0.5rem;
		height: 0.5rem;
		flex: 0 0 auto;
		border-radius: 50%;
		background: var(--deck-cyan);
		box-shadow: 0 0 16px var(--deck-cyan);
	}

	.protocol-pillars {
		display: grid;
		gap: 0.8rem;
	}

	.pillar {
		position: relative;
		display: grid;
		grid-template-columns: auto 1fr auto;
		gap: 1rem;
		align-items: center;
		overflow: hidden;
		border: 1px solid var(--deck-line);
		border-radius: 1.45rem;
		background: rgba(255, 255, 255, 0.04);
		padding: 1.1rem;
		animation: pillarGlow 9s ease-in-out infinite;
	}

	.pillar::before {
		content: "";
		position: absolute;
		inset: 0 auto 0 0;
		width: 3px;
		background: var(--pillar-color);
	}

	.pillar-dissemination {
		--pillar-color: var(--deck-cyan);
	}

	.pillar-equivocation {
		--pillar-color: #ff7e8c;
		animation-delay: -6s;
	}

	.pillar-ordering {
		--pillar-color: var(--deck-amber);
		animation-delay: -3s;
	}

	.pillar-number {
		color: var(--pillar-color);
		font-family: var(--font-display);
		font-size: 1.5rem;
		font-weight: 900;
	}

	.pillar h3 {
		font-size: 0.95rem;
		font-weight: 900;
	}

	.pillar p {
		margin-top: 0.25rem;
		color: var(--deck-muted);
		font-size: 0.69rem;
		line-height: 1.55;
	}

	.pillar :global(.pillar-icon) {
		color: var(--pillar-color);
	}

	.slide-stack {
		background:
			radial-gradient(circle at 75% 8%, rgba(165, 148, 255, 0.15), transparent 26%), #11141c;
	}

	.shard-sky {
		position: absolute;
		top: 1.5rem;
		right: 4%;
		width: min(34rem, 48vw);
		height: 11rem;
		opacity: 0.95;
	}

	.shard-sky::before,
	.shard-sky::after {
		content: "";
		position: absolute;
		top: 50%;
		left: 50%;
		border: 1px dashed rgba(255, 255, 255, 0.13);
		border-radius: 50%;
		translate: -50% -50%;
		animation: coverOrbit 20s linear infinite;
	}

	.shard-sky::before {
		width: 25rem;
		height: 9rem;
	}

	.shard-sky::after {
		width: 17rem;
		height: 6rem;
		animation-direction: reverse;
		animation-duration: 13s;
	}

	.shard-node,
	.shard-hub {
		position: absolute;
		z-index: 2;
		display: grid;
		place-items: center;
		border: 1px solid var(--deck-line);
		background: rgba(255, 255, 255, 0.065);
		box-shadow: 0 18px 50px rgba(0, 0, 0, 0.18);
		backdrop-filter: blur(12px);
		animation: shardFloat 4s ease-in-out infinite;
	}

	.shard-node {
		width: 5.2rem;
		height: 2.2rem;
		border-radius: 999px;
		font-size: 0.58rem;
		font-weight: 900;
		letter-spacing: 0.1em;
		text-transform: uppercase;
	}

	.shard-rchain {
		top: 9%;
		left: 10%;
		color: var(--deck-cyan);
	}

	.shard-asi {
		top: 16%;
		right: 4%;
		color: var(--deck-violet);
		animation-delay: -1.5s;
	}

	.shard-domain {
		right: 18%;
		bottom: 3%;
		width: 6.4rem;
		color: var(--deck-amber);
		animation-delay: -2.8s;
	}

	.shard-hub {
		top: 50%;
		left: 50%;
		width: 5.2rem;
		height: 5.2rem;
		border-radius: 1.7rem;
		background: var(--deck-ink);
		color: #11141c;
		translate: -50% -50%;
		rotate: 5deg;
		animation-name: hubFloat;
	}

	.shard-hub span {
		font-family: var(--font-display);
		font-size: 1.35rem;
		font-weight: 900;
		letter-spacing: -0.08em;
	}

	.shard-hub small {
		margin-top: -1.15rem;
		font-size: 0.53rem;
		font-weight: 900;
		letter-spacing: 0.18em;
		text-transform: uppercase;
	}

	.stack-layout {
		position: relative;
		z-index: 3;
		display: grid;
		gap: 2rem;
		align-items: end;
		min-height: 100%;
		padding-top: 7rem;
	}

	.stack-copy {
		max-width: 42rem;
	}

	.stack-lead {
		margin-top: 1.5rem;
		color: var(--deck-ink) !important;
		font-size: clamp(1.05rem, 1.8vw, 1.45rem) !important;
		font-weight: 800;
	}

	.stack-copy > p:not(.deck-kicker):not(.stack-lead) {
		max-width: 39rem;
		margin-top: 1rem;
		color: var(--deck-muted);
		font-size: 0.87rem;
		line-height: 1.7;
	}

	.stack-callout {
		display: flex;
		gap: 0.75rem;
		align-items: center;
		width: fit-content;
		margin-top: 1.4rem;
		border: 1px solid rgba(111, 229, 236, 0.22);
		border-radius: 999px;
		background: rgba(111, 229, 236, 0.08);
		padding: 0.75rem 1rem;
		color: var(--deck-muted);
		font-size: 0.7rem;
	}

	.stack-callout :global(.callout-icon),
	.stack-callout strong {
		color: var(--deck-cyan);
	}

	.stack-diagram {
		display: flex;
		flex-direction: column;
		gap: 0.55rem;
		perspective: 900px;
	}

	.stack-layer {
		--layer-color: var(--deck-cyan);
		display: grid;
		grid-template-columns: auto 1fr auto;
		gap: 0.9rem;
		align-items: center;
		border: 1px solid color-mix(in srgb, var(--layer-color) 26%, transparent);
		border-radius: 1.15rem;
		background: color-mix(in srgb, var(--layer-color) 8%, rgba(255, 255, 255, 0.025));
		padding: 0.85rem 1rem;
		transform: rotateX(6deg) translateY(0);
		transform-origin: bottom;
		animation: stackRise 4.5s ease-in-out infinite;
	}

	.layer-api {
		--layer-color: var(--deck-violet);
		animation-delay: -0.7s;
	}

	.layer-runtime {
		--layer-color: var(--deck-amber);
		animation-delay: -1.4s;
	}

	.layer-consensus {
		--layer-color: #ff8a96;
		animation-delay: -2.1s;
	}

	.layer-infra {
		--layer-color: var(--deck-emerald);
		animation-delay: -2.8s;
	}

	.layer-index {
		color: var(--layer-color);
		font-family: var(--font-display);
		font-size: 1.15rem;
		font-weight: 900;
	}

	.stack-layer div {
		display: grid;
	}

	.stack-layer small {
		color: var(--layer-color);
		font-size: 0.56rem;
		font-weight: 900;
		letter-spacing: 0.14em;
		text-transform: uppercase;
	}

	.stack-layer strong {
		margin-top: 0.15rem;
		font-size: 0.73rem;
	}

	.stack-layer b {
		color: var(--layer-color);
		font-weight: 900;
	}

	.stack-layer :global(.layer-icon) {
		color: var(--layer-color);
	}

	.deck-controls {
		position: absolute;
		right: 1.2rem;
		bottom: 1.2rem;
		left: 1.2rem;
		z-index: 25;
		display: flex;
		align-items: center;
		gap: 0.8rem;
		border: 1px solid var(--deck-line);
		border-radius: 999px;
		background: rgba(17, 20, 28, 0.82);
		padding: 0.45rem;
		backdrop-filter: blur(18px);
	}

	.deck-controls > button,
	.deck-icon-button {
		display: grid;
		width: 2.35rem;
		height: 2.35rem;
		place-items: center;
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.06);
		color: var(--deck-ink);
		transition:
			transform 180ms ease,
			background 180ms ease,
			opacity 180ms ease;
	}

	.deck-icon-button {
		border-color: color-mix(in srgb, var(--foreground) 12%, transparent);
		background: color-mix(in srgb, var(--background) 78%, transparent);
		color: var(--foreground);
	}

	.deck-controls > button:hover:not(:disabled),
	.deck-icon-button:hover {
		transform: translateY(-2px);
		background: var(--deck-cyan);
		color: #11141c;
	}

	.deck-controls > button:disabled {
		cursor: not-allowed;
		opacity: 0.28;
	}

	.deck-dots {
		display: flex;
		gap: 0.4rem;
	}

	.deck-dots button {
		width: 0.5rem;
		height: 0.5rem;
		border-radius: 999px;
		background: rgba(255, 255, 255, 0.22);
		transition:
			width 260ms ease,
			background 260ms ease;
	}

	.deck-dots button.active {
		width: 1.8rem;
		background: var(--deck-cyan);
	}

	.deck-counter {
		margin-left: auto;
		color: var(--deck-muted);
		font-size: 0.65rem;
		font-weight: 900;
		letter-spacing: 0.15em;
	}

	@media (min-width: 900px) {
		.slide-heading {
			grid-template-columns: 1.15fr 0.85fr;
		}

		.protocol-layout {
			grid-template-columns: 1.18fr 0.82fr;
		}

		.stack-layout {
			grid-template-columns: 0.95fr 1.05fr;
		}
	}

	@media (max-width: 899px) {
		.deck,
		.deck-track,
		.slide {
			min-height: 48rem;
		}

		.slide {
			overflow-y: auto;
			padding: 2rem 1.2rem 6rem;
		}

		.cover-copy h1 {
			font-size: clamp(3.2rem, 15vw, 5.6rem);
		}

		.cover-orbit {
			opacity: 0.5;
		}

		.shard-sky {
			display: none;
		}

		.stack-layout {
			padding-top: 0;
		}
	}

	@media (max-width: 600px) {
		.deck {
			border-radius: 1.4rem;
		}

		.slide-cover {
			justify-content: center;
			gap: 4rem;
		}

		.cover-footer {
			align-items: start;
			flex-direction: column;
		}

		.cover-mark {
			display: none;
		}

		.slide-heading h2,
		.stack-copy h2 {
			font-size: 2.55rem;
		}

		.blocklace-panel {
			min-height: 21rem;
		}

		.blocklace-svg {
			min-height: 20rem;
			padding-right: 0;
			padding-left: 0;
		}

		.blocklace-note {
			display: none;
		}

		.pillar {
			grid-template-columns: auto 1fr;
		}

		.pillar :global(.pillar-icon) {
			display: none;
		}
	}

	@keyframes coverOrbit {
		to {
			rotate: 360deg;
		}
	}

	@keyframes markFloat {
		50% {
			transform: translateY(-8px) rotate(3deg);
		}
	}

	@keyframes pathMove {
		to {
			stroke-dashoffset: -32;
		}
	}

	@keyframes dagPulse {
		50% {
			scale: 1.18;
			filter: brightness(1.2);
		}
	}

	@keyframes equivocationPulse {
		50% {
			scale: 1.28;
			filter: drop-shadow(0 0 9px #ff7e8c);
		}
	}

	@keyframes tauPulse {
		50% {
			filter: drop-shadow(0 0 12px var(--deck-amber));
			scale: 1.08;
		}
	}

	@keyframes pillarGlow {
		0%,
		22% {
			border-color: color-mix(in srgb, var(--pillar-color) 48%, transparent);
			background: color-mix(in srgb, var(--pillar-color) 10%, transparent);
			transform: translateX(-4px);
		}
		34%,
		100% {
			border-color: var(--deck-line);
			background: rgba(255, 255, 255, 0.04);
			transform: translateX(0);
		}
	}

	@keyframes shardFloat {
		50% {
			transform: translateY(-8px);
		}
	}

	@keyframes hubFloat {
		50% {
			transform: translateY(-6px) rotate(-8deg);
		}
	}

	@keyframes stackRise {
		50% {
			transform: rotateX(0deg) translateY(-4px);
			border-color: color-mix(in srgb, var(--layer-color) 55%, transparent);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.deck-track,
		.cover-orbit,
		.cover-mark,
		.dag-paths path,
		.dag-node,
		.node-equivocation,
		.tau-node,
		.pillar,
		.shard-sky::before,
		.shard-sky::after,
		.shard-node,
		.shard-hub,
		.stack-layer {
			animation: none;
			transition-duration: 1ms;
		}
	}
</style>
