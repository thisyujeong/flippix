<script lang="ts">
	import { progress, totalSeconds } from '@/stores/timerStore';
	import { derived } from 'svelte/store';

	const size = 68;
	const strokeWidth = 8;
	const radius = (size - strokeWidth) / 2;
	const circumference = 2 * Math.PI * radius;

	// stroke offset 계산
	const offset = derived(
		progress,
		($progress) => circumference - (circumference * $progress) / 100
	);

	// 위험 구간에 따라 색상 모드 전환
	const isDanger = derived(
		progress,
		($progress) => Math.floor(($totalSeconds * $progress) / 100) <= 5
	);
</script>

<div
	class="progress-wrapper"
	style="--progress-stroke-width:{strokeWidth}; --progress-size:{size}px"
>
	<svg class="progress-circle" width={size} height={size}>
		<defs>
			<!-- 기본 그라데이션 (파랑 → 하늘) -->
			<linearGradient id="normalGradient" x1="1" y1="0" x2="0" y2="1">
				<stop offset="0%%" stop-color="#6df997" />
				<stop offset="100%" stop-color="#42de6c" />
			</linearGradient>

			<!-- 위험 그라데이션 (빨강 → 주황) -->
			<linearGradient id="dangerGradient" x1="0" y1="0" x2="1" y2="1">
				<stop offset="100%" stop-color="#ff4d4f" />
				<stop offset="0%" stop-color="#ffa940" />
			</linearGradient>
		</defs>

		<!-- 배경 원 -->
		<circle class="bg" cx={size / 2} cy={size / 2} r={radius} />

		<!-- 진행 원 -->
		<circle
			class="bar"
			cx={size / 2}
			cy={size / 2}
			r={radius}
			stroke-dasharray={circumference}
			stroke-dashoffset={$offset}
			stroke={$isDanger ? 'url(#dangerGradient)' : 'url(#normalGradient)'}
		/>
	</svg>
	<strong class="label">{$progress}%</strong>
</div>

<style lang="scss" scoped>
	.progress-wrapper {
		position: relative;
		display: inline-block;
		width: var(--progress-size);
		height: var(--progress-size);
		.progress-circle {
			transform: rotate(-90deg);
		}
		circle {
			fill: none;
			stroke-width: var(--progress-stroke-width);
		}
		.bg {
			stroke: var(--progress-track-bg);
		}
		.bar {
			stroke-linecap: round;
			transition: stroke-dashoffset 0.5s ease;
		}
		.label {
			position: absolute;
			top: 50%;
			left: 50%;
			font-size: 16px;
			color: var(--text-color);
			font-weight: 400;
			transform: translate(-50%, -50%);
		}
	}
</style>
