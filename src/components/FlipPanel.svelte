<script lang="ts">
	interface PanelProps {
		value: number;
	}

	let { value: curr }: PanelProps = $props();
	let prev: number = $state(0);

	let flipped = $state(false);
	let flipper: HTMLDivElement;

	$effect(() => {
		if (curr !== prev) {
			flipped = true;
			flipper.style.transition = 'transform 0.4s ease-in-out';

			const flipping = setTimeout(() => {
				flipped = false;
				flipper.style.transition = 'transform 0s';
				prev = curr;
			}, 450);

			return () => clearTimeout(flipping);
		}
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
		<div class={`panel-middle ${flipped && 'flipped'}`} bind:this={flipper}>
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
		background-color: #111111;
		border-top: 1px solid #78787880;

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
			border-radius: 20px;
			box-shadow: 1px 2px 2px #000;
		}

		&-digit {
			position: absolute;
			display: block;
			left: 50%;
			color: #fff;
			font-size: 30rem;
			font-weight: 700;
			transform: translateX(-50%);
			line-height: var(--panel-flip-height);
			user-select: none;
		}

		&-upper {
			flex: 1;
			position: relative;
			border-radius: var(--panel-radius-child) var(--panel-radius-child) 0 0;
			border-top: 1px solid #787878;
			box-sizing: border-box;
			border-bottom: 2px solid #111111;
			background: linear-gradient(to top, #131313, #252525);
			overflow: hidden;
			height: var(--panel-flip-half-height);

			.panel-digit {
				top: -1px;
			}
		}

		&-lower {
			height: var(--panel-flip-half-height);
			position: relative;
			border-radius: 0 0 var(--panel-radius-child) var(--panel-radius-child);
			border-top: 2px solid #111111;
			background: linear-gradient(to bottom, #1c1c1c, #292929);
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
