<script lang="ts">
	import { formatDigit } from '@/utils';
	import FilpDigit from './FilpDigit.svelte';
	import { time } from '@/stores/timerStore';
</script>

<div class="clock">
	<div class="clock-item">
		<span class="clock-item__label">H</span>
		<div class="clock-item__digit">
			<FilpDigit type="hour" time={formatDigit($time.hour)} />
		</div>
	</div>
	<div class="clock-item">
		<span class="clock-item__label">M</span>
		<div class="clock-item__digit">
			<FilpDigit type="minute" time={formatDigit($time.min)} />
		</div>
	</div>
	<div class="clock-item">
		<span class="clock-item__label">S</span>
		<div class="clock-item__digit">
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
			position: relative;
			display: flex;
			align-items: center;
			flex-direction: column;
			gap: 3rem;

			&__label {
				top: -4rem;
				display: inline-block;
				position: absolute;
				color: #929aad;
				font-size: 2rem;
				text-transform: capitalize;
				opacity: 0.85;
				font-size: clamp(16px, 2rem, 20px);
			}
			&__digit {
				position: relative;
			}
		}

		&-item + &-item {
			.clock-item__digit::before {
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
	}
</style>
