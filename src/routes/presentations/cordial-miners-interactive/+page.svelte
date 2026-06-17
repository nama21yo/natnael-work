<script lang="ts">
	import { onMount } from "svelte";
	import { base } from "$app/paths";
	import Icon from "@iconify/svelte";
	import { profile } from "$lib/data/portfolio";

	type SlideKind =
		| "cold"
		| "notebook"
		| "legend"
		| "boss"
		| "messages"
		| "threshold"
		| "equivocation"
		| "chain"
		| "multiparent"
		| "zeroWaste"
		| "question"
		| "approval"
		| "witnesses"
		| "waves"
		| "untangle"
		| "pipeline"
		| "race"
		| "stake"
		| "pruning"
		| "close";

	type Slide = {
		kicker: string;
		title: string;
		body: string;
		kind: SlideKind;
		peek?: string;
		icon: string;
	};

	const slides: Slide[] = [
		{
			kicker: "Cold open",
			title: "Agreement is hard.",
			body: "Getting five friends to agree on a restaurant is hard. Getting five thousand computers to agree without a boss is harder.",
			kind: "cold",
			icon: "lucide:sparkles"
		},
		{
			kicker: "Shared notebook",
			title: "A blockchain is copied truth.",
			body: "A blockchain is a shared notebook copied onto thousands of computers, where everyone agrees on what page comes next.",
			kind: "notebook",
			icon: "lucide:notebook-tabs",
			peek: "Technical names: distributed ledger and replicated state machine. The network keeps many copies of one logical state."
		},
		{
			kicker: "Visual language",
			title: "Dots are computers. Lines are messages.",
			body: "Color tells the story: gray is waiting, amber is deciding, green is agreed, and red is broken or lying.",
			kind: "legend",
			icon: "lucide:network",
			peek: "Validator means a computer participating with bonded stake. Byzantine means a node can crash, lie, or act maliciously."
		},
		{
			kicker: "No boss",
			title: "Nobody gets to simply declare the truth.",
			body: "In a normal company, a boss can decide. In a blockchain, equal computers must agree even when one might lie.",
			kind: "boss",
			icon: "lucide:users-round",
			peek: "Byzantine Fault Tolerance asks honest nodes to agree despite faulty ones. Classic BFT needs more than two-thirds honest support."
		},
		{
			kicker: "Old habit",
			title: "Everyone shouting at everyone does not scale.",
			body: "Traditional voting-style protocols can make the network feel busy fast, because each new computer adds many more conversations.",
			kind: "messages",
			icon: "lucide:radio-tower",
			peek: "PBFT-style communication is often explained as O(n^2): message count grows with the square of the validator count."
		},
		{
			kicker: "Magic number",
			title: "More than two-thirds must be honest.",
			body: "When enough honest validators overlap, two different lies cannot both look final to the network.",
			kind: "threshold",
			icon: "lucide:pie-chart",
			peek: "Rule of thumb: n >= 3f + 1. Quorums must overlap, so a finalized decision cannot be contradicted by another finalized decision."
		},
		{
			kicker: "The liar",
			title: "Equivocation is telling two stories.",
			body: "A malicious validator can try to split the room by sending one group one block and another group a conflicting block.",
			kind: "equivocation",
			icon: "lucide:split",
			peek: "Equivocation means the same validator creates two conflicting blocks that do not build on each other."
		},
		{
			kicker: "Old chain",
			title: "Most blockchains make blocks stand in single file.",
			body: "Every new block picks one parent. If two valid blocks show up together, one usually loses and its work is wasted.",
			kind: "chain",
			icon: "lucide:link",
			peek: "The losing block is often called orphaned or stale. Its transactions may need to be resubmitted or re-included elsewhere."
		},
		{
			kicker: "Reveal",
			title: "Cordial Miners lets blocks have many parents.",
			body: "A new block points to all recent blocks it has seen, so concurrent work becomes part of the picture instead of a discard pile.",
			kind: "multiparent",
			icon: "lucide:git-merge",
			peek: "Blocklace means block plus lattice: a DAG where blocks can reference multiple parents, and parents must already exist."
		},
		{
			kicker: "Payoff",
			title: "The competing block survives.",
			body: "Instead of choosing one winner and throwing the other away, a later block can point to both.",
			kind: "zeroWaste",
			icon: "lucide:recycle",
			peek: "No orphaned blocks means no wasted validator work and less resubmission cost."
		},
		{
			kicker: "Obvious question",
			title: "But who untangles the web?",
			body: "Now we have a useful web instead of a simple line. The next job is turning that web into one shared order.",
			kind: "question",
			icon: "lucide:circle-help"
		},
		{
			kicker: "Approval",
			title: "Trust, but verify what the block can see.",
			body: "If a block sees both conflicting stories, it refuses to vouch for either one.",
			kind: "approval",
			icon: "lucide:eye",
			peek: "Approval is stricter than observation: a block approves another only if it sees it and does not also see a conflict."
		},
		{
			kicker: "Witnesses",
			title: "One witness helps. A supermajority finalizes.",
			body: "Approval piles up into ratification, then super-ratification. The same two-thirds intuition returns twice.",
			kind: "witnesses",
			icon: "lucide:landmark",
			peek: "Approval -> ratification -> super-ratification is the ladder that makes finalized history impossible to contradict."
		},
		{
			kicker: "Waves",
			title: "Leaders give the web a rhythm.",
			body: "Time is split into waves. Each wave has a leader block; if enough validators back it, that wave locks in.",
			kind: "waves",
			icon: "lucide:waves",
			peek: "A round groups block creation. A wave groups rounds. A leader block anchors the finalized portion of that wave."
		},
		{
			kicker: "Tau",
			title: "The web becomes one timeline.",
			body: "Once a wave locks in, every block it can see is pulled into a deterministic order everyone computes locally.",
			kind: "untangle",
			icon: "lucide:list-ordered",
			peek: "Tau is the ordering rule: the same web becomes the same list on every computer, and finalized entries never move."
		},
		{
			kicker: "One breath",
			title: "Gossip, verify, witness, lock, order.",
			body: "That is the whole pipeline: blocks spread, liars are spotted, witnesses pile up, a wave locks, and the web becomes a line.",
			kind: "pipeline",
			icon: "lucide:workflow",
			peek: "Technical strip: dissemination -> equivocation detection -> approval and ratification -> leader finality -> tau ordering."
		},
		{
			kicker: "Comparison",
			title: "Cordial Miners reaches finality with less drama.",
			body: "The old way lurches through expensive coordination. Cordial Miners keeps useful work and checks thresholds directly.",
			kind: "race",
			icon: "lucide:gauge",
			peek: "Compared with clique-search-heavy approaches: lower message pressure, zero orphaned blocks, threshold checks, and passive equivocation handling."
		},
		{
			kicker: "Stake",
			title: "Two-thirds means two-thirds of stake.",
			body: "In proof of stake, validators do not all count the same. Bigger stake means more voting weight.",
			kind: "stake",
			icon: "lucide:coins",
			peek: "The weighted rule is support_stake * 3 > total_stake * 2, using large-number-safe arithmetic."
		},
		{
			kicker: "Pruning",
			title: "The web does not have to live forever.",
			body: "Once history is permanently locked in, old details can be compressed away like receipts after they enter the accounting book.",
			kind: "pruning",
			icon: "lucide:archive",
			peek: "Checkpoint pruning keeps finalized receipts. Stake-weighted and simple-count timelines can need separate cutoff receipts."
		},
		{
			kicker: "Why it matters",
			title: "Cheaper. Faster. Fairer.",
			body: "Less chatter lowers operating cost, fewer rounds improve confirmation, and every honest validator's work can count.",
			kind: "close",
			icon: "lucide:handshake",
			peek: "Next steps: technical writeup, implementation repository, and a deeper protocol walkthrough for engineering audiences."
		}
	];

	const slideCount = slides.length;
	const slideNumbers = Array.from({ length: slideCount }, (_, index) => index);
	const backgroundDots = Array.from({ length: 44 }, (_, index) => ({
		left: (index * 37) % 100,
		top: (index * 61) % 100,
		delay: index * -180
	}));
	const notebookCopies = Array.from({ length: 8 }, (_, index) => index);
	const graphNodes = Array.from({ length: 12 }, (_, index) => ({
		id: index + 1,
		x: [12, 26, 40, 56, 72, 20, 37, 54, 70, 84, 48, 63][index],
		y: [28, 20, 34, 22, 31, 58, 48, 61, 50, 64, 78, 80][index]
	}));
	const graphEdges = [
		[0, 1],
		[0, 5],
		[1, 2],
		[1, 6],
		[2, 3],
		[2, 7],
		[3, 4],
		[5, 6],
		[5, 10],
		[6, 7],
		[7, 8],
		[8, 9],
		[10, 11],
		[7, 11],
		[4, 9]
	];
	const pipeline = ["Gossip", "Spot liars", "Witnesses", "Wave locks", "Web to line"];

	let activeSlide = 0;
	let peekOpen = false;
	let deckElement: HTMLElement;
	let notebookPages = 1;
	let legendStep = 1;
	let bossRemoved = false;
	let validatorCount = 6;
	let honestCount = 6;
	let comparedNotes = false;
	let competingBlocks = 1;
	let graphStep = 6;
	let sawBothStories = true;
	let witnessCount = 5;
	let orderNumbers = true;
	let raceRun = 0;
	let stakeValues = [22, 18, 14, 12, 10, 8, 7, 5, 4];
	let pruneSpeed = 2;

	$: currentSlide = slides[activeSlide];
	$: messageCount = validatorCount * Math.max(0, validatorCount - 1);
	$: honestPercent = Math.round((honestCount / 9) * 1000) / 10;
	$: thresholdSafe = honestCount / 9 > 2 / 3;
	$: witnessSafe = witnessCount / 9 > 2 / 3;
	$: visibleGraphNodes = graphNodes.slice(0, graphStep);
	$: visibleGraphEdges = graphEdges.filter(([from, to]) => from < graphStep && to < graphStep);
	$: totalStake = stakeValues.reduce((sum, value) => sum + value, 0);
	$: supportStake = stakeValues.slice(0, 5).reduce((sum, value) => sum + value, 0);
	$: stakeSafe = supportStake * 3 > totalStake * 2;

	function goToSlide(index: number) {
		activeSlide = Math.max(0, Math.min(slideCount - 1, index));
		peekOpen = false;
	}

	function toggleFullscreen() {
		if (!document.fullscreenElement) {
			deckElement?.requestFullscreen();
			return;
		}

		document.exitFullscreen();
	}

	function addNotebookPage() {
		notebookPages = Math.min(6, notebookPages + 1);
	}

	function runRace() {
		raceRun += 1;
	}

	function updateStake(index: number, value: number) {
		stakeValues = stakeValues.map((stake, stakeIndex) => (stakeIndex === index ? value : stake));
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
	<title>Cordial Miners Interactive Primer | {profile.name}</title>
	<meta
		name="description"
		content="A 20-slide interactive Cordial Miners presentation for non-technical audiences."
	/>
</svelte:head>

<section class="deck-page mx-auto max-w-[98rem] px-3 py-8 md:px-6 md:py-12">
	<div class="mb-4 flex flex-wrap items-center justify-between gap-3 px-2">
		<a
			href={`${base}/presentations`}
			class="inline-flex items-center gap-2 text-xs font-black tracking-[0.16em] text-muted-foreground uppercase transition hover:text-foreground"
		>
			<Icon icon="lucide:arrow-left" width="16" />
			All presentations
		</a>

		<div class="flex items-center gap-2">
			<button type="button" class="deck-top-button" onclick={() => (peekOpen = !peekOpen)}>
				<Icon icon="lucide:microscope" width="16" />
				<span>{peekOpen ? "Hide" : "Peek"}</span>
			</button>
			<button type="button" class="deck-top-button" onclick={toggleFullscreen}>
				<Icon icon="lucide:maximize" width="16" />
				<span>Fullscreen</span>
			</button>
		</div>
	</div>

	<div class="deck" bind:this={deckElement}>
		<div class="progress" aria-hidden="true">
			<span style={`width:${((activeSlide + 1) / slideCount) * 100}%`}></span>
		</div>

		<section class={`slide slide-${currentSlide.kind}`}>
			<div class="ambient" aria-hidden="true">
				{#each backgroundDots as dot, index (index)}
					<span style={`--dot-left:${dot.left}%; --dot-top:${dot.top}%; --dot-delay:${dot.delay}ms`}
					></span>
				{/each}
			</div>

			<div class="slide-copy">
				<p class="kicker">
					<Icon icon={currentSlide.icon} width="18" />
					{currentSlide.kicker}
				</p>
				<h1>{currentSlide.title}</h1>
				<p class="lede">{currentSlide.body}</p>
			</div>

			<div class="visual">
				{#if currentSlide.kind === "cold"}
					<div class="computer-burst">
						<span>5</span>
						<strong>5,000</strong>
						<small>same question, no boss</small>
					</div>
				{:else if currentSlide.kind === "notebook"}
					<div class="notebook-scene">
						<button type="button" class="primary-action" onclick={addNotebookPage}>
							<Icon icon="lucide:plus" width="16" />
							Add a page
						</button>
						<div class="notebook-ring">
							<div class="notebook center" style={`--pages:${notebookPages}`}>
								Page {notebookPages}
							</div>
							{#each notebookCopies as copy (copy)}
								<div class="notebook copy" style={`--copy:${copy}; --pages:${notebookPages}`}>
									{notebookPages}
								</div>
							{/each}
						</div>
					</div>
				{:else if currentSlide.kind === "legend"}
					<div class="legend-scene">
						<div class="legend-row" class:muted={legendStep < 1}>
							<span class="dot validator"></span>
							<strong>Validator</strong>
							<small>a computer in the network</small>
						</div>
						<div class="legend-row" class:muted={legendStep < 2}>
							<span class="line-sample"></span>
							<strong>Message</strong>
							<small>what validators send</small>
						</div>
						<div class="legend-row" class:muted={legendStep < 3}>
							<span class="dot waiting"></span>
							<span class="dot deciding"></span>
							<span class="dot agreed"></span>
							<span class="dot liar"></span>
							<strong>State</strong>
							<small>waiting, deciding, agreed, broken</small>
						</div>
						<div class="stepper">
							<button type="button" onclick={() => (legendStep = Math.max(1, legendStep - 1))}>
								<Icon icon="lucide:minus" width="15" />
							</button>
							<span>Step {legendStep} / 3</span>
							<button type="button" onclick={() => (legendStep = Math.min(3, legendStep + 1))}>
								<Icon icon="lucide:plus" width="15" />
							</button>
						</div>
					</div>
				{:else if currentSlide.kind === "boss"}
					<div class="boss-scene" class:flat={bossRemoved}>
						<button
							type="button"
							class="primary-action"
							onclick={() => (bossRemoved = !bossRemoved)}
						>
							{bossRemoved ? "Bring the boss back" : "Remove the boss"}
						</button>
						<div class="org-node boss">Boss</div>
						<div class="mesh-lines" aria-hidden="true"></div>
						{#each [0, 1, 2, 3, 4] as node (node)}
							<div class={`org-node employee employee-${node}`}>{node === 3 ? "?" : "V"}</div>
						{/each}
					</div>
				{:else if currentSlide.kind === "messages"}
					<div class="message-scene">
						<label>
							<span>Computers: {validatorCount}</span>
							<input type="range" min="3" max="10" bind:value={validatorCount} />
						</label>
						<div class="message-mesh" style={`--validators:${validatorCount}`}>
							{#each Array.from({ length: validatorCount }, (_, index) => index) as node (node)}
								<span class="mesh-dot" style={`--node:${node}`}></span>
							{/each}
						</div>
						<strong class="counter">Messages sent: {messageCount}</strong>
					</div>
				{:else if currentSlide.kind === "threshold"}
					<div class="threshold-scene" class:unsafe={!thresholdSafe}>
						<div class="ring">
							{#each Array.from({ length: 9 }, (_, index) => index) as node (node)}
								<span
									class:honest={node < honestCount}
									class:byzantine={node >= honestCount}
									style={`--node:${node}`}
								></span>
							{/each}
							<div class="arc"></div>
						</div>
						<div class="stepper">
							<button type="button" onclick={() => (honestCount = Math.max(0, honestCount - 1))}>
								<Icon icon="lucide:minus" width="15" />
							</button>
							<span>{honestCount} of 9 honest = {honestPercent}%</span>
							<button type="button" onclick={() => (honestCount = Math.min(9, honestCount + 1))}>
								<Icon icon="lucide:plus" width="15" />
							</button>
						</div>
						<strong class="state-label">{thresholdSafe ? "Safe overlap" : "Safety broken"}</strong>
					</div>
				{:else if currentSlide.kind === "equivocation"}
					<div class="equivocation-scene" class:caught={comparedNotes}>
						<div class="cluster cluster-left">Group A</div>
						<div class="cluster cluster-right">Group B</div>
						<div class="liar-node">Liar</div>
						<div class="bubble bubble-a">Story A</div>
						<div class="bubble bubble-b">Story B</div>
						<div class="compare-line"></div>
						<button
							type="button"
							class="primary-action"
							onclick={() => (comparedNotes = !comparedNotes)}
						>
							{comparedNotes ? "Reset stories" : "Compare notes"}
						</button>
					</div>
				{:else if currentSlide.kind === "chain"}
					<div class="chain-scene">
						<div class="chain-row">
							{#each [1, 2, 3, 4, 5] as block (block)}
								<span>B{block}</span>
							{/each}
						</div>
						<button
							type="button"
							class="primary-action"
							onclick={() => (competingBlocks = competingBlocks === 1 ? 2 : 1)}
						>
							+ add competing block
						</button>
						{#if competingBlocks > 1}
							<div class="orphan">discarded</div>
						{/if}
					</div>
				{:else if currentSlide.kind === "multiparent" || currentSlide.kind === "zeroWaste" || currentSlide.kind === "question"}
					<div class="dag-scene" class:quiet={currentSlide.kind === "question"}>
						<svg viewBox="0 0 100 100" role="img" aria-label="Blocklace DAG">
							{#each visibleGraphEdges as edge, index (index)}
								<line
									x1={graphNodes[edge[0]].x}
									y1={graphNodes[edge[0]].y}
									x2={graphNodes[edge[1]].x}
									y2={graphNodes[edge[1]].y}
									style={`--edge-delay:${index * 70}ms`}
								/>
							{/each}
							{#each visibleGraphNodes as node, index (node.id)}
								<circle cx={node.x} cy={node.y} r="4.5" style={`--node-delay:${index * 60}ms`} />
								<text x={node.x} y={node.y + 1.4}>{node.id}</text>
							{/each}
						</svg>
						{#if currentSlide.kind === "question"}
							<div class="big-question">?</div>
						{:else if currentSlide.kind === "zeroWaste"}
							<div class="waste-counter">Wasted blocks: 0</div>
							<button type="button" class="primary-action" onclick={() => (graphStep = 12)}>
								Fast forward
							</button>
						{:else}
							<div class="control-row">
								<button type="button" onclick={() => (graphStep = Math.max(4, graphStep - 1))}>
									Step back
								</button>
								<button type="button" onclick={() => (graphStep = Math.min(12, graphStep + 1))}>
									Step
								</button>
								<button type="button" onclick={() => (graphStep = 6)}>Reset</button>
							</div>
						{/if}
					</div>
				{:else if currentSlide.kind === "approval"}
					<div class="approval-scene" class:single={!sawBothStories}>
						<button
							type="button"
							class="primary-action"
							onclick={() => (sawBothStories = !sawBothStories)}
						>
							{sawBothStories ? "What if it saw one?" : "Show both stories"}
						</button>
						<div class="conflict conflict-a">A</div>
						<div class="conflict conflict-b">B</div>
						<div class="witness">{sawBothStories ? "rejects both" : "approves one"}</div>
					</div>
				{:else if currentSlide.kind === "witnesses"}
					<div class="witness-scene" class:locked={witnessSafe}>
						<div class="stack-bar">
							<span class="threshold-mark"></span>
							{#each Array.from({ length: 9 }, (_, index) => index) as node (node)}
								<i class:filled={node < witnessCount}></i>
							{/each}
						</div>
						<div class="stepper">
							<button type="button" onclick={() => (witnessCount = Math.max(0, witnessCount - 1))}>
								<Icon icon="lucide:minus" width="15" />
							</button>
							<span>{witnessCount} witnesses</span>
							<button type="button" onclick={() => (witnessCount = Math.min(9, witnessCount + 1))}>
								<Icon icon="lucide:plus" width="15" />
							</button>
						</div>
						<strong>{witnessSafe ? "FINAL" : "still collecting"}</strong>
					</div>
				{:else if currentSlide.kind === "waves"}
					<div class="waves-scene">
						{#each [1, 2, 3] as wave (wave)}
							<button type="button" class="wave-band" style={`--wave:${wave}`}>
								<span>Wave {wave}</span>
								<i><Icon icon="lucide:crown" width="18" /></i>
								<strong>locked</strong>
							</button>
						{/each}
					</div>
				{:else if currentSlide.kind === "untangle"}
					<div class="untangle-scene" class:numbered={orderNumbers}>
						<div class="mini-dag">
							{#each graphNodes.slice(0, 9) as node (node.id)}
								<span style={`--x:${node.x}%; --y:${node.y}%; --order:${node.id}`}>{node.id}</span>
							{/each}
						</div>
						<div class="ledger">
							{#each [1, 2, 3, 4, 5, 6, 7, 8, 9] as item (item)}
								<span>{orderNumbers ? item : "block"}</span>
							{/each}
						</div>
						<button
							type="button"
							class="primary-action"
							onclick={() => (orderNumbers = !orderNumbers)}
						>
							{orderNumbers ? "Hide order numbers" : "Show order numbers"}
						</button>
					</div>
				{:else if currentSlide.kind === "pipeline"}
					<div class="pipeline-scene">
						{#each pipeline as stage, index (stage)}
							<button type="button" onclick={() => goToSlide([8, 6, 12, 13, 14][index])}>
								<Icon
									icon={[
										"lucide:send",
										"lucide:shield-alert",
										"lucide:users",
										"lucide:lock",
										"lucide:list-ordered"
									][index]}
									width="24"
								/>
								<span>{stage}</span>
							</button>
						{/each}
					</div>
				{:else if currentSlide.kind === "race"}
					<div class="race-scene" style={`--race-run:${raceRun}`}>
						<button type="button" class="primary-action" onclick={runRace}>Race again</button>
						<div class="track old">
							<span>Old way</span>
							<i></i>
							<strong>Finalized</strong>
						</div>
						<div class="track cordial">
							<span>Cordial Miners</span>
							<i></i>
							<strong>~4.5 rounds</strong>
						</div>
					</div>
				{:else if currentSlide.kind === "stake"}
					<div class="stake-scene" class:locked={stakeSafe}>
						<div class="stake-ring">
							{#each stakeValues as stake, index (index)}
								<span
									class:support={index < 5}
									style={`--node:${index}; --stake:${Math.max(0.65, stake / 12)}`}
								></span>
							{/each}
						</div>
						<div class="stake-controls">
							{#each stakeValues.slice(0, 4) as stake, index (index)}
								<label>
									<span>V{index + 1}</span>
									<input
										type="range"
										min="2"
										max="28"
										value={stake}
										oninput={(event) =>
											updateStake(index, Number((event.currentTarget as HTMLInputElement).value))}
									/>
								</label>
							{/each}
						</div>
						<strong>{supportStake} / {totalStake} stake {stakeSafe ? "passes" : "fails"}</strong>
					</div>
				{:else if currentSlide.kind === "pruning"}
					<div class="pruning-scene">
						<label>
							<span>Block speed: {pruneSpeed}</span>
							<input type="range" min="1" max="5" bind:value={pruneSpeed} />
						</label>
						<div class="ledger prune">
							{#each Array.from({ length: 8 }, (_, index) => index) as item (item)}
								<span style={`--speed:${pruneSpeed}; --row:${item}`}>block {item + 1}</span>
							{/each}
						</div>
						<div class="archive">
							<Icon icon="lucide:archive" width="32" />
							<strong>Active memory: steady</strong>
						</div>
					</div>
				{:else if currentSlide.kind === "close"}
					<div class="close-scene">
						{#each [["lucide:coins", "Cheaper", "less network chatter"], ["lucide:timer", "Faster", "finality in fewer rounds"], ["lucide:handshake", "Fairer", "honest work counts"]] as card (card[1])}
							<article>
								<Icon icon={card[0]} width="32" />
								<strong>{card[1]}</strong>
								<span>{card[2]}</span>
							</article>
						{/each}
					</div>
				{/if}
			</div>

			{#if currentSlide.peek}
				<button
					type="button"
					class="peek-trigger"
					aria-expanded={peekOpen}
					onclick={() => (peekOpen = !peekOpen)}
				>
					<Icon icon="lucide:microscope" width="17" />
				</button>
			{/if}

			{#if peekOpen && currentSlide.peek}
				<aside class="peek-panel">
					<strong>Peek under the hood</strong>
					<p>{currentSlide.peek}</p>
				</aside>
			{/if}
		</section>

		<div class="deck-controls">
			<button
				type="button"
				onclick={() => goToSlide(activeSlide - 1)}
				disabled={activeSlide === 0}
				aria-label="Previous slide"
			>
				<Icon icon="lucide:arrow-left" width="19" />
			</button>
			<div class="deck-dots" aria-label="Slide navigation">
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
			<span class="deck-counter">{String(activeSlide + 1).padStart(2, "0")} / {slideCount}</span>
			<button
				type="button"
				onclick={() => goToSlide(activeSlide + 1)}
				disabled={activeSlide === slideCount - 1}
				aria-label="Next slide"
			>
				<Icon icon="lucide:arrow-right" width="19" />
			</button>
		</div>
	</div>
</section>

<style>
	.deck-page {
		--cream: #fbfaf4;
		--ink: #172033;
		--muted: rgba(23, 32, 51, 0.64);
		--line: rgba(23, 32, 51, 0.13);
		--indigo: #4f46e5;
		--teal: #10b981;
		--amber: #f4b740;
		--rose: #f43f5e;
	}

	.deck-top-button,
	.primary-action,
	.control-row button,
	.stepper button,
	.deck-controls button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.45rem;
		border: 1px solid var(--line);
		border-radius: 999px;
		background: rgba(255, 255, 255, 0.75);
		color: var(--ink);
		font-size: 0.72rem;
		font-weight: 900;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		transition:
			transform 180ms ease,
			background 180ms ease,
			opacity 180ms ease;
	}

	.deck-top-button,
	.primary-action {
		padding: 0.72rem 1rem;
	}

	.deck-top-button:hover,
	.primary-action:hover,
	.control-row button:hover,
	.stepper button:hover,
	.deck-controls button:hover:not(:disabled) {
		transform: translateY(-2px);
		background: var(--ink);
		color: var(--cream);
	}

	.deck {
		position: relative;
		min-height: min(80vh, 820px);
		overflow: hidden;
		border: 1px solid var(--line);
		border-radius: 2rem;
		background: var(--cream);
		color: var(--ink);
		box-shadow: 0 38px 120px rgba(15, 23, 42, 0.16);
		isolation: isolate;
	}

	.deck:fullscreen {
		width: 100vw;
		height: 100vh;
		border: 0;
		border-radius: 0;
	}

	.progress {
		position: absolute;
		inset: 0 0 auto;
		z-index: 20;
		height: 4px;
		background: rgba(23, 32, 51, 0.08);
	}

	.progress span {
		display: block;
		height: 100%;
		background: linear-gradient(90deg, var(--teal), var(--indigo), var(--amber));
		transition: width 420ms cubic-bezier(0.16, 1, 0.3, 1);
	}

	.slide {
		position: relative;
		display: grid;
		min-height: inherit;
		grid-template-columns: minmax(0, 0.9fr) minmax(24rem, 1.1fr);
		gap: clamp(1.5rem, 4vw, 4rem);
		align-items: center;
		padding: clamp(2rem, 5vw, 5rem);
	}

	.ambient {
		position: absolute;
		inset: 0;
		z-index: -2;
		overflow: hidden;
		background:
			radial-gradient(circle at 12% 18%, rgba(16, 185, 129, 0.16), transparent 26%),
			radial-gradient(circle at 85% 12%, rgba(79, 70, 229, 0.14), transparent 28%),
			linear-gradient(rgba(23, 32, 51, 0.045) 1px, transparent 1px),
			linear-gradient(90deg, rgba(23, 32, 51, 0.045) 1px, transparent 1px);
		background-size:
			auto,
			auto,
			42px 42px,
			42px 42px;
	}

	.ambient span {
		position: absolute;
		top: var(--dot-top);
		left: var(--dot-left);
		width: 0.42rem;
		height: 0.42rem;
		border-radius: 50%;
		background: rgba(79, 70, 229, 0.35);
		animation: drift 8s ease-in-out infinite;
		animation-delay: var(--dot-delay);
	}

	.slide-copy {
		position: relative;
		z-index: 2;
	}

	.kicker {
		display: inline-flex;
		align-items: center;
		gap: 0.55rem;
		color: var(--indigo);
		font-size: 0.78rem;
		font-weight: 950;
		letter-spacing: 0.16em;
		text-transform: uppercase;
	}

	.slide-copy h1 {
		max-width: 12ch;
		margin-top: 1.1rem;
		font-family: var(--font-display);
		font-size: clamp(3.3rem, 7.4vw, 8.2rem);
		font-weight: 950;
		letter-spacing: 0;
		line-height: 0.88;
	}

	.lede {
		max-width: 41rem;
		margin-top: 1.55rem;
		color: var(--muted);
		font-size: clamp(1rem, 1.45vw, 1.25rem);
		font-weight: 650;
		line-height: 1.7;
	}

	.visual {
		position: relative;
		z-index: 1;
		min-height: 31rem;
		border: 1px solid var(--line);
		border-radius: 1.45rem;
		background: rgba(255, 255, 255, 0.54);
		box-shadow: inset 0 1px rgba(255, 255, 255, 0.8);
		overflow: hidden;
	}

	.computer-burst,
	.notebook-scene,
	.legend-scene,
	.boss-scene,
	.message-scene,
	.threshold-scene,
	.equivocation-scene,
	.chain-scene,
	.dag-scene,
	.approval-scene,
	.witness-scene,
	.waves-scene,
	.untangle-scene,
	.pipeline-scene,
	.race-scene,
	.stake-scene,
	.pruning-scene,
	.close-scene {
		position: absolute;
		inset: 0;
		display: grid;
		place-items: center;
		padding: clamp(1.2rem, 3vw, 2.4rem);
	}

	.computer-burst span,
	.computer-burst strong {
		position: absolute;
		font-family: var(--font-display);
		font-weight: 950;
		line-height: 1;
	}

	.computer-burst span {
		top: 24%;
		left: 21%;
		color: var(--amber);
		font-size: 5rem;
		animation: pulseScale 2.4s ease-in-out infinite;
	}

	.computer-burst strong {
		right: 13%;
		bottom: 28%;
		color: var(--indigo);
		font-size: clamp(5rem, 11vw, 9rem);
		animation: pulseScale 2.4s 650ms ease-in-out infinite;
	}

	.computer-burst small {
		align-self: end;
		border-radius: 999px;
		background: var(--ink);
		color: var(--cream);
		padding: 0.7rem 1rem;
		font-weight: 900;
		letter-spacing: 0.1em;
		text-transform: uppercase;
	}

	.notebook-ring {
		position: relative;
		width: min(24rem, 72vw);
		aspect-ratio: 1;
	}

	.notebook {
		position: absolute;
		display: grid;
		place-items: center;
		border: 1px solid rgba(79, 70, 229, 0.2);
		border-radius: 1rem;
		background: white;
		box-shadow: 0 18px 45px rgba(15, 23, 42, 0.12);
		font-weight: 950;
	}

	.notebook.center {
		inset: 50% auto auto 50%;
		width: 7rem;
		height: 8.3rem;
		color: var(--indigo);
		transform: translate(-50%, -50%);
	}

	.notebook.copy {
		--angle: calc(var(--copy) * 45deg);
		top: calc(50% + sin(var(--angle)) * 42% - 1.7rem);
		left: calc(50% + cos(var(--angle)) * 42% - 1.7rem);
		width: 3.4rem;
		height: 4rem;
		color: var(--teal);
		animation: popIn 520ms cubic-bezier(0.16, 1, 0.3, 1) backwards;
		animation-delay: calc(var(--copy) * 70ms);
	}

	.legend-scene {
		align-content: center;
		gap: 1rem;
	}

	.legend-row {
		display: flex;
		width: min(34rem, 100%);
		align-items: center;
		gap: 0.8rem;
		border: 1px solid var(--line);
		border-radius: 1rem;
		background: rgba(255, 255, 255, 0.72);
		padding: 1rem;
		transition:
			opacity 240ms ease,
			transform 240ms ease;
	}

	.legend-row.muted {
		opacity: 0.26;
		transform: translateX(-0.5rem);
	}

	.legend-row strong {
		min-width: 6.5rem;
		font-weight: 950;
	}

	.legend-row small {
		color: var(--muted);
		font-weight: 750;
	}

	.dot,
	.ring span,
	.mesh-dot {
		width: 1.35rem;
		height: 1.35rem;
		flex: 0 0 auto;
		border-radius: 50%;
		background: #94a3b8;
	}

	.dot.validator,
	.mesh-dot {
		background: var(--indigo);
	}

	.dot.deciding {
		background: var(--amber);
	}

	.dot.agreed {
		background: var(--teal);
	}

	.dot.liar {
		background: var(--rose);
		animation: warningPulse 1.4s ease-in-out infinite;
	}

	.line-sample {
		width: 5rem;
		height: 2px;
		background: linear-gradient(90deg, var(--indigo), var(--teal));
	}

	.stepper,
	.control-row {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.7rem;
	}

	.stepper button,
	.control-row button {
		min-width: 2.2rem;
		min-height: 2.2rem;
		padding: 0 0.8rem;
	}

	.stepper span {
		min-width: 11rem;
		text-align: center;
		font-size: 0.78rem;
		font-weight: 950;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}

	.boss-scene .org-node {
		position: absolute;
		display: grid;
		width: 4.8rem;
		height: 4.8rem;
		place-items: center;
		border-radius: 1.3rem;
		background: var(--indigo);
		color: white;
		font-weight: 950;
		box-shadow: 0 20px 50px rgba(79, 70, 229, 0.22);
		transition: all 520ms cubic-bezier(0.16, 1, 0.3, 1);
	}

	.org-node.boss {
		top: 18%;
		left: calc(50% - 2.4rem);
		background: var(--ink);
	}

	.boss-scene.flat .boss {
		opacity: 0;
		transform: translateY(-2rem) scale(0.75);
	}

	.employee-0 {
		top: 58%;
		left: 12%;
	}

	.employee-1 {
		top: 58%;
		left: 30%;
	}

	.employee-2 {
		top: 58%;
		left: 48%;
	}

	.employee-3 {
		top: 58%;
		left: 66%;
		background: var(--rose) !important;
	}

	.employee-4 {
		top: 58%;
		left: 82%;
	}

	.boss-scene.flat .employee-0 {
		top: 34%;
		left: 18%;
	}

	.boss-scene.flat .employee-1 {
		top: 18%;
		left: 43%;
	}

	.boss-scene.flat .employee-2 {
		top: 39%;
		left: 68%;
	}

	.boss-scene.flat .employee-3 {
		top: 65%;
		left: 53%;
	}

	.boss-scene.flat .employee-4 {
		top: 63%;
		left: 24%;
	}

	.mesh-lines {
		position: absolute;
		inset: 23% 15%;
		opacity: 0;
		background:
			linear-gradient(22deg, transparent 49%, rgba(79, 70, 229, 0.18) 50%, transparent 51%),
			linear-gradient(-28deg, transparent 49%, rgba(16, 185, 129, 0.18) 50%, transparent 51%),
			linear-gradient(90deg, transparent 49%, rgba(244, 183, 64, 0.16) 50%, transparent 51%);
		transition: opacity 500ms ease;
	}

	.boss-scene.flat .mesh-lines {
		opacity: 1;
	}

	.message-scene,
	.threshold-scene,
	.witness-scene,
	.stake-scene,
	.pruning-scene {
		align-content: center;
		gap: 1.15rem;
	}

	label {
		display: grid;
		width: min(28rem, 100%);
		gap: 0.45rem;
		font-weight: 900;
	}

	input[type="range"] {
		accent-color: var(--indigo);
	}

	.message-mesh {
		position: relative;
		width: min(23rem, 76vw);
		aspect-ratio: 1;
		border-radius: 50%;
		background:
			repeating-conic-gradient(from 0deg, rgba(79, 70, 229, 0.2) 0deg 1deg, transparent 1deg 22deg),
			radial-gradient(circle, rgba(16, 185, 129, 0.12), transparent 62%);
		animation: meshFlash 1.7s ease-in-out infinite;
	}

	.mesh-dot,
	.ring span,
	.stake-ring span {
		position: absolute;
		top: calc(50% + sin(calc(var(--node) * 40deg)) * 41% - 0.7rem);
		left: calc(50% + cos(calc(var(--node) * 40deg)) * 41% - 0.7rem);
	}

	.counter,
	.state-label,
	.witness-scene strong,
	.stake-scene > strong {
		border-radius: 999px;
		background: var(--ink);
		color: var(--cream);
		padding: 0.7rem 1rem;
		font-weight: 950;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}

	.ring,
	.stake-ring {
		position: relative;
		width: min(22rem, 70vw);
		aspect-ratio: 1;
		border-radius: 50%;
	}

	.ring span.honest {
		background: var(--teal);
	}

	.ring span.byzantine {
		background: var(--rose);
		animation: warningPulse 1.3s ease-in-out infinite;
	}

	.arc {
		position: absolute;
		inset: 7%;
		border: 0.8rem solid transparent;
		border-top-color: var(--teal);
		border-left-color: var(--teal);
		border-radius: 50%;
		transform: rotate(29deg);
		pointer-events: none;
	}

	.threshold-scene.unsafe .ring {
		animation: shake 380ms ease-in-out infinite;
	}

	.equivocation-scene .cluster,
	.approval-scene .conflict,
	.approval-scene .witness {
		position: absolute;
		display: grid;
		place-items: center;
		border-radius: 1.2rem;
		font-weight: 950;
	}

	.cluster {
		width: 8rem;
		height: 6rem;
		background: rgba(16, 185, 129, 0.12);
		color: var(--teal);
	}

	.cluster-left {
		left: 9%;
		bottom: 20%;
	}

	.cluster-right {
		right: 9%;
		bottom: 20%;
	}

	.liar-node {
		position: absolute;
		top: 22%;
		left: calc(50% - 2.35rem);
		display: grid;
		width: 4.7rem;
		height: 4.7rem;
		place-items: center;
		border-radius: 50%;
		background: var(--rose);
		color: white;
		font-weight: 950;
		animation: warningPulse 1.4s ease-in-out infinite;
	}

	.bubble {
		position: absolute;
		top: 47%;
		border-radius: 999px;
		padding: 0.65rem 1rem;
		color: white;
		font-weight: 950;
	}

	.bubble-a {
		left: 25%;
		background: var(--indigo);
	}

	.bubble-b {
		right: 25%;
		background: #7c3aed;
	}

	.compare-line {
		position: absolute;
		right: 23%;
		bottom: 32%;
		left: 23%;
		height: 3px;
		background: repeating-linear-gradient(90deg, var(--rose) 0 12px, transparent 12px 22px);
		opacity: 0;
		transform: scaleX(0);
		transition:
			opacity 220ms ease,
			transform 520ms cubic-bezier(0.16, 1, 0.3, 1);
	}

	.equivocation-scene.caught .compare-line {
		opacity: 1;
		transform: scaleX(1);
	}

	.equivocation-scene.caught .bubble::after {
		content: "x";
		display: inline-grid;
		width: 1.4rem;
		height: 1.4rem;
		margin-left: 0.45rem;
		place-items: center;
		border-radius: 50%;
		background: var(--rose);
		color: white;
	}

	.chain-row {
		display: flex;
		align-items: center;
		gap: 0.95rem;
	}

	.chain-row span,
	.ledger span,
	.mini-dag span {
		display: grid;
		place-items: center;
		border: 1px solid rgba(79, 70, 229, 0.16);
		border-radius: 0.8rem;
		background: white;
		box-shadow: 0 14px 36px rgba(15, 23, 42, 0.12);
		color: var(--indigo);
		font-weight: 950;
	}

	.chain-row span {
		width: 4rem;
		height: 4rem;
	}

	.chain-row span + span::before {
		content: "";
		position: absolute;
		width: 1rem;
		height: 2px;
		margin-left: -2.5rem;
		background: var(--indigo);
	}

	.orphan {
		position: absolute;
		top: 25%;
		right: 19%;
		border-radius: 1rem;
		background: rgba(244, 63, 94, 0.12);
		color: var(--rose);
		padding: 1rem 1.2rem;
		font-weight: 950;
		transform: rotate(8deg);
	}

	.dag-scene svg {
		width: min(34rem, 100%);
		aspect-ratio: 1.4;
		overflow: visible;
	}

	.dag-scene line {
		stroke: rgba(79, 70, 229, 0.42);
		stroke-width: 1.1;
		stroke-linecap: round;
		stroke-dasharray: 100;
		animation: drawLine 1s cubic-bezier(0.16, 1, 0.3, 1) backwards;
		animation-delay: var(--edge-delay);
	}

	.dag-scene circle {
		fill: var(--teal);
		stroke: rgba(255, 255, 255, 0.7);
		stroke-width: 1.4;
		animation: popIn 520ms cubic-bezier(0.16, 1, 0.3, 1) backwards;
		animation-delay: var(--node-delay);
	}

	.dag-scene text {
		fill: white;
		font-size: 3px;
		font-weight: 900;
		text-anchor: middle;
	}

	.dag-scene.quiet svg {
		filter: grayscale(0.45);
		opacity: 0.62;
	}

	.big-question {
		position: absolute;
		display: grid;
		width: 8rem;
		height: 8rem;
		place-items: center;
		border-radius: 50%;
		background: var(--ink);
		color: var(--cream);
		font-family: var(--font-display);
		font-size: 5rem;
		font-weight: 950;
		animation: pulseScale 1.8s ease-in-out infinite;
	}

	.waste-counter {
		position: absolute;
		top: 1.2rem;
		right: 1.2rem;
		border-radius: 999px;
		background: var(--teal);
		color: white;
		padding: 0.65rem 0.9rem;
		font-weight: 950;
	}

	.approval-scene .conflict {
		width: 5rem;
		height: 5rem;
		background: var(--rose);
		color: white;
	}

	.conflict-a {
		left: 24%;
		top: 30%;
	}

	.conflict-b {
		right: 24%;
		top: 30%;
	}

	.approval-scene .witness {
		bottom: 24%;
		left: calc(50% - 5rem);
		width: 10rem;
		height: 5rem;
		background: var(--ink);
		color: white;
	}

	.approval-scene::before,
	.approval-scene::after {
		content: "";
		position: absolute;
		width: 20%;
		height: 3px;
		background: var(--indigo);
		transform-origin: right;
	}

	.approval-scene::before {
		left: 32%;
		top: 55%;
		transform: rotate(28deg);
	}

	.approval-scene::after {
		right: 32%;
		top: 55%;
		transform: rotate(-28deg);
	}

	.approval-scene.single::after {
		opacity: 0.12;
	}

	.stack-bar {
		position: relative;
		display: grid;
		width: min(32rem, 100%);
		grid-template-columns: repeat(9, 1fr);
		gap: 0.45rem;
		border: 1px solid var(--line);
		border-radius: 1rem;
		background: white;
		padding: 1rem;
	}

	.stack-bar i {
		display: block;
		aspect-ratio: 1;
		border-radius: 50%;
		background: #d7dde8;
		transition: background 220ms ease;
	}

	.stack-bar i.filled {
		background: var(--teal);
	}

	.threshold-mark {
		position: absolute;
		top: 0.45rem;
		bottom: 0.45rem;
		left: 66.666%;
		width: 2px;
		background: var(--amber);
	}

	.witness-scene.locked .stack-bar {
		box-shadow: 0 0 0 6px rgba(16, 185, 129, 0.12);
	}

	.waves-scene {
		grid-template-columns: repeat(3, 1fr);
		gap: 1rem;
	}

	.wave-band {
		display: grid;
		min-height: 18rem;
		align-content: center;
		justify-items: center;
		gap: 1rem;
		border: 1px solid rgba(79, 70, 229, 0.16);
		border-radius: 1.2rem;
		background: color-mix(in srgb, var(--indigo) calc(var(--wave) * 8%), white);
		font-weight: 950;
		transition: transform 180ms ease;
	}

	.wave-band:hover {
		transform: translateY(-0.35rem);
	}

	.wave-band i {
		display: grid;
		width: 4rem;
		height: 4rem;
		place-items: center;
		border-radius: 50%;
		background: var(--amber);
		color: var(--ink);
	}

	.untangle-scene {
		grid-template-columns: 1fr 10rem;
		gap: 1.4rem;
	}

	.mini-dag {
		position: relative;
		width: 100%;
		height: 22rem;
		border-radius: 1.2rem;
		background: rgba(79, 70, 229, 0.06);
	}

	.mini-dag span {
		position: absolute;
		top: calc(var(--y) - 1.35rem);
		left: calc(var(--x) - 1.35rem);
		width: 2.7rem;
		height: 2.7rem;
		animation: floatNode 4s ease-in-out infinite;
		animation-delay: calc(var(--order) * -150ms);
	}

	.ledger {
		display: grid;
		gap: 0.45rem;
	}

	.ledger span {
		min-height: 2.1rem;
		padding: 0.35rem 0.75rem;
	}

	.pipeline-scene {
		grid-template-columns: repeat(5, minmax(0, 1fr));
		gap: 0.75rem;
	}

	.pipeline-scene button {
		display: grid;
		min-height: 10rem;
		align-content: center;
		justify-items: center;
		gap: 0.8rem;
		border: 1px solid var(--line);
		border-radius: 1.1rem;
		background: white;
		color: var(--ink);
		font-weight: 950;
		transition:
			transform 180ms ease,
			border-color 180ms ease;
	}

	.pipeline-scene button:hover {
		transform: translateY(-0.35rem);
		border-color: var(--indigo);
	}

	.track {
		position: relative;
		display: grid;
		width: min(34rem, 100%);
		gap: 0.7rem;
	}

	.track::before {
		content: "";
		display: block;
		height: 0.65rem;
		border-radius: 999px;
		background: rgba(23, 32, 51, 0.1);
	}

	.track i {
		position: absolute;
		top: -0.45rem;
		left: 0;
		width: 2rem;
		height: 2rem;
		border-radius: 50%;
		background: var(--rose);
		animation: oldRace 5.2s steps(5, end) both;
		animation-delay: calc(var(--race-run) * 1ms);
	}

	.track.cordial i {
		background: var(--teal);
		animation: cordialRace 3.2s cubic-bezier(0.16, 1, 0.3, 1) both;
		animation-delay: calc(var(--race-run) * 1ms);
	}

	.track span,
	.track strong {
		font-weight: 950;
	}

	.track strong {
		justify-self: end;
		color: var(--teal);
	}

	.stake-ring span {
		width: calc(1.25rem * var(--stake));
		height: calc(1.25rem * var(--stake));
		border-radius: 50%;
		background: #cbd5e1;
		transform: translate(-50%, -50%);
	}

	.stake-ring span.support {
		background: var(--teal);
	}

	.stake-controls {
		display: grid;
		width: min(31rem, 100%);
		grid-template-columns: repeat(2, 1fr);
		gap: 0.8rem;
	}

	.stake-controls label {
		width: auto;
		border: 1px solid var(--line);
		border-radius: 0.8rem;
		background: white;
		padding: 0.7rem;
	}

	.pruning-scene .prune {
		width: min(17rem, 100%);
	}

	.pruning-scene .prune span:nth-child(-n + 3) {
		opacity: 0.38;
		transform: scale(0.9);
	}

	.archive {
		display: grid;
		place-items: center;
		gap: 0.45rem;
		border-radius: 1rem;
		background: var(--ink);
		color: white;
		padding: 1rem;
		font-weight: 950;
		animation: pulseScale calc(2.4s / var(--speed, 2)) ease-in-out infinite;
	}

	.close-scene {
		grid-template-columns: repeat(3, 1fr);
		gap: 1rem;
	}

	.close-scene article {
		display: grid;
		min-height: 16rem;
		align-content: center;
		justify-items: center;
		gap: 0.75rem;
		border: 1px solid var(--line);
		border-radius: 1.1rem;
		background: white;
		text-align: center;
		transition: transform 180ms ease;
	}

	.close-scene article:hover {
		transform: translateY(-0.35rem) scale(1.02);
	}

	.close-scene strong {
		font-family: var(--font-display);
		font-size: 1.6rem;
		font-weight: 950;
	}

	.close-scene span {
		color: var(--muted);
		font-weight: 800;
	}

	.peek-trigger {
		position: absolute;
		right: 1.1rem;
		top: 1.1rem;
		z-index: 10;
		display: grid;
		width: 2.6rem;
		height: 2.6rem;
		place-items: center;
		border: 1px solid var(--line);
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.82);
		color: var(--ink);
	}

	.peek-panel {
		position: absolute;
		right: 1.2rem;
		bottom: 5.4rem;
		z-index: 18;
		max-width: min(34rem, calc(100% - 2.4rem));
		border: 1px solid rgba(79, 70, 229, 0.18);
		border-radius: 1.1rem;
		background: rgba(255, 255, 255, 0.9);
		padding: 1rem 1.1rem;
		box-shadow: 0 24px 70px rgba(15, 23, 42, 0.16);
		backdrop-filter: blur(18px);
		animation: panelIn 240ms cubic-bezier(0.16, 1, 0.3, 1);
	}

	.peek-panel strong {
		font-weight: 950;
	}

	.peek-panel p {
		margin-top: 0.4rem;
		color: var(--muted);
		font-weight: 700;
		line-height: 1.55;
	}

	.deck-controls {
		position: absolute;
		right: 1rem;
		bottom: 1rem;
		left: 1rem;
		z-index: 22;
		display: flex;
		align-items: center;
		gap: 0.7rem;
		border: 1px solid var(--line);
		border-radius: 999px;
		background: rgba(255, 255, 255, 0.82);
		padding: 0.42rem;
		backdrop-filter: blur(18px);
	}

	.deck-controls > button {
		width: 2.35rem;
		height: 2.35rem;
		padding: 0;
	}

	.deck-controls > button:disabled {
		cursor: not-allowed;
		opacity: 0.3;
	}

	.deck-dots {
		display: flex;
		flex: 1;
		gap: 0.32rem;
		align-items: center;
		justify-content: center;
	}

	.deck-dots button {
		width: 0.43rem;
		height: 0.43rem;
		border: 0;
		border-radius: 999px;
		background: rgba(23, 32, 51, 0.25);
		padding: 0;
	}

	.deck-dots button.active {
		width: 1.3rem;
		background: var(--indigo);
	}

	.deck-counter {
		min-width: 4.6rem;
		text-align: center;
		font-size: 0.72rem;
		font-weight: 950;
		letter-spacing: 0.12em;
	}

	@keyframes drift {
		50% {
			transform: translate3d(0.7rem, -0.9rem, 0);
			opacity: 0.45;
		}
	}

	@keyframes pulseScale {
		50% {
			transform: scale(1.06);
			filter: brightness(1.08);
		}
	}

	@keyframes warningPulse {
		50% {
			transform: scale(1.15);
			filter: drop-shadow(0 0 12px rgba(244, 63, 94, 0.6));
		}
	}

	@keyframes popIn {
		from {
			opacity: 0;
			transform: scale(0.7);
		}
	}

	@keyframes meshFlash {
		50% {
			filter: contrast(1.15) brightness(1.06);
		}
	}

	@keyframes shake {
		25% {
			transform: rotate(-2deg);
		}
		75% {
			transform: rotate(2deg);
		}
	}

	@keyframes drawLine {
		from {
			stroke-dashoffset: 100;
		}
		to {
			stroke-dashoffset: 0;
		}
	}

	@keyframes floatNode {
		50% {
			transform: translateY(-0.35rem);
		}
	}

	@keyframes oldRace {
		to {
			left: calc(100% - 2rem);
		}
	}

	@keyframes cordialRace {
		to {
			left: calc(100% - 2rem);
		}
	}

	@keyframes panelIn {
		from {
			opacity: 0;
			transform: translateY(0.65rem);
		}
	}

	@media (max-width: 980px) {
		.slide {
			grid-template-columns: 1fr;
			align-content: start;
			padding-bottom: 6rem;
		}

		.slide-copy h1 {
			max-width: 13ch;
			font-size: clamp(3rem, 12vw, 5.6rem);
		}

		.visual {
			min-height: 27rem;
		}

		.pipeline-scene,
		.close-scene,
		.waves-scene {
			grid-template-columns: 1fr;
			overflow-y: auto;
		}

		.pipeline-scene button,
		.close-scene article,
		.wave-band {
			min-height: 7rem;
		}
	}

	@media (max-width: 620px) {
		.deck {
			min-height: 86vh;
			border-radius: 1.3rem;
		}

		.slide {
			padding: 1.25rem;
			padding-bottom: 6rem;
		}

		.visual {
			min-height: 24rem;
		}

		.deck-dots {
			justify-content: flex-start;
			overflow-x: auto;
		}

		.deck-counter {
			display: none;
		}

		.stake-controls {
			grid-template-columns: 1fr;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		*,
		*::before,
		*::after {
			animation-duration: 1ms !important;
			animation-iteration-count: 1 !important;
			scroll-behavior: auto !important;
			transition-duration: 1ms !important;
		}
	}
</style>
