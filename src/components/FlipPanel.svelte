<script lang="ts">
	import { onMount } from 'svelte';

	interface PanelProps {
		value: number;
	}

	let { value: curr }: PanelProps = $props();
	let prev: number = $state(0);

	let flipped = $state(false);
	let flipper: HTMLDivElement;

	onMount(() => (prev = curr));

	$effect(() => {
		if (curr === prev) return;
		flipped = true;
		flipper.style.transition = 'transform 0.4s ease-in-out';

		const flipping = setTimeout(() => {
			flipped = false;
			flipper.style.transition = 'transform 0s';
			prev = curr;
		}, 450);

		return () => clearTimeout(flipping);
	});
</script>

<div class="panel">
	<div class="panel-inner">
		<div class="panel-container">
			<!-- static panel -->
			<div class="panel-upper">
				<span class="panel-digit">{curr}</span>
			</div>
			<div class="panel-lower">
				<span class="panel-digit">{prev}</span>
			</div>
			<!-- /static panel -->
		</div>

		<!-- flip panel -->
		<div class="panel-middle" class:flipped bind:this={flipper}>
			<div class="panel-upper panel-middle__front">
				<span class="panel-digit">{prev}</span>
			</div>
			<div class="panel-lower panel-middle__back">
				<span class="panel-digit">{curr}</span>
			</div>
		</div>
		<!-- /flip panel -->
	</div>
</div>

<style lang="scss" scoped>
	.panel {
		--panel-width: 27rem;
		--panel-height: 36rem;
		--panel-padding: 2rem;
		--panel-radius: 4rem;
		--panel-radius-child: calc(var(--panel-radius) - var(--panel-padding));
		--panel-flip-height: calc(var(--panel-height) - var(--panel-padding) * 2);
		--panel-flip-half-height: calc(var(--panel-flip-height) / 2);

		width: var(--panel-width);
		height: var(--panel-height);
		padding: var(--panel-padding);
		border-radius: var(--panel-radius);
		background-color: var(--panel-color);
		border-top: 1px solid var(--panel-border-color);
		border-left: 1px solid var(--panel-border-color);
		box-shadow: var(--panel-shadow);

		&-inner {
			position: relative;
			width: 100%;
			height: var(--panel-flip-height);
			perspective: 900px;
		}

		&-container {
			position: relative;
			width: 100%;
			height: 100%;
			display: flex;
			flex-direction: column;
			border-radius: calc(var(--panel-radius) - var(--panel-padding));
		}

		&-digit {
			position: absolute;
			display: block;
			left: 50%;
			color: var(--flip-text-color);
			font-size: 30rem;
			font-weight: 700;
			transform: translateX(-50%);
			line-height: var(--panel-flip-height);
			user-select: none;
		}

		&-upper {
			flex: 1;
			position: relative;
			height: var(--panel-flip-half-height);
			border-radius: var(--panel-radius-child) var(--panel-radius-child) 0 0;
			box-sizing: border-box;
			border-top: 1px solid #787878;
			border-bottom: 0.3rem solid var(--panel-color);
			background: var(--flip-upper-color);
			overflow: hidden;

			.panel-digit {
				top: -1px;
			}
		}

		&-lower {
			height: var(--panel-flip-half-height);
			position: relative;
			border-radius: 0 0 var(--panel-radius-child) var(--panel-radius-child);
			border-top: 0.3rem solid var(--panel-color);
			background: var(--flip-lower-color);
			overflow: hidden;
			.panel-digit {
				bottom: 0;
			}
		}

		&-middle {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 50%;
			transform-origin: center bottom;
			transform-style: preserve-3d;

			&__front {
				position: absolute;
				width: 100%;
				height: 100%;
				backface-visibility: hidden;
			}
			&__back {
				position: absolute;
				width: 100%;
				height: 100%;
				transform: rotateY(180deg) rotateZ(180deg);
				backface-visibility: hidden;
			}

			&.flipped {
				transform: rotateX(-180deg);
				.panel-middle__front {
					&::after {
						content: '';
						position: absolute;
						top: 0;
						left: 0;
						width: 100%;
						height: 100%;
						margin-bottom: 0.3rem;
						background-color: #000000a9;
						backface-visibility: hidden;
						transition: opacity 0.3s ease-in-out;
						opacity: 1;
						z-index: 1;
						animation: fade 0.3s;
					}

					@keyframes fade {
						from {
							opacity: 0;
						}
						to {
							opacity: 1;
						}
					}
				}
			}
		}
	}
</style>
