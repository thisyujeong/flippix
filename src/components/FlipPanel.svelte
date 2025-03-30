<script>
	let flipped = $state(false);
	function flipping() {
		if (!flipped) {
			flipped = true;
			setTimeout(() => {
				flipped = false;
			}, 1000);
		}
	}
</script>

<div class="panel">
	<div class="panel-inner">
		<div class="panel-container">
			<!-- static panel -->
			<div class="panel-upper">
				<span class="panel-digit">1</span>
			</div>
			<div class="panel-lower">
				<span class="panel-digit">0</span>
			</div>
			<!-- /static panel -->

			<!-- flip panel -->
			<div class="panel-middle">
				<div class="panel-upper panel-middle__front">
					<span class="panel-digit">0</span>
				</div>
				<div class="panel-lower panel-middle__back">
					<span class="panel-digit">1</span>
				</div>
			</div>
			<!-- /flip panel -->
		</div>
	</div>
</div>

<style lang="scss" scoped>
	.panel {
		width: 300px;
		height: 400px;
		padding: 20px;
		border-radius: 40px;
		background-color: #111111;
		border-top: 1px solid #78787880;

		&-inner {
			position: relative;
			width: 100%;
			height: 100%;
			border-radius: 20px;
		}

		&-container {
			position: relative;
			width: 100%;
			height: 100%;
			display: flex;
			flex-direction: column;
			perspective: 1000px;
		}

		&-digit {
			position: absolute;
			display: block;
			left: 50%;
			color: #fff;
			font-size: 300px;
			font-weight: 700;
			transform: translateX(-50%);
			line-height: 360px;
			user-select: none;
		}

		&-upper {
			flex: 1;
			position: relative;
			border-radius: 20px 20px 0 0;
			border-top: 1px solid #787878;
			border-bottom: 2px solid #111111;
			background: linear-gradient(to top, #131313, #252525);
			overflow: hidden;
			.panel-digit {
				top: 0;
			}
		}

		&-lower {
			flex: 1;
			position: relative;
			border-radius: 0 0 20px 20px;
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
			transform-origin: bottom center;
			transform-style: preserve-3d;
			transition: 0.3s ease-in-out;
			transform: rotateX(-180deg);

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
		}
	}
</style>
