<script lang="ts">
	import { formatDigit } from '@/utils';
	import FilpDigit from './FilpDigit.svelte';
	import { time } from '@/stores/timerStore';
</script>

<div class="clock">
	<div class="clock-item">
		<span>Hour</span>
		<div class="clock-digit">
			<FilpDigit type="hour" time={formatDigit($time.hour)} />
		</div>
	</div>
	<div class="clock-item">
		<span>Minute</span>
		<div class="clock-digit">
			<FilpDigit type="minute" time={formatDigit($time.min)} />
		</div>
	</div>
	<div class="clock-item">
		<span>Seconds</span>
		<div class="clock-digit">
			<FilpDigit type="seconds" time={formatDigit($time.sec)} />
		</div>
	</div>
</div>

<style lang="scss" scoped>
	.clock {
		display: flex;
		align-items: center;
		gap: 6rem;

		&-item {
			display: flex;
			align-items: center;
			flex-direction: column;
			gap: 3rem;

			span {
				font-size: 2rem;
				text-transform: uppercase;
				opacity: 0.85;
			}
		}

		&-item + &-item {
			.clock-digit::before {
				content: '';
				display: block;
				position: absolute;
				top: 50%;
				left: -3rem;
				width: 4px;
				height: 5rem;
				transform: translate(-50%, -50%);
				background: var(--divider-color);
				border-radius: 10rem;
			}
		}

		&-digit {
			position: relative;
		}
	}
</style>
