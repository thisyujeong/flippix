<script lang="ts">
	import { playSound } from '@/lib/sounds';
	import { theme, toggleTheme } from '@/stores/themeStore';

	const handleToggle = () => {
		playSound('swipe');
	};
</script>

<button
	class={['button', 'switch']}
	class:on={$theme === 'light'}
	onclick={() => toggleTheme(handleToggle)}
>
	<span class="switch-icon">
		<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2" />
			<path
				d="M18.364 5.63604C16.6761 3.94821 14.3869 3 12 3C9.61305 3 7.32387 3.94821 5.63604 5.63604C3.94821 7.32387 3 9.61305 3 12C3 14.3869 3.94821 16.6761 5.63604 18.364L12 12L18.364 5.63604Z"
				fill="currentColor"
			/>
		</svg>
	</span>
	<span class="switch-text">{$theme === 'dark' ? 'on' : 'off'}</span>
</button>

<style lang="scss" scoped>
	.switch {
		padding: 12px 16px;
		display: flex;
		align-items: center;
		gap: 8px;

		&-icon {
			position: relative;
			width: 20px;
			height: 20px;
			transition: transform 0.3s;
			color: inherit;

			svg {
				width: 100%;
				height: 100%;
			}
		}

		&-text {
			text-transform: uppercase;
		}

		&.on {
			.switch-icon {
				transform: rotate(180deg);
			}
		}
	}
</style>
