<script lang="ts">
	import { fly, scale } from "svelte/transition";
	import portrait from "$lib/assets/images/profile_pic.webp";

	type Props = {
		compact?: boolean;
	};

	let { compact = false }: Props = $props();
	let rotateX = $state(0);
	let rotateY = $state(0);

	const nodes = ["ML", "DHT", "Go", "RAG", "P2P"];

	function handlePointerMove(event: PointerEvent) {
		const target = event.currentTarget as HTMLElement;
		const rect = target.getBoundingClientRect();
		const x = (event.clientX - rect.left) / rect.width - 0.5;
		const y = (event.clientY - rect.top) / rect.height - 0.5;

		rotateX = y * -10;
		rotateY = x * 12;
	}

	function resetTilt() {
		rotateX = 0;
		rotateY = 0;
	}
</script>

<figure
	class={`portrait-stage ${compact ? "portrait-stage-compact" : ""}`}
	onpointermove={handlePointerMove}
	onpointerleave={resetTilt}
	in:fly={{ y: 22, duration: 600, delay: 280 }}
	role="img"
	aria-label="Animated sketch portrait of Natnael Yohanes"
>
	<div class="portrait-orbit portrait-orbit-one"></div>
	<div class="portrait-orbit portrait-orbit-two"></div>

	{#each nodes as node, index (node)}
		<span
			class="portrait-node"
			style={`--node-index:${index}; --node-total:${nodes.length};`}
			in:scale={{ duration: 420, delay: 420 + index * 80 }}
		>
			{node}
		</span>
	{/each}

	<div
		class="portrait-card"
		style={`transform: perspective(1100px) rotateX(${rotateX}deg) rotateY(${rotateY}deg);`}
	>
		<div class="portrait-glow"></div>
		<img src={portrait} alt="Sketch portrait of Natnael Yohanes" class="portrait-image" />
		<div class="portrait-shine"></div>
	</div>

	<div class="portrait-caption">
		<span>Backend AI Engineer</span>
		<strong>Natnael Yohanes</strong>
	</div>
</figure>
