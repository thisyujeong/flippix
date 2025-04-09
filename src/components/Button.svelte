<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ClassValue } from 'svelte/elements';

	interface ButtonProps {
		cn?: ClassValue;
		onclick?: () => void;
		children: Snippet;
	}

	const { children, onclick, cn }: ButtonProps = $props();
</script>

<button class={['button', cn]} {onclick}>
	{@render children?.()}
</button>

<style lang="scss" scoped>
	.button {
		padding: 6px 16px;
		font-size: 2.4rem;
		text-transform: uppercase;
		border-radius: 10rem;
	}
</style>
