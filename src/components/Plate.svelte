<script>
	let flipped = $state(false);
	function flipping() {
		console.log('flipping');
	}
</script>

<div class="plate">
	<div class="plate-wrapper">
		<div class="plate-upper">
			<span class="plate-digit">3</span>
		</div>
		<div class="plate-lower">
			<span class="plate-digit">3</span>
		</div>
	</div>
</div>

<button onclick={flipping}>Click</button>

<style lang="scss">
	.plate {
		width: 240px;
		height: 300px;
		background-color: #000;
		border-radius: 24px;
		padding: 16px;

		&-wrapper {
			width: 100%;
			height: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			row-gap: 4px;
		}

		&-digit__style {
			display: block;
			width: 100%;
			color: #fff;
			font-size: 270px;
			line-height: 1;
			text-align: center;
			user-select: none;
		}

		&-upper {
			position: relative;
			width: 100%;
			height: 50%;
			border-radius: 12px 12px 0 0;
			background: #373737;
			overflow: hidden;

			.plate-digit {
				@extend .plate-digit__style;
				position: absolute;
				bottom: 0;
				transform: translateY(calc(50% + 2px));
			}
		}
		&-lower {
			position: relative;
			width: 100%;
			height: 50%;
			border-radius: 0 0 12px 12px;
			background: #373737;
			overflow: hidden;

			.plate-digit {
				@extend .plate-digit__style;
				position: absolute;
				top: 0;
				transform: translateY(calc(-50% - 2px));
			}
		}
	}
</style>
